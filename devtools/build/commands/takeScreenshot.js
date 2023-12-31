"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Take Screenshot command takes a screenshot of the top-level browsing context's viewport.
 *
 * @alias browser.takeScreenshot
 * @see https://w3c.github.io/webdriver/#dfn-take-screenshot
 * @return {string} The base64-encoded PNG image data comprising the screenshot of the initial viewport.
 */
async function takeScreenshot() {
    const page = this.getPageHandle();
    return page.screenshot({
        encoding: 'base64',
        fullPage: false,
        type: 'png'
    });
}
exports.default = takeScreenshot;
