"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Get Timeouts command gets timeout durations associated with the current session.
 *
 * @alias browser.getTimeouts
 * @see https://w3c.github.io/webdriver/#dfn-get-timeouts
 * @return {Object}  Object containing timeout durations for `script`, `pageLoad` and `implicit` timeouts.
 */
function getTimeouts() {
    return {
        implicit: this.timeouts.get('implicit'),
        pageLoad: this.timeouts.get('pageLoad'),
        script: this.timeouts.get('script')
    };
}
exports.default = getTimeouts;
