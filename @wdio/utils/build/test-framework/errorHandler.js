"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHookError = void 0;
/**
 * notify `WDIOCLInterface` about failure in hook
 * we need to do it this way because `beforeFn` and `afterFn` are not real hooks.
 * Otherwise hooks failures are lost.
 *
 * @param {string}  hookName    name of the hook
 * @param {Array}   hookResults hook functions results array
 * @param {string}  cid         cid
 */
const logHookError = (hookName, hookResults = [], cid) => {
    const result = hookResults.find(result => result instanceof Error);
    if (typeof result === 'undefined') {
        return;
    }
    /**
     * need to convert Error to plain object, otherwise it is lost on process.send
     */
    const error = { message: result.message };
    const content = {
        cid: cid,
        error: error,
        fullTitle: `${hookName} Hook`,
        type: 'hook',
        state: 'fail'
    };
    process.send({
        origin: 'reporter',
        name: 'printFailureMessage',
        content
    });
};
exports.logHookError = logHookError;
