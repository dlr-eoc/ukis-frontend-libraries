"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * https://github.com/angular/angular-cli/blob/v11.0.0-next.4/packages/angular_devkit/build_ng_packagr/src/build/index.ts
 *
 * Customised by DLR-UKIS
 */
const architect_1 = require("@angular-devkit/architect");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const child_process_1 = require("child_process");
const os = require("os");
const cpx = require("cpx");
function initialize(options, root) {
    return __awaiter(this, void 0, void 0, function* () {
        const packager = (yield Promise.resolve().then(() => require('ng-packagr'))).ngPackagr();
        packager.forProject((0, path_1.resolve)(root, options.project));
        if (options.tsConfig) {
            packager.withTsConfig((0, path_1.resolve)(root, options.tsConfig));
        }
        return packager;
    });
}
function transpile(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            command: 'npx',
            args: ['tsc', '-p', 'projects/core-ui/tsconfig.schematics.json']
        };
        if (os.platform() === "win32") {
            options.command = 'npx.cmd';
        }
        context.reportStatus(`Executing "${options.command}"...`);
        context.logger.info(`Executing Transpile: ${options.args.join(' ')}`);
        const child = (0, child_process_1.spawn)(options.command, options.args, { stdio: 'pipe', cwd: process.cwd() });
        child.stdout.on('data', (data) => {
            context.logger.info(data.toString());
        });
        child.stderr.on('data', (data) => {
            context.logger.error(data.toString());
        });
        return new Promise(resolve => {
            context.reportStatus(`Done.`);
            child.on('close', code => {
                context.logger.info(`Transpile Done.`);
                resolve({ success: code === 0 });
            });
        });
    });
}
function copyFiles(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.reportStatus(`Executing copy files`);
        const cpxOptions = {
            includeEmptyDirs: true
        };
        const filePaths = [
            { source: 'projects/core-ui/schematics/collection.json', dest: 'dist/core-ui/schematics/' },
            { source: 'projects/core-ui/schematics/**/schema.json', dest: 'dist/core-ui/schematics/' },
            { source: 'projects/core-ui/schematics/*/files/**', dest: 'dist/core-ui/schematics/' },
            { source: 'projects/core-ui/src/lib/global-alert/**', dest: 'dist/core-ui/schematics/ng-add/files/src/app/components/global-alert/' },
            { source: 'projects/core-ui/src/lib/global-progress/**', dest: 'dist/core-ui/schematics/ng-add/files/src/app/components/global-progress/' },
            { source: 'projects/core-ui/src/lib/header/**', dest: 'dist/core-ui/schematics/ng-add/files/src/app/components/header/' },
            { source: 'projects/core-ui/schematics/migrations/**', dest: 'dist/core-ui/schematics/migrations/' },
        ];
        const copyFiles = filePaths.map(item => {
            return new Promise((resolve, reject) => {
                cpx.copy(item.source, item.dest, cpxOptions, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const info = {
                            from: item.source,
                            to: item.dest
                        };
                        context.logger.info(`copy files from: ${info.from} to: ${info.to}`);
                        resolve(info);
                    }
                });
            });
        });
        return Promise.all(copyFiles);
    });
}
/** @deprecated Since 10.1 use `executeNgPackagrBuilder` from `@angular-devkit/build-angular` instead. */
function execute(options, context) {
    return (0, rxjs_1.from)(initialize(options, context.workspaceRoot)).pipe((0, operators_1.switchMap)(packager => {
        const tc = transpile(context).then(() => copyFiles(context));
        if (options.watch) {
            const obs = (0, operators_1.map)(() => (0, rxjs_1.from)(tc));
            return packager.watch(options).pipe(obs);
        }
        else {
            return packager.build(options).then(() => tc);
        }
    }), (0, operators_1.mapTo)({ success: true }), (0, operators_1.catchError)((err) => (0, rxjs_1.of)({ success: false, error: err.message })));
}
exports.execute = execute;
exports.default = (0, architect_1.createBuilder)(execute);
