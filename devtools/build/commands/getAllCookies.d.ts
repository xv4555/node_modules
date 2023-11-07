import type DevToolsDriver from '../devtoolsdriver';
/**
 * The Get All Cookies command returns all cookies associated with the address
 * of the current browsing context’s active document.
 *
 * @alias browser.getAllCookies
 * @see https://w3c.github.io/webdriver/#dfn-get-all-cookies
 * @return {Object[]}  A list of serialized cookies. Each serialized cookie has a number of optional fields which may or may not be returned in addition to `name` and `value`.
 */
export default function getAllCookies(this: DevToolsDriver): Promise<import("devtools-protocol").Protocol.Network.Cookie[]>;
//# sourceMappingURL=getAllCookies.d.ts.map