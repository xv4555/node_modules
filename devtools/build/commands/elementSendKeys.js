"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wdio/utils");
const utils_2 = require("../utils");
/**
 * The Element Send Keys command scrolls into view the form control element and then sends
 * the provided keys to the element. In case the element is not keyboard-interactable,
 * an element not interactable error is returned. The key input state used for input
 * may be cleared mid-way through "typing" by sending the null key, which is U+E000 (NULL)
 *
 * @alias browser.elementSendKeys
 * @see https://w3c.github.io/webdriver/#dfn-element-send-keys
 * @param {string} elementId  the id of an element returned in a previous call to Find Element(s)
 * @param {string} text       string to send as keystrokes to the element
 */
async function elementSendKeys({ elementId, text }) {
    var _a, _b;
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw (0, utils_2.getStaleElementError)(elementId);
    }
    await elementHandle.focus();
    const page = this.getPageHandle();
    const propertyHandles = {
        tagName: await elementHandle.getProperty('tagName'),
        type: await elementHandle.getProperty('type')
    };
    const tagName = await ((_a = propertyHandles.tagName) === null || _a === void 0 ? void 0 : _a.jsonValue());
    const type = await ((_b = propertyHandles.type) === null || _b === void 0 ? void 0 : _b.jsonValue());
    let typeInput = [text];
    for (const [key, value] of Object.entries(utils_1.UNICODE_CHARACTERS)) {
        typeInput = typeInput.reduce((input, val) => [
            ...input,
            ...val.split(value).flatMap((value, index, array) => array.length - 1 !== index // check for the last item
                ? [value, key]
                : value)
        ], []);
    }
    if (tagName === 'INPUT' && type === 'file') {
        const paths = (text || '').split('\n').map(p => path_1.default.resolve(p));
        await elementHandle.uploadFile(...paths);
    }
    else {
        for (const input of typeInput) {
            utils_1.UNICODE_CHARACTERS[input]
                ? await page.keyboard.press(input)
                : await page.keyboard.type(input);
        }
    }
    return null;
}
exports.default = elementSendKeys;
