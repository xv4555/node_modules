/**
 * Uploads a file to the Selenium Standalone server or other browser driver
 * (e.g. Chromedriver) by using the [`file`](https://webdriver.io/docs/api/selenium#file) command.
 * _Note:_ that this command is only supported if you use a Selenium Hub or
 * Chromedriver directly.
 *
 * __Note:__ this command uses an un-offical protocol feature that is currently
 * only supported in Chrome and when running a [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).
 *
 * <example>
    :uploadFile.js
    const path = require('path');

    it('should upload a file', async () => {
        await browser.url('https://the-internet.herokuapp.com/upload')

        const filePath = '/path/to/some/file.png'
        const remoteFilePath = await browser.uploadFile(filePath)

        await $('#file-upload').setValue(remoteFilePath)
        await $('#file-submit').click()
    });
 * </example>
 *
 * @alias browser.uploadFile
 * @param {String} localPath local path to file
 * @type utility
 * @uses protocol/file
 * @return {String} remote URL
 */
export default function uploadFile(this: WebdriverIO.Browser, localPath: string): Promise<string>;
//# sourceMappingURL=uploadFile.d.ts.map