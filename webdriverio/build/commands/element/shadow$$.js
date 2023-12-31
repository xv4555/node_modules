"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shadowFnFactory_1 = require("../../scripts/shadowFnFactory");
/**
 *
 * Access elements inside a given element's shadowRoot. If you are working
 * with lots of nested shadow roots, an alternative approach to `shadow$$`
 * is to use the [deep selector](https://webdriver.io/docs/selectors#deep-selectors).
 *
 * <example>
    :shadow$$.js
    it('should return elements inside a shadowRoot', async () => {
        const innerEl = await $('.input').shadow$$('#innerEl');
        console.log(await innerEl.getValue()); // outputs: 'test123'
    });
 * </example>
 *
 * @alias element.shadow$$
 * @param {String|Function} selector  selector or JS Function to fetch a certain element
 * @return {ElementArray}
 * @type utility
 *
 */
async function shadowRoot(selector) {
    return await this.$$((0, shadowFnFactory_1.shadowFnFactory)(selector, true));
}
exports.default = shadowRoot;
