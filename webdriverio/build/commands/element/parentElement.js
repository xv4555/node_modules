"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Returns the parent element of the selected DOM-element.
 *
 * <example>
    :index.html
    <div class="parent">
        <p>Sibling One</p>
        <p>Sibling Two</p>
        <p>Sibling Three</p>
    </div>
    :parentElement.js
    it('should get class from parent element', async () => {
        const elem = await $$('p');
        const parent = await elem[2].parentElement()
        console.log(await parent.getAttribute('class')); // outputs: "parent"
    });
 * </example>
 *
 * @alias element.parentElement
 * @return {Element}
 * @type utility
 */
function parentElement() {
    return this.$(/* istanbul ignore next */ function () {
        return this.parentElement;
    });
}
exports.default = parentElement;
