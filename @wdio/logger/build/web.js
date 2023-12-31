"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
const LOG_METHODS = ['error', 'warn', 'info', 'debug', 'trace', 'silent'];
function getLogger(component) {
    return LOG_METHODS.reduce((acc, cur) => {
        const prop = cur;
        // check if the method is available on console (web doesn't have
        // 'silent', for example) before adding to acc
        // eslint-disable-next-line no-console
        if (console[prop]) {
            // eslint-disable-next-line no-console
            // @ts-ignore
            acc[prop] = console[prop].bind(console, `${component}:`);
        }
        return acc;
    }, {});
}
exports.default = getLogger;
// logging interface expects a 'setLevel' method
getLogger.setLevel = () => { };
getLogger.setLogLevelsConfig = () => { };
getLogger.waitForBuffer = () => { };
getLogger.clearLogger = () => { };
