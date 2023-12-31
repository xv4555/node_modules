"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const network_recorder_1 = __importDefault(require("lighthouse/lighthouse-core/lib/network-recorder"));
const network_monitor_1 = __importDefault(require("lighthouse/lighthouse-core/gather/driver/network-monitor"));
const session_1 = __importDefault(require("lighthouse/lighthouse-core/fraggle-rock/gather/session"));
const wait_for_condition_1 = require("lighthouse/lighthouse-core/gather/driver/wait-for-condition");
const logger_1 = __importDefault(require("@wdio/logger"));
const registerPerformanceObserverInPage_1 = __importDefault(require("../scripts/registerPerformanceObserverInPage"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const log = (0, logger_1.default)('@wdio/devtools-service:TraceGatherer');
class TraceGatherer extends events_1.EventEmitter {
    constructor(_session, _page, _driver) {
        super();
        this._session = _session;
        this._page = _page;
        this._driver = _driver;
        this._failingFrameLoadIds = [];
        this._pageLoadDetected = false;
        this._networkListeners = {};
        this._waitConditionPromises = [];
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => {
            this._networkListeners[method] = (params) => this._networkStatusMonitor.dispatch({ method, params });
        });
        this._protocolSession = new session_1.default(_session);
        this._networkMonitor = new network_monitor_1.default(_session);
    }
    async startTracing(url) {
        /**
         * delete old trace
         */
        delete this._trace;
        /**
         * register listener for network status monitoring
         */
        this._networkStatusMonitor = new network_recorder_1.default();
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => {
            this._session.on(method, this._networkListeners[method]);
        });
        this._traceStart = Date.now();
        log.info(`Start tracing frame with url ${url}`);
        await this._driver.beginTrace();
        /**
         * if this tracing was started from a click transition
         * then we want to discard page trace if no load detected
         */
        if (url === constants_1.CLICK_TRANSITION) {
            log.info('Start checking for page load for click');
            this._clickTraceTimeout = setTimeout(async () => {
                log.info('No page load detected, canceling trace');
                return this.finishTracing();
            }, constants_1.FRAME_LOAD_START_TIMEOUT);
        }
        /**
         * register performance observer
         */
        await this._page.evaluateOnNewDocument(registerPerformanceObserverInPage_1.default);
        this._waitConditionPromises.push((0, wait_for_condition_1.waitForFullyLoaded)(this._protocolSession, this._networkMonitor, { timedOut: 1 }));
    }
    /**
     * store frame id of frames that are being traced
     */
    async onFrameNavigated(msgObj) {
        if (!this.isTracing) {
            return;
        }
        /**
         * page load failed, cancel tracing
         */
        if (this._failingFrameLoadIds.includes(msgObj.frame.id)) {
            delete this._traceStart;
            this._waitConditionPromises = [];
            this._frameId = '"unsuccessful loaded frame"';
            this.finishTracing();
            this.emit('tracingError', new Error(`Page with url "${msgObj.frame.url}" failed to load`));
            if (this._clickTraceTimeout) {
                clearTimeout(this._clickTraceTimeout);
            }
        }
        /**
         * ignore event if
         */
        if (
        // we already detected a frameId before
        this._frameId ||
            // the event was thrown for a sub frame (e.g. iframe)
            msgObj.frame.parentId ||
            // we don't support the url of given frame
            !(0, utils_1.isSupportedUrl)(msgObj.frame.url)) {
            log.info(`Ignore navigated frame with url ${msgObj.frame.url}`);
            return;
        }
        this._frameId = msgObj.frame.id;
        this._loaderId = msgObj.frame.loaderId;
        this._pageUrl = msgObj.frame.url;
        log.info(`Page load detected: ${this._pageUrl}, set frameId ${this._frameId}, set loaderId ${this._loaderId}`);
        /**
         * clear click tracing timeout if it's still waiting
         *
         * the reason we have to tie this to Page.frameNavigated instead of Page.frameStartedLoading
         * is because the latter can sometimes occur without the former, which will cause a hang
         * e.g. with duolingo's sign-in button
         */
        if (this._clickTraceTimeout && !this._pageLoadDetected) {
            log.info('Page load detected for click, clearing click trace timeout}');
            this._pageLoadDetected = true;
            clearTimeout(this._clickTraceTimeout);
        }
        this.emit('tracingStarted', msgObj.frame.id);
    }
    /**
     * once the page load event has fired, we can grab some performance
     * metrics and timing
     */
    async onLoadEventFired() {
        if (!this.isTracing) {
            return;
        }
        /**
         * Ensure that page is fully loaded and all metrics can be calculated.
         */
        const loadPromise = Promise.all(this._waitConditionPromises).then(() => async () => {
            /**
             * ensure that we trace at least for 5s to ensure that we can
             * calculate "interactive"
             */
            const minTraceTime = constants_1.TRACING_TIMEOUT - (Date.now() - (this._traceStart || 0));
            if (minTraceTime > 0) {
                log.info(`page load happen to quick, waiting ${minTraceTime}ms more`);
                await new Promise((resolve) => setTimeout(resolve, minTraceTime));
            }
            return this.completeTracing();
        });
        const cleanupFn = await Promise.race([
            loadPromise,
            this.waitForMaxTimeout()
        ]);
        this._waitConditionPromises = [];
        return cleanupFn();
    }
    onFrameLoadFail(request) {
        const frame = request.frame();
        if (frame) {
            this._failingFrameLoadIds.push(frame._id);
        }
    }
    get isTracing() {
        return typeof this._traceStart === 'number';
    }
    /**
     * once tracing has finished capture trace logs into memory
     */
    async completeTracing() {
        const traceDuration = Date.now() - (this._traceStart || 0);
        log.info(`Tracing completed after ${traceDuration}ms, capturing performance data for frame ${this._frameId}`);
        /**
         * download all tracing data
         * in case it fails, continue without capturing any data
         */
        try {
            const traceEvents = await this._driver.endTrace();
            /**
             * modify pid of renderer frame to be the same as where tracing was started
             * possibly related to https://github.com/GoogleChrome/lighthouse/issues/6968
             */
            const startedInBrowserEvt = traceEvents.traceEvents.find(e => e.name === 'TracingStartedInBrowser');
            const mainFrame = (startedInBrowserEvt &&
                startedInBrowserEvt.args &&
                startedInBrowserEvt.args['data']['frames'] &&
                startedInBrowserEvt.args['data']['frames'].find((frame) => !frame.parent));
            if (mainFrame && mainFrame.processId) {
                const threadNameEvt = traceEvents.traceEvents.find(e => e.ph === 'R' &&
                    e.cat === 'blink.user_timing' && e.name === 'navigationStart' && e.args.data.isLoadingMainFrame);
                if (threadNameEvt) {
                    log.info(`Replace mainFrame process id ${mainFrame.processId} with actual thread process id ${threadNameEvt.pid}`);
                    mainFrame.processId = threadNameEvt.pid;
                }
                else {
                    log.info(`Couldn't replace mainFrame process id ${mainFrame.processId} with actual thread process id`);
                }
            }
            this._trace = {
                ...traceEvents,
                frameId: this._frameId,
                loaderId: this._loaderId,
                pageUrl: this._pageUrl,
                traceStart: this._traceStart,
                traceEnd: Date.now()
            };
            this.emit('tracingComplete', this._trace);
            this.finishTracing();
        }
        catch (err) {
            log.error(`Error capturing tracing logs: ${err.stack}`);
            this.emit('tracingError', err);
            return this.finishTracing();
        }
    }
    /**
     * clear tracing states and emit tracingFinished
     */
    finishTracing() {
        log.info(`Tracing for ${this._frameId} completed`);
        this._pageLoadDetected = false;
        /**
         * clean up the listeners
         */
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => this._session.off(method, this._networkListeners[method]));
        delete this._networkStatusMonitor;
        delete this._traceStart;
        delete this._frameId;
        delete this._loaderId;
        delete this._pageUrl;
        this._failingFrameLoadIds = [];
        this._waitConditionPromises = [];
        this.emit('tracingFinished');
    }
    waitForMaxTimeout(maxWaitForLoadedMs = constants_1.MAX_TRACE_WAIT_TIME) {
        return new Promise((resolve) => setTimeout(resolve, maxWaitForLoadedMs)).then(() => async () => {
            log.error('Neither network nor CPU idle time could be detected within timeout, wrapping up tracing');
            return this.completeTracing();
        });
    }
}
exports.default = TraceGatherer;
