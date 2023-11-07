"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Get the computed WAI-ARIA label of an element.
 *
 * <example>
    :getComputedRole.js
    it('should demonstrate the getComputedRole command', async () => {
        await browser.url('https://www.google.com/ncr')
        const elem = await $('*[name="q"]');
        console.log(await elem.getComputedRole()); // outputs: "combobox"
    })
 * </example>
 *
 * @alias element.getComputedRole
 * @return {String} the computed WAI-ARIA label
 * @type property
 *
 */
function getComputedRole() {
    return this.getElementComputedRole(this.elementId);
}
exports.default = getComputedRole;
