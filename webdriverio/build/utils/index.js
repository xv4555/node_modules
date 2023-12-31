"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsHeaderObject = exports.updateCapabilities = exports.getAutomationProtocol = exports.isStub = exports.enhanceElementsArray = exports.addLocatorStrategyHandler = exports.hasElementId = exports.getScrollPosition = exports.validateUrl = exports.assertDirectoryExists = exports.getAbsoluteFilepath = exports.getElementRect = exports.verifyArgsAndStripIfElement = exports.findElements = exports.findElement = exports.checkUnicode = exports.parseCSS = exports.transformToCharString = exports.getBrowserObject = exports.getElementFromResponse = exports.getPrototype = void 0;
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const css_value_1 = __importDefault(require("css-value"));
const rgb2hex_1 = __importDefault(require("rgb2hex"));
const grapheme_splitter_1 = __importDefault(require("grapheme-splitter"));
const logger_1 = __importDefault(require("@wdio/logger"));
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
const lodash_isplainobject_1 = __importDefault(require("lodash.isplainobject"));
const url_1 = require("url");
const devtools_1 = require("devtools");
const utils_1 = require("@wdio/utils");
const webdriverio_1 = require("query-selector-shadow-dom/plugins/webdriverio");
const constants_1 = require("../constants");
const findStrategy_1 = require("./findStrategy");
const browserCommands = require('../commands/browser').default;
const elementCommands = require('../commands/element').default;
const log = (0, logger_1.default)('webdriverio');
const INVALID_SELECTOR_ERROR = 'selector needs to be typeof `string` or `function`';
const scopes = {
    browser: browserCommands,
    element: elementCommands
};
const applyScopePrototype = (prototype, scope) => {
    Object.entries(scopes[scope]).forEach(([commandName, command]) => {
        prototype[commandName] = { value: command };
    });
};
/**
 * enhances objects with element commands
 */
const getPrototype = (scope) => {
    const prototype = {
        /**
         * used to store the puppeteer instance in the browser scope
         */
        puppeteer: { value: null, writable: true },
        /**
         * for handling sync execution in @wdio/sync
         */
        _NOT_FIBER: { value: false, writable: true, configurable: true }
    };
    /**
     * register action commands
     */
    applyScopePrototype(prototype, scope);
    prototype.strategies = { value: new Map() };
    return prototype;
};
exports.getPrototype = getPrototype;
/**
 * get element id from WebDriver response
 * @param  {?Object|undefined} res         body object from response or null
 * @return {?string}   element id or null if element couldn't be found
 */
const getElementFromResponse = (res) => {
    /**
    * a function selector can return null
    */
    if (!res) {
        return null;
    }
    /**
     * deprecated JSONWireProtocol response
     */
    if (res.ELEMENT) {
        return res.ELEMENT;
    }
    /**
     * W3C WebDriver response
     */
    if (res[constants_1.ELEMENT_KEY]) {
        return res[constants_1.ELEMENT_KEY];
    }
    return null;
};
exports.getElementFromResponse = getElementFromResponse;
/**
 * traverse up the scope chain until browser element was reached
 */
function getBrowserObject(elem) {
    const elemObject = elem;
    return elemObject.parent ? getBrowserObject(elemObject.parent) : elem;
}
exports.getBrowserObject = getBrowserObject;
/**
 * transform whatever value is into an array of char strings
 */
function transformToCharString(value, translateToUnicode = true) {
    const ret = [];
    if (!Array.isArray(value)) {
        value = [value];
    }
    for (const val of value) {
        if (typeof val === 'string') {
            translateToUnicode
                ? ret.push(...checkUnicode(val))
                : ret.push(...`${val}`.split(''));
        }
        else if (typeof val === 'number') {
            const entry = `${val}`.split('');
            ret.push(...entry);
        }
        else if (val && typeof val === 'object') {
            try {
                ret.push(...JSON.stringify(val).split(''));
            }
            catch (err) { /* ignore */ }
        }
        else if (typeof val === 'boolean') {
            const entry = val ? 'true'.split('') : 'false'.split('');
            ret.push(...entry);
        }
    }
    return ret;
}
exports.transformToCharString = transformToCharString;
function sanitizeCSS(value) {
    /* istanbul ignore next */
    if (!value) {
        return value;
    }
    return value.trim().replace(/'/g, '').replace(/"/g, '').toLowerCase();
}
/**
 * parse css values to a better format
 * @param  {Object} cssPropertyValue result of WebDriver call
 * @param  {String} cssProperty      name of css property to parse
 * @return {Object}                  parsed css property
 */
function parseCSS(cssPropertyValue, cssProperty) {
    var _a;
    const parsedValue = {
        property: cssProperty,
        value: cssPropertyValue.toLowerCase().trim(),
        parsed: {}
    };
    if (((_a = parsedValue.value) === null || _a === void 0 ? void 0 : _a.indexOf('rgb')) === 0) {
        /**
         * remove whitespaces in rgb values
         */
        parsedValue.value = parsedValue.value.replace(/\s/g, '');
        /**
         * parse color values
         */
        let color = parsedValue.value;
        parsedValue.parsed = (0, rgb2hex_1.default)(parsedValue.value);
        parsedValue.parsed.type = 'color';
        const colorType = /[rgba]+/g.exec(color) || [];
        parsedValue.parsed[colorType[0]] = color;
    }
    else if (parsedValue.property === 'font-family') {
        let font = (0, css_value_1.default)(cssPropertyValue);
        let string = parsedValue.value;
        let value = cssPropertyValue.split(/,/).map(sanitizeCSS);
        parsedValue.value = sanitizeCSS(font[0].value || font[0].string);
        parsedValue.parsed = { value, type: 'font', string };
    }
    else {
        /**
         * parse other css properties
         */
        try {
            const value = (0, css_value_1.default)(cssPropertyValue);
            if (value.length === 1) {
                parsedValue.parsed = value[0];
            }
            if (parsedValue.parsed.type && parsedValue.parsed.type === 'number' && parsedValue.parsed.unit === '') {
                parsedValue.value = parsedValue.parsed.value;
            }
        }
        catch (err) {
            // TODO improve css-parse lib to handle properties like
            // `-webkit-animation-timing-function :  cubic-bezier(0.25, 0.1, 0.25, 1)
        }
    }
    return parsedValue;
}
exports.parseCSS = parseCSS;
/**
 * check for unicode character or split string into literals
 * @param  {String} value  text
 * @return {Array}         set of characters or unicode symbols
 */
function checkUnicode(value, isDevTools = false) {
    return Object.prototype.hasOwnProperty.call(utils_1.UNICODE_CHARACTERS, value)
        ? isDevTools ? [value] : [utils_1.UNICODE_CHARACTERS[value]]
        : new grapheme_splitter_1.default().splitGraphemes(value);
}
exports.checkUnicode = checkUnicode;
function fetchElementByJSFunction(selector, scope) {
    if (!scope.elementId) {
        return scope.execute(selector);
    }
    /**
     * use a regular function because IE does not understand arrow functions
     */
    const script = (function (elem) {
        return selector.call(elem);
    }).toString().replace('selector', `(${selector.toString()})`);
    return getBrowserObject(scope).execute(`return (${script}).apply(null, arguments)`, scope);
}
/**
 * logic to find an element
 */
async function findElement(selector) {
    /**
     * check if shadow DOM integration is used
     */
    if (!this.isDevTools && typeof selector === 'string' && selector.startsWith(constants_1.DEEP_SELECTOR)) {
        const notFoundError = new Error(`shadow selector "${selector.slice(constants_1.DEEP_SELECTOR.length)}" did not return an HTMLElement`);
        let elem = await this.execute(webdriverio_1.locatorStrategy, ...[
            selector.slice(constants_1.DEEP_SELECTOR.length),
            this.elementId ? this : undefined
        ].filter(Boolean));
        elem = Array.isArray(elem) ? elem[0] : elem;
        return (0, exports.getElementFromResponse)(elem) ? elem : notFoundError;
    }
    /**
     * fetch element using custom strategy function
     */
    if ((0, lodash_isplainobject_1.default)(selector) && typeof selector.strategy === 'function') {
        const { strategy, strategyName, strategyArguments } = selector;
        const notFoundError = new Error(`Custom Strategy "${strategyName}" did not return an HTMLElement`);
        let elem = await this.execute(strategy, ...strategyArguments);
        elem = Array.isArray(elem) ? elem[0] : elem;
        return (0, exports.getElementFromResponse)(elem) ? elem : notFoundError;
    }
    /**
     * fetch element using regular protocol command
     */
    if (typeof selector === 'string' || (0, lodash_isplainobject_1.default)(selector)) {
        const { using, value } = (0, findStrategy_1.findStrategy)(selector, this.isW3C, this.isMobile);
        return this.elementId
            // casting to any necessary given weak type support of protocol commands
            ? this.findElementFromElement(this.elementId, using, value)
            : this.findElement(using, value);
    }
    /**
     * fetch element with JS function
     */
    if (typeof selector === 'function') {
        const notFoundError = new Error(`Function selector "${selector.toString()}" did not return an HTMLElement`);
        let elem = await fetchElementByJSFunction(selector, this);
        elem = Array.isArray(elem) ? elem[0] : elem;
        return (0, exports.getElementFromResponse)(elem) ? elem : notFoundError;
    }
    throw new Error(INVALID_SELECTOR_ERROR);
}
exports.findElement = findElement;
/**
 * logic to find a elements
 */
async function findElements(selector) {
    /**
     * check if shadow DOM integration is used
     */
    if (!this.isDevTools && typeof selector === 'string' && selector.startsWith(constants_1.DEEP_SELECTOR)) {
        const elems = await this.execute(webdriverio_1.locatorStrategy, ...[
            selector.slice(constants_1.DEEP_SELECTOR.length),
            this.elementId ? this : undefined
        ].filter(Boolean));
        const elemArray = Array.isArray(elems) ? elems : [elems];
        return elemArray.filter((elem) => elem && (0, exports.getElementFromResponse)(elem));
    }
    /**
     * fetch elements using custom strategy function
     */
    if ((0, lodash_isplainobject_1.default)(selector) && typeof selector.strategy === 'function') {
        const { strategy, strategyArguments } = selector;
        const elems = await this.execute(strategy, ...strategyArguments);
        const elemArray = Array.isArray(elems) ? elems : [elems];
        return elemArray.filter((elem) => elem && (0, exports.getElementFromResponse)(elem));
    }
    /**
     * fetch element using regular protocol command
     */
    if (typeof selector === 'string' || (0, lodash_isplainobject_1.default)(selector)) {
        const { using, value } = (0, findStrategy_1.findStrategy)(selector, this.isW3C, this.isMobile);
        return this.elementId
            // casting to any necessary given weak type support of protocol commands
            ? this.findElementsFromElement(this.elementId, using, value)
            : this.findElements(using, value);
    }
    /**
     * fetch element with JS function
     */
    if (typeof selector === 'function') {
        const elems = await fetchElementByJSFunction(selector, this);
        const elemArray = Array.isArray(elems) ? elems : [elems];
        return elemArray.filter((elem) => elem && (0, exports.getElementFromResponse)(elem));
    }
    throw new Error(INVALID_SELECTOR_ERROR);
}
exports.findElements = findElements;
/**
 * Strip element object and return w3c and jsonwp compatible keys
 */
function verifyArgsAndStripIfElement(args) {
    function verify(arg) {
        if ((0, lodash_isobject_1.default)(arg) && arg.constructor.name === 'Element') {
            const elem = arg;
            if (!elem.elementId) {
                throw new Error(`The element with selector "${elem.selector}" you are trying to pass into the execute method wasn't found`);
            }
            return {
                [constants_1.ELEMENT_KEY]: elem.elementId,
                ELEMENT: elem.elementId
            };
        }
        return arg;
    }
    return !Array.isArray(args) ? verify(args) : args.map(verify);
}
exports.verifyArgsAndStripIfElement = verifyArgsAndStripIfElement;
/**
 * getElementRect
 */
async function getElementRect(scope) {
    const rect = await scope.getElementRect(scope.elementId);
    let defaults = { x: 0, y: 0, width: 0, height: 0 };
    /**
     * getElementRect workaround for Safari 12.0.3
     * if one of [x, y, height, width] is undefined get rect with javascript
     */
    if (Object.keys(defaults).some((key) => rect[key] == null)) {
        /* istanbul ignore next */
        const rectJs = await getBrowserObject(scope).execute(function (el) {
            if (!el || !el.getBoundingClientRect) {
                return;
            }
            const { left, top, width, height } = el.getBoundingClientRect();
            return {
                x: left + this.scrollX,
                y: top + this.scrollY,
                width,
                height
            };
        }, scope);
        // try set proper value
        Object.keys(defaults).forEach((key) => {
            if (rect[key] != null) {
                return;
            }
            if (rectJs && typeof rectJs[key] === 'number') {
                rect[key] = Math.floor(rectJs[key]);
            }
            else {
                log.error('getElementRect', { rect, rectJs, key });
                throw new Error('Failed to receive element rects via execute command');
            }
        });
    }
    return rect;
}
exports.getElementRect = getElementRect;
function getAbsoluteFilepath(filepath) {
    return filepath.startsWith('/') || filepath.startsWith('\\') || filepath.match(/^[a-zA-Z]:\\/)
        ? filepath
        : path_1.default.join(process.cwd(), filepath);
}
exports.getAbsoluteFilepath = getAbsoluteFilepath;
/**
 * check if directory exists
 */
function assertDirectoryExists(filepath) {
    if (!fs_1.default.existsSync(path_1.default.dirname(filepath))) {
        throw new Error(`directory (${path_1.default.dirname(filepath)}) doesn't exist`);
    }
}
exports.assertDirectoryExists = assertDirectoryExists;
/**
 * check if urls are valid and fix them if necessary
 * @param  {string}  url                url to navigate to
 * @param  {Boolean} [retryCheck=false] true if an url was already check and still failed with fix applied
 * @return {string}                     fixed url
 */
function validateUrl(url, origError) {
    try {
        const urlObject = new url_1.URL(url);
        return urlObject.href;
    }
    catch (err) {
        /**
         * if even adding http:// doesn't help, fail with original error
         */
        if (origError) {
            throw origError;
        }
        return validateUrl(`http://${url}`, new Error(`Invalid URL: ${url}`));
    }
}
exports.validateUrl = validateUrl;
/**
 * get window's scrollX and scrollY
 * @param {object} scope
 */
function getScrollPosition(scope) {
    return getBrowserObject(scope)
        .execute(/* istanbul ignore next */ function () {
        return { scrollX: this.pageXOffset, scrollY: this.pageYOffset };
    });
}
exports.getScrollPosition = getScrollPosition;
async function hasElementId(element) {
    /*
     * This is only necessary as isDisplayed is on the exclusion list for the middleware
     */
    if (!element.elementId) {
        const command = element.isReactElement
            ? element.parent.react$.bind(element.parent)
            : element.parent.$.bind(element.parent);
        element.elementId = (await command(element.selector)).elementId;
    }
    /*
     * if element was still not found it also is not displayed
     */
    if (!element.elementId) {
        return false;
    }
    return true;
}
exports.hasElementId = hasElementId;
function addLocatorStrategyHandler(scope) {
    return (name, func) => {
        if (scope.strategies.get(name)) {
            throw new Error(`Strategy ${name} already exists`);
        }
        scope.strategies.set(name, func);
    };
}
exports.addLocatorStrategyHandler = addLocatorStrategyHandler;
/**
 * Enhance elements array with data required to refetch it
 * @param   {object[]}          elements    elements
 * @param   {object}            parent      element or browser
 * @param   {string|Function}   selector    string or function, or strategy name for `custom$$`
 * @param   {string}            foundWith   name of the command elements were found with, ex `$$`, `react$$`, etc
 * @param   {Array}             props       additional properties required to fetch elements again
 * @returns {object[]}  elements
 */
const enhanceElementsArray = (elements, parent, selector, foundWith = '$$', props = []) => {
    /**
     * if we have an element collection, e.g. `const elems = $$([elemA, elemB])`
     * we cna't assign a common selector to the element array
     */
    if (!Array.isArray(selector)) {
        elements.selector = selector;
    }
    elements.parent = parent;
    elements.foundWith = foundWith;
    elements.props = props;
    return elements;
};
exports.enhanceElementsArray = enhanceElementsArray;
/**
 * is protocol stub
 * @param {string} automationProtocol
 */
const isStub = (automationProtocol) => automationProtocol === './protocol-stub';
exports.isStub = isStub;
const getAutomationProtocol = async (config) => {
    var _a, _b;
    /**
     * if automation protocol is set by user prefer this
     */
    if (config.automationProtocol) {
        return config.automationProtocol;
    }
    /**
     * run WebDriver if hostname or port is set
     */
    if (config.hostname || config.port || config.path || (config.user && config.key)) {
        return 'webdriver';
    }
    /**
     * only run DevTools protocol if capabilities match supported platforms
     */
    const caps = (((_a = config.capabilities) === null || _a === void 0 ? void 0 : _a.alwaysMatch) ||
        config.capabilities) || {};
    const desiredCaps = caps;
    if (!devtools_1.SUPPORTED_BROWSER.includes((_b = caps.browserName) === null || _b === void 0 ? void 0 : _b.toLowerCase())) {
        return 'webdriver';
    }
    /**
     * check if we are on mobile and use WebDriver if so
     */
    if (desiredCaps.deviceName || caps['appium:deviceName'] ||
        desiredCaps.platformVersion || caps['appium:platformVersion'] ||
        desiredCaps.app || caps['appium:app']) {
        return 'webdriver';
    }
    /**
     * run WebDriver if capabilities clearly identify it as it
     */
    if (config.capabilities && config.capabilities.alwaysMatch) {
        return 'webdriver';
    }
    /**
     * make a head request to check if a driver is available
     */
    const resp = await new Promise((resolve) => {
        const req = http_1.default.request(constants_1.DRIVER_DEFAULT_ENDPOINT, resolve);
        req.on('error', (error) => resolve({ error }));
        req.end();
    });
    /**
     * kill agent otherwise process will stale
     */
    const driverEndpointHeaders = resp;
    if (driverEndpointHeaders.req && driverEndpointHeaders.req.agent) {
        driverEndpointHeaders.req.agent.destroy();
    }
    if (driverEndpointHeaders && driverEndpointHeaders.statusCode === 200) {
        return 'webdriver';
    }
    return 'devtools';
};
exports.getAutomationProtocol = getAutomationProtocol;
/**
 * updateCapabilities allows modifying capabilities before session
 * is started
 *
 * NOTE: this method is executed twice when running the WDIO testrunner
 */
const updateCapabilities = async (params, automationProtocol) => {
    if (automationProtocol && !params.automationProtocol) {
        params.automationProtocol = automationProtocol;
    }
};
exports.updateCapabilities = updateCapabilities;
/**
 * compare if an object (`base`) contains the same values as another object (`match`)
 * @param {object} base  object to compare to
 * @param {object} match object that needs to match thebase
 */
const containsHeaderObject = (base, match) => {
    for (const [key, value] of Object.entries(match)) {
        if (typeof base[key] === 'undefined' || base[key] !== value) {
            return false;
        }
    }
    return true;
};
exports.containsHeaderObject = containsHeaderObject;
