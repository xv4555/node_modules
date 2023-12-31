import type { ElementReference } from '@wdio/protocols';
import type { Selector, ElementArray } from '../types';
/**
 * transforms a findElement response into a WDIO element
 * @param  {String} selector  selector that was used to query the element
 * @param  {Object} res       findElement response
 * @return {Object}           WDIO element object
 */
export declare const getElement: (this: WebdriverIO.Browser | WebdriverIO.Element, selector?: Selector, res?: ElementReference | Error, isReactElement?: boolean) => WebdriverIO.Element;
/**
 * transforms a findElements response into an array of WDIO elements
 * @param  {String} selector  selector that was used to query the element
 * @param  {Object} res       findElements response
 * @return {Array}            array of WDIO elements
 */
export declare const getElements: (this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector | ElementReference[] | WebdriverIO.Element[], elemResponse: ElementReference[], isReactElement?: boolean) => ElementArray;
//# sourceMappingURL=getElementObject.d.ts.map