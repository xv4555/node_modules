"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.patchDebug = exports.findByWhich = exports.uniq = exports.sort = exports.getPages = exports.getStaleElementError = exports.transformExecuteResult = exports.transformExecuteArgs = exports.sanitizeError = exports.findElements = exports.findElement = exports.getPrototype = exports.validate = void 0;
const child_process_1 = require("child_process");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const protocols_1 = require("@wdio/protocols");
const cleanUpSerializationSelector_1 = __importDefault(require("./scripts/cleanUpSerializationSelector"));
const constants_1 = require("./constants");
const log = (0, logger_1.default)('devtools');
const validate = function (command, parameters, variables, ref, args) {
    const commandParams = [...variables.map((v) => Object.assign(v, {
            /**
             * url variables are:
             */
            required: true,
            type: 'string' // have to be always type of string
        })), ...parameters];
    const commandUsage = `${command}(${commandParams.map((p) => p.name).join(', ')})`;
    const moreInfo = `\n\nFor more info see ${ref}\n`;
    const body = {};
    /**
     * parameter check
     */
    const minAllowedParams = commandParams.filter((param) => param.required).length;
    if (args.length < minAllowedParams || args.length > commandParams.length) {
        const parameterDescription = commandParams.length
            ? `\n\nProperty Description:\n${commandParams.map((p) => `  "${p.name}" (${p.type}): ${p.description}`).join('\n')}`
            : '';
        throw new Error(`Wrong parameters applied for ${command}\n` +
            `Usage: ${commandUsage}` +
            parameterDescription +
            moreInfo);
    }
    /**
     * parameter type check
     */
    for (const [i, arg] of Object.entries(args)) {
        const commandParam = commandParams[parseInt(i, 10)];
        if (!(0, utils_1.isValidParameter)(arg, commandParam.type)) {
            /**
             * ignore if argument is not required
             */
            if (typeof arg === 'undefined' && !commandParam.required) {
                continue;
            }
            throw new Error(`Malformed type for "${commandParam.name}" parameter of command ${command}\n` +
                `Expected: ${commandParam.type}\n` +
                `Actual: ${(0, utils_1.getArgumentType)(arg)}` +
                moreInfo);
        }
        /**
         * rest of args are part of body payload
         */
        body[commandParams[parseInt(i, 10)].name] = arg;
    }
    log.info('COMMAND', (0, utils_1.commandCallStructure)(command, args));
    return body;
};
exports.validate = validate;
function getPrototype(commandWrapper) {
    const prototype = {};
    for (const [endpoint, methods] of Object.entries(protocols_1.WebDriverProtocol)) {
        for (const [method, commandData] of Object.entries(methods)) {
            prototype[commandData.command] = { value: commandWrapper(method, endpoint, commandData) };
        }
    }
    return prototype;
}
exports.getPrototype = getPrototype;
async function findElement(context, using, value) {
    /**
     * implicitly wait for the element if timeout is set
     */
    const implicitTimeout = this.timeouts.get('implicit');
    const waitForFn = using === 'xpath' ? context.waitForXPath : context.waitForSelector;
    if (implicitTimeout && waitForFn) {
        await waitForFn.call(context, value, { timeout: implicitTimeout });
    }
    let element;
    try {
        element = using === 'xpath'
            ? (await context.$x(value))[0]
            : await context.$(value);
    }
    catch (err) {
        /**
         * throw if method failed for other reasons
         */
        if (!err.message.includes('failed to find element')) {
            throw err;
        }
    }
    /**
     * if an element is not found we only return an error to allow
     * refetch it at a later stage
     */
    if (!element) {
        return new Error(`Element with selector "${value}" not found`);
    }
    const elementId = this.elementStore.set(element);
    return { [constants_1.ELEMENT_KEY]: elementId };
}
exports.findElement = findElement;
async function findElements(context, using, value) {
    /**
     * implicitly wait for the element if timeout is set
     */
    const implicitTimeout = this.timeouts.get('implicit');
    const waitForFn = using === 'xpath' ? context.waitForXPath : context.waitForSelector;
    if (implicitTimeout && waitForFn) {
        await waitForFn.call(context, value, { timeout: implicitTimeout });
    }
    const elements = using === 'xpath'
        ? await context.$x(value)
        : await context.$$(value);
    if (elements.length === 0) {
        return [];
    }
    return elements.map((element) => ({
        [constants_1.ELEMENT_KEY]: this.elementStore.set(element)
    }));
}
exports.findElements = findElements;
/**
 * convert DevTools errors into WebDriver errors so tools upstream
 * can handle it in similar fashion (e.g. stale element)
 */
function sanitizeError(err) {
    let errorMessage = err.message;
    if (err.message.includes('Node is detached from document')) {
        err.name = constants_1.ERROR_MESSAGES.staleElement.name;
        errorMessage = constants_1.ERROR_MESSAGES.staleElement.message;
    }
    const stack = err.stack ? err.stack.split('\n') : [];
    const asyncStack = stack.lastIndexOf('  -- ASYNC --');
    err.stack = errorMessage + '\n' + stack.slice(asyncStack + 1)
        .filter((line) => !line.includes('devtools/node_modules/puppeteer-core'))
        .join('\n');
    return err;
}
exports.sanitizeError = sanitizeError;
/**
 * transform elements in argument list to Puppeteer element handles
 */
async function transformExecuteArgs(args = []) {
    return Promise.all(args.map(async (arg) => {
        if (arg && arg[constants_1.ELEMENT_KEY]) {
            const elementHandle = await this.elementStore.get(arg[constants_1.ELEMENT_KEY]);
            if (!elementHandle) {
                throw getStaleElementError(arg[constants_1.ELEMENT_KEY]);
            }
            arg = elementHandle;
        }
        return arg;
    }));
}
exports.transformExecuteArgs = transformExecuteArgs;
/**
 * fetch marked elements from execute script
 */
async function transformExecuteResult(page, result) {
    const isResultArray = Array.isArray(result);
    let tmpResult = isResultArray ? result : [result];
    if (tmpResult.find((r) => typeof r === 'string' && r.startsWith(constants_1.SERIALIZE_FLAG))) {
        tmpResult = await Promise.all(tmpResult.map(async (r) => {
            if (typeof r === 'string' && r.startsWith(constants_1.SERIALIZE_FLAG)) {
                return findElement.call(this, page, 'css selector', `[${constants_1.SERIALIZE_PROPERTY}="${r}"]`);
            }
            return r;
        }));
        await page.$$eval(`[${constants_1.SERIALIZE_PROPERTY}]`, cleanUpSerializationSelector_1.default, constants_1.SERIALIZE_PROPERTY);
    }
    return isResultArray ? tmpResult : tmpResult[0];
}
exports.transformExecuteResult = transformExecuteResult;
function getStaleElementError(elementId) {
    const error = new Error(`stale element reference: The element with reference ${elementId} is stale; either the ` +
        'element is no longer attached to the DOM, it is not in the current frame context, or the ' +
        'document has been refreshed');
    error.name = 'stale element reference';
    return error;
}
exports.getStaleElementError = getStaleElementError;
/**
 * Helper function to get a list of Puppeteer pages from a Chrome browser.
 * In case many headless browser are run in parallel there are situations
 * where there are no pages because the machine is busy booting the headless
 * browser.
 *
 * @param  {Puppeteer.Browser} browser  browser instance
 * @return {Puppeteer.Page[]}           list of browser pages
 */
async function getPages(browser, retryInterval = 100) {
    const pages = await browser.pages();
    if (pages.length === 0) {
        log.info('no browser pages found, retrying...');
        /**
         * wait for some milliseconds to try again
         */
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
        return getPages(browser);
    }
    return pages;
}
exports.getPages = getPages;
function sort(installations, priorities) {
    const defaultPriority = 10;
    return installations
        // assign priorities
        .map((inst) => {
        for (const pair of priorities) {
            if (pair.regex.test(inst)) {
                return { path: inst, weight: pair.weight };
            }
        }
        return { path: inst, weight: defaultPriority };
    })
        // sort based on priorities
        .sort((a, b) => (b.weight - a.weight))
        // remove priority flag
        .map(pair => pair.path);
}
exports.sort = sort;
/**
 * helper utility to clone a list
 * @param  {Any[]} arr  list of things
 * @return {Any[]}      new list of same things
 */
function uniq(arr) {
    return Array.from(new Set(arr));
}
exports.uniq = uniq;
/**
 * Look for edge executables by using the which command
 */
function findByWhich(executables, priorities) {
    const installations = [];
    executables.forEach((executable) => {
        try {
            const browserPath = (0, child_process_1.execFileSync)('which', [executable], { stdio: 'pipe' }).toString().split(/\r?\n/)[0];
            if ((0, utils_1.canAccess)(browserPath)) {
                installations.push(browserPath);
            }
        }
        catch (err) {
            // Not installed.
        }
    });
    return sort(uniq(installations.filter(Boolean)), priorities);
}
exports.findByWhich = findByWhich;
const actualRequire = require;
/**
 * monkey patch debug package to log CDP messages from Puppeteer
 */
function patchDebug(scoppedLogger, require = actualRequire) {
    /**
     * let's not get caught by our dep checker, therefore
     * define package name in variable first
     */
    const pkgName = 'debug';
    /**
     * log puppeteer messages
     * resolve debug *from* puppeteer-core to make sure we monkey patch the version
     * it will use
     */
    let puppeteerPkg = require.resolve('puppeteer-core');
    let puppeteerDebugPkg;
    try {
        puppeteerDebugPkg = require.resolve(pkgName, { paths: [puppeteerPkg] });
    }
    catch {
        // puppeteer-core doesn't have its own debug, import the hoisted version
        puppeteerDebugPkg = require.resolve(pkgName);
    }
    require(puppeteerDebugPkg).log = (msg) => {
        if (msg.includes('puppeteer:protocol')) {
            msg = msg.slice(msg.indexOf(constants_1.PPTR_LOG_PREFIX) + constants_1.PPTR_LOG_PREFIX.length).trim();
        }
        scoppedLogger.debug(msg);
    };
}
exports.patchDebug = patchDebug;
const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));
exports.sleep = sleep;
