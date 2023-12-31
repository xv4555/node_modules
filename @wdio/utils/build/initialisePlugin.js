"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
/**
 * initialise WebdriverIO compliant plugins like reporter or services in the following way:
 * 1. if package name is scoped (starts with "@"), require scoped package name
 * 2. otherwise try to require "@wdio/<name>-<type>"
 * 3. otherwise try to require "wdio-<name>-<type>"
 */
function initialisePlugin(name, type) {
    /**
     * directly import packages that are scoped or start with an absolute path
     */
    if (name[0] === '@' || path_1.default.isAbsolute(name)) {
        const service = (0, utils_1.safeRequire)(name);
        if (service) {
            return service;
        }
    }
    if (typeof type !== 'string') {
        throw new Error('No plugin type provided');
    }
    /**
     * check for scoped version of plugin first (e.g. @wdio/sauce-service)
     */
    const scopedPlugin = (0, utils_1.safeRequire)(`@wdio/${name.toLowerCase()}-${type}`);
    if (scopedPlugin) {
        return scopedPlugin;
    }
    /**
     * check for old type of
     */
    const plugin = (0, utils_1.safeRequire)(`wdio-${name.toLowerCase()}-${type}`);
    if (plugin) {
        return plugin;
    }
    throw new Error(`Couldn't find plugin "${name}" ${type}, neither as wdio scoped package ` +
        `"@wdio/${name.toLowerCase()}-${type}" nor as community package ` +
        `"wdio-${name.toLowerCase()}-${type}". Please make sure you have it installed!`);
}
exports.default = initialisePlugin;
