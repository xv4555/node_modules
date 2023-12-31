"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
/**
 *
 * Prints the page of the current browsing context to a PDF file on your OS.
 *
 * <example>
    :savePDF.js
    it('should save a PDF screenshot of the browser view', function () {
        await browser.savePDF('./some/path/screenshot.pdf');
    });
 * </example>
 *
 * @alias browser.savePDF
 * @param   {String}  filepath  path to the generated pdf (`.pdf` suffix is required) relative to the execution directory
 * @param   {PDFPrintOptions=} options                Print PDF Options
 * @param   {String=}   options.orientation     Orientation of PDF page
 * @param   {number=}   options.scale     Scale of PDF page
 * @param   {boolean=}   options.background     Include background of PDF page
 * @param   {number=}   options.width     Width of PDF page
 * @param   {number=}   options.height     Height of PDF page
 * @param   {number=}   options.top     Top padding of PDF page
 * @param   {number=}   options.bottom     Bottom padding of PDF page
 * @param   {number=}   options.left     Left padding of PDF page
 * @param   {number=}   options.right     Right padding of PDF page
 * @param   {boolean=}   options.shrinkToFit     Shrink page to fit page
 * @param   {object[]=}  options.pageRanges     Range of pages to include in PDF
 * @return  {Buffer}            screenshot buffer
 * @type utility
 *
 */
async function savePDF(filepath, options) {
    /**
     * type check
     */
    if (typeof filepath != 'string' || !filepath.endsWith('.pdf')) {
        throw new Error('savePDF expects a filepath of type string and ".pdf" file ending');
    }
    const absoluteFilepath = (0, utils_1.getAbsoluteFilepath)(filepath);
    (0, utils_1.assertDirectoryExists)(absoluteFilepath);
    const pdf = await this.printPage(options === null || options === void 0 ? void 0 : options.orientation, options === null || options === void 0 ? void 0 : options.scale, options === null || options === void 0 ? void 0 : options.background, options === null || options === void 0 ? void 0 : options.width, options === null || options === void 0 ? void 0 : options.height, options === null || options === void 0 ? void 0 : options.top, options === null || options === void 0 ? void 0 : options.bottom, options === null || options === void 0 ? void 0 : options.left, options === null || options === void 0 ? void 0 : options.right, options === null || options === void 0 ? void 0 : options.shrinkToFit, options === null || options === void 0 ? void 0 : options.pageRanges);
    const page = Buffer.from(pdf, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, page);
    return page;
}
exports.default = savePDF;
