interface BrowserSize {
    width: number;
    height: number;
}
/**
 *
 * Returns browser window size.
 *
 * <example>
    :getWindowSize.js
    it('should return browser window size', async () => {
        const windowSize = await browser.getWindowSize();
        console.log(windowSize);
        // outputs `{ width: 1280, height: 767 }`
    });
 * </example>
 *
 * @alias browser.getWindowSize
 * @return {Object} { x, y, width, height } for W3C or { width, height } for non W3C browser
 * @type window
 *
 */
export default function getWindowSize(this: WebdriverIO.Browser): Promise<BrowserSize>;
export {};
//# sourceMappingURL=getWindowSize.d.ts.map