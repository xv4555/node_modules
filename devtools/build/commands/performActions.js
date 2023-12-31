"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const USKeyboardLayout_1 = require("puppeteer-core/lib/cjs/puppeteer/common/USKeyboardLayout");
const getElementRect_1 = __importDefault(require("./getElementRect"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const KEY = 'key';
const POINTER = 'pointer';
/**
 * The Perform Actions command is used to execute complex user actions.
 * See [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) for more details.
 *
 * @alias browser.performActions
 * @see https://w3c.github.io/webdriver/#dfn-perform-actions
 * @param {object[]} actions  A list of objects, each of which represents an input source and its associated actions.
 */
async function performActions({ actions }) {
    const page = this.getPageHandle();
    const lastPointer = {};
    /**
     * see https://github.com/jlipps/simple-wd-spec#input-sources-and-corresponding-actions
     * for details on the `actions` format
     */
    for (const action of actions) {
        if (action.type === null || action.type === 'null') {
            for (const singleAction of action.actions) {
                await (0, utils_1.sleep)(singleAction.duration);
            }
            continue;
        }
        if (action.type === 'key') {
            const skipChars = [];
            for (const singleAction of action.actions) {
                if (singleAction.type === 'pause') {
                    await (0, utils_1.sleep)(singleAction.duration);
                    continue;
                }
                const cmd = singleAction.type.slice(KEY.length).toLowerCase();
                const keyboardFn = page.keyboard[cmd].bind(page.keyboard);
                /**
                 * skip up event as we had to use sendCharacter for non unicode
                 * characters which includes the up event already
                 */
                if (cmd === 'up' && skipChars[0] === singleAction.value) {
                    skipChars.shift();
                    continue;
                }
                /**
                 * for special characters like emojis 😉 we need to
                 * send in the value as text because it is not unicode
                 */
                if (!USKeyboardLayout_1.keyDefinitions[singleAction.value]) {
                    await page.keyboard.sendCharacter(singleAction.value);
                    skipChars.push(singleAction.value);
                    continue;
                }
                await keyboardFn(singleAction.value);
                continue;
            }
            continue;
        }
        if (action.type === 'pointer') {
            if (action.parameters && action.parameters.pointerType && action.parameters.pointerType !== 'mouse') {
                throw new Error('Currently only "mouse" is supported as pointer type');
            }
            /**
             * detect double click
             */
            if (action.actions.length === 6 &&
                action.actions[0].type === 'pointerMove' &&
                action.actions[1].type === 'pointerDown' &&
                action.actions[2].type === 'pointerUp' &&
                action.actions[3].type === 'pause' &&
                action.actions[4].type === 'pointerDown' &&
                action.actions[5].type === 'pointerUp') {
                let x = action.actions[0].x || 0;
                let y = action.actions[0].y || 0;
                if (action.actions[0].origin) {
                    const location = await getElementRect_1.default.call(this, { elementId: action.actions[0].origin[constants_1.ELEMENT_KEY] });
                    x += location.x + (location.width / 2);
                    y += location.y + (location.height / 2);
                }
                await page.mouse.click(x, y, { clickCount: 2 });
                continue;
            }
            for (const singleAction of action.actions) {
                if (singleAction.type === 'pause') {
                    await (0, utils_1.sleep)(singleAction.duration);
                    continue;
                }
                const cmd = singleAction.type.slice(POINTER.length).toLowerCase();
                const keyboardFn = page.mouse[cmd].bind(page.mouse);
                let { x, y, duration, button, origin } = singleAction;
                if (cmd === 'move') {
                    /**
                     * set location relative from last position if origin is set to pointer
                     */
                    if (typeof x === 'number' &&
                        typeof y === 'number' &&
                        origin === 'pointer' &&
                        lastPointer.x && lastPointer.y) {
                        x += lastPointer.x;
                        y += lastPointer.y;
                    }
                    /**
                     * set location relative from an element
                     */
                    if (origin && typeof origin[constants_1.ELEMENT_KEY] === 'string' && typeof x === 'number' && typeof y === 'number') {
                        const elemRect = await getElementRect_1.default.call(this, { elementId: origin[constants_1.ELEMENT_KEY] });
                        x += elemRect.x + (elemRect.width / 2);
                        y += elemRect.y + (elemRect.height / 2);
                    }
                    lastPointer.x = x;
                    lastPointer.y = y;
                    await keyboardFn(x, y, { steps: 10 });
                    continue;
                }
                else {
                    /**
                     * "left" is default button
                     * "1": middle, "2": right
                     */
                    const pptrButton = (button === 1 ? 'middle' : (button === 2 ? 'right' : 'left'));
                    await keyboardFn({ button: pptrButton });
                }
                if (duration) {
                    await (0, utils_1.sleep)(duration);
                }
                continue;
            }
            continue;
        }
        throw new Error(`Unknown action type ("${action.type}"), allowed are only: null, key and pointer`);
    }
}
exports.default = performActions;
