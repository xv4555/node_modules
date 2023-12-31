"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
/**
 * The Close Window command closes the current top-level browsing context.
 * Once done, if there are no more top-level browsing contexts open,
 * the WebDriver session itself is closed.
 *
 * @alias browser.closeWindow
 * @see https://w3c.github.io/webdriver/#dfn-close-window
 */
async function closeWindow() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.close();
    await (0, utils_1.sleep)(100);
    const handles = [...this.windows.keys()];
    this.currentWindowHandle = handles[handles.length - 1];
    if (!this.currentWindowHandle) {
        const page = await this.browser.newPage();
        const newWindowHandle = (0, uuid_1.v4)();
        this.windows.set(newWindowHandle, page);
        this.currentWindowHandle = newWindowHandle;
    }
    const newPage = this.getPageHandle();
    await newPage.bringToFront();
    return this.currentWindowHandle;
}
exports.default = closeWindow;
