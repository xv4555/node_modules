/**
 *
 * Retrieve a [cookie](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
 * visible to the current page. You can query a specific cookie by providing the cookie name or
 * retrieve all.
 *
 * <example>
    :getCookies.js
    it('should return a cookie for me', async () => {
        await browser.setCookies([
            {name: 'test', value: '123'},
            {name: 'test2', value: '456'}
        ])
        const testCookie = await browser.getCookies(['test'])
        console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

        const allCookies = await browser.getCookies()
        console.log(allCookies);
        // outputs:
        // [
        //    { name: 'test', value: '123' },
        //    { name: 'test2', value: '456' }
        // ]
    })
 * </example>
 *
 * @alias browser.getCookies
 * @param {String[]=|String=}   names  names of requested cookies (if omitted, all cookies will be returned)
 * @return {WebDriver.Cookie[]}        requested cookies if existing
 * @uses webdriver/getAllCookies
 *
 */
export default function getCookies(this: WebdriverIO.Browser, names?: string | string[]): Promise<import("@wdio/protocols").Cookie[]>;
//# sourceMappingURL=getCookies.d.ts.map