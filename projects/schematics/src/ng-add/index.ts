import { Rule, SchematicContext, Tree, apply, url, chain, noop, template, filter, MergeStrategy, move, mergeWith } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { updateTsConfigPaths, setupOptions } from '../utils';
import { normalize } from '@angular-devkit/core';
import { strings } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// https://nitayneeman.com/posts/making-an-addable-angular-package-using-schematics/





// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: any): Rule {
  console.log('ngAdd options', options)
  // set default options
  if (!options.flat) {
    options.flat = false;
  }

  if (!options.path) {
    options.path = `src/`;
  }

  return chain([
    options && options.skipInstallNodePackage ? noop() : InstallTask(),
    options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
    options && options.skipTsConfigJson ? noop() : updateTsConfig(),
    options && options.skipAddFiles ? noop() : addFiles(options)
    // options && options.skipPackageJson ? noop() : installPackageJsonDependencies(),
    //options && options.skipModuleImport ? noop() : addModuleToImports(options),
    // options && options.skipPolyfill ? noop() : addPolyfillToScripts(options)
  ]);
}

function InstallTask(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return host;
  };
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

function addFiles(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath = (options.flat) ?
      normalize(options.path) :
      normalize(options.path + '/' + strings.dasherize(options.name));

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    return rule(tree, context);
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
