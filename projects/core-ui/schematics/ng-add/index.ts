import {
    Rule, SchematicContext, Tree, chain, apply, url, mergeWith, move, template,
    filter, externalSchematic, noop, SchematicsException
} from '@angular-devkit/schematics';
// mergeWith, MergeStrategy, noop, filter, template, apply, move, url
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { normalize, join, getSystemPath, Path, parseJson, JsonParseMode } from '@angular-devkit/core';
import { UkisNgAddSchema } from './schema';


import { getProject, addServiceComponentModule, ImoduleImport, updateWorkspaceFile } from '../utils';
import { getWorkspace } from '@schematics/angular/utility/config';



// https://angular.io/guide/schematics-for-libraries
export function ngAdd(_options: UkisNgAddSchema): Rule {
    const rules: Rule[] = [
        (_options.skip) ? noop() : externalSchematic('@clr/angular', 'ng-add', _options),
        (_options.skip) ? noop() : installTask(_options),
        (_options.skip) ? noop() : addFiles(_options),
        (_options.skip) ? noop() : addImportsInAppModule(_options),
        (_options.skip) ? noop() : updateAngularJson(_options),
        updateTsConfigFile(_options),
        (_options.skip) ? noop() : updateIndexHtml(_options)
    ];

    return chain(rules);
}

function installTask(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        _context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

/**
 * add files from template folder
 * - src
 * - assets
 * - styles
 * - app
 */
function addFiles(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const project = getProject(tree, _options);

        if (!project.sourceRoot) {
            project.sourceRoot = 'src';
            throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
        }

        const sourcePath = join(normalize(project.root), project.sourceRoot); // project.sourceRoot
        const assetsPath = join(sourcePath, 'assets');
        const stylesPath = join(sourcePath, 'styles');
        const appPath = join(sourcePath, 'app');

        const srcTemplateSource = apply(url('./files/src/'), [
            template({ ..._options }),
            filter((path: Path) => {
                const separator = /[\\|\/]/g;
                const pathSeperators = path.match(separator);
                if (pathSeperators && pathSeperators.length > 1) {
                    return false;
                } else {
                    const destPath = join(sourcePath, path);
                    if (tree.exists(destPath)) {
                        tree.delete(destPath);
                    }
                    return true;
                }
            }),
            move(getSystemPath(sourcePath)),
        ]);

        const assetsTemplateSource = apply(url('./files/src/assets'), [
            template({ ..._options }),
            move(getSystemPath(assetsPath)),
        ]);

        const stylesTemplateSource = apply(url('./files/src/styles'), [
            template({ ..._options }),
            move(getSystemPath(stylesPath)),
        ]);

        const appTemplateSource = apply(url('./files/src/app'), [
            template({ ..._options }),
            move(getSystemPath(appPath)),
        ]);


        return chain([
            mergeWith(srcTemplateSource),
            mergeWith(appTemplateSource),
            mergeWith(assetsTemplateSource),
            mergeWith(stylesTemplateSource)
        ]);
    };
}


/**
 * app.module.ts add imports
 * - core-ui components
 * - AppRoutingModule
 * - HttpClientModule?
 */
function addImportsInAppModule(_options: UkisNgAddSchema): Rule {
    const rules: Rule[] = [];
    const imports: ImoduleImport[] = [
        { classifiedName: 'HttpClientModule', path: '@angular/common/http', module: true },
        { classifiedName: 'AppRoutingModule', path: './app-routing.module', module: true },

        { classifiedName: 'HeaderComponent', path: './components/header/header.component', declare: true },
        { classifiedName: 'GlobalAlertComponent', path: './components/global-alert/global-alert.component', declare: true },
        { classifiedName: 'AlertService', path: './components/global-alert/alert.service', provide: true },
        { classifiedName: 'GlobalProgressComponent', path: './components/global-progress/global-progress.component', declare: true },
        { classifiedName: 'ProgressService', path: './components/global-progress/progress.service', provide: true },
        { classifiedName: 'GlobalFooterComponent', path: './components/global-footer/global-footer.component', declare: true },
        { classifiedName: 'FooterService', path: './components/global-footer/footer.service', provide: true }
    ];

    /**
     * create a rule for each insertImport/addProviderToModule because addProviderToModule is not working multiple times in one Rule???
     */
    imports.map(item => {
        rules.push(addServiceComponentModule(_options, item));
    });

    // then chain the rules to one
    return chain(rules);
}

/**
 * angular.json
 * add to
 * - assets
 * - styles
 */
function updateAngularJson(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const project = getProject(tree, _options);
        const workspace = getWorkspace(tree);

        if (project.architect && project.architect.build) {
            const build = project.architect.build;
            if (build.options && 'assets' in build.options) {
                if (Array.isArray(build.options.assets) && !build.options.assets.includes('src/manifest.json')) {
                    build.options.assets.push('src/manifest.json');
                }
            }

            if (build.options && 'styles' in build.options) {
                if (Array.isArray(build.options.styles) && !build.options.styles.includes('src/styles.scss')) {
                    const found = build.options.styles.findIndex(i => i === 'src/styles.css');
                    if (found !== -1) {
                        build.options.styles[found] = 'src/styles.scss';
                    } else {
                        build.options.styles.push('src/styles.scss')
                    }
                }
            }
        }

        if (project.architect && project.architect.test) {
            const test = project.architect.test;
            if (test.options && 'assets' in test.options) {
                if (Array.isArray(test.options.assets) && !test.options.assets.includes('src/manifest.json')) {
                    test.options.assets.push('src/manifest.json');
                }
            }

            if (test.options && 'styles' in test.options) {
                if (Array.isArray(test.options.styles) && !test.options.styles.includes('src/styles.scss')) {
                    const found = test.options.styles.findIndex(i => i === 'src/styles.css');
                    console.log('foundIndex', found);
                    if (found !== -1) {
                        test.options.styles[found] = 'src/styles.scss';
                    } else {
                        test.options.styles.push('src/styles.scss')
                    }
                }
            }
        }

        if (!_options.project) {
            throw new SchematicsException(`Could not find Project in the workspace check your --project`);
        }
        workspace.projects[_options.project] = project;
        return updateWorkspaceFile(workspace);
    };
}

/**
 * tsconfig.json add
 *
 * - compilerOptions.paths
 */
function updateTsConfigFile(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const path = 'tsconfig.json';
        const tsconfigPaths = [
            { name: '@ukis/*', paths: ['frontend-libraries/projects/*'] }
        ];

        if (!tree.exists(path)) {
            throw new SchematicsException(`tsconfig.json is not in the workspace!`);
        }

        const source = tree.read(path);
        if (source) {
            const sourceText = source.toString('utf-8');
            const json = parseJson(sourceText, JsonParseMode.Loose);
            console.log(json)

            if (json instanceof Object && 'compilerOptions' in json) {
                if (json.compilerOptions instanceof Object && !Array.isArray(json.compilerOptions)) {
                    if ('paths' in json.compilerOptions && json.compilerOptions.paths instanceof Object && !Array.isArray(json.compilerOptions.paths)) {
                        json.compilerOptions.paths[tsconfigPaths[0].name] = tsconfigPaths[0].paths;
                    } else {
                        json.compilerOptions['paths'] = {};
                        json.compilerOptions.paths[tsconfigPaths[0].name] = tsconfigPaths[0].paths;
                    }
                }
            }
            tree.overwrite(path, JSON.stringify(json, null, 2));
        }
        return tree;
    };
}

/**
 * index.html
 * add to <head>
 * meta:
 * - title
 * - short-title
 * - description
 * - version
 * - theme-color
 * - viewport?
 * - http-equiv?
 *
 * link:
 * - shortcut icon
 * - manifest
 */
function updateIndexHtml(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        // TODO!!!!!!
        return tree;
    };
}


export function AdjustFiles() {

    /**
     * app.component.html
     * add default template from files
     * <clr-main-container>
     * ...
     * </clr-main-container>
     *
     */

    /**
    * app.component.ts
    * add imports for
    * - icons
    * - services
    * - Router
    * - variables for UI
    * - constructor imports
    * - init()
    * - getHtmlMeta()
    *
    * maybe use template file??
    */



    /**
     * styles.scss //style.css
     * if style.css remove and add file styles.scss from templates
     */
}
/*
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
    // If you are using the Angular CLI with multiple projects, you can specify which project to add Clarity
    // to by using the --project PROJECTNAME flag.
    // return externalSchematic('@clr/angular', 'add', {});
}
*/
