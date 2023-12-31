"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const mock_1 = require("./mock");
const log = (0, logger_1.default)('webdriverio:mockRestoreAll');
/**
 * Restores all mock information and behavior stored in all registered
 * mocks of the session.
 *
 * <example>
    :mockRestoreAll.js
    it('should restore all mocks', async () => {
        const googleMock = await browser.mock('https://google.com/')
        googleMock.respond('https://webdriver.io')
        const wdioMock = await browser.mock('https://webdriver.io')
        wdioMock.respond('http://json.org')

        await browser.url('https://google.com/')
        console.log(await browser.getTitle()) // JSON

        await browser.mockRestoreAll()

        await browser.url('https://google.com/')
        console.log(await browser.getTitle()) // Google
    })
 * </example>
 *
 * @alias browser.mockRestoreAll
 */
async function mockRestoreAll() {
    for (const [handle, mocks] of Object.entries(mock_1.SESSION_MOCKS)) {
        log.trace(`Clearing mocks for ${handle}`);
        for (const mock of mocks) {
            mock.restore();
        }
    }
}
exports.default = mockRestoreAll;
