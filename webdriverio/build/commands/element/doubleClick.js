"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
async function doubleClick() {
    /**
     * move to element
     */
    if (!this.isW3C) {
        await this.moveTo();
        return this.positionDoubleClick();
    }
    /**
     * W3C way of handle the double click actions
     */
    return this.performActions([{
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', origin: this, x: 0, y: 0 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
                { type: 'pause', duration: 10 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
}
exports.default = doubleClick;
