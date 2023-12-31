"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isFocused_1 = __importDefault(require("../../scripts/isFocused"));
/**
 *
 * Return true or false if the selected DOM-element currently has focus. If the selector matches
 * multiple elements, it will return true if one of the elements has focus.
 *
 * <example>
    :index.html
    <input name="login" autofocus="" />
    :hasFocus.js
    it('should detect the focus of an element', async () => {
        await browser.url('/');
        const loginInput = await $('[name="login"]');
        console.log(await loginInput.isFocused()); // outputs: false

        await loginInput.click();
        console.log(await loginInput.isFocused()); // outputs: true
    })
 * </example>
 *
 * @alias element.isFocused
 * @return {Boolean}         true if one of the matching elements has focus
 *
 * @uses protocol/execute
 * @type state
 *
 */
async function isFocused() {
    const browser = await (0, utils_1.getBrowserObject)(this);
    return browser.execute(isFocused_1.default, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId // jsonwp compatible
    });
}
exports.default = isFocused;
