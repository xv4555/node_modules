/**
 *
 * Access an element inside a given element's shadowRoot. If you are working
 * with lots of nested shadow roots, an alternative approach to `shadow$` is
 * to use the [deep selector](https://webdriver.io/docs/selectors#deep-selectors).
 *
 * <example>
    :shadow$$.js
    it('should return an element inside a shadowRoot', async () => {
        const innerEl = await $('.input').shadow$('#innerEl');
        console.log(await innerEl.getValue()); // outputs: 'test123'
    });
 * </example>
 *
 * @alias element.shadow$
 * @param {String|Function} selector  selector or JS Function to fetch a certain element
 * @return {Element}
 * @type utility
 *
 */
export default function shadowRoot(this: WebdriverIO.Element, selector: string): Promise<WebdriverIO.Element>;
//# sourceMappingURL=shadow$.d.ts.map