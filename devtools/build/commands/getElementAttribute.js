"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementAttribute_1 = __importDefault(require("../scripts/getElementAttribute"));
const utils_1 = require("../utils");
/**
 * The Get Element Attribute command will return the attribute of a web element.
 *
 * @alias browser.getElementAttribute
 * @see https://w3c.github.io/webdriver/#dfn-get-element-attribute
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @param {string} name       name of the attribute value to retrieve
 * @return {string}           The named attribute of the element.
 */
async function getElementAttribute({ elementId, name }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementAttribute_1.default, elementHandle, name);
}
exports.default = getElementAttribute;
