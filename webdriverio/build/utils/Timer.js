"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@wdio/utils");
const TIMEOUT_ERROR = 'timeout';
const NOOP = () => { };
/**
 * Promise-based Timer. Execute fn every tick.
 * When fn is resolved — timer will stop
 * @param {Number} delay - delay between ticks
 * @param {Number} timeout - after that time timer will stop
 * @param {Function} fn - function that returns promise. will execute every tick
 * @param {Boolean} leading - should be function invoked on start
 * @return {promise} Promise-based Timer.
 */
class Timer {
    constructor(_delay, _timeout, _fn, _leading = false) {
        this._delay = _delay;
        this._timeout = _timeout;
        this._fn = _fn;
        this._leading = _leading;
        this._conditionExecutedCnt = 0;
        this._resolve = NOOP;
        this._reject = NOOP;
        this._ticks = 0;
        /**
         * only wrap waitUntil condition if:
         *  - wdio-sync is installed
         *  - function name is not async
         *  - we run with the wdio testrunner
         */
        if (utils_1.hasWdioSyncSupport && !_fn.name.includes('async') && Boolean(global.browser)) {
            this._fn = () => (0, utils_1.runFnInFiberContext)(_fn)();
        }
        const retPromise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._start();
        return retPromise;
    }
    _start() {
        this._startTime = Date.now();
        emitTimerEvent({ id: this._startTime, start: true });
        if (this._leading) {
            this._tick();
        }
        else {
            this._timeoutId = setTimeout(this._tick.bind(this), this._delay);
        }
        this._mainTimeoutId = setTimeout(() => {
            /**
             * make sure that condition was executed at least once
             */
            if (!this._wasConditionExecuted()) {
                return;
            }
            emitTimerEvent({ id: this._startTime, timeout: true });
            const reason = this._lastError || new Error(TIMEOUT_ERROR);
            this._reject(reason);
            this._stop();
        }, this._timeout);
    }
    _stop() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
        delete this._timeoutId;
    }
    _stopMain() {
        emitTimerEvent({ id: this._startTime });
        if (this._mainTimeoutId) {
            clearTimeout(this._mainTimeoutId);
        }
    }
    _tick() {
        const result = this._fn();
        if (typeof result.then !== 'function') {
            if (!result) {
                return this._checkCondition(new Error('return value was never truthy'));
            }
            return this._checkCondition(undefined, result);
        }
        result.then((res) => this._checkCondition(undefined, res), (err) => this._checkCondition(err));
    }
    _checkCondition(err, res) {
        ++this._conditionExecutedCnt;
        this._lastError = err;
        // resolve timer only on truthy values
        if (res) {
            this._resolve(res);
            this._stop();
            this._stopMain();
            return;
        }
        // autocorrect timer
        let diff = (Date.now() - (this._startTime || 0)) - (this._ticks++ * this._delay);
        let delay = Math.max(0, this._delay - diff);
        // clear old timeoutID
        this._stop();
        // check if we have time to one more tick
        if (this._hasTime(delay)) {
            this._timeoutId = setTimeout(this._tick.bind(this), delay);
        }
        else {
            this._stopMain();
            const reason = this._lastError || new Error(TIMEOUT_ERROR);
            this._reject(reason);
        }
    }
    _hasTime(delay) {
        return (Date.now() - (this._startTime || 0) + delay) <= this._timeout;
    }
    _wasConditionExecuted() {
        return this._conditionExecutedCnt > 0;
    }
}
/**
 * emit `WDIO_TIMER` event
 * @param   {object}  payload
 */
function emitTimerEvent(payload) {
    if (utils_1.hasWdioSyncSupport) {
        process.emit('WDIO_TIMER', payload);
    }
}
exports.default = Timer;
