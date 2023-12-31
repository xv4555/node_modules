"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementCSSValue_1 = __importDefault(require("../scripts/getElementCSSValue"));
const utils_1 = require("../utils");
/**
 * The Get Element CSS Value command retrieves the computed value
 * of the given CSS property of the given web element.
 *
 * @alias browser.getElementCSSValue
 * @see https://w3c.github.io/webdriver/#dfn-get-element-css-value
 * @param {string} elementId     the id of an element returned in a previous call to Find Element(s)
 * @param {string} propertyName  name of the CSS property to retrieve
 * @return {string}              The computed value of the parameter corresponding to property name from the element's style declarations (unless the document type is xml, in which case the return value is simply the empty string).
 */
async function getElementCSSValue({ elementId, propertyName }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementCSSValue_1.default, elementHandle, propertyName);
}
exports.default = getElementCSSValue;
