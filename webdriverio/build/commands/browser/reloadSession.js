"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const log = (0, logger_1.default)('webdriverio');
/**
 *
 * Creates a new Selenium session with your current capabilities. This is useful if you
 * test highly stateful application where you need to clean the browser session between
 * the tests in your spec file to avoid creating hundreds of single test files with WDIO.
 * Be careful though, this command affects your test time tremendously since spawning
 * new Selenium sessions is very time consuming especially when using cloud services.
 *
 * <example>
    :reloadSync.js
    it('should reload my session with current capabilities', async () => {
        console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
        await browser.reloadSession()
        console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
    })
 * </example>
 *
 * @alias browser.reloadSession
 * @type utility
 *
 */
async function reloadSession() {
    var _a;
    const oldSessionId = this.sessionId;
    /**
     * end current running session, if session already gone suppress exceptions
     */
    try {
        await this.deleteSession();
    }
    catch (err) {
        /**
         * ignoring all exceptions that could be caused by browser.deleteSession()
         * there maybe times where session is ended remotely, browser.deleteSession() will fail in this case)
         * this can be worked around in code but requires a lot of overhead
         */
        log.warn(`Suppressing error closing the session: ${err.stack}`);
    }
    if ((_a = this.puppeteer) === null || _a === void 0 ? void 0 : _a.isConnected()) {
        this.puppeteer.disconnect();
        log.debug('Disconnected puppeteer session');
    }
    const ProtocolDriver = require(this.options.automationProtocol).default;
    await ProtocolDriver.reloadSession(this);
    const options = this.options;
    if (Array.isArray(options.onReload) && options.onReload.length) {
        await Promise.all(options.onReload.map((hook) => hook(oldSessionId, this.sessionId)));
    }
    return this.sessionId;
}
exports.default = reloadSession;
