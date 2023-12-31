"use strict";
/**
 * used to wrap mocha, jasmine test frameworks functions (`it`, `beforeEach` and other)
 * with WebdriverIO before/after Test/Hook hooks.
 * Entrypoint is `runTestInFiberContext`, other functions are exported for testing purposes.
 *
 * NOTE: not used by cucumber test framework. `testFnWrapper` is called directly there
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTestInFiberContext = exports.wrapTestFunction = exports.runSpec = exports.runHook = void 0;
const utils_1 = require("../utils");
const testFnWrapper_1 = require("./testFnWrapper");
const MOCHA_COMMANDS = ['skip', 'only'];
/**
 * runs a hook within fibers context (if function name is not async)
 * it also executes before/after hook
 *
 * @param  {Function} hookFn        function that was passed to the framework hook
 * @param  {Function} origFn        original framework hook function
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterArgsFn   function that returns args for `afterFn`
 * @param  {String}   cid           cid
 * @param  {Number}   repeatTest    number of retries if hook fails
 * @return {Function}               wrapped framework hook function
 */
const runHook = function (hookFn, origFn, beforeFn, beforeFnArgs, afterFn, afterFnArgs, cid, repeatTest, timeout) {
    return origFn(function (...hookFnArgs) {
        return testFnWrapper_1.testFnWrapper.call(this, 'Hook', {
            specFn: hookFn,
            specFnArgs: (0, utils_1.filterSpecArgs)(hookFnArgs)
        }, {
            beforeFn,
            beforeFnArgs
        }, {
            afterFn,
            afterFnArgs
        }, cid, repeatTest);
    }, timeout);
};
exports.runHook = runHook;
/**
 * runs a spec function (test function) within the fibers context
 *
 * @param  {string}   specTitle     test description
 * @param  {Function} specFn        test function that got passed in from the user
 * @param  {Function} origFn        original framework test function
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterFnArgs   function that returns args for `afterFn`
 * @param  {String}   cid           cid
 * @param  {Number}   repeatTest    number of retries if test fails
 * @return {Function}               wrapped test function
 */
const runSpec = function (specTitle, specFn, origFn, beforeFn, beforeFnArgs, afterFn, afterFnArgs, cid, repeatTest, timeout) {
    return origFn(specTitle, function (...specFnArgs) {
        return testFnWrapper_1.testFnWrapper.call(this, 'Test', {
            specFn,
            specFnArgs: (0, utils_1.filterSpecArgs)(specFnArgs)
        }, {
            beforeFn,
            beforeFnArgs
        }, {
            afterFn,
            afterFnArgs
        }, cid, repeatTest);
    }, timeout);
};
exports.runSpec = runSpec;
/**
 * wraps hooks and test function of a framework within a fiber context
 *
 * @param  {Function} origFn               original framework function
 * @param  {Boolean}  isSpec               whether or not origFn is a spec
 * @param  {String[]} testInterfaceFnNames command that runs specs, e.g. `it`, `it.only` or `fit`
 * @param  {Function} beforeFn             before hook
 * @param  {Function} beforeFnArgs         function that returns args for `beforeFn`
 * @param  {Function} afterFn              after hook
 * @param  {Function} afterArgsFn          function that returns args for `afterFn`
 * @param  {String}   cid                  cid
 * @return {Function}                      wrapped test/hook function
 */
const wrapTestFunction = function (origFn, isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid) {
    return function (...specArguments) {
        var _a;
        /**
         * Variadic arguments:
         * [title, fn], [title], [fn]
         * [title, fn, retryCnt], [title, retryCnt], [fn, retryCnt]
         */
        let retryCnt = typeof specArguments[specArguments.length - 1] === 'number'
            ? specArguments.pop() :
            0;
        /**
         * Jasmine uses a timeout value as last parameter, in this case the arguments
         * should be [title, fn, timeout, retryCnt]
         */
        let timeout = (_a = global.jasmine) === null || _a === void 0 ? void 0 : _a.DEFAULT_TIMEOUT_INTERVAL;
        if (global.jasmine) {
            // if we have [title, fn, timeout, retryCnt]
            if (typeof specArguments[specArguments.length - 1] === 'number') {
                timeout = specArguments.pop();
                // if we have [title, fn, timeout]
            }
            else {
                timeout = retryCnt;
                retryCnt = 0;
            }
        }
        const specFn = typeof specArguments[0] === 'function' ? specArguments.shift()
            : (typeof specArguments[1] === 'function' ? specArguments[1] : undefined);
        const specTitle = specArguments[0];
        if (isSpec) {
            if (specFn) {
                return (0, exports.runSpec)(specTitle, specFn, origFn, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid, retryCnt, timeout);
            }
            /**
             * if specFn is undefined we are dealing with a pending function
             */
            return origFn(specTitle);
        }
        return (0, exports.runHook)(specFn, origFn, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid, retryCnt, timeout);
    };
};
exports.wrapTestFunction = wrapTestFunction;
/**
 * Wraps global test function like `it` so that commands can run synchronouse
 *
 * The scope parameter is used in the qunit framework since all functions are bound to global.QUnit instead of global
 *
 * @param  {boolean}  isTest        is `origFn` test function, otherwise hook
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterArgsFn   function that returns args for `afterFn`
 * @param  {String}   fnName        test interface command to wrap, e.g. `beforeEach`
 * @param  {String}   cid           cid
 * @param  {Object}   scope         the scope to run command from, defaults to global
 */
const runTestInFiberContext = function (isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, fnName, cid, scope = global) {
    const origFn = scope[fnName];
    scope[fnName] = (0, exports.wrapTestFunction)(origFn, isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid);
    addMochaCommands(origFn, scope[fnName]);
};
exports.runTestInFiberContext = runTestInFiberContext;
/**
 * support `it.skip` and `it.only` for the Mocha framework
 * @param {Function} origFn original function
 * @param {function} newFn  wrapped function
 */
function addMochaCommands(origFn, newFn) {
    MOCHA_COMMANDS.forEach((commandName) => {
        if (typeof origFn[commandName] === 'function') {
            newFn[commandName] = origFn[commandName];
        }
    });
}
