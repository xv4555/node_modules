"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * opens new window via window.open
 * @param  {String} url            The URL to be loaded in the newly opened window.
 * @param  {String} windowName     A string name for the new window.
 * @param  {String} windowFeatures An optional parameter listing the features (size, position, scrollbars, etc.) of the new window as a string.
 *
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window.open
 */
function newWindow(url, windowName, windowFeatures) {
    window.open(url, windowName || '', windowFeatures || '');
}
exports.default = newWindow;
