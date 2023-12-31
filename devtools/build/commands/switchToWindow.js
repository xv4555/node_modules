"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Switch To Window command is used to select the current top-level browsing context
 * for the current session, i.e. the one that will be used for processing commands.
 *
 * @alias browser.switchToWindow
 * @see https://w3c.github.io/webdriver/#dfn-switch-to-window
 * @param {string} handle  representing a window handle, should be one of the strings that was returned in a call to getWindowHandles
 */
async function switchToWindow({ handle }) {
    if (!this.windows.has(handle)) {
        throw new Error(`window with handle ${handle} not found`);
    }
    delete this.currentFrame;
    this.currentWindowHandle = handle;
    const page = this.getPageHandle();
    page.on('dialog', this.dialogHandler.bind(this));
    await page.bringToFront();
    return handle;
}
exports.default = switchToWindow;
