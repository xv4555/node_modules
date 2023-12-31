/// <reference types="node" />
import { CommandParameters, CommandPathVariables, ElementReference } from '@wdio/protocols';
import type { Logger } from '@wdio/logger';
import type { ElementHandle } from 'puppeteer-core/lib/cjs/puppeteer/common/JSHandle';
import type { Browser } from 'puppeteer-core/lib/cjs/puppeteer/common/Browser';
import type { Frame } from 'puppeteer-core/lib/cjs/puppeteer/common/FrameManager';
import type { Page } from 'puppeteer-core/lib/cjs/puppeteer/common/Page';
import type { Priorities } from './finder/firefox';
import type DevToolsDriver from './devtoolsdriver';
export declare const validate: (command: string, parameters: CommandParameters[], variables: CommandPathVariables[], ref: string, args: any[]) => Record<string, any>;
export declare function getPrototype(commandWrapper: Function): Record<string, {
    value: Function;
}>;
export declare function findElement(this: DevToolsDriver, context: Frame | Page | ElementHandle, using: string, value: string): Promise<ElementReference | Error>;
export declare function findElements(this: DevToolsDriver, context: Page | Frame | ElementHandle, using: string, value: string): Promise<ElementReference[]>;
/**
 * convert DevTools errors into WebDriver errors so tools upstream
 * can handle it in similar fashion (e.g. stale element)
 */
export declare function sanitizeError(err: Error): Error;
/**
 * transform elements in argument list to Puppeteer element handles
 */
export declare function transformExecuteArgs(this: DevToolsDriver, args?: any[]): Promise<ElementHandle | any>;
/**
 * fetch marked elements from execute script
 */
export declare function transformExecuteResult(this: DevToolsDriver, page: Page, result: any | any[]): Promise<any>;
export declare function getStaleElementError(elementId: string): Error;
/**
 * Helper function to get a list of Puppeteer pages from a Chrome browser.
 * In case many headless browser are run in parallel there are situations
 * where there are no pages because the machine is busy booting the headless
 * browser.
 *
 * @param  {Puppeteer.Browser} browser  browser instance
 * @return {Puppeteer.Page[]}           list of browser pages
 */
export declare function getPages(browser: Browser, retryInterval?: number): Promise<Page[]>;
export declare function sort(installations: string[], priorities: Priorities[]): string[];
/**
 * helper utility to clone a list
 * @param  {Any[]} arr  list of things
 * @return {Any[]}      new list of same things
 */
export declare function uniq(arr: string[]): string[];
/**
 * Look for edge executables by using the which command
 */
export declare function findByWhich(executables: string[], priorities: Priorities[]): string[];
/**
 * monkey patch debug package to log CDP messages from Puppeteer
 */
export declare function patchDebug(scoppedLogger: Logger, require?: NodeRequire): void;
export declare const sleep: (time?: number) => Promise<unknown>;
//# sourceMappingURL=utils.d.ts.map