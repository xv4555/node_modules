"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const constants_1 = require("../../constants");
/**
 * Network interception class based on a WebDriver compliant endpoint.
 * Instead of directly using the CDP with Puppeteer this version of the
 * class uses a WebDriver extension to trigger the same behavior on a
 * compliant backend.
 */
class WebDriverInterception extends _1.default {
    async init() {
        if (this.url instanceof RegExp) {
            throw new Error('Regular Expressions as mock url are not supported');
        }
        const { mockId } = await this.browser.mockRequest(this.url, this.filterOptions);
        this.mockId = mockId;
    }
    /**
     * allows access to all requests made with given pattern
     */
    get calls() {
        return this.browser.call(() => this.browser.getMockCalls(this.mockId));
    }
    /**
     * Resets all information stored in the `mock.calls` set.
     */
    clear() {
        return this.browser.call(async () => this.browser.clearMockCalls(this.mockId));
    }
    /**
     * Does everything that `mock.clear()` does, and also
     * removes any mocked return values or implementations.
     */
    restore() {
        return this.browser.call(async () => this.browser.clearMockCalls(this.mockId, true));
    }
    /**
     * Always respond with same overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respond(overwrite, params = {}) {
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { overwrite, params, sticky: true }));
    }
    /**
     * Respond request once with given overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respondOnce(overwrite, params = {}) {
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { overwrite, params }));
    }
    /**
     * Abort the request with an error code
     * @param {string} errorCode  error code of the response
     */
    abort(errorReason, sticky = true) {
        if (typeof errorReason !== 'string' || !constants_1.ERROR_REASON.includes(errorReason)) {
            throw new Error(`Invalid value for errorReason, allowed are: ${constants_1.ERROR_REASON.join(', ')}`);
        }
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { errorReason, sticky }));
    }
    /**
     * Abort the request once with an error code
     * @param {string} errorReason  error code of the response
     */
    abortOnce(errorReason) {
        return this.abort(errorReason, false);
    }
}
exports.default = WebDriverInterception;
