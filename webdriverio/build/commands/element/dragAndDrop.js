"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const ACTION_BUTTON = 0;
const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));
/**
 *
 * Drag an item to a destination element or position.
 *
 * :::info
 *
 * The functionality of this command highly depends on the way drag and drop is
 * implemented in your app. If you experience issues please post your example
 * in [#4134](https://github.com/webdriverio/webdriverio/issues/4134).
 *
 * :::
 *
 * <example>
    :example.test.js
    it('should demonstrate the dragAndDrop command', async () => {
        const elem = await $('#someElem')
        const target = await $('#someTarget')

        // drag and drop to other element
        await elem.dragAndDrop(target)

        // drag and drop relative from current position
        await elem.dragAndDrop({ x: 100, y: 200 })
    })
 * </example>
 *
 * @alias element.dragAndDrop
 * @param {Element|DragAndDropCoordinate} target  destination element or object with x and y properties
 * @param {DragAndDropOptions=} options           dragAndDrop command options
 * @param {Number=}             options.duration  how long the drag should take place
 */
async function dragAndDrop(target, { duration = 10 } = {}) {
    const moveToCoordinates = target;
    const moveToElement = target;
    /**
     * fail if
     */
    if (
    /**
     * no target was specified
     */
    !target ||
        (
        /**
         * target is not from type element
         */
        target.constructor.name !== 'Element' &&
            /**
             * and is also not an object with x and y number parameters
             */
            (typeof moveToCoordinates.x !== 'number' ||
                typeof moveToCoordinates.y !== 'number'))) {
        throw new Error('command dragAndDrop requires an WebdriverIO Element or and object with "x" and "y" variables as first parameter');
    }
    /**
     * allow to specify an element or an x/y vector
     */
    const isMovingToElement = target.constructor.name === 'Element';
    if (!this.isW3C) {
        await this.moveTo();
        await this.buttonDown(ACTION_BUTTON);
        if (isMovingToElement) {
            await moveToElement.moveTo();
        }
        else {
            await this.moveToElement(null, moveToCoordinates.x, moveToCoordinates.y);
        }
        await sleep(duration);
        return this.buttonUp(ACTION_BUTTON);
    }
    const sourceRef = { [constants_1.ELEMENT_KEY]: this[constants_1.ELEMENT_KEY] };
    const targetRef = { [constants_1.ELEMENT_KEY]: moveToElement[constants_1.ELEMENT_KEY] };
    const origin = sourceRef;
    const targetOrigin = isMovingToElement ? targetRef : 'pointer';
    const targetX = isMovingToElement ? 0 : moveToCoordinates.x;
    const targetY = isMovingToElement ? 0 : moveToCoordinates.y;
    /**
     * W3C way of handle the drag and drop action
     */
    return this.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, origin, x: 0, y: 0 },
                { type: 'pointerDown', button: ACTION_BUTTON },
                { type: 'pause', duration: 10 },
                { type: 'pointerMove', duration, origin: targetOrigin, x: targetX, y: targetY },
                { type: 'pointerUp', button: ACTION_BUTTON }
            ]
        }]).then(() => this.releaseActions());
}
exports.default = dragAndDrop;
