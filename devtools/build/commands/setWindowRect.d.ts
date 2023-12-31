import type DevToolsDriver from '../devtoolsdriver';
/**
 * The Set Window Rect command alters the size and the position of the operating system window
 * corresponding to the current top-level browsing context.
 *
 * @alias browser.setWindowRect
 * @see https://w3c.github.io/webdriver/#dfn-set-window-rect
 * @param {number} x       the screenX attribute of the window object
 * @param {number} y       the screenY attribute of the window object
 * @param {number} width   the width of the outer dimensions of the top-level browsing context, including browser chrome etc...
 * @param {number} height  the height of the outer dimensions of the top-level browsing context, including browser chrome etc...
 * @return {object}        A JSON representation of a "window rect" object based on the new window state.
 */
export default function setWindowRect(this: DevToolsDriver, params: {
    width: number;
    height: number;
}): Promise<{
    width: number;
    height: number;
}>;
//# sourceMappingURL=setWindowRect.d.ts.map