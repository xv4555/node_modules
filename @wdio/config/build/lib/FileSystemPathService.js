"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
class FileSystemPathService {
    getcwd() {
        const cwd = process.cwd();
        if (typeof cwd === 'undefined') {
            throw new Error('Unable to find current working directory from process');
        }
        return cwd;
    }
    loadFile(path) {
        if (!path) {
            throw new Error('A path is required');
        }
        return require(path);
    }
    isFile(filepath) {
        return (fs_1.default.existsSync(filepath) && fs_1.default.lstatSync(filepath).isFile());
    }
    glob(pattern) {
        return glob_1.default.sync(pattern);
    }
    ensureAbsolutePath(filepath) {
        return path_1.default.isAbsolute(filepath) ? path_1.default.normalize(filepath) : path_1.default.resolve(this.getcwd(), filepath);
    }
}
exports.default = FileSystemPathService;
