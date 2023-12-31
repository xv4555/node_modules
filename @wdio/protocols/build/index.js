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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAPABILITY_KEYS = exports.GeckoProtocol = exports.SeleniumProtocol = exports.SauceLabsProtocol = exports.ChromiumProtocol = exports.AppiumProtocol = exports.JsonWProtocol = exports.MJsonWProtocol = exports.WebDriverProtocol = void 0;
const WebDriverProtocol = require('../protocols/webdriver.json');
exports.WebDriverProtocol = WebDriverProtocol;
const MJsonWProtocol = require('../protocols/mjsonwp.json');
exports.MJsonWProtocol = MJsonWProtocol;
const JsonWProtocol = require('../protocols/jsonwp.json');
exports.JsonWProtocol = JsonWProtocol;
const AppiumProtocol = require('../protocols/appium.json');
exports.AppiumProtocol = AppiumProtocol;
const ChromiumProtocol = require('../protocols/chromium.json');
exports.ChromiumProtocol = ChromiumProtocol;
const GeckoProtocol = require('../protocols/gecko.json');
exports.GeckoProtocol = GeckoProtocol;
const SauceLabsProtocol = require('../protocols/saucelabs.json');
exports.SauceLabsProtocol = SauceLabsProtocol;
const SeleniumProtocol = require('../protocols/selenium.json');
exports.SeleniumProtocol = SeleniumProtocol;
__exportStar(require("./types"), exports);
exports.CAPABILITY_KEYS = [
    'browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts',
    'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'strictFileInteractability',
    'unhandledPromptBehavior'
];
