"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRemoteDriver = void 0;
const lodash_zip_1 = __importDefault(require("lodash.zip"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const utils_1 = require("@wdio/utils");
const middlewares_1 = require("./middlewares");
const utils_2 = require("./utils");
/**
 * Multiremote class
 */
class MultiRemote {
    constructor() {
        this.instances = {};
    }
    /**
     * add instance to multibrowser instance
     */
    async addInstance(browserName, client) {
        this.instances[browserName] = await client;
        return this.instances[browserName];
    }
    /**
     * modifier for multibrowser instance
     */
    modifier(wrapperClient) {
        const propertiesObject = {};
        propertiesObject.commandList = { value: wrapperClient.commandList };
        propertiesObject.options = { value: wrapperClient.options };
        for (const commandName of wrapperClient.commandList) {
            propertiesObject[commandName] = {
                value: this.commandWrapper(commandName),
                configurable: true
            };
        }
        propertiesObject['__propertiesObject__'] = {
            value: propertiesObject
        };
        this.baseInstance = new MultiRemoteDriver(this.instances, propertiesObject);
        const client = Object.create(this.baseInstance, propertiesObject);
        /**
         * attach instances to wrapper client
         */
        for (const [identifier, instance] of Object.entries(this.instances)) {
            client[identifier] = instance;
        }
        return client;
    }
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
    static elementWrapper(instances, result, propertiesObject, scope) {
        const prototype = { ...propertiesObject, ...(0, lodash_clonedeep_1.default)((0, utils_2.getPrototype)('element')), scope: { value: 'element' } };
        const element = (0, utils_1.webdriverMonad)({}, (client) => {
            /**
             * attach instances to wrapper client
             */
            for (const [i, identifier] of Object.entries(Object.keys(instances))) {
                client[identifier] = result[i];
            }
            client.instances = Object.keys(instances);
            client.isMultiremote = true;
            client.selector = result[0] ? result[0].selector : null;
            delete client.sessionId;
            return client;
        }, prototype);
        // @ts-ignore
        return element(this.sessionId, (0, middlewares_1.multiremoteHandler)(scope.commandWrapper.bind(scope)));
    }
    /**
     * handle commands for multiremote instances
     */
    commandWrapper(commandName) {
        const instances = this.instances;
        const self = this;
        return (0, utils_1.wrapCommand)(commandName, async function (...args) {
            const mElem = this;
            const scope = this.selector
                ? Object.entries(mElem.instances.reduce((ins, instanceName) => ({ ...ins, [instanceName]: mElem[instanceName] }), {}))
                : Object.entries(instances);
            const result = await Promise.all(scope.map(
            // @ts-expect-error
            ([, instance]) => instance[commandName](...args)));
            /**
             * return element object to call commands directly
             */
            if (commandName === '$') {
                const elem = MultiRemote.elementWrapper(instances, result, this.__propertiesObject__, self);
                return elem;
            }
            else if (commandName === '$$') {
                const zippedResult = (0, lodash_zip_1.default)(...result);
                return zippedResult.map((singleResult) => MultiRemote.elementWrapper(instances, singleResult, this.__propertiesObject__, self));
            }
            return result;
        });
    }
}
exports.default = MultiRemote;
/**
 * event listener class that propagates events to sub drivers
 */
/* istanbul ignore next */
class MultiRemoteDriver {
    constructor(instances, propertiesObject) {
        this.isMultiremote = true;
        this.instances = Object.keys(instances);
        this.__propertiesObject__ = propertiesObject;
    }
    on(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].on(eventName, emitter));
        return undefined;
    }
    once(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].once(eventName, emitter));
        return undefined;
    }
    emit(eventName, emitter) {
        return this.instances.map((instanceName) => this[instanceName].emit(eventName, emitter)).some(Boolean);
    }
    eventNames() {
        return this.instances.map((instanceName) => this[instanceName].eventNames()); // special behavior of event methods for multiremote
    }
    getMaxListeners() {
        return this.instances.map((instanceName) => this[instanceName].getMaxListeners()); // special behavior of event methods for multiremote
    }
    listenerCount(eventName) {
        return this.instances.map((instanceName) => this[instanceName].listenerCount(eventName)); // special behavior of event methods for multiremote
    }
    listeners(eventName) {
        return this.instances.map((instanceName) => this[instanceName].listeners(eventName)).reduce((prev, cur) => {
            prev.concat(cur);
            return prev;
        }, []);
    }
    removeListener(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].removeListener(eventName, emitter));
        return undefined;
    }
    removeAllListeners(eventName) {
        this.instances.forEach((instanceName) => this[instanceName].removeAllListeners(eventName));
        return undefined;
    }
}
exports.MultiRemoteDriver = MultiRemoteDriver;
