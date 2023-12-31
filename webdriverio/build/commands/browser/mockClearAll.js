"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const mock_1 = require("./mock");
const log = (0, logger_1.default)('webdriverio:mockClearAll');
/**
 * Resets all information stored in all registered mocks of the session.
 *
 * <example>
    :mockClearAll.js
    it('should clear all mocks', async () => {
        const docMock = await browser.mock('**', {
            headers: { 'Content-Type': 'text/html' }
        })
        const jsMock = await browser.mock('**', {
            headers: { 'Content-Type': 'application/javascript' }
        })

        await browser.url('http://guinea-pig.webdriver.io/')
        console.log(docMock.calls.length, jsMock.calls.length) // returns "1 4"

        await browser.url('http://guinea-pig.webdriver.io/')
        console.log(docMock.calls.length, jsMock.calls.length) // returns "2 4" (JavaScript comes from cache)

        await browser.mockClearAll()
        console.log(docMock.calls.length, jsMock.calls.length) // returns "0 0"
    })
 * </example>
 *
 * @alias browser.mockClearAll
 */
async function mockClearAll() {
    for (const [handle, mocks] of Object.entries(mock_1.SESSION_MOCKS)) {
        log.trace(`Clearing mocks for ${handle}`);
        for (const mock of mocks) {
            mock.clear();
        }
    }
}
exports.default = mockClearAll;
