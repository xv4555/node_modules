import { Browser as PuppeteerBrowser } from 'puppeteer-core/lib/cjs/puppeteer/common/Browser';
/**
 * Get the [Puppeteer Browser instance](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
 * to run commands with Puppeteer. Note that all Puppeteer commands are
 * asynchronous by default so in order to interchange between sync and async
 * execution make sure to wrap your Puppeteer calls within a `browser.call`
 * commands as shown in the example.
 *
 * :::info
 *
 * Note that using Puppeteer requires support for Chrome DevTools protocol and e.g.
 * can not be used when running automated tests in the cloud. Find out more in the
 * [Automation Protocols](/docs/automationProtocols) section.
 *
 * :::
 *
 * <example>
    :getPuppeteer.test.js
    it('should allow me to use Puppeteer', async () => {
        // WebDriver command
        await browser.url('https://webdriver.io')

        const puppeteerBrowser = await browser.getPuppeteer()
        // switch to Puppeteer
        const metrics = await browser.call(async () => {
            const pages = await puppeteerBrowser.pages()
            pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
            return pages[0].metrics()
        })

        console.log(metrics.LayoutCount) // returns LayoutCount value
    })
 * </example>
 *
 * @return {PuppeteerBrowser}  initiated puppeteer instance connected to the browser
 */
export default function getPuppeteer(this: WebdriverIO.Browser): Promise<PuppeteerBrowser>;
//# sourceMappingURL=getPuppeteer.d.ts.map