"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const Timer_1 = __importDefault(require("../Timer"));
class Interception {
    constructor(url, filterOptions = {}, browser) {
        this.url = url;
        this.filterOptions = filterOptions;
        this.browser = browser;
        this.respondOverwrites = [];
        this.matches = [];
    }
    waitForResponse({ timeout = this.browser.options.waitforTimeout, interval = this.browser.options.waitforInterval, timeoutMsg, } = {}) {
        /*!
         * ensure that timeout and interval are set properly
         */
        if (typeof timeout !== 'number') {
            timeout = this.browser.options.waitforTimeout;
        }
        if (typeof interval !== 'number') {
            interval = this.browser.options.waitforInterval;
        }
        /* istanbul ignore next */
        const fn = async () => this.calls && (await this.calls).length > 0;
        const timer = new Timer_1.default(interval, timeout, fn, true);
        return this.browser.call(() => timer.catch((e) => {
            if (e.message === 'timeout') {
                if (typeof timeoutMsg === 'string') {
                    throw new Error(timeoutMsg);
                }
                throw new Error(`waitForResponse timed out after ${timeout}ms`);
            }
            throw new Error(`waitForResponse failed with the following reason: ${(e && e.message) || e}`);
        }));
    }
    static isMatchingRequest(expectedUrl, actualUrl) {
        if (typeof expectedUrl === 'string') {
            return (0, minimatch_1.default)(actualUrl, expectedUrl);
        }
        if (expectedUrl instanceof RegExp) {
            return Boolean(actualUrl.match(expectedUrl));
        }
        throw new Error(`Unexpected type for mock url: ${expectedUrl}`);
    }
}
exports.default = Interception;
