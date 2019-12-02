import { parseJson, JsonParseMode } from "@angular-devkit/core";
import { Tree } from '@angular-devkit/schematics';

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

            // deep import & secondary entrypoint support
            const deepPackagePath = packageName + '/*';
            if (!tsconfig.compilerOptions.paths[deepPackagePath]) {
                tsconfig.compilerOptions.paths[deepPackagePath] = [];
            }
            tsconfig.compilerOptions.paths[deepPackagePath].push(paths + '/*');
        });
    };
}