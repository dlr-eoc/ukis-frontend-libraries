"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const CWD = process.cwd();
const PATH = require('path');
const packagePath = PATH.join(CWD, 'package.json');
const packageScope = '@dlr-eoc';
const repositoryUrl = `git+https://github.com/${process.env.GITHUB_REPOSITORY}.git`;
utils_1.updatePackageJson(packagePath, (json) => {
    if (!json.repository) {
        json.repository = {};
    }
    if (typeof json.repository === 'object') {
        json.repository.url = repositoryUrl;
        json.repository.type = `git`;
    }
    return json;
});
utils_1.createNpmrc(PATH.join(CWD, '.npmrc'), packageScope);
