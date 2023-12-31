"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darwinGetInstallations = exports.darwinGetAppPaths = void 0;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const utils_1 = require("@wdio/utils");
const DARWIN_LIST_APPS = 'system_profiler SPApplicationsDataType -json';
const darwinGetAppPaths = (app) => {
    const apps = JSON.parse((0, child_process_1.execSync)(DARWIN_LIST_APPS).toString());
    const appPaths = apps.SPApplicationsDataType
        .filter(inst => inst.info && inst.info.startsWith(app))
        .map(inst => inst.path);
    return appPaths;
};
exports.darwinGetAppPaths = darwinGetAppPaths;
const darwinGetInstallations = (appPaths, suffixes) => {
    const installations = [];
    appPaths.forEach((inst) => {
        suffixes.forEach(suffix => {
            const execPath = path_1.default.join(inst.substring(0, inst.indexOf('.app') + 4).trim(), suffix);
            if ((0, utils_1.canAccess)(execPath) && installations.indexOf(execPath) === -1) {
                installations.push(execPath);
            }
        });
    });
    return installations;
};
exports.darwinGetInstallations = darwinGetInstallations;
