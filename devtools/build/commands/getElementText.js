"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementText_1 = __importDefault(require("../scripts/getElementText"));
const utils_1 = require("../utils");
/**
 * The Get Element Text command intends to return an element’s text \"as rendered\".
 * An element's rendered text is also used for locating a elements
 * by their link text and partial link text.
 *
 * @alias browser.getElementText
 * @see https://w3c.github.io/webdriver/#dfn-get-element-text
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @return {string}           The visible text of the element (including child elements).
 */
async function getElementText({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementText_1.default, elementHandle);
}
exports.default = getElementText;
