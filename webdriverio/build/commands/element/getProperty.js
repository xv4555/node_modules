"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getProperty_1 = __importDefault(require("../../scripts/getProperty"));
/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * <example>
    :getProperty.js
    it('should demonstrate the getProperty command', async () => {
        var elem = await $('body')
        var tag = await elem.getProperty('tagName')
        console.log(tag) // outputs: "BODY"
    })
 * </example>
 *
 * @alias element.getProperty
 * @param {String} property  name of the element property
 * @return {Object|String|Boolean|Number|null} the value of the property of the selected element
 */
function getProperty(property) {
    if (this.isW3C) {
        return this.getElementProperty(this.elementId, property);
    }
    const browser = (0, utils_1.getBrowserObject)(this);
    return browser.execute(getProperty_1.default, { ELEMENT: this.elementId }, property);
}
exports.default = getProperty;
