"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
/**
 * The Switch To Frame command is used to select the current top-level browsing context
 * or a child browsing context of the current browsing context to use as the current
 * browsing context for subsequent commands.
 *
 * @alias browser.switchToFrame
 * @see https://w3c.github.io/webdriver/#dfn-switch-to-frame
 * @param {string|object|null} id  one of three possible types: null: this represents the top-level browsing context (i.e., not an iframe), a Number, representing the index of the window object corresponding to a frame, an Element object received using `findElement`.
 */
async function switchToFrame({ id }) {
    const page = this.getPageHandle(true);
    /**
     * switch to parent frame
     */
    if (id === null) {
        /**
         * if we are already in the parent frame, don't do anything
         */
        if (typeof page.parentFrame !== 'function') {
            return { id: null };
        }
        let parentFrame = await page.parentFrame();
        while (parentFrame) {
            parentFrame = await parentFrame.parentFrame();
        }
        this.currentFrame = parentFrame;
        return { id: null };
    }
    /**
     * switch frame by element ID
     */
    const idAsElementReference = id;
    if (typeof idAsElementReference[constants_1.ELEMENT_KEY] === 'string') {
        const elementHandle = await this.elementStore.get(idAsElementReference[constants_1.ELEMENT_KEY]);
        if (!elementHandle) {
            throw (0, utils_1.getStaleElementError)(id);
        }
        const contentFrame = await elementHandle.contentFrame();
        if (!contentFrame) {
            throw new Error('no such frame');
        }
        this.currentFrame = contentFrame;
        return { id: idAsElementReference[constants_1.ELEMENT_KEY] };
    }
    /**
     * switch frame by number
     */
    if (typeof id === 'number') {
        /**
         * `page` has `frames` method while `frame` has `childFrames` method
         */
        let getFrames = page.frames || page.childFrames;
        const childFrames = await getFrames.apply(page);
        const childFrame = childFrames[id];
        if (!childFrame) {
            throw new Error('no such frame');
        }
        this.currentFrame = childFrame;
        return { id: childFrame._id };
    }
    throw new Error(`Could not switch frame, unknown id: ${id}`);
}
exports.default = switchToFrame;
