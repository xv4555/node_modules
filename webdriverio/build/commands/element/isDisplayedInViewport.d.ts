/**
 *
 * Return true if the selected DOM-element found by given selector is partially visible and within the viewport.
 *
 * <example>
    :index.html
    <div id="notDisplayed" style="display: none"></div>
    <div id="notVisible" style="visibility: hidden"></div>
    <div id="notInViewport" style="position:absolute; left: 9999999"></div>
    <div id="zeroOpacity" style="opacity: 0"></div>
    :isDisplayedInViewport.js
    :isDisplayed.js
    it('should detect if an element is visible', async () => {
        let isDisplayedInViewport = await $('#notDisplayed').isDisplayedInViewport();
        console.log(isDisplayedInViewport); // outputs: false

        isDisplayedInViewport = await $('#notVisible').isDisplayedInViewport();
        console.log(isDisplayedInViewport); // outputs: false

        isDisplayedInViewport = await $('#notExisting').isDisplayedInViewport();
        console.log(isDisplayedInViewport); // outputs: false

        isDisplayedInViewport = await $('#notInViewport').isDisplayedInViewport();
        console.log(isDisplayedInViewport); // outputs: false

        isDisplayedInViewport = await $('#zeroOpacity').isDisplayedInViewport();
        console.log(isDisplayedInViewport); // outputs: false
    });
 * </example>
 *
 * @alias element.isDisplayedInViewport
 * @return {Boolean}            true if element(s)* [is|are] displayed
 * @uses protocol/selectorExecute, protocol/timeoutsAsyncScript
 * @type state
 *
 */
export default function isDisplayedInViewport(this: WebdriverIO.Element): Promise<boolean>;
//# sourceMappingURL=isDisplayedInViewport.d.ts.map