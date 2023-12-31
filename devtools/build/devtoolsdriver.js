"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("@wdio/logger"));
const elementstore_1 = __importDefault(require("./elementstore"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const log = (0, logger_1.default)('devtools');
class DevToolsDriver {
    constructor(browser, pages) {
        this.commands = {};
        this.elementStore = new elementstore_1.default();
        this.windows = new Map();
        this.timeouts = new Map();
        this.activeDialog = undefined;
        this.activeListeners = [];
        this.browser = browser;
        const dir = path_1.default.resolve(__dirname, 'commands');
        const files = fs_1.default.readdirSync(dir).filter((file) => (file.endsWith('.js') ||
            (file.endsWith('.ts') &&
                !file.endsWith('.d.ts'))));
        for (let filename of files) {
            const commandName = path_1.default.basename(filename, path_1.default.extname(filename));
            if (!commandName) {
                throw new Error('Couldn\'t determine command name');
            }
            this.commands[commandName] = DevToolsDriver.requireCommand(path_1.default.join(dir, commandName));
        }
        this.initBrowser(browser, pages);
    }
    _createWindowHandle(page) {
        const pageId = (0, uuid_1.v4)();
        this.windows.set(pageId, page);
        this.currentFrame = page;
        this.currentWindowHandle = pageId;
    }
    async _targetCreatedHandler(target) {
        const page = await target.page();
        if (!page) {
            return;
        }
        this._createWindowHandle(page);
    }
    async _targetDestroyedHandler(target) {
        const page = await target.page();
        for (const [pageId, p] of this.windows.entries()) {
            if (page !== p) {
                continue;
            }
            log.trace(`Target destroyed, removing window handle ${pageId}`);
            this.windows.delete(pageId);
            break;
        }
        const pageIds = [...this.windows.keys()];
        this.currentFrame = this.windows.get(pageIds[0]);
        this.currentWindowHandle = pageIds[0];
        log.trace(`Switching to window handle with id ${pageIds[0]}`);
    }
    /**
     * moved into an extra method for testing purposes
     */
    /* istanbul ignore next */
    static requireCommand(filePath) {
        return require(filePath).default;
    }
    addListener(emitter, eventName, handler) {
        const boundHandler = handler.bind(this);
        emitter.on(eventName, boundHandler);
        this.activeListeners.push({ emitter, eventName, boundHandler });
    }
    cleanupListeners() {
        this.activeListeners.forEach(({ emitter, eventName, boundHandler }) => {
            emitter.off(eventName, boundHandler);
        });
        this.activeListeners = [];
    }
    /**
     * Inits browser listeners and sets initial handlers for given pages.
     * Function is also intended to be used while reloading DevTools session.
     * @param browser Puppeteer Browser
     * @param pages Puppeteer page array
     */
    initBrowser(browser, pages) {
        this.cleanupListeners();
        this.elementStore = new elementstore_1.default();
        this.windows = new Map();
        this.activeDialog = undefined;
        this.browser = browser;
        this.addListener(this.browser, 'targetcreated', this._targetCreatedHandler);
        this.addListener(this.browser, 'targetdestroyed', this._targetDestroyedHandler);
        for (const page of pages) {
            this._createWindowHandle(page);
        }
        /**
         * set default timeouts
         */
        this.setTimeouts(constants_1.DEFAULT_IMPLICIT_TIMEOUT, constants_1.DEFAULT_PAGELOAD_TIMEOUT, constants_1.DEFAULT_SCRIPT_TIMEOUT);
        const page = this.getPageHandle();
        if (page) {
            this.addListener(page, 'dialog', this.dialogHandler);
            this.addListener(page, 'framenavigated', this.framenavigatedHandler);
        }
    }
    register(commandInfo) {
        const self = this;
        const { command, ref, parameters, variables = [] } = commandInfo;
        /**
         * check if command is implemented
         */
        if (typeof this.commands[command] !== 'function') {
            return () => { throw new Error(`Command "${command}" is not yet implemented`); };
        }
        /**
         * within here you find the webdriver scope
         */
        let retries = 0;
        const wrappedCommand = async function (...args) {
            await self.checkPendingNavigations();
            const params = (0, utils_1.validate)(command, parameters, variables, ref, args);
            let result;
            try {
                this.emit('command', { command, params, retries });
                result = await self.commands[command].call(self, params);
            }
            catch (err) {
                /**
                 * if though we check for an execution context before executing a command we
                 * can technically still run into the situation (especially if the command
                 * contains multiple interaction with the page and is long) where the execution
                 * context gets destroyed. For these cases handle page transitions gracefully
                 * by repeating the command.
                 */
                if (err.message.includes('most likely because of a navigation')) {
                    log.debug('Command failed due to unfinished page transition, retrying...');
                    const page = self.getPageHandle();
                    await new Promise((resolve, reject) => {
                        const pageloadTimeout = setTimeout(() => reject(new Error('page load timeout')), self.timeouts.get('pageLoad'));
                        page.once('load', () => {
                            clearTimeout(pageloadTimeout);
                            resolve();
                        });
                    });
                    ++retries;
                    return wrappedCommand.apply(this, args);
                }
                throw (0, utils_1.sanitizeError)(err);
            }
            this.emit('result', { command, params, retries, result: { value: result } });
            if (typeof result !== 'undefined') {
                const isScreenshot = (command.toLowerCase().includes('screenshot') &&
                    typeof result === 'string' &&
                    result.length > 64);
                log.info('RESULT', isScreenshot ? `${result.substr(0, 61)}...` : result);
            }
            return result;
        };
        return wrappedCommand;
    }
    dialogHandler(dialog) {
        this.activeDialog = dialog;
    }
    framenavigatedHandler(frame) {
        this.currentFrameUrl = frame.url();
        this.elementStore.clear(frame.parentFrame() ? frame : undefined);
    }
    setTimeouts(implicit, pageLoad, script) {
        if (typeof implicit === 'number') {
            this.timeouts.set('implicit', implicit);
        }
        if (typeof pageLoad === 'number') {
            this.timeouts.set('pageLoad', pageLoad);
        }
        if (typeof script === 'number') {
            this.timeouts.set('script', script);
        }
        const page = this.getPageHandle();
        const pageloadTimeout = this.timeouts.get('pageLoad');
        if (page && pageloadTimeout) {
            page.setDefaultTimeout(pageloadTimeout);
        }
    }
    getPageHandle(isInFrame = false) {
        if (isInFrame && this.currentFrame) {
            return this.currentFrame;
        }
        if (!this.currentWindowHandle) {
            throw new Error('no current window handle registered');
        }
        const pageHandle = this.windows.get(this.currentWindowHandle);
        if (!pageHandle) {
            throw new Error('Couldn\'t find page handle');
        }
        return pageHandle;
    }
    async checkPendingNavigations(pendingNavigationStart = Date.now()) {
        /**
         * ensure there is no page transition happening and an execution context
         * is available
         */
        let page = this.getPageHandle();
        /**
         * ignore pending navigation check if dialog is open
         * or there are no pages
         */
        if (this.activeDialog || !page) {
            return;
        }
        /**
         * if current page is a frame we have to get the page from the browser
         * that has this frame listed
         */
        if (!page.mainFrame) {
            const pages = await this.browser.pages();
            const mainFrame = pages.find((browserPage) => (browserPage.frames().find((frame) => page === frame)));
            if (mainFrame) {
                page = mainFrame;
            }
        }
        const pageloadTimeout = this.timeouts.get('pageLoad');
        const pageloadTimeoutReached = pageloadTimeout != null
            ? Date.now() - pendingNavigationStart > pageloadTimeout
            : false;
        try {
            const executionContext = await page.mainFrame().executionContext();
            await executionContext.evaluate('1');
            /**
             * if we have an execution context, also check for the ready state
             */
            const readyState = await executionContext.evaluate('document.readyState');
            if (readyState === 'complete' || pageloadTimeoutReached) {
                return;
            }
        }
        catch (err) {
            /**
             * throw original error if a context could not be established
             */
            if (pageloadTimeoutReached) {
                throw err;
            }
        }
        /***
         * Avoid looping so quickly we run out of memory before the timeout.
         */
        await new Promise(resolve => setTimeout(resolve, Math.min(100, typeof pageloadTimeout === 'number' ? pageloadTimeout / 10 : 100)));
        await this.checkPendingNavigations(pendingNavigationStart);
    }
}
exports.default = DevToolsDriver;
