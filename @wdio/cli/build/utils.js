"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultFiles = exports.getPathForFileGeneration = exports.getAnswers = exports.generateTestFiles = exports.hasPackage = exports.hasFile = exports.getCapabilities = exports.validateServiceAnswers = exports.renderConfigurationFile = exports.convertPackageHashToObject = exports.addServiceDeps = exports.replaceConfig = exports.findInConfig = exports.getRunnerName = exports.runOnCompleteHook = exports.runLauncherHook = exports.runServiceHook = exports.HookError = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = __importDefault(require("@wdio/logger"));
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const webdriverio_1 = require("webdriverio");
const child_process_1 = require("child_process");
const util_1 = require("util");
const config_1 = require("@wdio/config");
const protocols_1 = require("@wdio/protocols");
const constants_1 = require("./constants");
const log = (0, logger_1.default)('@wdio/cli:utils');
const TEMPLATE_ROOT_DIR = path_1.default.join(__dirname, 'templates', 'exampleFiles');
const renderFile = (0, util_1.promisify)(ejs_1.default.renderFile);
class HookError extends webdriverio_1.SevereServiceError {
    constructor(message, origin) {
        super(message);
        this.origin = origin;
    }
}
exports.HookError = HookError;
/**
 * run service launch sequences
 */
async function runServiceHook(launcher, hookName, ...args) {
    const start = Date.now();
    return Promise.all(launcher.map(async (service) => {
        try {
            if (typeof service[hookName] === 'function') {
                await service[hookName](...args);
            }
        }
        catch (err) {
            const message = `A service failed in the '${hookName}' hook\n${err.stack}\n\n`;
            if (err instanceof webdriverio_1.SevereServiceError) {
                return { status: 'rejected', reason: message, origin: hookName };
            }
            log.error(`${message}Continue...`);
        }
    })).then(results => {
        if (launcher.length) {
            log.debug(`Finished to run "${hookName}" hook in ${Date.now() - start}ms`);
        }
        const rejectedHooks = results.filter(p => p && p.status === 'rejected');
        if (rejectedHooks.length) {
            return Promise.reject(new HookError(`\n${rejectedHooks.map(p => p && p.reason).join()}\n\nStopping runner...`, hookName));
        }
    });
}
exports.runServiceHook = runServiceHook;
/**
 * Run hook in service launcher
 * @param {Array|Function} hook - can be array of functions or single function
 * @param {Object} config
 * @param {Object} capabilities
 */
async function runLauncherHook(hook, ...args) {
    if (typeof hook === 'function') {
        hook = [hook];
    }
    const catchFn = (e) => {
        log.error(`Error in hook: ${e.stack}`);
        if (e instanceof webdriverio_1.SevereServiceError) {
            throw new HookError(e.message, hook[0].name);
        }
    };
    return Promise.all(hook.map((hook) => {
        try {
            return hook(...args);
        }
        catch (err) {
            return catchFn(err);
        }
    })).catch(catchFn);
}
exports.runLauncherHook = runLauncherHook;
/**
 * Run onCompleteHook in Launcher
 * @param {Array|Function} onCompleteHook - can be array of functions or single function
 * @param {*} config
 * @param {*} capabilities
 * @param {*} exitCode
 * @param {*} results
 */
async function runOnCompleteHook(onCompleteHook, config, capabilities, exitCode, results) {
    if (typeof onCompleteHook === 'function') {
        onCompleteHook = [onCompleteHook];
    }
    return Promise.all(onCompleteHook.map(async (hook) => {
        try {
            await hook(exitCode, config, capabilities, results);
            return 0;
        }
        catch (err) {
            log.error(`Error in onCompleteHook: ${err.stack}`);
            if (err instanceof webdriverio_1.SevereServiceError) {
                throw new HookError(err.message, 'onComplete');
            }
            return 1;
        }
    }));
}
exports.runOnCompleteHook = runOnCompleteHook;
/**
 * get runner identification by caps
 */
function getRunnerName(caps = {}) {
    let runner = caps.browserName ||
        caps.appPackage ||
        caps.appWaitActivity ||
        caps.app ||
        caps.platformName ||
        caps['appium:platformName'] ||
        caps['appium:appPackage'] ||
        caps['appium:appWaitActivity'] ||
        caps['appium:app'];
    // MultiRemote
    if (!runner) {
        runner = Object.values(caps).length === 0 || Object.values(caps).some(cap => !cap.capabilities) ? 'undefined' : 'MultiRemote';
    }
    return runner;
}
exports.getRunnerName = getRunnerName;
function buildNewConfigArray(str, type, change) {
    var _a;
    const newStr = str
        .split(`${type}s: `)[1]
        .replace(/'/g, '');
    let newArray = ((_a = newStr.match(/(\w*)/gmi)) === null || _a === void 0 ? void 0 : _a.filter(e => !!e).concat([change])) || [];
    return str
        .replace('// ', '')
        .replace(new RegExp(`(${type}s: )((.*\\s*)*)`), `$1[${newArray.map(e => `'${e}'`)}]`);
}
function buildNewConfigString(str, type, change) {
    return str.replace(new RegExp(`(${type}: )('\\w*')`), `$1'${change}'`);
}
function findInConfig(config, type) {
    let regexStr = `[\\/\\/]*[\\s]*${type}s: [\\s]*\\[([\\s]*['|"]\\w*['|"],*)*[\\s]*\\]`;
    if (type === 'framework') {
        regexStr = `[\\/\\/]*[\\s]*${type}: ([\\s]*['|"]\\w*['|"])`;
    }
    const regex = new RegExp(regexStr, 'gmi');
    return config.match(regex);
}
exports.findInConfig = findInConfig;
function replaceConfig(config, type, name) {
    if (type === 'framework') {
        return buildNewConfigString(config, type, name);
    }
    const match = findInConfig(config, type);
    if (!match || match.length === 0) {
        return;
    }
    const text = match.pop() || '';
    return config.replace(text, buildNewConfigArray(text, type, name));
}
exports.replaceConfig = replaceConfig;
function addServiceDeps(names, packages, update = false) {
    /**
     * automatically install latest Chromedriver if `wdio-chromedriver-service`
     * was selected for install
     */
    if (names.some(({ short }) => short === 'chromedriver')) {
        packages.push('chromedriver');
        if (update) {
            // eslint-disable-next-line no-console
            console.log('\n=======', '\nPlease change path to / in your wdio.conf.js:', "\npath: '/'", '\n=======\n');
        }
    }
    /**
     * install Appium if it is not installed globally if `@wdio/appium-service`
     * was selected for install
     */
    if (names.some(({ short }) => short === 'appium')) {
        const result = (0, child_process_1.execSync)('appium --version || echo APPIUM_MISSING').toString().trim();
        if (result === 'APPIUM_MISSING') {
            packages.push('appium');
        }
        else if (update) {
            // eslint-disable-next-line no-console
            console.log('\n=======', '\nUsing globally installed appium', result, '\nPlease add the following to your wdio.conf.js:', "\nappium: { command: 'appium' }", '\n=======\n');
        }
    }
}
exports.addServiceDeps = addServiceDeps;
/**
 * @todo add JSComments
 */
function convertPackageHashToObject(pkg, hash = '$--$') {
    const splitHash = pkg.split(hash);
    return {
        package: splitHash[0],
        short: splitHash[1]
    };
}
exports.convertPackageHashToObject = convertPackageHashToObject;
async function renderConfigurationFile(answers) {
    const tplPath = path_1.default.join(__dirname, 'templates/wdio.conf.tpl.ejs');
    const filename = `wdio.conf.${answers.isUsingTypeScript ? 'ts' : 'js'}`;
    const renderedTpl = await renderFile(tplPath, { answers });
    return fs_extra_1.default.promises.writeFile(path_1.default.join(process.cwd(), answers.isUsingTypeScript ? 'test' : '', filename), renderedTpl);
}
exports.renderConfigurationFile = renderConfigurationFile;
const validateServiceAnswers = (answers) => {
    let result = true;
    Object.entries(constants_1.EXCLUSIVE_SERVICES).forEach(([name, { services, message }]) => {
        const exists = answers.some(answer => answer.includes(name));
        const hasExclusive = services.some(service => answers.some(answer => answer.includes(service)));
        if (exists && hasExclusive) {
            result = `${name} cannot work together with ${services.join(', ')}\n${message}\nPlease uncheck one of them.`;
        }
    });
    return result;
};
exports.validateServiceAnswers = validateServiceAnswers;
function getCapabilities(arg) {
    const optionalCapabilites = {
        platformVersion: arg.platformVersion,
        udid: arg.udid,
        ...(arg.deviceName && { deviceName: arg.deviceName })
    };
    /**
     * Parsing of option property and constructing desiredCapabilities
     * for Appium session. Could be application(1) or browser(2-3) session.
     */
    if (/.*\.(apk|app|ipa)$/.test(arg.option)) {
        return {
            capabilities: {
                app: arg.option,
                ...(arg.option.endsWith('apk') ? constants_1.ANDROID_CONFIG : constants_1.IOS_CONFIG),
                ...optionalCapabilites,
            }
        };
    }
    else if (/android/.test(arg.option)) {
        return { capabilities: { browserName: 'Chrome', ...constants_1.ANDROID_CONFIG, ...optionalCapabilites } };
    }
    else if (/ios/.test(arg.option)) {
        return { capabilities: { browserName: 'Safari', ...constants_1.IOS_CONFIG, ...optionalCapabilites } };
    }
    else if (/(js|ts)$/.test(arg.option)) {
        const config = new config_1.ConfigParser();
        config.autoCompile();
        try {
            config.addConfigFile(arg.option);
        }
        catch (e) {
            throw Error(e.code === 'MODULE_NOT_FOUND' ? `Config File not found: ${arg.option}` :
                `Could not parse ${arg.option}, failed with error : ${e.message}`);
        }
        if (typeof arg.capabilities === 'undefined') {
            throw Error('Please provide index/named property of capability to use from the capabilities array/object in wdio config file');
        }
        let requiredCaps = config.getCapabilities();
        requiredCaps = (
        // multi capabilities
        requiredCaps[parseInt(arg.capabilities, 10)] ||
            // multiremote
            requiredCaps[arg.capabilities]);
        const requiredW3CCaps = (0, lodash_pickby_1.default)(requiredCaps, (_, key) => protocols_1.CAPABILITY_KEYS.includes(key) || key.includes(':'));
        if (!Object.keys(requiredW3CCaps).length) {
            throw Error(`No capability found in given config file with the provided capability indexed/named property: ${arg.capabilities}. Please check the capability in your wdio config file.`);
        }
        return { capabilities: { ...requiredW3CCaps } };
    }
    return { capabilities: { browserName: arg.option } };
}
exports.getCapabilities = getCapabilities;
/**
 * Check if file exists in current work directory
 * @param {string} filename to check existance for
 */
function hasFile(filename) {
    return fs_extra_1.default.existsSync(path_1.default.join(process.cwd(), filename));
}
exports.hasFile = hasFile;
/**
 * Check if package is installed
 * @param {string} package to check existance for
 */
function hasPackage(pkg) {
    try {
        /**
         * this is only for testing purposes as we want to check whether
         * we add `@babel/register` to the packages to install when resolving fails
         */
        if (process.env.JEST_WORKER_ID && process.env.WDIO_TEST_THROW_RESOLVE) {
            throw new Error('resolve error');
        }
        require.resolve(pkg);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.hasPackage = hasPackage;
/**
 * generate test files based on CLI answers
 */
async function generateTestFiles(answers) {
    const testFiles = answers.framework === 'cucumber'
        ? [path_1.default.join(TEMPLATE_ROOT_DIR, 'cucumber')]
        : (answers.framework === 'mocha'
            ? [path_1.default.join(TEMPLATE_ROOT_DIR, 'mocha')]
            : [path_1.default.join(TEMPLATE_ROOT_DIR, 'jasmine')]);
    if (answers.usePageObjects) {
        testFiles.push(path_1.default.join(TEMPLATE_ROOT_DIR, 'pageobjects'));
    }
    const files = (await Promise.all(testFiles.map((dirPath) => (0, recursive_readdir_1.default)(dirPath, [(file, stats) => !stats.isDirectory() && !(file.endsWith('.ejs') || file.endsWith('.feature'))])))).reduce((cur, acc) => [...acc, ...(cur)], []);
    for (const file of files) {
        const renderedTpl = await renderFile(file, answers);
        let destPath = (file.endsWith('page.js.ejs')
            ? `${answers.destPageObjectRootPath}/${path_1.default.basename(file)}`
            : file.includes('step_definition')
                ? `${answers.stepDefinitions}`
                : `${answers.destSpecRootPath}/${path_1.default.basename(file)}`).replace(/\.ejs$/, '').replace(/\.js$/, answers.isUsingTypeScript ? '.ts' : '.js');
        fs_extra_1.default.ensureDirSync(path_1.default.dirname(destPath));
        await fs_extra_1.default.promises.writeFile(destPath, renderedTpl);
    }
}
exports.generateTestFiles = generateTestFiles;
async function getAnswers(yes) {
    return yes
        ? constants_1.QUESTIONNAIRE.reduce((answers, question) => Object.assign(answers, question.when && !question.when(answers)
            /**
             * set nothing if question doesn't apply
             */
            ? {}
            : { [question.name]: typeof question.default !== 'undefined'
                    /**
                     * set default value if existing
                     */
                    ? typeof question.default === 'function'
                        ? question.default(answers)
                        : question.default
                    : question.choices && question.choices.length
                        /**
                         * pick first choice, select value if it exists
                         */
                        ? question.choices[0].value
                            ? question.choices[0].value
                            : question.choices[0]
                        : {}
            }), {})
        : await inquirer_1.default.prompt(constants_1.QUESTIONNAIRE);
}
exports.getAnswers = getAnswers;
function getPathForFileGeneration(answers) {
    const destSpecRootPath = path_1.default.join(process.cwd(), path_1.default.dirname(answers.specs || '').replace(/\*\*$/, ''));
    const destStepRootPath = path_1.default.join(process.cwd(), path_1.default.dirname(answers.stepDefinitions || ''));
    const destPageObjectRootPath = answers.usePageObjects
        ? path_1.default.join(process.cwd(), path_1.default.dirname(answers.pages || '').replace(/\*\*$/, ''))
        : '';
    let relativePath = (answers.generateTestFiles && answers.usePageObjects)
        ? !(convertPackageHashToObject(answers.framework).short === 'cucumber')
            ? path_1.default.relative(destSpecRootPath, destPageObjectRootPath)
            : path_1.default.relative(destStepRootPath, destPageObjectRootPath)
        : '';
    /**
    * On Windows, path.relative can return backslashes that could be interpreted as espace sequences in strings
    */
    if (process.platform === 'win32') {
        relativePath = relativePath.replace(/\\/g, '/');
    }
    return {
        destSpecRootPath: destSpecRootPath,
        destStepRootPath: destStepRootPath,
        destPageObjectRootPath: destPageObjectRootPath,
        relativePath: relativePath
    };
}
exports.getPathForFileGeneration = getPathForFileGeneration;
function getDefaultFiles(answers, filePath) {
    return (answers === null || answers === void 0 ? void 0 : answers.isUsingCompiler).includes('TypeScript')
        ? `${filePath}.ts`
        : `${filePath}.js`;
}
exports.getDefaultFiles = getDefaultFiles;
