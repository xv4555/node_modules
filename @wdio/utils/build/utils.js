"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.canAccess = exports.isBase64 = exports.filterSpecArgs = exports.isFunctionAsync = exports.safeRequire = exports.getArgumentType = exports.isValidParameter = exports.transformCommandLogResult = exports.commandCallStructure = exports.overwriteElementCommands = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SCREENSHOT_REPLACEMENT = '"<Screenshot[base64]>"';
const SCRIPT_PLACEHOLDER = '"<Script[base64]>"';
const REGEX_SCRIPT_NAME = /return \(function (\w+)/;
/**
 * overwrite native element commands with user defined
 * @param {object} propertiesObject propertiesObject
 */
function overwriteElementCommands(propertiesObject) {
    const elementOverrides = propertiesObject['__elementOverrides__'] ? propertiesObject['__elementOverrides__'].value : {};
    for (const [commandName, userDefinedCommand] of Object.entries(elementOverrides)) {
        if (typeof userDefinedCommand !== 'function') {
            throw new Error('overwriteCommand: commands be overwritten only with functions, command: ' + commandName);
        }
        if (!propertiesObject[commandName]) {
            throw new Error('overwriteCommand: no command to be overwritten: ' + commandName);
        }
        if (typeof propertiesObject[commandName].value !== 'function') {
            throw new Error('overwriteCommand: only functions can be overwritten, command: ' + commandName);
        }
        const origCommand = propertiesObject[commandName].value;
        delete propertiesObject[commandName];
        const newCommand = function (...args) {
            const element = this;
            return userDefinedCommand.apply(element, [
                function origCommandFunction() {
                    const context = this || element; // respect explicite context binding, use element as default
                    return origCommand.apply(context, arguments);
                },
                ...args
            ]);
        };
        propertiesObject[commandName] = {
            value: newCommand,
            configurable: true
        };
    }
    delete propertiesObject['__elementOverrides__'];
    propertiesObject['__elementOverrides__'] = { value: {} };
}
exports.overwriteElementCommands = overwriteElementCommands;
/**
 * get command call structure
 * (for logging purposes)
 */
function commandCallStructure(commandName, args) {
    const callArgs = args.map((arg) => {
        if (typeof arg === 'string' && (arg.startsWith('!function(') || arg.startsWith('return (function'))) {
            arg = '<fn>';
        }
        else if (typeof arg === 'string' &&
            /**
             * the isBase64 method returns for xPath values like
             * "/html/body/a" a true value which is why we should
             * include a command check in here.
             */
            !commandName.startsWith('findElement') &&
            isBase64(arg)) {
            arg = SCREENSHOT_REPLACEMENT;
        }
        else if (typeof arg === 'string') {
            arg = `"${arg}"`;
        }
        else if (typeof arg === 'function') {
            arg = '<fn>';
        }
        else if (arg === null) {
            arg = 'null';
        }
        else if (typeof arg === 'object') {
            arg = '<object>';
        }
        else if (typeof arg === 'undefined') {
            arg = typeof arg;
        }
        return arg;
    }).join(', ');
    return `${commandName}(${callArgs})`;
}
exports.commandCallStructure = commandCallStructure;
/**
 * transforms WebDriver result for log stream to avoid unnecessary long
 * result strings e.g. if it contains a screenshot
 * @param {Object} result WebDriver response body
 */
function transformCommandLogResult(result) {
    if (typeof result.file === 'string' && isBase64(result.file)) {
        return SCREENSHOT_REPLACEMENT;
    }
    else if (typeof result.script === 'string' && isBase64(result.script)) {
        return SCRIPT_PLACEHOLDER;
    }
    else if (typeof result.script === 'string' && result.script.match(REGEX_SCRIPT_NAME)) {
        const newScript = result.script.match(REGEX_SCRIPT_NAME)[1];
        return { ...result, script: `${newScript}(...) [${Buffer.byteLength(result.script, 'utf-8')} bytes]` };
    }
    return result;
}
exports.transformCommandLogResult = transformCommandLogResult;
/**
 * checks if command argument is valid according to specificiation
 *
 * @param  {*}       arg           command argument
 * @param  {Object}  expectedType  parameter type (e.g. `number`, `string[]` or `(number|string)`)
 * @return {Boolean}               true if argument is valid
 */
function isValidParameter(arg, expectedType) {
    let shouldBeArray = false;
    if (expectedType.slice(-2) === '[]') {
        expectedType = expectedType.slice(0, -2);
        shouldBeArray = true;
    }
    /**
     * check type of each individual array element
     */
    if (shouldBeArray) {
        if (!Array.isArray(arg)) {
            return false;
        }
    }
    else {
        /**
         * transform to array to have a unified check
         */
        arg = [arg];
    }
    for (const argEntity of arg) {
        const argEntityType = getArgumentType(argEntity);
        if (!argEntityType.match(expectedType)) {
            return false;
        }
    }
    return true;
}
exports.isValidParameter = isValidParameter;
/**
 * get type of command argument
 */
function getArgumentType(arg) {
    return arg === null ? 'null' : typeof arg;
}
exports.getArgumentType = getArgumentType;
/**
 * Allows to safely require a package, it only throws if the package was found
 * but failed to load due to syntax errors
 * @param  {string} name  of package
 * @return {object}       package content
 */
function safeRequire(name) {
    var _a, _b, _c;
    let requirePath;
    try {
        /**
         * Check if cli command was called from local directory, if not require
         * the plugin from the place where the command is called. This avoids
         * issues where user have the @wdio/cli package installed globally
         * but run on a project where wdio packages are installed locally. It
         * also allows to link the package to a random place and have plugins
         * imported correctly (for dev purposes).
         */
        const localNodeModules = path_1.default.join(process.cwd(), '/node_modules');
        /* istanbul ignore if */
        if (!((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.paths.includes(localNodeModules))) {
            (_b = require === null || require === void 0 ? void 0 : require.main) === null || _b === void 0 ? void 0 : _b.paths.push(localNodeModules);
            /**
             * don't set requireOpts when running unit tests as it
             * confuses Jest require magic
             */
            const requireOpts = process.env.JEST_WORKER_ID
                ? {}
                : { paths: (_c = require === null || require === void 0 ? void 0 : require.main) === null || _c === void 0 ? void 0 : _c.paths };
            requirePath = require.resolve(name, requireOpts);
        }
        else {
            requirePath = require.resolve(name);
        }
    }
    catch (err) {
        return null;
    }
    try {
        return require(requirePath);
    }
    catch (e) {
        throw new Error(`Couldn't initialise "${name}".\n${e.stack}`);
    }
}
exports.safeRequire = safeRequire;
/**
 * is function async
 * @param  {Function} fn  function to check
 * @return {Boolean}      true provided function is async
 */
function isFunctionAsync(fn) {
    return (fn.constructor && fn.constructor.name === 'AsyncFunction') || fn.name === 'async';
}
exports.isFunctionAsync = isFunctionAsync;
/**
 * filter out arguments passed to specFn & hookFn, don't allow callbacks
 * as there is no need for user to call e.g. `done()`
 */
function filterSpecArgs(args) {
    return args.filter((arg) => typeof arg !== 'function');
}
exports.filterSpecArgs = filterSpecArgs;
/**
 * checks if provided string is Base64
 * @param  {String} str  string in base64 to check
 * @return {Boolean} true if the provided string is Base64
 */
function isBase64(str) {
    var notBase64 = new RegExp('[^A-Z0-9+\\/=]', 'i');
    if (typeof str !== 'string') {
        throw new Error('Expected string but received invalid type.');
    }
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
        return false;
    }
    const firstPaddingChar = str.indexOf('=');
    return firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && str[len - 1] === '=');
}
exports.isBase64 = isBase64;
/**
 * Helper utility to check file access
 * @param {String} file file to check access for
 * @return              true if file can be accessed
 */
const canAccess = (file) => {
    if (!file) {
        return false;
    }
    try {
        fs_1.default.accessSync(file);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.canAccess = canAccess;
/**
 * sleep
 * @param {number=0} ms number in ms to sleep
 */
const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
