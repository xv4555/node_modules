"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 *
 * Determine an element’s location on the page. The point (0, 0) refers to
 * the upper-left corner of the page.
 *
 * <example>
    :getLocation.js
    it('should demonstrate the getLocation function', async () => {
        await browser.url('http://github.com');
        const logo = await $('.octicon-mark-github')
        const location = await logo.getLocation();
        console.log(location); // outputs: { x: 150, y: 20 }

        const xLocation = await logo.getLocation('x')
        console.log(xLocation); // outputs: 150

        const yLocation = await logo.getLocation('y')
        console.log(yLocation); // outputs: 20
    });
 * </example>
 *
 * @alias element.getLocation
 * @param {String} prop    can be "x" or "y" to get a result value directly for easier assertions
 * @return {Object|Number}  The X and Y coordinates for the element on the page (`{x:number, y:number}`)
 * @uses protocol/elementIdLocation
 * @type property
 */
async function getLocation(prop) {
    let location = {};
    if (this.isW3C) {
        location = await (0, utils_1.getElementRect)(this);
        delete location.width;
        delete location.height;
    }
    else {
        location = await this.getElementLocation(this.elementId);
    }
    if (prop === 'x' || prop === 'y') {
        return location[prop];
    }
    return location;
}
exports.default = getLocation;
