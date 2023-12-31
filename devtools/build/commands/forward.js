"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Forward command causes the browser to traverse one step forwards
 * in the joint session history of the current top-level browsing context.
 *
 * @alias browser.forward
 * @see https://w3c.github.io/webdriver/#dfn-forward
 */
async function forward() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goForward();
    return null;
}
exports.default = forward;
