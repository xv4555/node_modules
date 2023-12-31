import type { Timeouts } from '@wdio/protocols';
/**
 *
 * Sets the timeouts associated with the current session, timeout durations control such
 * behaviour as timeouts on script injection, document navigation, and element retrieval.
 * For more information and examples, see [timeouts guide](https://webdriver.io/docs/timeouts#selenium-timeouts).
 *
 * :::info
 *
 * It is not recommended to set `implicit` timeouts as they impact WebdriverIO's behavior
 * and can cause errors in certain commands, e.g. `waitForExist` with reverse flag.
 *
 * :::
 *
 * <example>
    :setTimeout.js
    it('should change timeout duration for session with long code duration', async () => {
        await browser.setTimeout({
            'pageLoad': 10000,
            'script': 60000
        });
        // Execute code which takes a long time
        await browser.executeAsync((done) => {
            console.log('Wake me up before you go!');
            setTimeout(done, 59000);
        });
    });
 * </example>
 *
 * @param {Timeouts}  timeouts            Object containing session timeout values
 * @param {Number=}   timeouts.implicit  Time in milliseconds to retry the element location strategy when finding an element.
 * @param {Number=}   timeouts.pageLoad  Time in milliseconds to wait for the document to finish loading.
 * @param {Number=}   timeouts.script    Scripts injected with [`execute`](https://webdriver.io/docs/api/browser/execute) or [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) will run until they hit the script timeout duration, which is also given in milliseconds.
 * @see https://w3c.github.io/webdriver/#set-timeouts
 *
 */
export default function setTimeout(this: WebdriverIO.Browser, timeouts: Partial<Timeouts>): Promise<void>;
//# sourceMappingURL=setTimeout.d.ts.map