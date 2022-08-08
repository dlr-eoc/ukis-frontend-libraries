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
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { NgPackagrBuilderOptions } from '@angular-devkit/build-angular';
import { resolve } from 'path';
import { Observable, from, of } from 'rxjs';
import { mapTo, switchMap, catchError, map } from 'rxjs/operators';

import { spawn } from 'child_process';
import * as os from 'os';
import * as cpx from 'cpx';


async function initialize(
  options: NgPackagrBuilderOptions,
  root: string,
): Promise<import('ng-packagr').NgPackagr> {
  const packager = (await import('ng-packagr')).ngPackagr();

  packager.forProject(resolve(root, options.project));

  if (options.tsConfig) {
    packager.withTsConfig(resolve(root, options.tsConfig));
  }

  return packager;
}


async function transpile(context: BuilderContext) {
  const options = {
    command: 'npx',
    args: ['tsc', '-p', 'projects/core-ui/tsconfig.schematics.json']
  }
  if (os.platform() === "win32") {
    options.command = 'npx.cmd'
  }
  context.reportStatus(`Executing "${options.command}"...`);
  context.logger.info(`Executing Transpile: ${options.args.join(' ')}`);
  const child = spawn(options.command, options.args, { stdio: 'pipe', cwd: process.cwd() });

  child.stdout.on('data', (data) => {
    context.logger.info(data.toString());
  });
  child.stderr.on('data', (data) => {
    context.logger.error(data.toString());
  });

  return new Promise<{ success: boolean }>(resolve => {
    context.reportStatus(`Done.`);
    child.on('close', code => {
      context.logger.info(`Transpile Done.`);
      resolve({ success: code === 0 });
    });
  });
}


async function copyFiles(context: BuilderContext) {
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
  ]

  const copyFiles = filePaths.map(item => {
    return new Promise<{ from: string, to: string }>((resolve, reject) => {
      cpx.copy(item.source, item.dest, cpxOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          const info = {
            from: item.source,
            to: item.dest
          }
          context.logger.info(`copy files from: ${info.from} to: ${info.to}`);
          resolve(info);
        }
      });
    });
  })

  return Promise.all(copyFiles);
}

/** @deprecated Since 10.1 use `executeNgPackagrBuilder` from `@angular-devkit/build-angular` instead. */
export function execute(
  options: NgPackagrBuilderOptions,
  context: BuilderContext,
): Observable<BuilderOutput> {
  return from(initialize(options, context.workspaceRoot)).pipe(
    switchMap(packager => {
      const tc = transpile(context).then(() => copyFiles(context));
      if (options.watch) {
        const obs = map(() => from(tc)) as any;
        return packager.watch(options).pipe(obs);
      }
      else {
        return packager.build(options).then(() => tc);
      }
    }),
    mapTo({ success: true }),
    catchError((err) => of({ success: false, error: err.message })),
  );
}


export default createBuilder<Record<string, string> & NgPackagrBuilderOptions>(execute);
