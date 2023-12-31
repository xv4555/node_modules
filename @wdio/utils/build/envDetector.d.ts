import type { Capabilities } from '@wdio/types';
/**
 * check if session is based on W3C protocol based on the /session response
 * @param  {Object}  capabilities  caps of session response
 * @return {Boolean}               true if W3C (browser)
 */
export declare function isW3C(capabilities?: Capabilities.DesiredCapabilities): boolean;
/**
 * returns information about the environment before the session is created
 * @param  {Object}  capabilities           caps provided by user
 * @param  {string=} automationProtocol     `devtools`
 * @return {Object}                         object with environment flags
 */
export declare function capabilitiesEnvironmentDetector(capabilities: Capabilities.Capabilities, automationProtocol: string): {
    isChrome: boolean;
    isFirefox: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
};
/**
 * returns information about the environment when the session is created
 * @param  {Object}  capabilities           caps of session response
 * @param  {Object}  requestedCapabilities
 * @return {Object}                         object with environment flags
 */
export declare function sessionEnvironmentDetector({ capabilities, requestedCapabilities }: {
    capabilities: Capabilities.DesiredCapabilities;
    requestedCapabilities: Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities;
}): {
    isW3C: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
    isSeleniumStandalone: boolean;
};
/**
 * returns information about the environment when `devtools` protocol is used
 * @param  {Object}  capabilities           caps of session response
 * @return {Object}                         object with environment flags
 */
export declare function devtoolsEnvironmentDetector({ browserName }: Capabilities.Capabilities): {
    isDevTools: boolean;
    isW3C: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isFirefox: boolean;
    isChrome: boolean;
    isSauce: boolean;
    isSeleniumStandalone: boolean;
};
/**
 * returns information about the environment before the session is created
 * `isW3C`, `isSeleniumStandalone` cannot be detected
 * @param  {Object}  capabilities           caps provided by user
 * @return {Object}                         object with environment flags
 */
export declare function webdriverEnvironmentDetector(capabilities: Capabilities.Capabilities): {
    isChrome: boolean;
    isFirefox: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
};
//# sourceMappingURL=envDetector.d.ts.map