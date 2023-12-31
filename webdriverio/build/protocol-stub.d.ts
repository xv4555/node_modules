import type { Options } from '@wdio/types';
import type { AttachOptions } from 'webdriver';
/**
 * create `browser` object with capabilities and environment flags before session is started
 * so that Mocha/Jasmine users can filter their specs based on flags or use capabilities in test titles
 */
export default class ProtocolStub {
    static newSession(options: Options.WebDriver): Promise<Record<string, any>>;
    /**
     * added just in case user wants to somehow reload webdriver or devtools session
     * before it was started.
     */
    static reloadSession(): void;
    static attachToSession(options: AttachOptions, modifier?: (...args: any[]) => any): Record<string, any> | Promise<Record<string, any>>;
}
//# sourceMappingURL=protocol-stub.d.ts.map