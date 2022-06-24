import {
  Rule, SchematicContext, Tree, chain, apply, url, mergeWith, move,
  filter, externalSchematic, noop, SchematicsException, applyTemplates, schematic
} from '@angular-devkit/schematics';
import { normalize, join, getSystemPath, Path } from '@angular-devkit/core';
import { UkisNgAddSchema } from './schema';



import {
  getStyleExt, checkProjectIsApplication, hasSchematicsStyle, getProjectName, checkProjectSourceRoot
} from '../workspace-utils';
import { addServiceComponentModule, removeServiceComponentModule, ImoduleImport } from '../ast-utils';
import { updateJsonFile } from '../json-utils';
import { updateHtmlFile } from '../html-utils';
import { TsconfigJSON } from '../schema.tsconfig';
import { UkisNgAddRoutingSchema } from '../add-routing/schema';
import { updateWorkspace, getWorkspace } from '@schematics/angular/utility/workspace';


/**
 * You should add @dlr-eoc/core-ui only to an angular application not a library!
 */
function isProjectTypeApplication(projectName?: string): Rule {
  return async (tree: Tree) => {
    const workspace = await getWorkspace(tree);
    checkProjectIsApplication(workspace, projectName);
  };
}

// https://angular.io/guide/schematics-for-libraries
// https://dev.to/thisdotmedia/schematics-pt-3-add-tailwind-css-to-your-angular-project-40pp
export function ngAdd(options: UkisNgAddSchema): Rule {
  /* return async host => {
  }; */
  const addRoutingOptions: UkisNgAddRoutingSchema = {
    project: options.project,
    addFiles: options.addFiles,
    updateFiles: options.updateFiles
  };

  const rules: Rule[] = [
    /**
     * externalSchematic not working with @angular-devkit ^8.3.20 (from 9.0.0 ???)
     * https://github.com/angular/angular-cli/issues/17085
     * maybe add @angular/clr to dependencies not peer..
     *
     * https://github.com/angular/angular-cli/issues/15250
     * https://medium.com/@coco.boudard/hello-1ab084f63a1
     * https://github.com/BottleRocketStudios/ng-momentum/issues/10
     */
    (options.addClr === false) ? noop() : externalSchematic('@clr/angular', 'ng-add', options),
    isProjectTypeApplication(options?.project),
    (options.addFiles === false) ? noop() : ruleAddFiles(options),
    (options.updateFiles === false) ? noop() : ruleAddImportsInAppModule(options.project),
    (options.updateFiles === false) ? noop() : ruleUpdateAngularJson(options),
    (options.updateFiles === false) ? noop() : ruleUpdateTsConfigFile(),
    (options.updateFiles === false) ? noop() : ruleUpdateIndexHtml(options),
    (options.routing === false) ? noop() : schematic('add-routing', addRoutingOptions),
    (options.routing === true) ? removeViewsAfterRouting(options.project) : noop()
  ];

  return chain(rules);
}

/**
 *
 */
function removeViewsFiles(optionsProject: UkisNgAddSchema['project']): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    // check if /views/example-view is existing from ng-add

    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, optionsProject);
    if (projectName) {
      const project = workspace.projects.get(projectName);

      if (project && checkProjectSourceRoot(project, context)) {
        const sourcePath = join(tree.root.path, normalize(project.root), project.sourceRoot); // project.sourceRoot
        const appPath = join(sourcePath, 'app');
        const viewsPath = join(appPath, 'views/example-view/');
        /**
         * loop over the tree and then use tree.delete
         * check that the path is correct src/.. or /src/...
         */
        tree.visit(file => {
          if (file.startsWith(viewsPath)) {
            tree.delete(file);
          }
        });
      }
    }
  };
}

/**
 * remove import { ExampleViewComponent } from './views/example-view/example-view.component';
 */
function removeViewsImports(optionsProject: UkisNgAddSchema['project']): Rule {
  const rules: Rule[] = [];
  const imports: ImoduleImport[] = [
    { classifiedName: 'ExampleViewComponent', path: './views/example-view/example-view.component', declare: true }
  ];

  imports.map(item => {
    rules.push(removeServiceComponentModule(optionsProject, item));
  });

  // then chain the rules to one
  return chain(rules);
}

/**
 * remove import and files for views/example-view;
 *
 * TODO: warnings
 * In your workspace is no style extension defined use default scss
 */
function removeViewsAfterRouting(optionsProject: UkisNgAddSchema['project']): Rule {
  return chain([
    removeViewsFiles(optionsProject),
    removeViewsImports(optionsProject)
  ]);
}

/**
 * add files from template folder
 * - src
 * - assets
 * - styles
 * - app
 */
function ruleAddFiles(options: UkisNgAddSchema): Rule {
  /**
   * app.component.html
   * add default template from files
   * <clr-main-container>
   * ...
   * </clr-main-container>
   *
   *  TODO: check for style files and replace them e.g. app.component.styl ...
   */
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, options.project);
    if (projectName) {
      const project = workspace.projects.get(projectName);

      if (project && checkProjectSourceRoot(project, context)) {
        const sourcePath = join(normalize(project.root), project.sourceRoot); // project.sourceRoot
        const assetsPath = join(sourcePath, 'assets');
        const stylesPath = join(sourcePath, 'styles');
        const appPath = join(sourcePath, 'app');
        const styleExt = getStyleExt(project, workspace, context);
        const templateVariabels = Object.assign(options, {
          appPrefix: project.prefix,
          styleExt
        });

        const srcTemplateSource = apply(url('./files/src/'), [
          applyTemplates({ ...templateVariabels }),
          filter((path: Path) => {
            const separator = /[\\|\/]/g;
            const pathSeperators = path.match(separator);
            if (pathSeperators && pathSeperators.length > 1) {
              return false;
            } else {
              const testFiles = ['favicon.ico', 'styles.css', 'styles.scss'];
              /**
               * check for existing files the are allowed to overwrite!
               */
              const destPath = join(sourcePath, path);
              if (tree.exists(destPath)) {
                for (const f of testFiles) {
                  /** delete styles.css file it is replaced with scss */
                  if (f === 'styles.css') {
                    const styleExtTest = join(sourcePath, f);
                    if (tree.exists(styleExtTest)) {
                      tree.delete(styleExtTest);
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
            const testFiles = ['app.component.html', 'app.component.ts', 'app.component.css', 'app.component.scss'];
            /**
             * check for existing files the are allowed to overwrite!
             */
            const destPath = join(appPath, path);
            if (tree.exists(destPath)) {
              for (const f of testFiles) {
                /** delete app.component.css file it is replaced with scss */
                if (f === 'app.component.css') {
                  const styleExtTest = join(appPath, f);
                  if (tree.exists(styleExtTest)) {
                    tree.delete(styleExtTest);
                  }
                }
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
      }
    }
  };
}


/**
 * app.module.ts add imports
 * - core-ui components
 * - HttpClientModule?
 */
function ruleAddImportsInAppModule(optionsProject: UkisNgAddSchema['project']): Rule {
  const rules: Rule[] = [];
  const imports: ImoduleImport[] = [
    // { classifiedName: 'HttpClientModule', path: '@angular/common/http', module: true },
    { classifiedName: 'HeaderComponent', path: './components/header/header.component', declare: true },
    { classifiedName: 'GlobalAlertComponent', path: './components/global-alert/global-alert.component', declare: true },
    { classifiedName: 'AlertService', path: './components/global-alert/alert.service', provide: true },
    { classifiedName: 'GlobalProgressComponent', path: './components/global-progress/global-progress.component', declare: true },
    { classifiedName: 'ProgressService', path: './components/global-progress/progress.service', provide: true },
    { classifiedName: 'ExampleViewComponent', path: './views/example-view/example-view.component', declare: true }
  ];

  /**
   * create a rule for each insertImport/addProviderToModule because addProviderToModule is not working multiple times in one Rule???
   */
  imports.map(item => {
    rules.push(addServiceComponentModule(optionsProject, item));
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
function ruleUpdateAngularJson(options: UkisNgAddSchema): Rule {
  return chain([
    updateProjectStylesExtension(options),
    updateWorkspaceAndProjectStyleExtension(options)
  ]);
}

function updateProjectStylesExtension(options: UkisNgAddSchema) {
  return async (tree: Tree) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, options.project);
    if (projectName) {
      const project = workspace.projects.get(projectName);
      if (project) {
        project.targets.forEach((target, key) => {
          if (target?.options?.styles && Array.isArray(target.options.styles)) {
            target.options.styles = replaceStyles(target.options.styles as string[]);
            project.targets.set(key, target);
          }
        });
        return updateWorkspace((workspace) => {
          workspace.projects.set(projectName, project);
        });
      }
    }
  };
}

/**
 * replace styles.css in array if it exists
 */
function replaceStyles(styles: string[]) {
  return styles.map(i => {
    if (i.includes('styles.css')) {
      return i.replace('.css', '.scss');
    } else {
      return i;
    }
  });
}

/**
 * Update Workspace file extension for style files.
 */
function updateWorkspaceAndProjectStyleExtension(options: UkisNgAddSchema) {
  return async (tree: Tree) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, options.project);
    if (projectName) {
      const project = workspace.projects.get(projectName);
      if (project) {
        if (hasSchematicsStyle(project.extensions)) {
          project.extensions.schematics['@schematics/angular:component'].style = 'scss';
        } else {
          if (typeof project.extensions === 'object') {
            project.extensions.schematics = {
              '@schematics/angular:component': {
                style: 'scss'
              }
            };
          }
        }
        return updateWorkspace((workspace) => {
          workspace.projects.set(projectName, project);
        });
      }
    }
  };
}

/**
 * tsconfig.base.json add
 *
 * - compilerOptions.paths
 */
function ruleUpdateTsConfigFile(): Rule {
  return (tree: Tree) => {
    let path = 'tsconfig.json';
    const pathBase = 'tsconfig.base.json';

    if (tree.exists(pathBase)) {
      path = pathBase;
    } else if (!tree.exists(pathBase) && !tree.exists(path)) {
      throw new SchematicsException(`${path} or ${pathBase} is not in the workspace!`);
    }

    return updateJsonFile<TsconfigJSON>(path, (json) => {
      const tsconfigPaths = [
        { name: '@dlr-eoc/*', paths: ['frontend-libraries/projects/*'] }
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

      // skipLibCheck for libraries like OpenLayers
      if (!json.compilerOptions.skipLibCheck) {
        json.compilerOptions.skipLibCheck = true;
      }

      return json;
    });
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
function ruleUpdateIndexHtml(options: UkisNgAddSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, options.project);
    if (projectName) {
      const project = workspace.projects.get(projectName);
      if (project && checkProjectSourceRoot(project, context)) {
        const sourcePath = join(normalize(project.root), project.sourceRoot, 'index.html'); // project.sourceRoot

        let projectTitle = 'Your App';
        if (options.project) {
          projectTitle = options.project;
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
          updateHtmlFile(sourcePath, 'head', 'head', headerTags)
        ]);
      }
    }
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

