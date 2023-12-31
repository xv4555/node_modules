"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const logger_1 = __importDefault(require("@wdio/logger"));
const log = (0, logger_1.default)('addValue');
const isNumberOrString = (input) => typeof input === 'string' || typeof input === 'number';
const isValidType = (value) => (isNumberOrString(value) ||
    Array.isArray(value) && value.every((item) => isNumberOrString(item)));
/**
 *
 * Add a value to an object found by given selector. You can also use unicode
 * characters like Left arrow or Back space. WebdriverIO will take care of
 * translating them into unicode characters. You’ll find all supported characters
 * [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions).
 * To do that, the value has to correspond to a key from the table. It can be disabled
 * by setting `translateToUnicode` optional parameter to false.
 *
 * <example>
    :addValue.js
    it('should demonstrate the addValue command', async () => {
        let input = await $('.input')
        await input.addValue('test')
        await input.addValue(123)

        value = await input.getValue()
        assert(value === 'test123') // true
    })
 * </example>
 *
 * @alias element.addValue
 * @param {string | number | Array<string | number>}        value                       value to be added
 * @param {CommandOptions=}                                 options                     command options (optional)
 * @param {boolean}                                         options.translateToUnicode  enable translation string to unicode value automatically
 *
 */
function addValue(value, { translateToUnicode = true } = {}) {
    if (!isValidType(value)) {
        log.warn('@deprecated: support for type "string", "number" or "Array<string | number>" is deprecated');
    }
    if (!this.isW3C) {
        return this.elementSendKeys(this.elementId, (0, utils_1.transformToCharString)(value, translateToUnicode));
    }
    return this.elementSendKeys(this.elementId, (0, utils_1.transformToCharString)(value, translateToUnicode).join(''));
}
exports.default = addValue;
