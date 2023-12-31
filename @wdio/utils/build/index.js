"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNICODE_CHARACTERS = exports.devtoolsEnvironmentDetector = exports.capabilitiesEnvironmentDetector = exports.sessionEnvironmentDetector = exports.isW3C = exports.hasWdioSyncSupport = exports.executeHooksWithArgs = exports.testFnWrapper = exports.runTestInFiberContext = exports.runFnInFiberContext = exports.executeAsync = exports.executeSync = exports.wrapCommand = exports.sleep = exports.canAccess = exports.safeRequire = exports.getArgumentType = exports.isValidParameter = exports.commandCallStructure = exports.webdriverMonad = exports.transformCommandLogResult = exports.isFunctionAsync = exports.initialiseWorkerService = exports.initialiseLauncherService = exports.initialisePlugin = void 0;
const initialisePlugin_1 = __importDefault(require("./initialisePlugin"));
exports.initialisePlugin = initialisePlugin_1.default;
const initialiseServices_1 = require("./initialiseServices");
Object.defineProperty(exports, "initialiseWorkerService", { enumerable: true, get: function () { return initialiseServices_1.initialiseWorkerService; } });
Object.defineProperty(exports, "initialiseLauncherService", { enumerable: true, get: function () { return initialiseServices_1.initialiseLauncherService; } });
const monad_1 = __importDefault(require("./monad"));
exports.webdriverMonad = monad_1.default;
const utils_1 = require("./utils");
Object.defineProperty(exports, "commandCallStructure", { enumerable: true, get: function () { return utils_1.commandCallStructure; } });
Object.defineProperty(exports, "isValidParameter", { enumerable: true, get: function () { return utils_1.isValidParameter; } });
Object.defineProperty(exports, "getArgumentType", { enumerable: true, get: function () { return utils_1.getArgumentType; } });
Object.defineProperty(exports, "safeRequire", { enumerable: true, get: function () { return utils_1.safeRequire; } });
Object.defineProperty(exports, "isFunctionAsync", { enumerable: true, get: function () { return utils_1.isFunctionAsync; } });
Object.defineProperty(exports, "transformCommandLogResult", { enumerable: true, get: function () { return utils_1.transformCommandLogResult; } });
Object.defineProperty(exports, "canAccess", { enumerable: true, get: function () { return utils_1.canAccess; } });
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return utils_1.sleep; } });
const shim_1 = require("./shim");
Object.defineProperty(exports, "wrapCommand", { enumerable: true, get: function () { return shim_1.wrapCommand; } });
Object.defineProperty(exports, "runFnInFiberContext", { enumerable: true, get: function () { return shim_1.runFnInFiberContext; } });
Object.defineProperty(exports, "executeHooksWithArgs", { enumerable: true, get: function () { return shim_1.executeHooksWithArgs; } });
Object.defineProperty(exports, "hasWdioSyncSupport", { enumerable: true, get: function () { return shim_1.hasWdioSyncSupport; } });
Object.defineProperty(exports, "executeSync", { enumerable: true, get: function () { return shim_1.executeSync; } });
Object.defineProperty(exports, "executeAsync", { enumerable: true, get: function () { return shim_1.executeAsync; } });
const test_framework_1 = require("./test-framework");
Object.defineProperty(exports, "testFnWrapper", { enumerable: true, get: function () { return test_framework_1.testFnWrapper; } });
Object.defineProperty(exports, "runTestInFiberContext", { enumerable: true, get: function () { return test_framework_1.runTestInFiberContext; } });
const envDetector_1 = require("./envDetector");
Object.defineProperty(exports, "isW3C", { enumerable: true, get: function () { return envDetector_1.isW3C; } });
Object.defineProperty(exports, "capabilitiesEnvironmentDetector", { enumerable: true, get: function () { return envDetector_1.capabilitiesEnvironmentDetector; } });
Object.defineProperty(exports, "sessionEnvironmentDetector", { enumerable: true, get: function () { return envDetector_1.sessionEnvironmentDetector; } });
Object.defineProperty(exports, "devtoolsEnvironmentDetector", { enumerable: true, get: function () { return envDetector_1.devtoolsEnvironmentDetector; } });
const constants_1 = require("./constants");
Object.defineProperty(exports, "UNICODE_CHARACTERS", { enumerable: true, get: function () { return constants_1.UNICODE_CHARACTERS; } });
