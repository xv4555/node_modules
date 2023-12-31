"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Accept Alert command accepts a simple dialog if present, otherwise error.
 *
 * @alias browser.acceptAlert
 * @see https://w3c.github.io/webdriver/#dfn-accept-alert
 */
async function acceptAlert() {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.accept(this.activeDialog.defaultValue());
    delete this.activeDialog;
    return null;
}
exports.default = acceptAlert;
