"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBabelCompiler = exports.loadTypeScriptCompiler = exports.validateTsConfigPaths = exports.loadAutoCompilers = exports.validateConfig = exports.isCloudCapability = exports.isCucumberFeatureWithLineNumber = exports.removeLineNumbers = exports.validObjectOrArray = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wdio/utils");
const logger_1 = __importDefault(require("@wdio/logger"));
const log = (0, logger_1.default)('@wdio/config:utils');
const validObjectOrArray = (object) => (Array.isArray(object) && object.length > 0) ||
    (typeof object === 'object' && Object.keys(object).length > 0);
exports.validObjectOrArray = validObjectOrArray;
/**
 * remove line numbers from file path, ex:
 * `/foo:9` or `c:\bar:14:5`
 * @param   {string} filePath path to spec file
 * @returns {string}
 */
function removeLineNumbers(filePath) {
    const matcher = filePath.match(/:\d+(:\d+$|$)/);
    if (matcher) {
        filePath = filePath.substring(0, matcher.index);
    }
    return filePath;
}
exports.removeLineNumbers = removeLineNumbers;
/**
 * does spec file path contain Cucumber's line number, ex
 * `/foo/bar:9` or `c:\bar\foo:14:5`
 * @param {string|string[]} spec
 */
function isCucumberFeatureWithLineNumber(spec) {
    const specs = Array.isArray(spec) ? spec : [spec];
    return specs.some((s) => s.match(/:\d+(:\d+$|$)/));
}
exports.isCucumberFeatureWithLineNumber = isCucumberFeatureWithLineNumber;
function isCloudCapability(caps) {
    return Boolean(caps && (caps['bstack:options'] || caps['sauce:options'] || caps['tb:options']));
}
exports.isCloudCapability = isCloudCapability;
/**
 * validates configurations based on default values
 * @param  {Object} defaults  object describing all allowed properties
 * @param  {Object} options   option to check against
 * @return {Object}           validated config enriched with default values
 */
function validateConfig(defaults, options, keysToKeep = []) {
    const params = {};
    for (const [name, expectedOption] of Object.entries(defaults)) {
        /**
         * check if options is given
         */
        if (typeof options[name] === 'undefined' && !expectedOption.default && expectedOption.required) {
            throw new Error(`Required option "${name.toString()}" is missing`);
        }
        if (typeof options[name] === 'undefined' && expectedOption.default) {
            params[name] = expectedOption.default;
        }
        if (typeof options[name] !== 'undefined') {
            const optValue = options[name];
            if (typeof optValue !== expectedOption.type) {
                throw new Error(`Expected option "${name.toString()}" to be type of ${expectedOption.type} but was ${typeof options[name]}`);
            }
            if (typeof expectedOption.validate === 'function') {
                try {
                    expectedOption.validate(optValue);
                }
                catch (e) {
                    throw new Error(`Type check for option "${name.toString()}" failed: ${e.message}`);
                }
            }
            if (typeof optValue === 'string' && expectedOption.match && !optValue.match(expectedOption.match)) {
                throw new Error(`Option "${name.toString()}" doesn't match expected values: ${expectedOption.match}`);
            }
            params[name] = options[name];
        }
    }
    for (const [name, option] of Object.entries(options)) {
        /**
         * keep keys from source object if desired
         */
        if (keysToKeep.includes(name)) {
            params[name] = option;
        }
    }
    return params;
}
exports.validateConfig = validateConfig;
function loadAutoCompilers(autoCompileConfig, requireService) {
    return (autoCompileConfig.autoCompile &&
        (loadTypeScriptCompiler(autoCompileConfig.tsNodeOpts, autoCompileConfig.tsConfigPathsOpts, requireService)
            ||
                loadBabelCompiler(autoCompileConfig.babelOpts, requireService)));
}
exports.loadAutoCompilers = loadAutoCompilers;
function validateTsConfigPaths(tsNodeOpts = {}) {
    /**
    * Checks tsconfig.json path, throws error if it doesn't exist
    */
    if (tsNodeOpts === null || tsNodeOpts === void 0 ? void 0 : tsNodeOpts.project) {
        const tsconfigPath = path_1.default.resolve(tsNodeOpts.project);
        if (!(0, utils_1.canAccess)(tsconfigPath)) {
            throw new Error('Provided tsconfig file path in wdio config is incorrect. Is it correctly set in wdio config ?');
        }
    }
}
exports.validateTsConfigPaths = validateTsConfigPaths;
function loadTypeScriptCompiler(tsNodeOpts = {}, tsConfigPathsOpts, requireService) {
    try {
        validateTsConfigPaths(tsNodeOpts);
        requireService.resolve('ts-node');
        requireService.require('ts-node').register(tsNodeOpts);
        log.debug('Found \'ts-node\' package, auto-compiling TypeScript files');
        if (tsConfigPathsOpts) {
            log.debug('Found \'tsconfig-paths\' options, register paths');
            const tsConfigPaths = require('tsconfig-paths');
            tsConfigPaths.register(tsConfigPathsOpts);
        }
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.loadTypeScriptCompiler = loadTypeScriptCompiler;
function loadBabelCompiler(babelOpts = {}, requireService) {
    try {
        requireService.resolve('@babel/register');
        /**
         * only for testing purposes
         */
        if (process.env.JEST_WORKER_ID && process.env.THROW_BABEL_REGISTER) {
            throw new Error('test fail');
        }
        requireService.require('@babel/register')(babelOpts);
        log.debug('Found \'@babel/register\' package, auto-compiling files with Babel');
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.loadBabelCompiler = loadBabelCompiler;
