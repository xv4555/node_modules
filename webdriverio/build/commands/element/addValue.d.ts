export type CommandOptions = {
    translateToUnicode?: boolean;
};
export type Value = string | number;
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
export default function addValue(this: WebdriverIO.Element, value: Value | Value[], { translateToUnicode }?: CommandOptions): Promise<void>;
//# sourceMappingURL=addValue.d.ts.map