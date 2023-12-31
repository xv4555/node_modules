import type { Options } from '@wdio/types';
export declare const DEFAULT_WIDTH = 1200;
export declare const DEFAULT_HEIGHT = 900;
export declare const DEFAULT_X_POSITION = 0;
export declare const DEFAULT_Y_POSITION = 0;
export declare const ELEMENT_KEY = "element-6066-11e4-a52e-4f735466cecf";
export declare const SHADOW_ELEMENT_KEY = "shadow-6066-11e4-a52e-4f735466cecf";
export declare const DEFAULT_FLAGS: string[];
export declare const CHROME_NAMES: string[];
export declare const FIREFOX_NAMES: string[];
export declare const EDGE_NAMES: string[];
export declare const SUPPORTED_BROWSER: string[];
export declare const BROWSER_TYPE: {
    chrome: 'chrome';
    firefox: 'firefox';
    edge: 'edge';
};
export declare const DEFAULTS: Options.Definition<Options.WebDriver>;
export declare const DEFAULT_IMPLICIT_TIMEOUT = 0;
export declare const DEFAULT_PAGELOAD_TIMEOUT: number;
export declare const DEFAULT_SCRIPT_TIMEOUT: number;
export declare const SUPPORTED_SELECTOR_STRATEGIES: string[];
export declare const SERIALIZE_PROPERTY = "data-devtoolsdriver-fetchedElement";
export declare const SERIALIZE_FLAG = "__executeElement";
export declare const PPTR_LOG_PREFIX = "puppeteer:protocol";
export declare const ERROR_MESSAGES: {
    staleElement: {
        name: string;
        message: string;
    };
};
export declare const BROWSER_ERROR_MESSAGES: {
    firefoxNightly: string;
};
export declare const VENDOR_PREFIX: {
    chrome: 'goog:chromeOptions';
    'chrome headless': 'goog:chromeOptions';
    firefox: 'moz:firefoxOptions';
    edge: 'ms:edgeOptions';
};
export declare const CHANNEL_FIREFOX_NIGHTLY = "nightly";
export declare const CHANNEL_FIREFOX_TRUNK = "trunk";
//# sourceMappingURL=constants.d.ts.map