"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const constants_1 = require("../../constants");
/**
 *
 * The `custom$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`
 *
 * <example>
    :example.js
    it('should fetch the project title', async () => {
        await browser.url('https://webdriver.io')
        browser.addLocatorStrategy('myStrat', (selector) => {
            return document.querySelectorAll(selector)
        })

        const projectTitle = await browser.custom$('myStrat', '.projectTitle')

        console.log(await projectTitle.getText()) // WEBDRIVER I/O
    })
 * </example>
 *
 * @alias custom$
 * @param {String} strategyName
 * @param {Any} strategyArguments
 * @return {Element}
 */
async function custom$(strategyName, ...strategyArguments) {
    const strategy = this.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    const strategyRef = { strategy, strategyName, strategyArguments };
    let res = await this.execute(strategy, ...strategyArguments);
    /**
     * if the user's script returns multiple elements
     * then we just return the first one as this method
     * is intended to return just one element
     */
    if (Array.isArray(res)) {
        res = res[0];
    }
    if (res && typeof res[constants_1.ELEMENT_KEY] === 'string') {
        return await getElementObject_1.getElement.call(this, strategyRef, res);
    }
    throw Error('Your locator strategy script must return an element');
}
exports.default = custom$;
