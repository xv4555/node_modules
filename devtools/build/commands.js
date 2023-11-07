"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchToFrame = exports.status = exports.setWindowRect = exports.setTimeouts = exports.sendAlertText = exports.releaseActions = exports.refresh = exports.performActions = exports.newSession = exports.navigateTo = exports.isElementSelected = exports.isElementEnabled = exports.getWindowRect = exports.getWindowHandles = exports.getWindowHandle = exports.getUrl = exports.getTitle = exports.getTimeouts = exports.getPageSource = exports.getNamedCookie = exports.getElementText = exports.getElementTagName = exports.getElementRect = exports.getElementProperty = exports.getElementComputedRole = exports.getElementComputedLabel = exports.getElementCSSValue = exports.getElementAttribute = exports.getAllCookies = exports.getAlertText = exports.getActiveElement = exports.forward = exports.findElementsFromElement = exports.findElements = exports.findElementFromElement = exports.findElement = exports.executeScript = exports.executeAsyncScript = exports.elementSendKeys = exports.elementClick = exports.elementClear = exports.dismissAlert = exports.deleteSession = exports.deleteCookie = exports.deleteAllCookies = exports.createWindow = exports.closeWindow = exports.back = exports.addCookie = exports.acceptAlert = void 0;
exports.findElementsFromShadowRoot = exports.findElementFromShadowRoot = exports.getElementShadowRoot = exports.takeScreenshot = exports.takeElementScreenshot = exports.switchToWindow = exports.switchToParentFrame = void 0;
const acceptAlert_1 = __importDefault(require("./commands/acceptAlert"));
exports.acceptAlert = acceptAlert_1.default;
const addCookie_1 = __importDefault(require("./commands/addCookie"));
exports.addCookie = addCookie_1.default;
const back_1 = __importDefault(require("./commands/back"));
exports.back = back_1.default;
const closeWindow_1 = __importDefault(require("./commands/closeWindow"));
exports.closeWindow = closeWindow_1.default;
const createWindow_1 = __importDefault(require("./commands/createWindow"));
exports.createWindow = createWindow_1.default;
const deleteAllCookies_1 = __importDefault(require("./commands/deleteAllCookies"));
exports.deleteAllCookies = deleteAllCookies_1.default;
const deleteCookie_1 = __importDefault(require("./commands/deleteCookie"));
exports.deleteCookie = deleteCookie_1.default;
const deleteSession_1 = __importDefault(require("./commands/deleteSession"));
exports.deleteSession = deleteSession_1.default;
const dismissAlert_1 = __importDefault(require("./commands/dismissAlert"));
exports.dismissAlert = dismissAlert_1.default;
const elementClear_1 = __importDefault(require("./commands/elementClear"));
exports.elementClear = elementClear_1.default;
const elementClick_1 = __importDefault(require("./commands/elementClick"));
exports.elementClick = elementClick_1.default;
const elementSendKeys_1 = __importDefault(require("./commands/elementSendKeys"));
exports.elementSendKeys = elementSendKeys_1.default;
const executeAsyncScript_1 = __importDefault(require("./commands/executeAsyncScript"));
exports.executeAsyncScript = executeAsyncScript_1.default;
const executeScript_1 = __importDefault(require("./commands/executeScript"));
exports.executeScript = executeScript_1.default;
const findElement_1 = __importDefault(require("./commands/findElement"));
exports.findElement = findElement_1.default;
const findElementFromElement_1 = __importDefault(require("./commands/findElementFromElement"));
exports.findElementFromElement = findElementFromElement_1.default;
const findElements_1 = __importDefault(require("./commands/findElements"));
exports.findElements = findElements_1.default;
const findElementsFromElement_1 = __importDefault(require("./commands/findElementsFromElement"));
exports.findElementsFromElement = findElementsFromElement_1.default;
const getElementShadowRoot_1 = __importDefault(require("./commands/getElementShadowRoot"));
exports.getElementShadowRoot = getElementShadowRoot_1.default;
const findElementFromShadowRoot_1 = __importDefault(require("./commands/findElementFromShadowRoot"));
exports.findElementFromShadowRoot = findElementFromShadowRoot_1.default;
const findElementsFromShadowRoot_1 = __importDefault(require("./commands/findElementsFromShadowRoot"));
exports.findElementsFromShadowRoot = findElementsFromShadowRoot_1.default;
const forward_1 = __importDefault(require("./commands/forward"));
exports.forward = forward_1.default;
const getActiveElement_1 = __importDefault(require("./commands/getActiveElement"));
exports.getActiveElement = getActiveElement_1.default;
const getAlertText_1 = __importDefault(require("./commands/getAlertText"));
exports.getAlertText = getAlertText_1.default;
const getAllCookies_1 = __importDefault(require("./commands/getAllCookies"));
exports.getAllCookies = getAllCookies_1.default;
const getElementAttribute_1 = __importDefault(require("./commands/getElementAttribute"));
exports.getElementAttribute = getElementAttribute_1.default;
const getElementCSSValue_1 = __importDefault(require("./commands/getElementCSSValue"));
exports.getElementCSSValue = getElementCSSValue_1.default;
const getElementComputedLabel_1 = __importDefault(require("./commands/getElementComputedLabel"));
exports.getElementComputedLabel = getElementComputedLabel_1.default;
const getElementComputedRole_1 = __importDefault(require("./commands/getElementComputedRole"));
exports.getElementComputedRole = getElementComputedRole_1.default;
const getElementProperty_1 = __importDefault(require("./commands/getElementProperty"));
exports.getElementProperty = getElementProperty_1.default;
const getElementRect_1 = __importDefault(require("./commands/getElementRect"));
exports.getElementRect = getElementRect_1.default;
const getElementTagName_1 = __importDefault(require("./commands/getElementTagName"));
exports.getElementTagName = getElementTagName_1.default;
const getElementText_1 = __importDefault(require("./commands/getElementText"));
exports.getElementText = getElementText_1.default;
const getNamedCookie_1 = __importDefault(require("./commands/getNamedCookie"));
exports.getNamedCookie = getNamedCookie_1.default;
const getPageSource_1 = __importDefault(require("./commands/getPageSource"));
exports.getPageSource = getPageSource_1.default;
const getTimeouts_1 = __importDefault(require("./commands/getTimeouts"));
exports.getTimeouts = getTimeouts_1.default;
const getTitle_1 = __importDefault(require("./commands/getTitle"));
exports.getTitle = getTitle_1.default;
const getUrl_1 = __importDefault(require("./commands/getUrl"));
exports.getUrl = getUrl_1.default;
const getWindowHandle_1 = __importDefault(require("./commands/getWindowHandle"));
exports.getWindowHandle = getWindowHandle_1.default;
const getWindowHandles_1 = __importDefault(require("./commands/getWindowHandles"));
exports.getWindowHandles = getWindowHandles_1.default;
const getWindowRect_1 = __importDefault(require("./commands/getWindowRect"));
exports.getWindowRect = getWindowRect_1.default;
const isElementEnabled_1 = __importDefault(require("./commands/isElementEnabled"));
exports.isElementEnabled = isElementEnabled_1.default;
const isElementSelected_1 = __importDefault(require("./commands/isElementSelected"));
exports.isElementSelected = isElementSelected_1.default;
const navigateTo_1 = __importDefault(require("./commands/navigateTo"));
exports.navigateTo = navigateTo_1.default;
const newSession_1 = __importDefault(require("./commands/newSession"));
exports.newSession = newSession_1.default;
const performActions_1 = __importDefault(require("./commands/performActions"));
exports.performActions = performActions_1.default;
const refresh_1 = __importDefault(require("./commands/refresh"));
exports.refresh = refresh_1.default;
const releaseActions_1 = __importDefault(require("./commands/releaseActions"));
exports.releaseActions = releaseActions_1.default;
const sendAlertText_1 = __importDefault(require("./commands/sendAlertText"));
exports.sendAlertText = sendAlertText_1.default;
const setTimeouts_1 = __importDefault(require("./commands/setTimeouts"));
exports.setTimeouts = setTimeouts_1.default;
const setWindowRect_1 = __importDefault(require("./commands/setWindowRect"));
exports.setWindowRect = setWindowRect_1.default;
const status_1 = __importDefault(require("./commands/status"));
exports.status = status_1.default;
const switchToFrame_1 = __importDefault(require("./commands/switchToFrame"));
exports.switchToFrame = switchToFrame_1.default;
const switchToParentFrame_1 = __importDefault(require("./commands/switchToParentFrame"));
exports.switchToParentFrame = switchToParentFrame_1.default;
const switchToWindow_1 = __importDefault(require("./commands/switchToWindow"));
exports.switchToWindow = switchToWindow_1.default;
const takeElementScreenshot_1 = __importDefault(require("./commands/takeElementScreenshot"));
exports.takeElementScreenshot = takeElementScreenshot_1.default;
const takeScreenshot_1 = __importDefault(require("./commands/takeScreenshot"));
exports.takeScreenshot = takeScreenshot_1.default;