"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Delete All Cookies command allows deletion of all cookies
 * associated with the active document's address.
 *
 * @alias browser.deleteAllCookies
 * @see https://w3c.github.io/webdriver/#dfn-delete-all-cookies
 */
async function deleteAllCookies() {
    const page = this.getPageHandle();
    const cookies = await page.cookies();
    for (const cookie of cookies) {
        await page.deleteCookie(cookie);
    }
    return null;
}
exports.default = deleteAllCookies;
