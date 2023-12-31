/**
 *
 * Resizes browser window outer size according to provided width and height.
 *
 * <example>
 * :setWindowSize.js
    it('should re-size browser outer window with 500 width and 600 height', async () => {
        await browser.setWindowSize(500, 600);
    });
 * </example>
 *
 * @alias browser.setWindowSize
 * @param {Number} width browser will be resized to provided width
 * @param {Number} height browser will be resized to provided height
 * @return {Null|Object} Null for *NO*W3C browser and Object{x, y, width, height} for W3C browser
 * @type window
 *
 */
export default function setWindowSize(this: WebdriverIO.Browser, width: number, height: number): Promise<void>;
//# sourceMappingURL=setWindowSize.d.ts.map