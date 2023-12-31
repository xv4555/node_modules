"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementTagName_1 = __importDefault(require("../scripts/getElementTagName"));
const utils_1 = require("../utils");
/**
 * The Get Element Tag Name command returns the qualified element name of the given web element.
 *
 * @alias browser.getElementTagName
 * @see https://w3c.github.io/webdriver/#dfn-get-element-tag-name
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @return {string}           The tagName attribute of the element.
 */
async function getElementTagName({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    const result = await page.$eval('html', getElementTagName_1.default, elementHandle);
    return (result || '').toLowerCase();
}
exports.default = getElementTagName;
