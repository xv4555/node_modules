"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Send Alert Text command sets the text field of a window.prompt user prompt to the given value.
 *
 * @alias browser.sendAlertText
 * @see https://w3c.github.io/webdriver/#dfn-send-alert-text
 * @param {string} text  string to set the prompt to
 */
async function sendAlertText({ text }) {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.accept(text);
    delete this.activeDialog;
    return null;
}
exports.default = sendAlertText;
