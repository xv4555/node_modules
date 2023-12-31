"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTIONNAIRE = exports.REGION_OPTION = exports.PROTOCOL_OPTIONS = exports.BACKEND_CHOICES = exports.SUPPORTED_PACKAGES = exports.TS_COMPILER_INSTRUCTIONS = exports.COMPILER_OPTIONS = exports.COMPILER_OPTION_ANSWERS = exports.IOS_CONFIG = exports.ANDROID_CONFIG = exports.NPM_INSTALL = exports.DEPENDENCIES_INSTALLATION_MESSAGE = exports.CONFIG_HELPER_SUCCESS_MESSAGE = exports.CONFIG_HELPER_INTRO = exports.EXCLUSIVE_SERVICES = exports.CLI_EPILOGUE = void 0;
const utils_1 = require("./utils");
const pkg = require('../package.json');
exports.CLI_EPILOGUE = `Documentation: https://webdriver.io\n@wdio/cli (v${pkg.version})`;
exports.EXCLUSIVE_SERVICES = {
    'wdio-chromedriver-service': {
        services: ['@wdio/selenium-standalone-service'],
        message: '@wdio/selenium-standalone-service already includes chromedriver'
    }
};
exports.CONFIG_HELPER_INTRO = `
=========================
WDIO Configuration Helper
=========================
`;
exports.CONFIG_HELPER_SUCCESS_MESSAGE = `
Configuration file was created successfully!
To run your tests, execute:
$ npx wdio run %swdio.conf.%s
`;
exports.DEPENDENCIES_INSTALLATION_MESSAGE = `
To install dependencies, execute:
%s
`;
exports.NPM_INSTALL = '';
exports.ANDROID_CONFIG = {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    deviceName: 'Test'
};
exports.IOS_CONFIG = {
    platformName: 'iOS',
    automationName: 'XCUITest',
    deviceName: 'iPhone Simulator'
};
exports.COMPILER_OPTION_ANSWERS = [
    'Babel (https://babeljs.io/)',
    'TypeScript (https://www.typescriptlang.org/)',
    'No!'
];
exports.COMPILER_OPTIONS = {
    babel: exports.COMPILER_OPTION_ANSWERS[0],
    ts: exports.COMPILER_OPTION_ANSWERS[1],
    nil: exports.COMPILER_OPTION_ANSWERS[2]
};
exports.TS_COMPILER_INSTRUCTIONS = `To have TypeScript support please add the following packages to your "types" list:
{
  "compilerOptions": {
    "types": ["node", %s]
  }
}

For for information on TypeScript integration check out: https://webdriver.io/docs/typescript
`;
/**
 * We have to use a string hash for value because InquirerJS default values do not work if we have
 * objects as a `value` to be stored from the user's answers.
 */
exports.SUPPORTED_PACKAGES = {
    runner: [
        { name: 'local', value: '@wdio/local-runner$--$local' }
    ],
    framework: [
        { name: 'mocha', value: '@wdio/mocha-framework$--$mocha' },
        { name: 'jasmine', value: '@wdio/jasmine-framework$--$jasmine' },
        { name: 'cucumber', value: '@wdio/cucumber-framework$--$cucumber' }
    ],
    reporter: [
        { name: 'spec', value: '@wdio/spec-reporter$--$spec' },
        { name: 'dot', value: '@wdio/dot-reporter$--$dot' },
        { name: 'junit', value: '@wdio/junit-reporter$--$junit' },
        { name: 'allure', value: '@wdio/allure-reporter$--$allure' },
        { name: 'sumologic', value: '@wdio/sumologic-reporter$--$sumologic' },
        { name: 'concise', value: '@wdio/concise-reporter$--$concise' },
        // external
        { name: 'reportportal', value: 'wdio-reportportal-reporter$--$reportportal' },
        { name: 'video', value: 'wdio-video-reporter$--$video' },
        { name: 'json', value: 'wdio-json-reporter$--$json' },
        { name: 'cucumber-json', value: 'wdio-cucumberjs-json-reporter$--$cucumberjs-json' },
        { name: 'mochawesome', value: 'wdio-mochawesome-reporter$--$mochawesome' },
        { name: 'timeline', value: 'wdio-timeline-reporter$--$timeline' },
        { name: 'html-nice', value: 'wdio-html-nice-reporter$--$html-nice' },
        { name: 'slack', value: '@moroo/wdio-slack-reporter$--$slack' },
        { name: 'teamcity', value: 'wdio-teamcity-reporter$--$teamcity' },
        { name: 'delta', value: '@delta-reporter/wdio-delta-reporter-service' },
        { name: 'light', value: '@wdio-light-reporter--$light' }
    ],
    plugin: [
        { name: 'wait-for', value: 'wdio-wait-for$--$wait-for' },
        { name: 'angular-component-harnesses', value: '@badisi/wdio-harness$--$harness' }
    ],
    service: [
        // inquirerjs shows list as its orderer in array
        // put chromedriver first as it is the default option
        { name: 'chromedriver', value: 'wdio-chromedriver-service$--$chromedriver' },
        { name: 'geckodriver', value: 'wdio-geckodriver-service$--$geckodriver' },
        { name: 'edgedriver', value: 'wdio-edgedriver-service$--$edgedriver' },
        // internal
        { name: 'sauce', value: '@wdio/sauce-service$--$sauce' },
        { name: 'testingbot', value: '@wdio/testingbot-service$--$testingbot' },
        { name: 'selenium-standalone', value: '@wdio/selenium-standalone-service$--$selenium-standalone' },
        { name: 'vscode', value: 'wdio-vscode-service$--$vscode' },
        { name: 'electron', value: 'wdio-electron-service$--$electron' },
        { name: 'devtools', value: '@wdio/devtools-service$--$devtools' },
        { name: 'browserstack', value: '@wdio/browserstack-service$--$browserstack' },
        { name: 'appium', value: '@wdio/appium-service$--$appium' },
        { name: 'firefox-profile', value: '@wdio/firefox-profile-service$--$firefox-profile' },
        { name: 'crossbrowsertesting', value: '@wdio/crossbrowsertesting-service$--$crossbrowsertesting' },
        // external
        { name: 'eslinter-service', value: 'wdio-eslinter-service$--$eslinter' },
        { name: 'lambdatest', value: 'wdio-lambdatest-service$--$lambdatest' },
        { name: 'zafira-listener', value: 'wdio-zafira-listener-service$--$zafira-listener' },
        { name: 'reportportal', value: 'wdio-reportportal-service$--$reportportal' },
        { name: 'docker', value: 'wdio-docker-service$--$docker' },
        { name: 'ui5', value: 'wdio-ui5-service$--$ui5' },
        { name: 'wiremock', value: 'wdio-wiremock-service$--$wiremock' },
        { name: 'ng-apimock', value: 'wdio-ng-apimock-service$--ng-apimock' },
        { name: 'slack', value: 'wdio-slack-service$--$slack' },
        { name: 'cucumber-viewport-logger', value: 'wdio-cucumber-viewport-logger-service$--$cucumber-viewport-logger' },
        { name: 'intercept', value: 'wdio-intercept-service$--$intercept' },
        { name: 'docker', value: 'wdio-docker-service$--$docker' },
        { name: 'image-comparison', value: 'wdio-image-comparison-service$--$image-comparison' },
        { name: 'novus-visual-regression', value: 'wdio-novus-visual-regression-service$--$novus-visual-regression' },
        { name: 'rerun', value: 'wdio-rerun-service$--$rerun' },
        { name: 'winappdriver', value: 'wdio-winappdriver-service$--$winappdriver' },
        { name: 'ywinappdriver', value: 'wdio-ywinappdriver-service$--$ywinappdriver' },
        { name: 'performancetotal', value: 'wdio-performancetotal-service$--$performancetotal' },
        { name: 'cleanuptotal', value: 'wdio-cleanuptotal-service$--$cleanuptotal' },
        { name: 'aws-device-farm', value: 'wdio-aws-device-farm-service$--$aws-device-farm' },
        { name: 'ocr-native-apps', value: 'wdio-ocr-service$--$ocr-native-apps' },
        { name: 'ms-teams', value: 'wdio-ms-teams-service$--$ms-teams' },
        { name: 'tesults', value: 'wdio-tesults-service$--$tesults' },
        { name: 'azure-devops', value: '@gmangiapelo/wdio-azure-devops-service$--$azure-devops' },
        { name: 'google-Chat', value: 'wdio-google-chat-service' },
        { name: 'qmate-service', value: '@sap_oss/wdio-qmate-service--$qmate-service' },
        { name: 'vitaqai', value: 'wdio-vitaqai-service$--$vitaqai' }
    ]
};
exports.BACKEND_CHOICES = [
    'On my local machine',
    'In the cloud using Experitest',
    'In the cloud using Sauce Labs',
    'In the cloud using BrowserStack',
    'In the cloud using Testingbot or LambdaTest or a different service',
    'I have my own Selenium cloud'
];
exports.PROTOCOL_OPTIONS = [
    'https',
    'http'
];
exports.REGION_OPTION = [
    'us',
    'eu',
    'apac'
];
exports.QUESTIONNAIRE = [{
        type: 'list',
        name: 'runner',
        message: 'Where should your tests be launched?',
        choices: exports.SUPPORTED_PACKAGES.runner,
        // only ask if there are more than 1 runner to pick from
        when: /* istanbul ignore next */ () => exports.SUPPORTED_PACKAGES.runner.length > 1
    }, {
        type: 'list',
        name: 'backend',
        message: 'Where is your automation backend located?',
        choices: exports.BACKEND_CHOICES
    }, {
        type: 'input',
        name: 'hostname',
        message: 'What is the host address of that cloud service?',
        when: /* istanbul ignore next */ (answers) => answers.backend.indexOf('different service') > -1
    }, {
        type: 'input',
        name: 'port',
        message: 'What is the port on which that service is running?',
        default: '80',
        when: /* istanbul ignore next */ (answers) => answers.backend.indexOf('different service') > -1
    }, {
        type: 'input',
        name: 'expEnvAccessKey',
        message: 'Access key from Experitest Cloud',
        default: 'EXPERITEST_ACCESS_KEY',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[1]
    }, {
        type: 'input',
        name: 'expEnvHostname',
        message: 'Environment variable for cloud url',
        default: 'example.experitest.com',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[1]
    }, {
        type: 'input',
        name: 'expEnvPort',
        message: 'Environment variable for port',
        default: '443',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[1]
    }, {
        type: 'list',
        name: 'expEnvProtocol',
        message: 'Choose a protocol for environment variable',
        default: 'https',
        choices: exports.PROTOCOL_OPTIONS,
        when: /* istanbul ignore next */ (answers) => {
            return answers.backend === exports.BACKEND_CHOICES[1] && answers.expEnvPort !== '80' && answers.expEnvPort !== '443';
        }
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'LT_USERNAME',
        when: /* istanbul ignore next */ (answers) => (answers.backend.indexOf('LambdaTest') > -1 &&
            answers.hostname.indexOf('lambdatest.com') > -1)
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'LT_ACCESS_KEY',
        when: /* istanbul ignore next */ (answers) => (answers.backend.indexOf('LambdaTest') > -1 &&
            answers.hostname.indexOf('lambdatest.com') > -1)
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'BROWSERSTACK_USERNAME',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[3]
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'BROWSERSTACK_ACCESS_KEY',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[3]
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'SAUCE_USERNAME',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[2]
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'SAUCE_ACCESS_KEY',
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[2]
    }, {
        type: 'confirm',
        name: 'headless',
        message: 'Do you want to run your test on Sauce Headless? (https://saucelabs.com/products/web-testing/sauce-headless)',
        default: false,
        when: /* istanbul ignore next */ (answers) => answers.backend === exports.BACKEND_CHOICES[2]
    }, {
        type: 'list',
        name: 'region',
        message: 'In which region do you want to run your Sauce Labs tests in?',
        choices: exports.REGION_OPTION,
        when: /* istanbul ignore next */ (answers) => !answers.headless && answers.backend === 'In the cloud using Sauce Labs'
    }, {
        type: 'input',
        name: 'hostname',
        message: 'What is the IP or URI to your Selenium standalone or grid server?',
        default: 'localhost',
        when: /* istanbul ignore next */ (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'input',
        name: 'port',
        message: 'What is the port which your Selenium standalone or grid server is running on?',
        default: '4444',
        when: /* istanbul ignore next */ (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'input',
        name: 'path',
        message: 'What is the path to your browser driver or grid server?',
        default: '/',
        when: /* istanbul ignore next */ (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'list',
        name: 'framework',
        message: 'Which framework do you want to use?',
        choices: exports.SUPPORTED_PACKAGES.framework,
    }, {
        type: 'list',
        name: 'isUsingCompiler',
        message: 'Do you want to use a compiler?',
        choices: exports.COMPILER_OPTION_ANSWERS,
        default: /* istanbul ignore next */ () => (0, utils_1.hasFile)('babel.config.js')
            ? exports.COMPILER_OPTIONS.babel // default to Babel
            : (0, utils_1.hasFile)('tsconfig.json')
                ? exports.COMPILER_OPTIONS.ts // default to TypeScript
                : exports.COMPILER_OPTIONS.nil // default to no compiler
    }, {
        type: 'input',
        name: 'specs',
        message: 'Where are your test specs located?',
        default: (answers) => (0, utils_1.getDefaultFiles)(answers, './test/specs/**/*'),
        when: /* istanbul ignore next */ (answers) => answers.framework.match(/(mocha|jasmine)/)
    }, {
        type: 'input',
        name: 'specs',
        message: 'Where are your feature files located?',
        default: './features/**/*.feature',
        when: /* istanbul ignore next */ (answers) => answers.framework.includes('cucumber')
    }, {
        type: 'input',
        name: 'stepDefinitions',
        message: 'Where are your step definitions located?',
        default: (answers) => (0, utils_1.getDefaultFiles)(answers, './features/step-definitions/steps'),
        when: /* istanbul ignore next */ (answers) => answers.framework.includes('cucumber')
    }, {
        type: 'confirm',
        name: 'generateTestFiles',
        message: 'Do you want WebdriverIO to autogenerate some test files?',
        default: true
    }, {
        type: 'confirm',
        name: 'usePageObjects',
        message: 'Do you want to use page objects (https://martinfowler.com/bliki/PageObject.html)?',
        default: true,
        when: /* istanbul ignore next */ (answers) => answers.generateTestFiles
    }, {
        type: 'input',
        name: 'pages',
        message: 'Where are your page objects located?',
        default: /* istanbul ignore next */ (answers) => (answers.framework.match(/(mocha|jasmine)/)
            ? (0, utils_1.getDefaultFiles)(answers, './test/pageobjects/**/*')
            : (0, utils_1.getDefaultFiles)(answers, './features/pageobjects/**/*')),
        when: /* istanbul ignore next */ (answers) => answers.generateTestFiles && answers.usePageObjects
    }, {
        type: 'checkbox',
        name: 'reporters',
        message: 'Which reporter do you want to use?',
        choices: exports.SUPPORTED_PACKAGES.reporter,
        // @ts-ignore
        default: [exports.SUPPORTED_PACKAGES.reporter.find(
            /* istanbul ignore next */
            ({ name }) => name === 'spec').value
        ]
    }, {
        type: 'checkbox',
        name: 'plugins',
        message: 'Do you want to add a plugin to your test setup?',
        choices: exports.SUPPORTED_PACKAGES.plugin,
        default: []
    }, {
        type: 'checkbox',
        name: 'services',
        message: 'Do you want to add a service to your test setup?',
        choices: (answers) => {
            if (answers.backend === exports.BACKEND_CHOICES[3]) {
                const index = exports.SUPPORTED_PACKAGES.service.findIndex(({ name }) => name === 'browserstack');
                return exports.SUPPORTED_PACKAGES.service.slice(index)
                    .concat(exports.SUPPORTED_PACKAGES.service.slice(0, index));
            }
            else if (answers.backend === exports.BACKEND_CHOICES[2]) {
                const index = exports.SUPPORTED_PACKAGES.service.findIndex(({ name }) => name === 'sauce');
                return exports.SUPPORTED_PACKAGES.service.slice(index)
                    .concat(exports.SUPPORTED_PACKAGES.service.slice(0, index));
            }
            return exports.SUPPORTED_PACKAGES.service;
        },
        // @ts-ignore
        default: (answers) => {
            var _a, _b, _c;
            if (answers.backend === exports.BACKEND_CHOICES[3]) {
                return [(_a = exports.SUPPORTED_PACKAGES.service.find(
                    /* istanbul ignore next */
                    ({ name }) => name === 'browserstack')) === null || _a === void 0 ? void 0 : _a.value];
            }
            else if (answers.backend === exports.BACKEND_CHOICES[2]) {
                return [(_b = exports.SUPPORTED_PACKAGES.service.find(
                    /* istanbul ignore next */
                    ({ name }) => name === 'sauce')) === null || _b === void 0 ? void 0 : _b.value];
            }
            return [(_c = exports.SUPPORTED_PACKAGES.service.find(
                /* istanbul ignore next */
                ({ name }) => name === 'chromedriver')) === null || _c === void 0 ? void 0 : _c.value];
        },
        validate: /* istanbul ignore next */ (answers) => (0, utils_1.validateServiceAnswers)(answers)
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the xunit reports get stored?',
        default: './',
        when: /* istanbul ignore next */ (answers) => answers.reporters.includes('junit')
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the json reports get stored?',
        default: './',
        when: /* istanbul ignore next */ (answers) => answers.reporters.includes('json')
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the mochawesome json reports get stored?',
        default: './',
        when: /* istanbul ignore next */ (answers) => answers.reporters.includes('mochawesome')
    }, {
        type: 'input',
        name: 'baseUrl',
        message: 'What is the base url?',
        default: 'http://localhost'
    }, {
        type: 'confirm',
        name: 'npmInstall',
        message: 'Do you want me to run `npm install`',
        default: true
    }];
