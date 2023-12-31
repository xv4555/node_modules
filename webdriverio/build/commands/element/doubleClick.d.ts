/**
 *
 * Double-click on an element.
 *
 * <example>
    :example.html
    <button id="myButton" ondblclick="document.getElementById('someText').innerHTML='I was dblclicked'">Click me</button>
    <div id="someText">I was not clicked</div>
    :doubleClick.js
    it('should demonstrate the doubleClick command', async () => {
        const myButton = await $('#myButton')
        await myButton.doubleClick()

        const value = await myButton.getText()
        assert(value === 'I was dblclicked') // true
    })
 * </example>
 *
 * @alias element.doubleClick
 * @uses protocol/element, protocol/moveTo, protocol/doDoubleClick, protocol/touchDoubleClick
 * @type action
 *
 */
export default function doubleClick(this: WebdriverIO.Element): Promise<void>;
//# sourceMappingURL=doubleClick.d.ts.map