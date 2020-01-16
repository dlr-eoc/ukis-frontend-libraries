import { Rule, SchematicContext, Tree, chain, SchematicsException, apply, url, mergeWith, move, template, forEach } from '@angular-devkit/schematics';
// mergeWith, MergeStrategy, noop, filter, template, apply, move, url
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { normalize, join, getSystemPath } from '@angular-devkit/core';
import { UkisNgAddSchema } from './schema';
import { getWorkspace } from '@schematics/angular/utility/config';
// import { setupOptions } from '../utils';
// import { strings, normalize } from '@angular-devkit/core';

// https://angular.io/guide/schematics-for-libraries
export function ngAdd(_options: UkisNgAddSchema): Rule {
    return chain([
        InstallTask(),
        AddFiles(_options),
        AdjustFiles(_options)
    ]);
}

function InstallTask(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        _context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

function AddFiles(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const workspace = getWorkspace(tree);
        if (!_options.project && workspace.defaultProject) {
            _options.project = workspace.defaultProject;
        } else {
            throw new SchematicsException(`Could not find a default Project in the workspace and you didn't set a project`);
        }

        const project = workspace.projects[_options.project];
        if (project.projectType === 'library') {
            throw new SchematicsException(`You should ad @ukis/core-ui only to an angular application not a library!`);
        }

        if (!project.sourceRoot) {
            project.sourceRoot = 'src';
        }

        const sourcePath = join(normalize(project.root)); // project.sourceRoot
        // const assetsPath = join(sourcePath, 'assets');
        // const stylesPath = join(sourcePath, 'styles');

        const rootTemplateSource = apply(url('./files'), [
            template({ ..._options }),
            forEach(fileEntry => {
                const destPath = join(sourcePath, fileEntry.path);
                console.log(destPath);
                if (tree.exists(destPath)) {
                    tree.overwrite(destPath, fileEntry.content);
                } else {
                    tree.create(destPath, fileEntry.content);
                }
                return null;
            }),
            move(getSystemPath(sourcePath)),
        ]);

        /* const assetsTemplateSource = apply(url('./files/src/assets'), [
            template({ ..._options }),
            move(getSystemPath(assetsPath)),
        ]);

        const stylesTemplateSource = apply(url('./files/src/styles'), [
            template({ ..._options }),
            move(getSystemPath(stylesPath)),
        ]); */

        return chain([
            mergeWith(rootTemplateSource),
            // mergeWith(assetsTemplateSource),
            // mergeWith(stylesTemplateSource)
        ]);
    };
}

function AdjustFiles(_options: UkisNgAddSchema) {
    return (tree: Tree, _context: SchematicContext) => {
        // TODO ADJUST files 
        /**
         * app.component.html
         * app.component.ts
         * app.module.ts
         *
         * index.html
         * styles.scss //style.css
         * angular.json
         * tsconfig.json
         * 
         */
        return tree;
    };
}


/* function addPackageJsonDependencies(): Rule {
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
    // If you are using the Angular CLI with multiple projects, you can specify which project to add Clarity
    // to by using the --project PROJECTNAME flag.
    // return externalSchematic('@clr/angular', 'add', {});
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
} */
