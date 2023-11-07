import type DevToolsDriver from '../devtoolsdriver';
/**
 * The Get Element CSS Value command retrieves the computed value
 * of the given CSS property of the given web element.
 *
 * @alias browser.getElementCSSValue
 * @see https://w3c.github.io/webdriver/#dfn-get-element-css-value
 * @param {string} elementId     the id of an element returned in a previous call to Find Element(s)
 * @param {string} propertyName  name of the CSS property to retrieve
 * @return {string}              The computed value of the parameter corresponding to property name from the element's style declarations (unless the document type is xml, in which case the return value is simply the empty string).
 */
export default function getElementCSSValue(this: DevToolsDriver, { elementId, propertyName }: {
    elementId: string;
    propertyName: string;
}): Promise<string>;
//# sourceMappingURL=getElementCSSValue.d.ts.map