/**
 * injector script for executeScript command
 * According to the WebDriver spec we need to ensure to serialize all elements
 * being returned from the script. In order to do so we attach a data attribute
 * to them and fetch them using Puppeteer after the script execution. Instead
 * of the element we return the dataFlag string instead to signalize that this
 * is suppose to be an element handle
 *
 * @param  {HTMLElement} _            $eval fetched element
 * @param  {String}      script       user script
 * @param  {String}      dataProperty property name for elements being returned
 * @param  {String}      dataFlag     flag for element
 * @param  {Object[]}    args         user arguments for custom script
 * @return {Object}                   result of custom script
 */
declare const _default: (_: HTMLElement, script: string, dataProperty: string, dataFlag: string, ...args: any[]) => any;
export default _default;
//# sourceMappingURL=executeScript.d.ts.map