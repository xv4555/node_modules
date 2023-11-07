/**
 *
 * Delete cookies visible to the current page. By providing a cookie name it just removes the single cookie or more when multiple names are passed.
 *
 * <example>
    :deleteCookie.js
    it('should delete cookies', async () => {
        await browser.setCookies([
            {name: 'test', value: '123'},
            {name: 'test2', value: '456'},
            {name: 'test3', value: '789'}
        ])

        let cookies = await browser.getCookies()
        console.log(cookies)
        // outputs:
        // [
        //     { name: 'test', value: '123' },
        //     { name: 'test2', value: '456' }
        //     { name: 'test3', value: '789' }
        // ]

        await browser.deleteCookies(['test3'])
        cookies = await browser.getCookies()
        console.log(cookies)
        // outputs:
        // [
        //     { name: 'test', value: '123' },
        //     { name: 'test2', value: '456' }
        // ]

        await browser.deleteCookies()
        cookies = await browser.getCookies()
        console.log(cookies) // outputs: []
    })
 * </example>
 *
 * @alias browser.deleteCookies
 * @param {String=|String[]=} names  names of cookies to be deleted
 * @uses webdriver/deleteAllCookies,webdriver/deleteCookie
 * @type cookie
 *
 */
export default function deleteCookies(this: WebdriverIO.Browser, names?: string | string[]): Promise<void> | Promise<void[]>;
//# sourceMappingURL=deleteCookies.d.ts.map