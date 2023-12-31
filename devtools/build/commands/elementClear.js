"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elementClear_1 = __importDefault(require("../scripts/elementClear"));
const utils_1 = require("../utils");
/**
 * The Element Clear command scrolls into view an editable or resettable element and then attempts
 * to clear its selected files or text content.
 *
 * @alias browser.elementClear
 * @see https://w3c.github.io/webdriver/#dfn-element-clear
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 */
async function elementClear({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    await page.$eval('html', elementClear_1.default, elementHandle);
    return null;
}
exports.default = elementClear;
