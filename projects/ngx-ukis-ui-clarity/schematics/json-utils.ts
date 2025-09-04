import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { parse } from 'jsonc-parser';

/**
 * Update a JSON File
 *
 * The callback function gets the actual file
 */
export function updateJsonFile<T>(path: string, cb: (jsonData: T) => T): Rule {
  return (tree: Tree) => {
    if (!tree.exists(path)) {
      throw new SchematicsException(`${path} is not in the workspace!`);
    }
    const source = tree.read(path);
    if (source) {
      const sourceText = source.toString('utf-8');
      let json = parse(sourceText) as any as T;
      json = cb(json);
      tree.overwrite(path, JSON.stringify(json, null, 2));
    }
    return tree;
  };
}
