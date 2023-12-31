import type { Options } from '@wdio/types';
import type { ProtocolCommands } from '@wdio/protocols';
import type { BrowserCommandsType } from './types';
type EventEmitter = (args: any) => void;
type MultiRemoteElement = {
    selector: string;
    instances: string[];
    isMultiremote: boolean;
    __propertiesObject__: Record<string, PropertyDescriptor>;
} & {
    [instanceName: string]: WebdriverIO.Element;
};
/**
 * Multiremote class
 */
export default class MultiRemote {
    instances: Record<string, WebdriverIO.Browser>;
    baseInstance?: MultiRemoteDriver;
    sessionId?: string;
    /**
     * add instance to multibrowser instance
     */
    addInstance(browserName: string, client: any): Promise<WebdriverIO.Browser>;
    /**
     * modifier for multibrowser instance
     */
    modifier(wrapperClient: {
        options: Options.WebdriverIO;
        commandList: (keyof (ProtocolCommands & BrowserCommandsType))[];
    }): any;
    /**
     * helper method to generate element objects from results, so that we can call, e.g.
     *
     * ```
     * const elem = $('#elem')
     * elem.getHTML()
     * ```
     *
     * or in case multiremote is used
     *
     * ```
     * const elems = $$('div')
     * elems[0].getHTML()
     * ```
     */
    static elementWrapper(instances: Record<string, WebdriverIO.Browser>, result: any, propertiesObject: Record<string, PropertyDescriptor>, scope: MultiRemote): MultiRemoteElement;
    /**
     * handle commands for multiremote instances
     */
    commandWrapper(commandName: keyof (ProtocolCommands & BrowserCommandsType)): (...args: any) => Promise<unknown>;
}
/**
 * event listener class that propagates events to sub drivers
 */
export declare class MultiRemoteDriver {
    instances: string[];
    isMultiremote: true;
    __propertiesObject__: Record<string, PropertyDescriptor>;
    constructor(instances: Record<string, WebdriverIO.Browser>, propertiesObject: Record<string, PropertyDescriptor>);
    on(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    once(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    emit(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): boolean;
    eventNames(this: WebdriverIO.MultiRemoteBrowser): any;
    getMaxListeners(this: WebdriverIO.MultiRemoteBrowser): number;
    listenerCount(this: WebdriverIO.MultiRemoteBrowser, eventName: string): number;
    listeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): Function[];
    removeListener(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    removeAllListeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): any;
}
export {};
//# sourceMappingURL=multiremote.d.ts.map