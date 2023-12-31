import Interception from '.';
import type { Matches, MockResponseParams, MockOverwrite } from './types';
/**
 * Network interception class based on a WebDriver compliant endpoint.
 * Instead of directly using the CDP with Puppeteer this version of the
 * class uses a WebDriver extension to trigger the same behavior on a
 * compliant backend.
 */
export default class WebDriverInterception extends Interception {
    mockId?: string;
    init(): Promise<void>;
    /**
     * allows access to all requests made with given pattern
     */
    get calls(): Matches[] | Promise<Matches[]>;
    /**
     * Resets all information stored in the `mock.calls` set.
     */
    clear(): Promise<void> | Promise<Promise<void>>;
    /**
     * Does everything that `mock.clear()` does, and also
     * removes any mocked return values or implementations.
     */
    restore(): Promise<void> | Promise<Promise<void>>;
    /**
     * Always respond with same overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respond(overwrite: MockOverwrite, params?: MockResponseParams): Promise<void> | Promise<Promise<void>>;
    /**
     * Respond request once with given overwrite
     * @param {*} overwrites  payload to overwrite the response
     * @param {*} params      additional respond parameters to overwrite
     */
    respondOnce(overwrite: MockOverwrite, params?: MockResponseParams): Promise<void> | Promise<Promise<void>>;
    /**
     * Abort the request with an error code
     * @param {string} errorCode  error code of the response
     */
    abort(errorReason: string, sticky?: boolean): Promise<void> | Promise<Promise<void>>;
    /**
     * Abort the request once with an error code
     * @param {string} errorReason  error code of the response
     */
    abortOnce(errorReason: string): Promise<void> | Promise<Promise<void>>;
}
//# sourceMappingURL=webdriver.d.ts.map