import { parseJson, JsonParseMode } from "@angular-devkit/core";
import { Tree } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';

export interface UpdateJsonFn<T> {
    (obj: T): T | void;
}

export function updateJsonFile<T>(host: Tree, path: string, callback: UpdateJsonFn<T>): Tree {
    const source = host.read(path);
    if (source) {
        const sourceText = source.toString('utf-8');
        const json = parseJson(sourceText, JsonParseMode.Loose);
        callback(json as {} as T);
        host.overwrite(path, JSON.stringify(json, null, 2));
    }

    return host;
}


export type TsConfigPartialType = {
    compilerOptions: {
        baseUrl: string,
        paths: {
            [key: string]: string[];
        },
    },
};

export function updateTsConfigPaths(packageName: string, paths: string[]) {
    return (host: Tree) => {
        if (!host.exists('tsconfig.json')) { return host; }

        return updateJsonFile(host, 'tsconfig.json', (tsconfig: TsConfigPartialType) => {
            if (!tsconfig.compilerOptions.paths) {
                tsconfig.compilerOptions.paths = {};
            }
            if (!tsconfig.compilerOptions.paths[packageName]) {
                tsconfig.compilerOptions.paths[packageName] = [];
            }
            tsconfig.compilerOptions.paths[packageName].concat(paths);
        });
    };
}

export function setupOptions(host: Tree, options: any): Tree {
    const workspace = getWorkspace(host);
    if (!options.project) {
      options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
  
    if (options.path === undefined) {
      options.path = buildDefaultPath(project);
    }
  
    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
  }