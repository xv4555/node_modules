"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const logger_1 = __importDefault(require("@wdio/logger"));
const constants_1 = require("../../constants");
const log = (0, logger_1.default)('webdriverio');
/**
 * Get the [Puppeteer Browser instance](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
 * to run commands with Puppeteer. Note that all Puppeteer commands are
 * asynchronous by default so in order to interchange between sync and async
 * execution make sure to wrap your Puppeteer calls within a `browser.call`
 * commands as shown in the example.
 *
 * :::info
 *
 * Note that using Puppeteer requires support for Chrome DevTools protocol and e.g.
 * can not be used when running automated tests in the cloud. Find out more in the
 * [Automation Protocols](/docs/automationProtocols) section.
 *
 * :::
 *
 * <example>
    :getPuppeteer.test.js
    it('should allow me to use Puppeteer', async () => {
        // WebDriver command
        await browser.url('https://webdriver.io')

        const puppeteerBrowser = await browser.getPuppeteer()
        // switch to Puppeteer
        const metrics = await browser.call(async () => {
            const pages = await puppeteerBrowser.pages()
            pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
            return pages[0].metrics()
        })

        console.log(metrics.LayoutCount) // returns LayoutCount value
    })
 * </example>
 *
 * @return {PuppeteerBrowser}  initiated puppeteer instance connected to the browser
 */
async function getPuppeteer() {
    var _a, _b, _c, _d, _e;
    /**
     * check if we already connected Puppeteer and if so return
     * that instance
     */
    if ((_a = this.puppeteer) === null || _a === void 0 ? void 0 : _a.isConnected()) {
        log.debug('Reusing existing puppeteer session');
        return this.puppeteer;
    }
    const caps = this.capabilities.alwaysMatch || this.capabilities;
    /**
     * attach to a Selenium 4 CDP Session if it's returned in the capabilities
     */
    const cdpEndpoint = caps['se:cdp'];
    if (cdpEndpoint) {
        this.puppeteer = await puppeteer_core_1.default.connect({
            browserWSEndpoint: cdpEndpoint,
            defaultViewport: null
        });
        return this.puppeteer;
    }
    /**
     * attach to a Selenoid\Moon CDP Session if there are Aerokube vendor capabilities
     */
    const requestedCapabilities = ((_b = this.requestedCapabilities) === null || _b === void 0 ? void 0 : _b.alwaysMatch) || this.requestedCapabilities;
    const isAerokubeSession = requestedCapabilities['selenoid:options'] || requestedCapabilities['moon:options'];
    if (isAerokubeSession) {
        const { hostname, port } = this.options;
        this.puppeteer = await puppeteer_core_1.default.connect({
            browserWSEndpoint: `ws://${hostname}:${port}/devtools/${this.sessionId}`,
            defaultViewport: null
        });
        return this.puppeteer;
    }
    /**
     * attach to Chromium debugger session
     */
    const chromiumOptions = caps['goog:chromeOptions'] || caps['ms:edgeOptions'];
    if (chromiumOptions && chromiumOptions.debuggerAddress) {
        this.puppeteer = await puppeteer_core_1.default.connect({
            browserURL: `http://${chromiumOptions.debuggerAddress}`,
            defaultViewport: null
        });
        return this.puppeteer;
    }
    /**
     * attach to Firefox debugger session
     */
    if (((_c = caps.browserName) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === 'firefox') {
        if (!caps.browserVersion) {
            throw new Error('Can\'t find "browserVersion" in capabilities');
        }
        const majorVersion = parseInt(caps.browserVersion.split('.').shift() || '', 10);
        if (majorVersion >= 79) {
            const reqCaps = this.requestedCapabilities.alwaysMatch || this.requestedCapabilities;
            const ffOptions = caps['moz:firefoxOptions'];
            const ffArgs = (_d = reqCaps['moz:firefoxOptions']) === null || _d === void 0 ? void 0 : _d.args;
            const rdPort = ffOptions && ffOptions.debuggerAddress
                ? ffOptions.debuggerAddress
                : (_e = ffArgs === null || ffArgs === void 0 ? void 0 : ffArgs[ffArgs.findIndex((arg) => arg === constants_1.FF_REMOTE_DEBUG_ARG) + 1]) !== null && _e !== void 0 ? _e : null;
            if (!rdPort) {
                throw new Error('Could\'t find remote debug port in Firefox options');
            }
            this.puppeteer = await puppeteer_core_1.default.connect({
                browserURL: `http://localhost:${rdPort}`,
                defaultViewport: null
            });
            return this.puppeteer;
        }
    }
    throw new Error('Using DevTools capabilities is not supported for this session. ' +
        'This feature is only supported for local testing on Chrome, Firefox and Chromium Edge.');
}
exports.default = getPuppeteer;
