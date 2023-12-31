"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isElementDisplayed_1 = __importDefault(require("../../scripts/isElementDisplayed"));
const noW3CEndpoint = ['microsoftedge', 'msedge', 'safari', 'chrome', 'safari technology preview'];
/**
 *
 * Return true if the selected DOM-element is displayed.
 *
 * :::info
 *
 * As opposed to other element commands WebdriverIO will not wait for the element
 * to exist to execute this command.
 *
 * :::
 *
 * <example>
    :index.html
    <div id="notDisplayed" style="display: none"></div>
    <div id="notVisible" style="visibility: hidden"></div>
    <div id="notInViewport" style="position:absolute; left: 9999999"></div>
    <div id="zeroOpacity" style="opacity: 0"></div>
    :isDisplayed.js
    it('should detect if an element is displayed', async () => {
        let elem = await $('#notDisplayed');
        let isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notVisible');

        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notExisting');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notInViewport');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: true

        elem = await $('#zeroOpacity');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: true
    });
 * </example>
 *
 * @alias element.isDisplayed
 * @return {Boolean} true if element is displayed
 * @uses protocol/elements, protocol/elementIdDisplayed
 * @type state
 *
 */
async function isDisplayed() {
    var _a;
    const browser = (0, utils_1.getBrowserObject)(this);
    if (!await (0, utils_1.hasElementId)(this)) {
        return false;
    }
    /*
     * https://www.w3.org/TR/webdriver/#element-displayedness
     * Certain drivers have decided to remove the endpoint as the spec
     * no longer dictates it. In those instances, we pass the element through a script
     * that was provided by Brian Burg, maintainer of Safaridriver.
     *
     * 6th of May 2019 APPIUM response (mykola-mokhnach) :
     * - Appium didn't enable W3C mode for mobile drivers.
     * - Safari and Chrome work in jsonwp mode and Appium just rewrites W3C requests from upstream to jsonwp if needed
     */
    const useAtom = (await browser.isDevTools ||
        (await browser.isW3C &&
            !browser.isMobile &&
            noW3CEndpoint.includes((_a = browser.capabilities.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase())));
    return useAtom
        ? await browser.execute(isElementDisplayed_1.default, {
            [constants_1.ELEMENT_KEY]: this.elementId,
            ELEMENT: this.elementId // jsonwp compatible
        }) :
        await this.isElementDisplayed(this.elementId);
}
exports.default = isDisplayed;
