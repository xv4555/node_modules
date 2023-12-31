"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getElementObject_1 = require("../../utils/getElementObject");
const resq_1 = require("../../scripts/resq");
const resqScript = fs_1.default.readFileSync(require.resolve('resq'));
/**
 *
 * The `react$` command is a useful command to query React Components by their
 * actual name and filter them by props and state.
 *
 * :::info
 *
 * The command only works with applications using React v16.x. Read more about React
 * selectors in the [Selectors](/docs/selectors#react-selectors) guide.
 *
 * :::
 *
 * <example>
    :pause.js
    it('should calculate 7 * 6', async () => {
        await browser.url('https://ahfarmer.github.io/calculator/');
        const appWrapper = await browser.$('div#root')

        await browser.react$('t', {
            props: { name: '7' }
        }).click()
        await browser.react$('t', {
            props: { name: 'x' }
        }).click()
        await browser.react$('t', {
            props: { name: '6' }
        }).click()
        await browser.react$('t', {
            props: { name: '=' }
        }).click()

        console.log(await $('.component-display').getText()); // prints "42"
    });
 * </example>
 *
 * @alias react$
 * @param {String}  selector        of React component
 * @param {ReactSelectorOptions=}                    options         React selector options
 * @param {Object=}                                  options.props   React props the element should contain
 * @param {Array<any>|number|string|object|boolean=} options.state  React state the element should be in
 * @return {Element}
 *
 */
async function react$(selector, { props = {}, state = {} } = {}) {
    await this.executeScript(resqScript.toString(), []);
    await this.execute(resq_1.waitToLoadReact);
    const res = await this.execute(resq_1.react$, selector, props, state, this);
    return getElementObject_1.getElement.call(this, selector, res, true);
}
exports.default = react$;
