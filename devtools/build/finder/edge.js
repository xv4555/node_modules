"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
const path_1 = __importDefault(require("path"));
const edge_paths_1 = require("edge-paths");
const child_process_1 = require("child_process");
const utils_1 = require("@wdio/utils");
const utils_2 = require("../utils");
const finder_1 = require("./finder");
const newLineRegex = /\r?\n/;
const EDGE_BINARY_NAMES = ['edge', 'msedge', 'microsoftedge'];
const EDGE_REGEX = /((ms|microsoft))?edge/g;
function darwin() {
    const suffixes = [
        '/Contents/MacOS/Microsoft Edge'
    ];
    const appName = 'Microsoft Edge';
    const defaultPath = `/Applications/${appName}.app${suffixes[0]}`;
    let installations;
    if ((0, utils_1.canAccess)(defaultPath)) {
        installations = [defaultPath];
    }
    else {
        const appPaths = (0, finder_1.darwinGetAppPaths)(appName);
        installations = (0, finder_1.darwinGetInstallations)(appPaths, suffixes);
    }
    // Retains one per line to maintain readability.
    // clang-format off
    const priorities = [
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Microsoft Edge.app`), weight: 50 },
        { regex: /^\/Applications\/.*Microsoft Edge.app/, weight: 100 },
        { regex: /^\/Volumes\/.*Microsoft Edge.app/, weight: -2 }
    ];
    const whichFinds = (0, utils_2.findByWhich)(EDGE_BINARY_NAMES, [{ regex: EDGE_REGEX, weight: 51 }]);
    const installFinds = (0, utils_2.sort)(installations, priorities);
    return [...installFinds, ...whichFinds];
}
/**
 * Look for linux executables in 3 ways
 * 1. Look into the directories where .desktop are saved on gnome based distros
 * 2. Look for edge by using the which command
 */
function linux() {
    let installations = [];
    // 1. Look into the directories where .desktop are saved on gnome based distros
    const desktopInstallationFolders = [
        path_1.default.join(require('os').homedir(), '.local/share/applications/'),
        '/usr/share/applications/',
    ];
    desktopInstallationFolders.forEach(folder => {
        installations = installations.concat(findEdgeExecutables(folder));
    });
    return (0, utils_2.findByWhich)(EDGE_BINARY_NAMES, [{ regex: EDGE_REGEX, weight: 51 }]);
}
function win32() {
    const installations = [];
    const suffixes = [
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge${path_1.default.sep}Application${path_1.default.sep}edge.exe`,
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge${path_1.default.sep}Application${path_1.default.sep}msedge.exe`,
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge Dev${path_1.default.sep}Application${path_1.default.sep}msedge.exe`
    ];
    const prefixes = [
        process.env.LOCALAPPDATA || '', process.env.PROGRAMFILES || '', process.env['PROGRAMFILES(X86)'] || ''
    ].filter(Boolean);
    prefixes.forEach(prefix => suffixes.forEach(suffix => {
        const edgePath = path_1.default.join(prefix, suffix);
        if ((0, utils_1.canAccess)(edgePath)) {
            installations.push(edgePath);
        }
    }));
    /**
     * fallback using edge-path
     */
    if (installations.length === 0) {
        const edgePath = (0, edge_paths_1.getEdgePath)();
        if ((0, utils_1.canAccess)(edgePath)) {
            installations.push(edgePath);
        }
    }
    return installations;
}
function findEdgeExecutables(folder) {
    const argumentsRegex = /(^[^ ]+).*/; // Take everything up to the first space
    const edgeExecRegex = '^Exec=/.*/(edge)-.*';
    let installations = [];
    if ((0, utils_1.canAccess)(folder)) {
        let execPaths;
        // Some systems do not support grep -R so fallback to -r.
        // See https://github.com/GoogleChrome/chrome-launcher/issues/46 for more context.
        try {
            execPaths = (0, child_process_1.execSync)(`grep -ER "${edgeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: 'pipe' });
        }
        catch (err) {
            execPaths = (0, child_process_1.execSync)(`grep -Er "${edgeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: 'pipe' });
        }
        execPaths = execPaths.toString().split(newLineRegex).map((execPath) => execPath.replace(argumentsRegex, '$1'));
        execPaths.forEach((execPath) => (0, utils_1.canAccess)(execPath) && installations.push(execPath));
    }
    return installations;
}
exports.default = {
    darwin,
    linux,
    win32
};
