"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("@wdio/logger"));
const _1 = __importDefault(require("."));
const __1 = require("..");
const constants_1 = require("../../constants");
const log = (0, logger_1.default)('webdriverio');
class DevtoolsInterception extends _1.default {
    static handleRequestInterception(client, mocks) {
        return async (event) => {
            // responseHeaders and responseStatusCode are only present in Response stage
            // https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#event-requestPaused
            const isRequest = !event.responseHeaders;
            const eventResponseHeaders = event.responseHeaders || [];
            const responseHeaders = eventResponseHeaders.reduce((headers, { name, value }) => {
                headers[name] = value;
                return headers;
            }, {});
            const { requestId, request, responseStatusCode = 200 } = event;
            for (const mock of mocks) {
                /**
                 * skip response mocks in Request stage
                 */
                if (isRequest && (mock.respondOverwrites.length === 0 || // nothing to do in Request stage
                    (!mock.respondOverwrites[0].errorReason && // skip if not going to abort a request
                        // or want to fetch response
                        mock.respondOverwrites[0].params &&
                        mock.respondOverwrites[0].params.fetchResponse !== false))) {
                    continue;
                }
                /**
                 * match mock url
                 */
                if (!_1.default.isMatchingRequest(mock.url, request.url)) {
                    continue;
                }
                /**
                 * Add statusCode and responseHeaders to request to be used in expect-webdriverio
                 */
                request.statusCode = responseStatusCode;
                request.responseHeaders = { ...responseHeaders };
                /**
                 * match filter options
                 */
                if (filterMethod(request.method, mock.filterOptions.method) ||
                    filterHeaders(request.headers, mock.filterOptions.requestHeaders) ||
                    filterHeaders(responseHeaders, mock.filterOptions.headers) ||
                    filterRequest(request.postData, mock.filterOptions.postData) ||
                    filterStatusCode(responseStatusCode, mock.filterOptions.statusCode)) {
                    continue;
                }
                const { body, base64Encoded = undefined } = isRequest ? { body: '' } : await client.send('Fetch.getResponseBody', { requestId }).catch(/* istanbul ignore next */ () => ({}));
                request.body = base64Encoded ? Buffer.from(body, 'base64').toString('utf8') : body;
                const contentTypeHeader = Object.keys(responseHeaders).find(h => h.toLowerCase() === 'content-type') || '';
                const responseContentType = responseHeaders[contentTypeHeader];
                request.body = responseContentType && responseContentType.includes('application/json')
                    ? tryParseJson(request.body)
                    : request.body;
                mock.matches.push(request);
                /**
                 * no stubbing if no overwrites were defined
                 */
                if (mock.respondOverwrites.length === 0) {
                    continue;
                }
                const { errorReason, overwrite, params = {} } = mock.respondOverwrites[0].sticky
                    ? mock.respondOverwrites[0]
                    : mock.respondOverwrites.shift() || {};
                /**
                 * when response is modified
                 */
                if (overwrite !== undefined) {
                    let newBody = overwrite;
                    if (typeof overwrite === 'function') {
                        newBody = await overwrite(request, client);
                    }
                    const isBodyUndefined = typeof newBody === 'undefined';
                    if (isBodyUndefined) {
                        newBody = '';
                    }
                    if (typeof newBody !== 'string') {
                        newBody = JSON.stringify(newBody);
                    }
                    let responseCode = typeof params.statusCode === 'function' ? params.statusCode(request) : params.statusCode || responseStatusCode;
                    let responseHeaders = [
                        ...eventResponseHeaders,
                        ...Object.entries(typeof params.headers === 'function' ? params.headers(request) : params.headers || {}).map(([name, value]) => ({ name, value }))
                    ];
                    /**
                     * check if local file and load it
                     */
                    const responseFilePath = path_1.default.isAbsolute(newBody) ? newBody : path_1.default.join(process.cwd(), newBody);
                    if (newBody.length > 0 && await fs_extra_1.default.pathExists(responseFilePath) && await canAccess(responseFilePath)) {
                        newBody = await fs_extra_1.default.readFile(responseFilePath);
                    }
                    else if (newBody.startsWith('http')) {
                        responseCode = 301;
                        /**
                         * filter out possible available location header
                         */
                        responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== 'location');
                        responseHeaders.push({ name: 'Location', value: newBody });
                    }
                    request.mockedResponse = newBody;
                    return client.send('Fetch.fulfillRequest', {
                        requestId,
                        responseCode,
                        responseHeaders,
                        /** do not mock body if it's undefined */
                        body: isBodyUndefined ? undefined : (newBody instanceof Buffer ? newBody : Buffer.from(newBody, 'utf8')).toString('base64')
                    }).catch(/* istanbul ignore next */ logFetchError);
                }
                /**
                 * when request is aborted
                 */
                if (errorReason) {
                    return client.send('Fetch.failRequest', {
                        requestId,
                        errorReason
                    }).catch(/* istanbul ignore next */ logFetchError);
                }
            }
            return client.send('Fetch.continueRequest', { requestId }).catch(/* istanbul ignore next */ logFetchError);
        };
    }
    /**
     * allows access to all requests made with given pattern
     */
    get calls() {
        return this.matches;
    }
    /**
     * Resets all information stored in the `mock.calls` set.
     */
    clear() {
        this.matches = [];
    }
    /**
     * Does everything that `mock.clear()` does, and also
     * removes any mocked return values or implementations.
     */
    restore() {
        this.clear();
        this.respondOverwrites = [];
    }
    /**
     * Always respond with same overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respond(overwrite, params = {}) {
        this.respondOverwrites.push({ overwrite, params, sticky: true });
    }
    /**
     * Respond request once with given overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respondOnce(overwrite, params = {}) {
        this.respondOverwrites.push({ overwrite, params });
    }
    /**
     * Abort the request with an error code
     * @param {string} errorCode  error code of the response
     */
    abort(errorReason, sticky = true) {
        if (typeof errorReason !== 'string' || !constants_1.ERROR_REASON.includes(errorReason)) {
            throw new Error(`Invalid value for errorReason, allowed are: ${constants_1.ERROR_REASON.join(', ')}`);
        }
        this.respondOverwrites.push({ errorReason, sticky });
    }
    /**
     * Abort the request once with an error code
     * @param {string} errorReason  error code of the response
     */
    abortOnce(errorReason) {
        this.abort(errorReason, false);
    }
}
exports.default = DevtoolsInterception;
const filterMethod = (method, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(method) !== true;
    }
    return expected.toLowerCase() !== method.toLowerCase();
};
const filterHeaders = (responseHeaders, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(responseHeaders) !== true;
    }
    return !(0, __1.containsHeaderObject)(responseHeaders, expected);
};
const filterRequest = (postData, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(postData) !== true;
    }
    return postData !== expected;
};
const filterStatusCode = (statusCode, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(statusCode) !== true;
    }
    return statusCode !== expected;
};
/**
 * Helper utility to check file access
 * @param {String} file file to check access for
 * @return              Promise<true> if file can be accessed
 */
const canAccess = async (filepath) => {
    try {
        await fs_extra_1.default.access(filepath);
        return true;
    }
    catch {
        return false;
    }
};
const tryParseJson = (body) => {
    try {
        return JSON.parse(body) || body;
    }
    catch {
        return body;
    }
};
const logFetchError = (err) => {
    /* istanbul ignore next */
    log.debug(err === null || err === void 0 ? void 0 : err.message);
};
