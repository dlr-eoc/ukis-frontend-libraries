"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const architect = require("@angular-devkit/architect");
const path = require("path");
const rxjs = require("rxjs");
const childProcess = require('child_process');
const os = require('os');

const rx_operators = require("rxjs/operators");
async function initialize(options, root) {
  const packager = (await Promise.resolve().then(() => require('ng-packagr'))).ngPackagr();
  packager.forProject(path.resolve(root, options.project));
  if (options.tsConfig) {
    packager.withTsConfig(path.resolve(root, options.tsConfig));
  }
  return packager;
}

async function buildSchematics(context) {
  const options = {
    command: 'npm',
    args: ['run', 'schematics:build']
  }
  if (os.platform() === "win32") {
    options.command = 'npm.cmd'
  }
  context.reportStatus(`Executing "${options.command}"...`);
  const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe', cwd: 'projects/core-ui' });

  child.stdout.on('data', (data) => {
    context.logger.info(data.toString());
  });
  child.stderr.on('data', (data) => {
    context.logger.error(data.toString());
  });

  return new Promise(resolve => {
    context.reportStatus(`Done.`);
    child.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
}

function execute(options, context) {
  return rxjs.from(initialize(options, context.workspaceRoot))
    .pipe(rx_operators.switchMap((packager) => {
      if (options.watch) {
        return packager.watch().pipe(rx_operators.map(e => rxjs.from(buildSchematics(context))));
      }
      else {
        return packager.build().then(r => buildSchematics(context));
      }
    }), rx_operators.mapTo({ success: true }));
}
exports.execute = execute;
exports.default = architect.createBuilder(execute);
