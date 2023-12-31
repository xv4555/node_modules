"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterStackTrace = exports.testFrameworkFnWrapper = exports.testFnWrapper = void 0;
const utils_1 = require("../utils");
const errorHandler_1 = require("./errorHandler");
const shim_1 = require("../shim");
const STACKTRACE_FILTER = [
    'node_modules/webdriver/',
    'node_modules/webdriverio/',
    'node_modules/@wdio/',
    '(internal/process/task',
];
/**
 * wraps test framework spec/hook function with WebdriverIO before/after hooks
 *
 * @param   {string} type           Test/Step or Hook
 * @param   {object} spec           specFn and specFnArgs
 * @param   {object} before         beforeFn and beforeFnArgs
 * @param   {object} after          afterFn and afterFnArgs
 * @param   {string} cid            cid
 * @param   {number} repeatTest     number of retries if test fails
 * @return  {*}                     specFn result
 */
const testFnWrapper = function (...args) {
    return exports.testFrameworkFnWrapper.call(this, { executeHooksWithArgs: shim_1.executeHooksWithArgs, executeAsync: shim_1.executeAsync, runSync: shim_1.runSync }, ...args);
};
exports.testFnWrapper = testFnWrapper;
/**
 * wraps test framework spec/hook function with WebdriverIO before/after hooks
 *
 * @param   {object} wrapFunctions  executeHooksWithArgs, executeAsync, runSync
 * @param   {string} type           Test/Step or Hook
 * @param   {object} spec           specFn and specFnArgs array
 * @param   {object} before         beforeFn and beforeFnArgs function
 * @param   {object} after          afterFn and afterFnArgs function
 * @param   {string} cid            cid
 * @param   {number} repeatTest     number of retries if test fails
 * @return  {*}                     specFn result
 */
const testFrameworkFnWrapper = async function ({ executeHooksWithArgs, executeAsync, runSync }, type, { specFn, specFnArgs }, { beforeFn, beforeFnArgs }, { afterFn, afterFnArgs }, cid, repeatTest = 0) {
    const retries = { attempts: 0, limit: repeatTest };
    const beforeArgs = beforeFnArgs(this);
    await (0, errorHandler_1.logHookError)(`Before${type}`, await executeHooksWithArgs(`before${type}`, beforeFn, beforeArgs), cid);
    let promise;
    let result;
    let error;
    /**
     * user wants handle async command using promises, no need to wrap in fiber context
     */
    if ((0, utils_1.isFunctionAsync)(specFn) || !runSync) {
        promise = executeAsync.call(this, specFn, retries, specFnArgs);
    }
    else {
        promise = new Promise(runSync.call(this, specFn, retries, specFnArgs));
    }
    const testStart = Date.now();
    try {
        result = await promise;
    }
    catch (err) {
        if (err.stack) {
            err.stack = (0, exports.filterStackTrace)(err.stack);
        }
        error = err;
    }
    const duration = Date.now() - testStart;
    let afterArgs = afterFnArgs(this);
    /**
     * ensure errors are caught in Jasmine tests too
     * (in Jasmine failing assertions are not causing the test to throw as
     * oppose to other common assertion libraries like chai)
     */
    if (!error && afterArgs[0] && afterArgs[0].failedExpectations && afterArgs[0].failedExpectations.length) {
        error = afterArgs[0].failedExpectations[0];
    }
    afterArgs.push({
        retries,
        error,
        result,
        duration,
        passed: !error
    });
    await (0, errorHandler_1.logHookError)(`After${type}`, await executeHooksWithArgs(`after${type}`, afterFn, [...afterArgs]), cid);
    if (error && !error.matcherName) {
        throw error;
    }
    return result;
};
exports.testFrameworkFnWrapper = testFrameworkFnWrapper;
/**
 * Filter out internal stacktraces. exporting to allow testing of the function
 * @param   {string} stack Stacktrace
 * @returns {string}
 */
const filterStackTrace = (stack) => {
    return stack
        .split('\n')
        .filter(line => !STACKTRACE_FILTER.some(l => line.includes(l)))
        .join('\n');
};
exports.filterStackTrace = filterStackTrace;
