"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
/**
 *
 * Save a screenshot of an element to a PNG file on your OS.
 *
 * <example>
    :saveScreenshot.js
    it('should save a screenshot of the browser view', async () => {
        const elem = await $('#someElem');
        await elem.saveScreenshot('./some/path/elemScreenshot.png');
    });
 * </example>
 *
 * @alias element.saveScreenshot
 * @param   {String}  filename  path to the generated image (`.png` suffix is required) relative to the execution directory
 * @return  {Buffer}            screenshot buffer
 * @type utility
 *
 */
async function saveScreenshot(filepath) {
    /**
     * type check
     */
    if (typeof filepath !== 'string' || !filepath.endsWith('.png')) {
        throw new Error('saveScreenshot expects a filepath of type string and ".png" file ending');
    }
    const absoluteFilepath = (0, utils_1.getAbsoluteFilepath)(filepath);
    (0, utils_1.assertDirectoryExists)(absoluteFilepath);
    const screenBuffer = await this.takeElementScreenshot(this.elementId);
    const screenshot = Buffer.from(screenBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, screenshot);
    return screenshot;
}
exports.default = saveScreenshot;
