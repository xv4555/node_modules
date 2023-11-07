import type DevToolsDriver from '../devtoolsdriver';
/**
 * The Execute Script command executes a JavaScript function in the context of the
 * current browsing context and returns the return value of the function.
 *
 * @alias browser.executeScript
 * @see https://w3c.github.io/webdriver/#dfn-execute-script
 * @param {string} script  a string, the Javascript function body you want executed
 * @param {*[]}    args    an array of JSON values which will be deserialized and passed as arguments to your function
 * @return *               Either the return value of your script, the fulfillment of the Promise returned by your script, or the error which was the reason for your script's returned Promise's rejection.
 */
export default function executeScript(this: DevToolsDriver, { script, args }: {
    script: string;
    args: any[];
}): Promise<any>;
//# sourceMappingURL=executeScript.d.ts.map