import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
// import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { updateTsConfigPaths } from '../utils';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const tsconfigPaths = [
      { name: '@ukis/*', paths: ['frontend-libraries/projects/*'] }
    ];

    tsconfigPaths.forEach((path) => {
      updateTsConfigPaths(path.name, path.paths)
      _context.logger.log('info', `✅️ Added "${path.name}" with paths "${path.paths.join(',')}" into tsconfig.json`);
    });

    //const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));
    //console.log(packageJson);
    /* const version = '~2.0.0';
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: version, name: '@clr/angular' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/ui' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/icons' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/core' }
    ];
    dependencies.forEach((dep) => {
      addPackageJsonDependency(tree, dep);
      _context.logger.log('info', `✅️ Added "${dep.name}" into ${dep.type}`);
    }); */


    return tree;
  };
}
