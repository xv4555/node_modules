"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SevereServiceError = exports.multiremote = exports.attach = exports.remote = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const webdriver_1 = __importDefault(require("webdriver"));
const webdriver_2 = require("webdriver");
const config_1 = require("@wdio/config");
const utils_1 = require("@wdio/utils");
const multiremote_1 = __importDefault(require("./multiremote"));
const SevereServiceError_1 = __importDefault(require("./utils/SevereServiceError"));
const detectBackend_1 = __importDefault(require("./utils/detectBackend"));
const constants_1 = require("./constants");
const utils_2 = require("./utils");
/**
 * A method to create a new session with WebdriverIO.
 *
 * <b>
 * NOTE: If you hit "error TS2694: Namespace 'global.WebdriverIO' has no exported member 'Browser'" when using typescript,
 * add "webdriverio/async" into tsconfig.json's "types" array will solve it: <code> { "compilerOptions": { "types": ["webdriverio/async"] } } </code>
 * </b>
 *
 * @param  {Object} [params={}]       Options to create the session with
 * @param  {function} remoteModifier  Modifier function to change the monad object
 * @return {object}                   browser object with sessionId
 * @see <a href="https://webdriver.io/docs/typescript">Typescript setup</a>
 */
const remote = async function (params, remoteModifier) {
    logger_1.default.setLogLevelsConfig(params.logLevels, params.logLevel);
    const config = (0, config_1.validateConfig)(constants_1.WDIO_DEFAULTS, params, Object.keys(webdriver_2.DEFAULTS));
    const automationProtocol = await (0, utils_2.getAutomationProtocol)(config);
    const modifier = (client, options) => {
        /**
         * overwrite instance options with default values of the protocol
         * package (without undefined properties)
         */
        Object.assign(options, Object.entries(config)
            .reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {}));
        if (typeof remoteModifier === 'function') {
            client = remoteModifier(client, options);
        }
        options.automationProtocol = automationProtocol;
        return client;
    };
    const prototype = (0, utils_2.getPrototype)('browser');
    const ProtocolDriver = (await Promise.resolve(`${automationProtocol}`).then(s => __importStar(require(s)))).default;
    params = Object.assign({}, (0, detectBackend_1.default)(params), params);
    await (0, utils_2.updateCapabilities)(params, automationProtocol);
    const instance = await ProtocolDriver.newSession(params, modifier, prototype, utils_1.wrapCommand);
    /**
     * we need to overwrite the original addCommand and overwriteCommand
     * in order to wrap the function within Fibers (only if webdriverio
     * is used with @wdio/cli)
     */
    if (params.framework && !(0, utils_2.isStub)(automationProtocol)) {
        const origAddCommand = instance.addCommand.bind(instance);
        instance.addCommand = (name, fn, attachToElement) => (origAddCommand(name, (0, utils_1.runFnInFiberContext)(fn), attachToElement));
        const origOverwriteCommand = instance.overwriteCommand.bind(instance);
        instance.overwriteCommand = (name, fn, attachToElement) => (origOverwriteCommand(name, (0, utils_1.runFnInFiberContext)(fn), attachToElement));
    }
    instance.addLocatorStrategy = (0, utils_2.addLocatorStrategyHandler)(instance);
    return instance;
};
exports.remote = remote;
const attach = async function (attachOptions) {
    var _a, _b;
    /**
     * copy instances properties into new object
     */
    const params = {
        ...attachOptions,
        options: { ...attachOptions.options },
        ...(0, detectBackend_1.default)(attachOptions),
        requestedCapabilities: attachOptions.requestedCapabilities
    };
    const prototype = (0, utils_2.getPrototype)('browser');
    let automationProtocol = 'webdriver';
    if ((_a = params.options) === null || _a === void 0 ? void 0 : _a.automationProtocol) {
        automationProtocol = (_b = params.options) === null || _b === void 0 ? void 0 : _b.automationProtocol;
    }
    const ProtocolDriver = (await Promise.resolve(`${automationProtocol}`).then(s => __importStar(require(s)))).default;
    return ProtocolDriver.attachToSession(params, undefined, prototype, utils_1.wrapCommand);
};
exports.attach = attach;
/**
 * WebdriverIO allows you to run multiple automated sessions in a single test.
 * This is handy when you’re testing features that require multiple users (for example, chat or WebRTC applications).
 *
 * Instead of creating a couple of remote instances where you need to execute common commands like newSession() or url() on each instance,
 * you can simply create a multiremote instance and control all browsers at the same time.
 *
 * <b>
 * NOTE: Multiremote is not meant to execute all your tests in parallel.
 * It is intended to help coordinate multiple browsers and/or mobile devices for special integration tests (e.g. chat applications).
 * </b>
 *
 * @param params capabilities to choose desired devices.
 * @param automationProtocol
 * @return All remote instances, the first result represents the capability defined first in the capability object,
 * the second result the second capability and so on.
 *
 * @see <a href="https://webdriver.io/docs/multiremote">External document and example usage</a>.
 */
const multiremote = async function (params, { automationProtocol } = {}) {
    const multibrowser = new multiremote_1.default();
    const browserNames = Object.keys(params);
    /**
     * create all instance sessions
     */
    await Promise.all(browserNames.map(async (browserName) => {
        const instance = await (0, exports.remote)(params[browserName]);
        return multibrowser.addInstance(browserName, instance);
    }));
    /**
     * use attachToSession capability to wrap instances around blank pod
     */
    const prototype = (0, utils_2.getPrototype)('browser');
    const sessionParams = (0, utils_2.isStub)(automationProtocol) ? undefined : {
        sessionId: '',
        isW3C: multibrowser.instances[browserNames[0]].isW3C,
        logLevel: multibrowser.instances[browserNames[0]].options.logLevel
    };
    const ProtocolDriver = automationProtocol && (0, utils_2.isStub)(automationProtocol)
        ? require(automationProtocol).default
        : webdriver_1.default;
    const driver = ProtocolDriver.attachToSession(sessionParams, multibrowser.modifier.bind(multibrowser), prototype, utils_1.wrapCommand);
    /**
     * in order to get custom command overwritten or added to multiremote instance
     * we need to pass in the prototype of the multibrowser
     */
    if (!(0, utils_2.isStub)(automationProtocol)) {
        const origAddCommand = driver.addCommand.bind(driver);
        driver.addCommand = (name, fn, attachToElement) => {
            return origAddCommand(name, (0, utils_1.runFnInFiberContext)(fn), attachToElement, Object.getPrototypeOf(multibrowser.baseInstance), multibrowser.instances);
        };
        const origOverwriteCommand = driver.overwriteCommand.bind(driver);
        driver.overwriteCommand = (name, fn, attachToElement) => {
            return origOverwriteCommand(name, (0, utils_1.runFnInFiberContext)(fn), attachToElement, Object.getPrototypeOf(multibrowser.baseInstance), multibrowser.instances);
        };
    }
    driver.addLocatorStrategy = (0, utils_2.addLocatorStrategyHandler)(driver);
    return driver;
};
exports.multiremote = multiremote;
exports.SevereServiceError = SevereServiceError_1.default;
__exportStar(require("./types"), exports);
__exportStar(require("./utils/interception/types"), exports);
