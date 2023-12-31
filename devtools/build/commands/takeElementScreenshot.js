"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * The Take Element Screenshot command takes a screenshot of the visible region
 * encompassed by the bounding rectangle of an element.
 *
 * @alias browser.takeElementScreenshot
 * @see https://w3c.github.io/webdriver/#dfn-take-element-screenshot
 * @param {string} elementId the id of an element returned in a previous call to Find Element(s)
 * @return {string}          The base64-encoded PNG image data comprising the screenshot of the visible region of an element’s bounding rectangle after it has been scrolled into view.
 */
async function takeElementScreenshot({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    return elementHandle.screenshot({
        encoding: 'base64',
        type: 'png'
    });
}
exports.default = takeElementScreenshot;
