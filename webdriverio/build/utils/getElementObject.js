"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElements = exports.getElement = void 0;
const utils_1 = require("@wdio/utils");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const _1 = require(".");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
/**
 * transforms a findElement response into a WDIO element
 * @param  {String} selector  selector that was used to query the element
 * @param  {Object} res       findElement response
 * @return {Object}           WDIO element object
 */
const getElement = function findElement(selector, res, isReactElement = false) {
    const browser = (0, _1.getBrowserObject)(this);
    const propertiesObject = {
        ...(0, lodash_clonedeep_1.default)(browser.__propertiesObject__),
        ...(0, _1.getPrototype)('element'),
        scope: { value: 'element' }
    };
    const element = (0, utils_1.webdriverMonad)(this.options, (client) => {
        const elementId = (0, _1.getElementFromResponse)(res);
        if (elementId) {
            /**
             * set elementId for easy access
             */
            client.elementId = elementId;
            /**
             * set element id with proper key so element can be passed into execute commands
             */
            if (this.isW3C) {
                client[constants_1.ELEMENT_KEY] = elementId;
            }
            else {
                client.ELEMENT = elementId;
            }
        }
        else {
            client.error = res;
        }
        client.selector = selector || '';
        client.parent = this;
        client.emit = this.emit.bind(this);
        client.isReactElement = isReactElement;
        return client;
    }, propertiesObject);
    const elementInstance = element(this.sessionId, (0, middlewares_1.elementErrorHandler)(utils_1.wrapCommand));
    const origAddCommand = elementInstance.addCommand.bind(elementInstance);
    elementInstance.addCommand = (name, fn) => {
        browser.__propertiesObject__[name] = { value: fn };
        origAddCommand(name, (0, utils_1.runFnInFiberContext)(fn));
    };
    return elementInstance;
};
exports.getElement = getElement;
/**
 * transforms a findElements response into an array of WDIO elements
 * @param  {String} selector  selector that was used to query the element
 * @param  {Object} res       findElements response
 * @return {Array}            array of WDIO elements
 */
const getElements = function getElements(selector, elemResponse, isReactElement = false) {
    const browser = (0, _1.getBrowserObject)(this);
    const propertiesObject = {
        ...(0, lodash_clonedeep_1.default)(browser.__propertiesObject__),
        ...(0, _1.getPrototype)('element')
    };
    const elements = elemResponse.map((res, i) => {
        /**
         * if we already deal with an element, just return it
         */
        if (res.selector) {
            return res;
        }
        propertiesObject.scope = { value: 'element' };
        const element = (0, utils_1.webdriverMonad)(this.options, (client) => {
            const elementId = (0, _1.getElementFromResponse)(res);
            if (elementId) {
                /**
                 * set elementId for easy access
                 */
                client.elementId = elementId;
                /**
                 * set element id with proper key so element can be passed into execute commands
                 */
                const elementKey = this.isW3C ? constants_1.ELEMENT_KEY : 'ELEMENT';
                client[elementKey] = elementId;
            }
            else {
                client.error = res;
            }
            client.selector = Array.isArray(selector)
                ? selector[i].selector
                : selector;
            client.parent = this;
            client.index = i;
            client.emit = this.emit.bind(this);
            client.isReactElement = isReactElement;
            return client;
        }, propertiesObject);
        const elementInstance = element(this.sessionId, (0, middlewares_1.elementErrorHandler)(utils_1.wrapCommand));
        const origAddCommand = elementInstance.addCommand.bind(elementInstance);
        elementInstance.addCommand = (name, fn) => {
            browser.__propertiesObject__[name] = { value: fn };
            origAddCommand(name, (0, utils_1.runFnInFiberContext)(fn));
        };
        return elementInstance;
    });
    return elements;
};
exports.getElements = getElements;
