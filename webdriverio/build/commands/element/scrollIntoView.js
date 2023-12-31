"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
/**
 *
 * Scroll element into viewport ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)).
 *
 * <example>
    :scrollIntoView.js
    it('should demonstrate the scrollIntoView command', async () => {
        const elem = await $('#myElement');
        // scroll to specific element
        await elem.scrollIntoView();
    });
 * </example>
 *
 * @alias element.scrollIntoView
 * @param {object|boolean=} scrollIntoViewOptions  options for `Element.scrollIntoView()` (default: `true`)
 * @uses protocol/execute
 * @type utility
 *
 */
function scrollIntoView(scrollIntoViewOptions = true) {
    return this.parent.execute(/* istanbul ignore next */ function (elem, options) {
        elem.scrollIntoView(options);
    }, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId // jsonwp compatible
    }, scrollIntoViewOptions);
}
exports.default = scrollIntoView;
