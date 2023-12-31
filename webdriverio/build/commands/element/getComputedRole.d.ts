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
export default function getComputedRole(this: WebdriverIO.Element): Promise<string>;
//# sourceMappingURL=getComputedRole.d.ts.map