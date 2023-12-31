"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * @alias browser.getElementProperty
 * @see https://w3c.github.io/webdriver/#dfn-get-element-property
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @param {string} name       name of the attribute property to retrieve
 * @return {string}           The named property of the element, accessed by calling GetOwnProperty on the element object.
 */
async function getElementProperty({ elementId, name }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_1.getStaleElementError)(elementId);
    }
    const jsHandle = await elementHandle.getProperty(name);
    if (!jsHandle) {
        return null;
    }
    return jsHandle.jsonValue();
}
exports.default = getElementProperty;
