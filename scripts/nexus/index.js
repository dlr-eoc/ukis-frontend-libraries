"use strict";
// http://git.ukis.eoc.dlr.de/projects/ADMIN/repos/ukis-ci-scripts/browse/packaging/upload-npm-package.bash#1,3,6,8,12,20-21,28,30-31,33,41,56,62,67
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var PATH = require("path");
var FS = require("fs");
var child_process_1 = require("child_process");
var readline = require("readline");
var utils_1 = require("../library/utils");
var CWD = process.cwd();
function run() {
    var REGISTRY = '';
    var REGISTRY_USER = '';
    var REGISTRY_USER_PASSWORD = '';
    var PKG_DIR = '';
    var PKG_VERSION = '';
    function showHelp() {
        console.log("\n        Syntax:   node  [options]\n\n        Options:\n        -h, --help              Print this message.\n        -p, --path              Path to the build package. (required)\n            --pv                Version for the package to publish. (required)\n        -r  --registry\n        ");
    }
    var args = require('minimist')(process.argv.slice(2));
    // console.dir(args);
    if (Object.keys(args).length <= 1 || args.h || args.help) {
        showHelp();
    }
    if (args.r || args.registry) {
        REGISTRY = args.r || args.registry;
    }
    else {
        console.log("You have to provide the a registry to publish the package!");
        return;
    }
    if (args.p || args.path) {
        PKG_DIR = args.p || args.path; // PATH.join(CWD, 'package.json');
    }
    else {
        console.log("You have to provide the path to the build package!");
        return;
    }
    if (args.pv) {
        PKG_VERSION = args.pv; // PATH.join(CWD, 'package.json');
    }
    else {
        console.log("You have to provide the version for the package to publish!");
        return;
    }
    getInput('username:').then(function (user) {
        if (user) {
            REGISTRY_USER = user;
        }
        getInput('password:', '*').then(function (pass) {
            if (pass) {
                REGISTRY_USER_PASSWORD = pass;
                var NPM_AUTH_HASH = Buffer.from(REGISTRY_USER + ":" + REGISTRY_USER_PASSWORD).toString('base64');
                publishPackage(REGISTRY_USER, REGISTRY, NPM_AUTH_HASH, CWD, PKG_DIR, PKG_VERSION);
            }
            else {
                console.log('provide a password');
            }
        });
    });
}
exports.run = run;
function publishPackage(REGISTRY_USER, REGISTRY, NPM_AUTH_HASH, CWD, PKG_DIR, PKG_VERSION) {
    // npm supports project-specific config files .npmrc, so lets use this to avoid littering the global npm configuration
    var npmrc = "\n    init-author-email = " + REGISTRY_USER + "@eoc.dlr.de\n    init-author-name = " + REGISTRY_USER + "\n    init-author-url = http://www.dlr.de\n    email = " + REGISTRY_USER + "@eoc.dlr.de\n    registry = " + REGISTRY + "\n    _auth = " + NPM_AUTH_HASH + "\n    loglevel = \"verbose\"";
    var packagePath = PATH.join(CWD, PKG_DIR);
    var npmrcpath = PATH.join(packagePath, '.npmrc');
    FS.writeFileSync(npmrcpath, npmrc);
    setVersion(PKG_VERSION, packagePath);
    console.log("Publish package from '" + packagePath + "' with version '" + PKG_VERSION + "' to '" + REGISTRY + "'");
    child_process_1.exec("cd " + packagePath + " &&  npm publish", function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log("exec error: " + error + " ");
        }
    });
}
function getInput(question, obscurer) {
    return __awaiter(this, void 0, void 0, function () {
        var rl, mute_1;
        return __generator(this, function (_a) {
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            if (obscurer) {
                mute_1 = function (buff) {
                    var passlength = rl['line'].length + 1;
                    var data = buff.toString();
                    switch (data) {
                        case '\u0004':
                        case '\r':
                        case '\n':
                            process.stdin.removeListener('data', mute_1);
                            process.stdin.pause();
                            break;
                        case '\u0003': // Ctrl-c
                            process.stdin.removeListener('data', mute_1);
                            process.stdin.pause();
                            break;
                        default:
                            readline.cursorTo(process.stdout, 0);
                            process.stdout.write(question + Array(passlength).join(obscurer));
                            break;
                    }
                };
                process.stdin.on('data', mute_1);
            }
            return [2 /*return*/, new Promise(function (resolve) { return rl.question(question, function (ans) {
                    rl.close();
                    resolve(ans);
                }); })];
        });
    });
}
function setVersion(version, packagePath) {
    var placeholders = {
        libVersion: '0.0.0-PLACEHOLDER',
        vendorVersion: '0.0.0-PLACEHOLDER-VENDOR'
    };
    var MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
    var path = PATH.join(packagePath, 'package.json');
    utils_1.setVersionsforDependencies([path], MAINPACKAGE, placeholders);
}
run();
