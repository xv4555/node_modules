/**
 *
 * The `custom$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`
 *
 * <example>
    :example.js
    it('should fetch the project title', async () => {
        await browser.url('https://webdriver.io')
        browser.addLocatorStrategy('myStrat', (selector) => {
            return document.querySelectorAll(selector)
        })

        const projectTitle = await browser.custom$('myStrat', '.projectTitle')

        console.log(await projectTitle.getText()) // WEBDRIVER I/O
    })
 * </example>
 *
 * @alias custom$
 * @param {String} strategyName
 * @param {Any} strategyArguments
 * @return {Element}
 */
export default function custom$(this: WebdriverIO.Browser, strategyName: string, ...strategyArguments: any[]): Promise<WebdriverIO.Element>;
//# sourceMappingURL=custom$.d.ts.map