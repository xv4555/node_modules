import type { WaitUntilOptions } from '../../types';
/**
 *
 * This wait command is your universal weapon if you want to wait on something. It expects a condition
 * and waits until that condition is fulfilled with a truthy value. If you use the WDIO testrunner the
 * commands within the condition are getting executed synchronously like in your test.
 *
 * A common example is to wait until a certain element contains a certain text (see example).
 *
 * <example>
    :example.html
    <div id="someText">I am some text</div>
    <script>
      setTimeout(() => {
        await $('#someText').html('I am now different');
      }, 1000);
    </script>

    :waitUntil.js
    it('should wait until text has changed', async () => {
        await browser.waitUntil(
            async () => (await $('#someText').getText()) === 'I am now different',
            {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );
    });
 * </example>
 *
 *
 * @alias browser.waitUntil
 * @param {Function#Boolean}  condition  condition to wait on
 * @param {WaitUntilOptions=} options    command options
 * @param {Number=}           options.timeout     timeout in ms (default: 5000)
 * @param {String=}           options.timeoutMsg  error message to throw when waitUntil times out
 * @param {Number=}           options.interval    interval between condition checks (default: 500)
 * @return {Boolean} true if condition is fulfilled
 * @uses utility/pause
 * @type utility
 *
 */
export default function waitUntil(this: WebdriverIO.Browser | WebdriverIO.Element, condition: () => boolean | Promise<boolean>, { timeout, interval, timeoutMsg }?: Partial<WaitUntilOptions>): Promise<true | void>;
//# sourceMappingURL=waitUntil.d.ts.map