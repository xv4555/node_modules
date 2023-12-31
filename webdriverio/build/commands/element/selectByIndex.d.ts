/**
 *
 * Select option with a specific index.
 *
 * <example>
    :example.html
    <select id="selectbox">
        <option value="someValue0">uno</option>
        <option value="someValue1">dos</option>
        <option value="someValue2">tres</option>
        <option value="someValue3">cuatro</option>
        <option value="someValue4">cinco</option>
        <option value="someValue5">seis</option>
    </select>
    :selectByIndex.js
    it('Should demonstrate the selectByIndex command', async () => {
        const selectBox = await $('#selectbox');
        console.log(await selectBox.getValue()); // returns "someValue0"
        await selectBox.selectByIndex(4);
        console.log(await selectBox.getValue()); // returns "someValue4"
    });
 * </example>
 *
 * @alias element.selectByIndexs
 * @param {Number} index      option index
 * @uses protocol/findElementsFromElement, protocol/elementClick
 * @type action
 *
 */
export default function selectByIndex(this: WebdriverIO.Element, index: number): Promise<void>;
//# sourceMappingURL=selectByIndex.d.ts.map