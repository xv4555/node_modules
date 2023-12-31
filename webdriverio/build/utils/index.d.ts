import type { ElementReference } from '@wdio/protocols';
import type { Options } from '@wdio/types';
import type { ElementArray, Selector, ParsedCSSValue, CustomLocatorReturnValue } from '../types';
/**
 * enhances objects with element commands
 */
export declare const getPrototype: (scope: 'browser' | 'element') => Record<string, PropertyDescriptor>;
/**
 * get element id from WebDriver response
 * @param  {?Object|undefined} res         body object from response or null
 * @return {?string}   element id or null if element couldn't be found
 */
export declare const getElementFromResponse: (res: ElementReference) => any;
/**
 * traverse up the scope chain until browser element was reached
 */
export declare function getBrowserObject(elem: WebdriverIO.Element | WebdriverIO.Browser): WebdriverIO.Browser;
/**
 * transform whatever value is into an array of char strings
 */
export declare function transformToCharString(value: any, translateToUnicode?: boolean): string[];
/**
 * parse css values to a better format
 * @param  {Object} cssPropertyValue result of WebDriver call
 * @param  {String} cssProperty      name of css property to parse
 * @return {Object}                  parsed css property
 */
export declare function parseCSS(cssPropertyValue: string, cssProperty?: string): ParsedCSSValue;
/**
 * check for unicode character or split string into literals
 * @param  {String} value  text
 * @return {Array}         set of characters or unicode symbols
 */
export declare function checkUnicode(value: string, isDevTools?: boolean): string[];
/**
 * logic to find an element
 */
export declare function findElement(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<Error | ElementReference>;
/**
 * logic to find a elements
 */
export declare function findElements(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<ElementReference[]>;
/**
 * Strip element object and return w3c and jsonwp compatible keys
 */
export declare function verifyArgsAndStripIfElement(args: any): any;
/**
 * getElementRect
 */
export declare function getElementRect(scope: WebdriverIO.Element): Promise<import("@wdio/protocols").RectReturn>;
export declare function getAbsoluteFilepath(filepath: string): string;
/**
 * check if directory exists
 */
export declare function assertDirectoryExists(filepath: string): void;
/**
 * check if urls are valid and fix them if necessary
 * @param  {string}  url                url to navigate to
 * @param  {Boolean} [retryCheck=false] true if an url was already check and still failed with fix applied
 * @return {string}                     fixed url
 */
export declare function validateUrl(url: string, origError?: Error): string;
/**
 * get window's scrollX and scrollY
 * @param {object} scope
 */
export declare function getScrollPosition(scope: WebdriverIO.Element): Promise<{
    scrollX: number;
    scrollY: number;
}>;
export declare function hasElementId(element: WebdriverIO.Element): Promise<boolean>;
export declare function addLocatorStrategyHandler(scope: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser): (name: string, func: (selector: string, root?: HTMLElement) => CustomLocatorReturnValue) => void;
/**
 * Enhance elements array with data required to refetch it
 * @param   {object[]}          elements    elements
 * @param   {object}            parent      element or browser
 * @param   {string|Function}   selector    string or function, or strategy name for `custom$$`
 * @param   {string}            foundWith   name of the command elements were found with, ex `$$`, `react$$`, etc
 * @param   {Array}             props       additional properties required to fetch elements again
 * @returns {object[]}  elements
 */
export declare const enhanceElementsArray: (elements: ElementArray, parent: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector | ElementReference[] | WebdriverIO.Element[], foundWith?: string, props?: any[]) => ElementArray;
/**
 * is protocol stub
 * @param {string} automationProtocol
 */
export declare const isStub: (automationProtocol?: string) => boolean;
export declare const getAutomationProtocol: (config: Options.WebdriverIO | Options.Testrunner) => Promise<Options.SupportedProtocols>;
/**
 * updateCapabilities allows modifying capabilities before session
 * is started
 *
 * NOTE: this method is executed twice when running the WDIO testrunner
 */
export declare const updateCapabilities: (params: Options.WebdriverIO | Options.Testrunner, automationProtocol?: Options.SupportedProtocols) => Promise<void>;
/**
 * compare if an object (`base`) contains the same values as another object (`match`)
 * @param {object} base  object to compare to
 * @param {object} match object that needs to match thebase
 */
export declare const containsHeaderObject: (base: Record<string, string>, match: Record<string, string>) => boolean;
//# sourceMappingURL=index.d.ts.map