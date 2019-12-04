"use strict";
// http://git.ukis.eoc.dlr.de/projects/ADMIN/repos/ukis-ci-scripts/browse/packaging/upload-npm-package.bash#1,3,6,8,12,20-21,28,30-31,33,41,56,62,67
Object.defineProperty(exports, "__esModule", { value: true });
const PATH = require("path");
const replace = require("replace");
const FS = require("fs");
const child_process_1 = require("child_process");
function run() {
    const CWD = process.cwd();
    const REGISTRY = 'http://hofer.eoc.dlr.de/nexus/content/repositories/npm-ukis/';
    let REGISTRY_USER = 'jenkins';
    let REGISTRY_USER_PASSWORD = '';
    let PKG_DIR = '';
    function showHelp() {
        console.log(`
        Syntax:   node  [options]

        Options:
        -h, --help              Print this message.
        -p, --path              Path to the build package
        -u, --user              Registry user e.g.: jenkins
            --pass              Registry user password
        `);
    }
    const args = require('minimist')(process.argv.slice(2));
    // console.dir(args);
    if (Object.keys(args).length <= 1 || args.h || args.help) {
        showHelp();
    }
    if (args.u || args.user) {
        REGISTRY_USER = args.u || args.user;
    }
    if (args.p || args.path) {
        PKG_DIR = args.p || args.path; //PATH.join(CWD, 'package.json');
    }
    if (args.pass) {
        REGISTRY_USER_PASSWORD = args.pass;
        let NPM_AUTH_HASH = Buffer.from(`${REGISTRY_USER}:${REGISTRY_USER_PASSWORD}`).toString('base64');
        // npm supports project-specific config files .npmrc, so lets use this to avoid littering the global npm configuration
        let npmrc = `
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
        checkVersion('6.0.0', packagePath);
        child_process_1.exec(`cd ${packagePath} &&  npm publish`, (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error} `);
            }
        });
    }
    else {
        console.log('provide a password --pass!');
    }
}
exports.run = run;
function checkVersion(version, packagePath) {
    const _package = require(PATH.join(packagePath, 'package.json'));
    const UKIS_VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER';
    const NG_VERSION_PLACEHOLDER = '0.0.0-NG-PLACEHOLDER';
    if (_package.version === UKIS_VERSION_PLACEHOLDER) {
        replace({
            regex: UKIS_VERSION_PLACEHOLDER,
            replacement: version,
            paths: [packagePath],
            recursive: true,
            silent: true,
            include: 'package.json'
        });
    }
}
run();
