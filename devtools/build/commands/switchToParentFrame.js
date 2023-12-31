"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Switch to Parent Frame command sets the current browsing context for future commands
 * to the parent of the current browsing context.
 *
 * @alias browser.switchToParentFrame
 * @see https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame
 */
async function switchToParentFrame() {
    const page = this.getPageHandle(true);
    /**
     * check if we can access child frames, if now we are already in the
     * parent browsing context
     */
    if (typeof page.parentFrame !== 'function') {
        return null;
    }
    /**
     * ToDo(Christian): investigate why we interchangeably use Page and Frames here
     */
    this.currentFrame = await page.parentFrame();
    return null;
}
exports.default = switchToParentFrame;
