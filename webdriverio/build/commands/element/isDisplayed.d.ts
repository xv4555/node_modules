/**
 *
 * Return true if the selected DOM-element is displayed.
 *
 * :::info
 *
 * As opposed to other element commands WebdriverIO will not wait for the element
 * to exist to execute this command.
 *
 * :::
 *
 * <example>
    :index.html
    <div id="notDisplayed" style="display: none"></div>
    <div id="notVisible" style="visibility: hidden"></div>
    <div id="notInViewport" style="position:absolute; left: 9999999"></div>
    <div id="zeroOpacity" style="opacity: 0"></div>
    :isDisplayed.js
    it('should detect if an element is displayed', async () => {
        let elem = await $('#notDisplayed');
        let isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notVisible');

        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notExisting');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notInViewport');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: true

        elem = await $('#zeroOpacity');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: true
    });
 * </example>
 *
 * @alias element.isDisplayed
 * @return {Boolean} true if element is displayed
 * @uses protocol/elements, protocol/elementIdDisplayed
 * @type state
 *
 */
export default function isDisplayed(this: WebdriverIO.Element): Promise<boolean>;
//# sourceMappingURL=isDisplayed.d.ts.map