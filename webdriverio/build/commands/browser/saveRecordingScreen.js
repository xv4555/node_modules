"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
/**
 *
 * Save a video started by [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) command to file.
 *
 * :::info
 *
 * This command is only supported for mobile sessions running on [Appium](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).
 *
 * :::
 *
 * <example>
    :saveRecordingScreen.js
    it('should save a video', async () => {
        await browser.startRecordingScreen();
        await $('~BUTTON').click();
        await browser.saveRecordingScreen('./some/path/video.mp4');
    });
 * </example>
 *
 * @alias browser.saveRecordingScreen
 * @param   {String}  filepath  full or relative to the execution directory path to the generated video
 * @return  {Buffer}            video buffer
 * @type utility
 *
 */
async function saveRecordingScreen(filepath) {
    /**
     * type check
     */
    if (typeof filepath !== 'string') {
        throw new Error('saveRecordingScreen expects a filepath');
    }
    const absoluteFilepath = (0, utils_1.getAbsoluteFilepath)(filepath);
    (0, utils_1.assertDirectoryExists)(absoluteFilepath);
    const videoBuffer = await this.stopRecordingScreen();
    const video = Buffer.from(videoBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, video);
    return video;
}
exports.default = saveRecordingScreen;
