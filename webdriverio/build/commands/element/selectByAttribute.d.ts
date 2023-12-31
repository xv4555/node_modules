/**
 *
 * Select option with a specific value.
 *
 * <example>
    :example.html
    <select id="selectbox">
        <option value="someValue0">uno</option>
        <option value="someValue1">dos</option>
        <option value="someValue2">tres</option>
        <option value="someValue3">cuatro</option>
        <option value="someValue4">cinco</option>
        <option name="someName5" value="someValue5">seis</option>
    </select>
    :selectByAttribute.js
    it('Should demonstrate the selectByAttribute command', async () => {
        const selectBox = await $('#selectbox');
        const value = await selectBox.getValue();
        console.log(value); // returns "someValue0"

        await selectBox.selectByAttribute('value', 'someValue3');
        console.log(await selectBox.getValue()); // returns "someValue3"

        await selectBox.selectByAttribute('name', 'someName5');
        console.log(await selectBox.getValue()); // returns "someValue5"
    });
 * </example>
 *
 * @alias element.selectByAttribute
 * @param {String} attribute     attribute of option element to get selected
 * @param {String|Number} value  value of option element to get selected
 * @uses protocol/findElementFromElement, protocol/elementClick
 * @type action
 *
 */
export default function selectByAttribute(this: WebdriverIO.Element, attribute: string, value: string | number): Promise<void>;
//# sourceMappingURL=selectByAttribute.d.ts.map