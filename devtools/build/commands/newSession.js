"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const uuid_1 = require("uuid");
const launcher_1 = __importDefault(require("../launcher"));
const index_1 = require("../index");
/**
 * The New Session command creates a new WebDriver session with the endpoint node.
 * If the creation fails, a session not created error is returned.
 *
 * @alias browser.newSession
 * @see https://w3c.github.io/webdriver/#dfn-new-sessions
 * @param  {Object} capabilities An object describing the set of capabilities for the capability processing algorithm
 * @return {Object}              Object containing sessionId and capabilities of created WebDriver session.
 */
async function newSession({ capabilities }) {
    const browser = await (0, launcher_1.default)(capabilities);
    const sessionId = (0, uuid_1.v4)();
    const [browserName, browserVersion] = (await browser.version()).split('/');
    index_1.sessionMap.set(sessionId, browser);
    return {
        sessionId,
        capabilities: {
            browserName,
            browserVersion,
            platformName: os_1.default.platform(),
            platformVersion: os_1.default.release()
        }
    };
}
exports.default = newSession;
