import {
    Rule, SchematicContext, Tree, chain, apply, url, mergeWith, move,
    filter, externalSchematic, noop, SchematicsException, applyTemplates
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { normalize, join, getSystemPath, Path } from '@angular-devkit/core';
import { UkisNgAddSchema } from './schema';


import { getProject, addServiceComponentModule, ImoduleImport, updateJsonFile, updateHtmlFile } from '../utils';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/config';
import { TsconfigJSON } from '../schema.tsconfig';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';



// https://angular.io/guide/schematics-for-libraries
// https://dev.to/thisdotmedia/schematics-pt-3-add-tailwind-css-to-your-angular-project-40pp
export function ngAdd(_options: UkisNgAddSchema): Rule {
    const rules: Rule[] = [
        (_options.skip) ? noop() : externalSchematic('@clr/angular', 'ng-add', _options),
        (_options.skip) ? noop() : ruleAddFiles(_options),
        (_options.skip) ? noop() : ruleAddImportsInAppModule(_options),
        (_options.skip) ? noop() : ruleUpdateAngularJson(_options),
        (_options.skip) ? noop() : ruleUpdateTsConfigFile(_options),
        (_options.skip) ? noop() : ruleUpdateIndexHtml(_options),
        (_options.skip) ? noop() : ruleInstallTask(_options)
    ];

    return chain(rules);
}

function ruleInstallTask(_options: UkisNgAddSchema): Rule {
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
function ruleAddFiles(_options: UkisNgAddSchema): Rule {
    /**
     * app.component.html
     * add default template from files
     * <clr-main-container>
     * ...
     * </clr-main-container>
     *
     */
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
        const templateVariabels = Object.assign(_options, {
            appPrefix: project.prefix
        });

        const srcTemplateSource = apply(url('./files/src/'), [
            applyTemplates({ ...templateVariabels }),
            filter((path: Path) => {
                const separator = /[\\|\/]/g;
                const pathSeperators = path.match(separator);
                if (pathSeperators && pathSeperators.length > 1) {
                    return false;
                } else {
                    const testFiles = ['favicon.ico', 'styles.scss', 'styles.css'];
                    /**
                     * check for existing files the are allowed to overwrite!
                     */
                    const destPath = join(sourcePath, path);
                    if (tree.exists(destPath)) {
                        for (const f of testFiles) {
                            /** delete css file it is replaced with scss */
                            if (f === 'styles.css') {
                                const cssp = join(sourcePath, f);
                                if (tree.exists(cssp)) {
                                    tree.delete(cssp);
                                }
                            }
                            if (destPath.includes(f)) {
                                tree.delete(destPath);
                            }
                        }
                    }
                    return true;
                }
            }),
            // renameTemplateFiles(), //  Remove every `.template` suffix from file names.
            move(getSystemPath(sourcePath)),
        ]);

        const assetsTemplateSource = apply(url('./files/src/assets'), [
            applyTemplates({ ...templateVariabels }),
            move(getSystemPath(assetsPath)),
        ]);

        const stylesTemplateSource = apply(url('./files/src/styles'), [
            applyTemplates({ ...templateVariabels }),
            move(getSystemPath(stylesPath)),
        ]);

        const appTemplateSource = apply(url('./files/src/app'), [
            applyTemplates({ ...templateVariabels }),
            filter((path: Path) => {
                const testFiles = ['app.component.html', 'app.component.ts'];
                /**
                 * check for existing files the are allowed to overwrite!
                 */
                const destPath = join(appPath, path);
                if (tree.exists(destPath)) {
                    for (const f of testFiles) {
                        if (destPath.includes(f)) {
                            tree.delete(destPath);
                        }
                    }
                }
                return true;
            }),
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
function ruleAddImportsInAppModule(_options: UkisNgAddSchema): Rule {
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
function ruleUpdateAngularJson(_options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const project = getProject(tree, _options);
        const workspace = getWorkspace(tree);
        ['build', 'test'].map(target => {
            updateAngularArchitect(project, target);
        });

        /**
         * update to use scss
         */
        if (!project.schematics) {
            project.schematics = {};
        }

        if (!project.schematics['@schematics/angular:component']) {
            project.schematics['@schematics/angular:component'] = {
                'style': 'scss'
            };
        }
        project.schematics['@schematics/angular:component']['style'] = 'scss';


        if (!_options.project) {
            throw new SchematicsException(`Could not find Project in the workspace check your --project`);
        }
        workspace.projects[_options.project] = project;

        /**
         * update to use scss
         */
        /* if (!workspace.schematics) {
            workspace.schematics = {};
        }

        workspace.schematics['@schematics/angular:component'] = {
            'styleext': 'scss'
        }; */

        return updateWorkspace(workspace);
    };
}

/**
 * this is a helper
 */
function updateAngularArchitect(project: WorkspaceProject, type: string | 'build' | 'test') {
    const architect = project.architect;
    if (architect && architect[type]) {
        const target = architect[type];
        if (target.options && 'assets' in target.options) {
            if (Array.isArray(target.options.assets) && !target.options.assets.includes('src/manifest.json')) {
                target.options.assets.push('src/manifest.json');
            }
        }

        if (target.options && 'styles' in target.options) {
            if (Array.isArray(target.options.styles) && !target.options.styles.includes('src/styles.scss')) {
                const found = target.options.styles.findIndex((i: string) => i === 'src/styles.css');
                if (found !== -1) {
                    target.options.styles[found] = 'src/styles.scss';
                } else {
                    target.options.styles.push('src/styles.scss')
                }
            }
        }
    }
}

/**
 * tsconfig.json add
 *
 * - compilerOptions.paths
 */
function ruleUpdateTsConfigFile(_options: UkisNgAddSchema): Rule {
    const path = 'tsconfig.json';
    return updateJsonFile<TsconfigJSON>(path, (json) => {
        const tsconfigPaths = [
            { name: '@ukis/*', paths: ['frontend-libraries/projects/*'] }
        ];

        if (!json.compilerOptions) {
            json.compilerOptions = {};
        }

        if (!json.compilerOptions.paths) {
            json.compilerOptions.paths = {};
        }

        for (const p of tsconfigPaths) {
            json.compilerOptions.paths[p.name] = p.paths;
        }

        return json;
    });
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
function ruleUpdateIndexHtml(_options: UkisNgAddSchema): Rule {
    return async (tree: Tree, _context: SchematicContext) => {
        const project = getProject(tree, _options);

        if (!project.sourceRoot) {
            project.sourceRoot = 'src';
            throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
        }

        const sourcePath = join(normalize(project.root), project.sourceRoot, 'index.html'); // project.sourceRoot



        let projectTitle = 'Your App';
        if (_options.project) {
            projectTitle = _options.project;
        }

        const headerTags = [
            `  <meta name="title" content="${projectTitle}">\n`,
            `  <meta name="short-title" content="This should be a shorter title like - ${projectTitle}">\n`,
            `  <meta name="description" content="This should be the description for - ${projectTitle}">\n`,
            `  <meta name="version" content="This should be the version of - ${projectTitle}">\n`,
            `  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">\n`,
            `  <link rel="icon" type="image/x-icon" href="favicon.ico">\n`
        ];

        return chain([
            updateHtmlFile(sourcePath, 'head', 'head', headerTags, _options)
        ]);
    };
}


// TODO: maybe update this files instead of replacing them

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

