import { Rule, SchematicContext, Tree, apply, url, chain, noop } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { updateTsConfigPaths } from '../utils';

// https://nitayneeman.com/posts/making-an-addable-angular-package-using-schematics/


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: any): Rule {
  /* return (tree: Tree, _context: SchematicContext) => {
    return tree;
  }; */

  return chain([
    options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
    options && options.skipTsConfigJson ? noop() : updateTsConfig(),
    options && options.skipAddFiles ? noop() : addFiles()
    // options && options.skipPackageJson ? noop() : installPackageJsonDependencies(),
    //options && options.skipModuleImport ? noop() : addModuleToImports(options),
    // options && options.skipPolyfill ? noop() : addPolyfillToScripts(options)
  ]);
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const version = '~2.0.0';
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: version, name: '@clr/angular' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/ui' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/icons' },
      { type: NodeDependencyType.Default, version: version, name: '@clr/core' }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function addFiles(): Rule {
  return (host: Tree, context: SchematicContext) => {
    apply(url('./files'), []);
    context.logger.log('info', `Added files`);
    return host;
  };
}

function updateTsConfig(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const tsconfigPaths = [
      { name: '@ukis/*', paths: ['frontend-libraries/projects/*'] }
    ];

    tsconfigPaths.forEach((path) => {
      updateTsConfigPaths(path.name, path.paths)
      context.logger.log('info', `✅️ Added "${path.name}" with paths "${path.paths.join(',')}" into tsconfig.json`);
    });
    return host;
  };
}
