"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRect_1 = __importDefault(require("../scripts/getElementRect"));
const utils_1 = require("../utils");
/**
 * The Get Element Rect command returns the dimensions and coordinates of the given web element.
 *
 * @alias browser.getElementRect
 * @see https://w3c.github.io/webdriver/#dfn-get-element-rect
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @return {string}           A JSON object representing the position and bounding rect of the element.
 */
async function getElementRect({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementRect_1.default, elementHandle);
}
exports.default = getElementRect;
