"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNEL_FIREFOX_TRUNK = exports.CHANNEL_FIREFOX_NIGHTLY = exports.VENDOR_PREFIX = exports.BROWSER_ERROR_MESSAGES = exports.ERROR_MESSAGES = exports.PPTR_LOG_PREFIX = exports.SERIALIZE_FLAG = exports.SERIALIZE_PROPERTY = exports.SUPPORTED_SELECTOR_STRATEGIES = exports.DEFAULT_SCRIPT_TIMEOUT = exports.DEFAULT_PAGELOAD_TIMEOUT = exports.DEFAULT_IMPLICIT_TIMEOUT = exports.DEFAULTS = exports.BROWSER_TYPE = exports.SUPPORTED_BROWSER = exports.EDGE_NAMES = exports.FIREFOX_NAMES = exports.CHROME_NAMES = exports.DEFAULT_FLAGS = exports.SHADOW_ELEMENT_KEY = exports.ELEMENT_KEY = exports.DEFAULT_Y_POSITION = exports.DEFAULT_X_POSITION = exports.DEFAULT_HEIGHT = exports.DEFAULT_WIDTH = void 0;
exports.DEFAULT_WIDTH = 1200;
exports.DEFAULT_HEIGHT = 900;
exports.DEFAULT_X_POSITION = 0;
exports.DEFAULT_Y_POSITION = 0;
exports.ELEMENT_KEY = 'element-6066-11e4-a52e-4f735466cecf';
exports.SHADOW_ELEMENT_KEY = 'shadow-6066-11e4-a52e-4f735466cecf';
// https://github.com/puppeteer/puppeteer/blob/083ea41e943e2a20014279fcfceb23c98a1e4491/src/node/Launcher.ts#L168
exports.DEFAULT_FLAGS = [
    // suppresses Save Password prompt window
    '--enable-automation',
    // do not block popups
    '--disable-popup-blocking',
    // Disable all chrome extensions entirely
    '--disable-extensions',
    // Disable various background network services, including extension updating,
    //   safe browsing service, upgrade detector, translate, UMA
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    // Disable syncing to a Google account
    '--disable-sync',
    // Disable reporting to UMA, but allows for collection
    '--metrics-recording-only',
    // Disable installation of default apps on first run
    '--disable-default-apps',
    // Mute any audio
    '--mute-audio',
    // Skip first run wizards
    '--no-first-run',
    '--no-default-browser-check',
    // chromedriver flags
    '--disable-hang-monitor',
    '--disable-prompt-on-repost',
    '--disable-client-side-phishing-detection',
    '--password-store=basic',
    '--use-mock-keychain',
    '--disable-component-extensions-with-background-pages',
    '--disable-breakpad',
    '--disable-dev-shm-usage',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--force-fieldtrials=*BackgroundTracing/default/',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    /**
     * `site-per-process` affects `page.frames()`, see #4471
     * `TranslateUI` disables built-in Google Translate service
     */
    '--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees'
];
exports.CHROME_NAMES = ['chrome', 'googlechrome', 'headlesschrome', 'google-chrome', 'chromium'];
exports.FIREFOX_NAMES = ['firefox', 'ff', 'mozilla', 'mozillafirefox', 'headless firefox', 'headlessfirefox'];
exports.EDGE_NAMES = ['edge', 'msedge', 'microsoft-edge', 'microsoftedge'];
exports.SUPPORTED_BROWSER = [...exports.CHROME_NAMES, ...exports.FIREFOX_NAMES, ...exports.EDGE_NAMES];
exports.BROWSER_TYPE = {
    chrome: 'chrome',
    firefox: 'firefox',
    edge: 'edge'
};
exports.DEFAULTS = {
    capabilities: {
        type: 'object',
        required: true
    },
    /**
     * Level of logging verbosity
     */
    logLevel: {
        type: 'string',
        default: 'info',
        match: /(trace|debug|info|warn|error|silent)/
    },
    /**
     * directory for log files
     */
    outputDir: {
        type: 'string'
    },
    /**
     * maxConnectionRetries in chrome-launcher
     */
    connectionRetryCount: {
        type: 'number',
        default: 50
    }
};
exports.DEFAULT_IMPLICIT_TIMEOUT = 0;
exports.DEFAULT_PAGELOAD_TIMEOUT = 5 * 60 * 1000; // 5 min
exports.DEFAULT_SCRIPT_TIMEOUT = 30 * 1000; // 30s
exports.SUPPORTED_SELECTOR_STRATEGIES = ['css selector', 'tag name', 'xpath', 'link text', 'partial link text', 'shadow'];
exports.SERIALIZE_PROPERTY = 'data-devtoolsdriver-fetchedElement';
exports.SERIALIZE_FLAG = '__executeElement';
exports.PPTR_LOG_PREFIX = 'puppeteer:protocol';
exports.ERROR_MESSAGES = {
    staleElement: {
        name: 'stale element reference',
        message: 'stale element reference: The element reference is stale; either the element is no longer attached to the DOM, it is not in the current frame context, or the document has been refreshed'
    }
};
exports.BROWSER_ERROR_MESSAGES = {
    firefoxNightly: `Only Nightly release channel is supported in Devtools/Puppeteer for Firefox. Refer to the following issue:
        https://bugzilla.mozilla.org/show_bug.cgi?id=1606604

        You can use the following link to download Firefox Nightly edition:
        https://www.mozilla.org/en-US/firefox/channel/desktop/

        Adding the following binary capability in Firefox Options is mandatory to run with Nightly edition:

        'moz:firefoxOptions': {
            binary: '/path/to/firefox'
        }

        Note: "Nightly" as a term should be present in the "Firefox Application Name" across all OS's in binary path mentioned above for this to work.`
};
exports.VENDOR_PREFIX = {
    chrome: 'goog:chromeOptions',
    'chrome headless': 'goog:chromeOptions',
    firefox: 'moz:firefoxOptions',
    edge: 'ms:edgeOptions'
};
exports.CHANNEL_FIREFOX_NIGHTLY = 'nightly';
exports.CHANNEL_FIREFOX_TRUNK = 'trunk';
