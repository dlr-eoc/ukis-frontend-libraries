"use strict";
// http://git.ukis.eoc.dlr.de/projects/ADMIN/repos/ukis-ci-scripts/browse/packaging/upload-npm-package.bash#1,3,6,8,12,20-21,28,30-31,33,41,56,62,67
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PATH = require("path");
const FS = require("fs");
const child_process_1 = require("child_process");
const readline = require("readline");
const library_1 = require("../library");
function run() {
    const CWD = process.cwd();
    const REGISTRY = 'http://hofer.eoc.dlr.de/nexus/content/repositories/npm-ukis/';
    let REGISTRY_USER = 'jenkins';
    let REGISTRY_USER_PASSWORD = '';
    let PKG_DIR = '';
    let PKG_VERSION = '';
    function showHelp() {
        console.log(`
        Syntax:   node  [options]

        Options:
        -h, --help              Print this message.
        -p, --path              Path to the build package. (required)
            --pv                Version for the package to publish. (required)
        `);
    }
    const args = require('minimist')(process.argv.slice(2));
    // console.dir(args);
    if (Object.keys(args).length <= 1 || args.h || args.help) {
        showHelp();
    }
    if (args.p || args.path) {
        PKG_DIR = args.p || args.path; // PATH.join(CWD, 'package.json');
    }
    else {
        console.log(`You have to provide the path to the build package!`);
        return;
    }
    if (args.pv) {
        PKG_VERSION = args.pv; // PATH.join(CWD, 'package.json');
    }
    else {
        console.log(`You have to provide the version for the package to publish!`);
        return;
    }
    getInput('username:').then(user => {
        if (user) {
            REGISTRY_USER = user;
        }
        getInput('password:', '*').then(pass => {
            if (pass) {
                REGISTRY_USER_PASSWORD = pass;
                const NPM_AUTH_HASH = Buffer.from(`${REGISTRY_USER}:${REGISTRY_USER_PASSWORD}`).toString('base64');
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
    const npmrc = `
    init-author-email = ${REGISTRY_USER}@eoc.dlr.de
    init-author-name = ${REGISTRY_USER}
    init-author-url = http://www.dlr.de
    email = ${REGISTRY_USER}@eoc.dlr.de
    registry = ${REGISTRY}
    _auth = ${NPM_AUTH_HASH}
    loglevel = "verbose"`;
    const packagePath = PATH.join(CWD, PKG_DIR);
    const _path = PATH.join(packagePath, '.npmrc');
    FS.writeFileSync(_path, npmrc);
    setVersion(PKG_VERSION, packagePath);
    console.log(`Publish package from '${packagePath}' with version '${PKG_VERSION}' to '${REGISTRY}'`);
    child_process_1.exec(`cd ${packagePath} &&  npm publish`, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error} `);
        }
    });
}
function getInput(question, obscurer) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        if (obscurer) {
            const mute = (buff) => {
                const passlength = rl['line'].length + 1;
                const data = buff.toString();
                switch (data) {
                    case '\u0004':
                    case '\r':
                    case '\n':
                        process.stdin.removeListener('data', mute);
                        process.stdin.pause();
                        break;
                    case '\u0003': // Ctrl-c
                        process.stdin.removeListener('data', mute);
                        process.stdin.pause();
                        break;
                    default:
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write(question + Array(passlength).join(obscurer));
                        break;
                }
            };
            process.stdin.on('data', mute);
        }
        return new Promise(resolve => rl.question(question, ans => {
            rl.close();
            resolve(ans);
        }));
    });
}
function setVersion(version, packagePath) {
    const path = require(PATH.join(packagePath, 'package.json'));
    library_1.setVersionsforDependencies([path]);
    /* const UKIS_VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER';
    const NG_VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER-VENDOR';

    if (_package.version === UKIS_VERSION_PLACEHOLDER) {
        replace({
            regex: UKIS_VERSION_PLACEHOLDER,
            replacement: version,
            paths: [packagePath],
            recursive: true,
            silent: true,
            include: 'package.json'
        });
    } */
}
run();
