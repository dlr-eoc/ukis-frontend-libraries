import {
  Rule, SchematicContext, Tree, chain, apply, url, mergeWith, move,
  filter, externalSchematic, noop, SchematicsException, applyTemplates, schematic
} from '@angular-devkit/schematics';
import { normalize, join, getSystemPath, Path } from '@angular-devkit/core';
import { UkisNgAddSchema } from './schema';


import { getProject, addServiceComponentModule, ImoduleImport, updateJsonFile, updateHtmlFile, getStyleExt } from '../utils';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/config';
import { TsconfigJSON } from '../schema.tsconfig';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { UkisNgAddRoutingSchema } from '../add-routing/schema';



// https://angular.io/guide/schematics-for-libraries
// https://dev.to/thisdotmedia/schematics-pt-3-add-tailwind-css-to-your-angular-project-40pp
export function ngAdd(options: UkisNgAddSchema): Rule {
  const addRoutingOptions: UkisNgAddRoutingSchema = {
    project: options.project,
    addFiles: options.addFiles,
    updateFiles: options.updateFiles
  };

  /**
   * Schematic input does not validate against the Schema: {"routing":"true"}. Data path ".routing" should be boolean.
   * https://github.com/angular/angular-cli/issues/12150 - @angular-devkit\schematics-cli\bin\schematics.js
   *
   * therefore types of schema as string
   */
  const rules: Rule[] = [
    (options.addClr === 'false') ? noop() : externalSchematic('@clr/angular', 'ng-add', options),
    (options.addFiles === 'false') ? noop() : ruleAddFiles(options),
    (options.updateFiles === 'false') ? noop() : ruleAddImportsInAppModule(options),
    (options.updateFiles === 'false') ? noop() : ruleUpdateAngularJson(options),
    (options.updateFiles === 'false') ? noop() : ruleUpdateTsConfigFile(),
    (options.updateFiles === 'false') ? noop() : ruleUpdateIndexHtml(options),
    (options.routing === 'false') ? noop() : schematic('add-routing', addRoutingOptions)
  ];

  return chain(rules);
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
  return (tree: Tree, context: SchematicContext) => {
    const project = getProject(tree, options);
    const workspace = getWorkspace(tree);

    if (!project.sourceRoot) {
      project.sourceRoot = 'src';
      throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
    }

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
  };
}


/**
 * app.module.ts add imports
 * - core-ui components
 * - HttpClientModule?
 */
function ruleAddImportsInAppModule(options: UkisNgAddSchema): Rule {
  const rules: Rule[] = [];
  const imports: ImoduleImport[] = [
    // { classifiedName: 'HttpClientModule', path: '@angular/common/http', module: true },

    { classifiedName: 'HeaderComponent', path: './components/header/header.component', declare: true },
    { classifiedName: 'GlobalAlertComponent', path: './components/global-alert/global-alert.component', declare: true },
    { classifiedName: 'AlertService', path: './components/global-alert/alert.service', provide: true },
    { classifiedName: 'GlobalProgressComponent', path: './components/global-progress/global-progress.component', declare: true },
    { classifiedName: 'ProgressService', path: './components/global-progress/progress.service', provide: true }
  ];

  /**
   * create a rule for each insertImport/addProviderToModule because addProviderToModule is not working multiple times in one Rule???
   */
  imports.map(item => {
    rules.push(addServiceComponentModule(options, item));
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
  return (tree: Tree, context: SchematicContext) => {
    const project = getProject(tree, options);
    const workspace = getWorkspace(tree);
    const styleExt = getStyleExt(project, workspace, context);

    ['build', 'test'].map(target => {
      updateAngularArchitect(project, target, styleExt);
    });

    /**
     * update to use scss
     */
    if (!project.schematics) {
      project.schematics = {};
    }

    if (!project.schematics['@schematics/angular:component']) {
      project.schematics['@schematics/angular:component'] = {
        style: 'scss'
      };
    }
    project.schematics['@schematics/angular:component'].style = 'scss';


    if (!options.project) {
      throw new SchematicsException(`Could not find Project in the workspace check your --project`);
    }
    workspace.projects[options.project] = project;
    return updateWorkspace(workspace);
  };
}

/**
 * this is a helper
 */
function updateAngularArchitect(project: WorkspaceProject, type: string | 'build' | 'test', styleExt: string) {
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
        const found = target.options.styles.findIndex((i: string) => i === `src/styles.${styleExt}`);
        if (found !== -1) {
          target.options.styles[found] = 'src/styles.scss';
        } else {
          target.options.styles.push('src/styles.scss');
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
function ruleUpdateTsConfigFile(): Rule {
  const path = 'tsconfig.json';
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
function ruleUpdateIndexHtml(options: UkisNgAddSchema): Rule {
  return async (tree: Tree) => {
    const project = getProject(tree, options);

    if (!project.sourceRoot) {
      project.sourceRoot = 'src';
      throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
    }

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

