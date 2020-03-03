"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_ng_packagr/src/build/index.ts
 */
const architect = require("@angular-devkit/architect");
const path = require("path");
const rxjs = require("rxjs");
const childProcess = require('child_process');
const os = require('os');
const cpx = require('cpx');

const rx_operators = require("rxjs/operators");
async function initialize(options, root) {
  const packager = (await Promise.resolve().then(() => require('ng-packagr'))).ngPackagr();
  packager.forProject(path.resolve(root, options.project));
  if (options.tsConfig) {
    packager.withTsConfig(path.resolve(root, options.tsConfig));
  }
  return packager;
}

async function transpile(context) {
  const options = {
    command: 'npx',
    args: ['tsc', '-p', 'projects/core-ui/tsconfig.schematics.json']
  }
  if (os.platform() === "win32") {
    options.command = 'npx.cmd'
  }
  context.reportStatus(`Executing "${options.command}"...`);
  context.logger.info(`Executing Transpile: ${options.args.join(' ')}`);
  const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe', cwd: process.cwd() });

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
}


async function copyFiles(context) {
  context.reportStatus(`Executing copy files`);
  const cpxOptions = {
    includeEmptyDirs: true
  };
  const filePaths = [
    { source: 'projects/core-ui/schematics/collection.json', dest: 'dist/core-ui/schematics/' },
    { source: 'projects/core-ui/schematics/**/schema.json', dest: 'dist/core-ui/schematics/' },
    { source: 'projects/core-ui/schematics/*/files/**', dest: 'dist/core-ui/schematics/' },
    { source: 'projects/core-ui/src/lib/global-alert/**', dest: 'dist/core-ui/schematics/ng-add/files/src/app/components/global-alert/' },
    { source: 'projects/core-ui/src/lib/global-progress/**', dest: 'dist/core-ui/schematics/ng-add/files/src/app/components/global-progress/' }
  ]

  const copyFiles = filePaths.map(item => {
    return new Promise((resolve, reject) => {
      cpx.copy(item.source, item.dest, cpxOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          context.logger.info(`copy files from: ${item.source} to: ${item.dest}`);
          resolve();
        }
      });
    });
  })

  return Promise.all(copyFiles);
}

function execute(options, context) {
  return rxjs.from(initialize(options, context.workspaceRoot))
    .pipe(rx_operators.switchMap((packager) => {
      if (options.watch) {
        return packager.watch().pipe(rx_operators.map(e => rxjs.from(transpile(context).then(i => copyFiles(context)))));
      }
      else {
        return packager.build().then(r => transpile(context).then(i => copyFiles(context)));
      }
    }), rx_operators.mapTo({ success: true }));
}
exports.execute = execute;
exports.default = architect.createBuilder(execute);
