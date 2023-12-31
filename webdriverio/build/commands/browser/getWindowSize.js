"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 *
 * Returns browser window size.
 *
 * <example>
    :getWindowSize.js
    it('should return browser window size', async () => {
        const windowSize = await browser.getWindowSize();
        console.log(windowSize);
        // outputs `{ width: 1280, height: 767 }`
    });
 * </example>
 *
 * @alias browser.getWindowSize
 * @return {Object} { x, y, width, height } for W3C or { width, height } for non W3C browser
 * @type window
 *
 */
async function getWindowSize() {
    const browser = (0, utils_1.getBrowserObject)(this);
    if (!browser.isW3C) {
        return browser._getWindowSize();
    }
    const { width, height } = await browser.getWindowRect();
    return { width, height };
}
exports.default = getWindowSize;
