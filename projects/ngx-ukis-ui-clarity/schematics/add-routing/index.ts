import {
  Rule, Tree, chain, apply, url, mergeWith, move,
  filter, noop, applyTemplates, SchematicContext
} from '@angular-devkit/schematics';
import { normalize, join, getSystemPath, Path } from '@angular-devkit/core';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { UkisNgAddRoutingSchema } from './schema';
import { getProjectName, checkProjectSourceRoot } from '../workspace-utils';
import { addServiceComponentModule, getMainPath, ImoduleImport } from '../ast-utils';
import { isStandaloneApp } from '@schematics/angular/utility/ng-ast-utils';



// https://angular.io/guide/schematics-for-libraries
// https://dev.to/thisdotmedia/schematics-pt-3-add-tailwind-css-to-your-angular-project-40pp
export function addRouting(options: UkisNgAddRoutingSchema): Rule {
  const rules: Rule[] = [
    (options.addFiles === false) ? noop() : chain([ruleAddFiles(options), ruleRemoveFiles(options.project)]),
    (options.updateFiles === false) ? noop() : ruleAddImportsInAppModule(options.project),
    // (_options.skip === true) ? noop() : ruleAddImportsInAppComponent(_options)
  ];

  return chain(rules);
}

/**
 * add files from template folder
 * - app
 * - app/route-components
 *
 *  TODO: update app.component.ts not override
 */
function ruleAddFiles(options: UkisNgAddRoutingSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, options.project);
    if (projectName) {
      const project = workspace.projects.get(projectName);

      if (project && checkProjectSourceRoot(project, context)) {
        const sourcePath = join(normalize(project.root), project.sourceRoot); // project.sourceRoot
        const appPath = join(sourcePath, 'app');
        const templateVariabels = Object.assign(options, {
          appPrefix: project.prefix
        });

        const appTemplateSource = apply(url('./files/src/app'), [
          applyTemplates({ ...templateVariabels }),
          filter((path: Path) => {
            const removeFiles = ['app.component.html', 'app.component.ts', 'app-routing.module.ts', 'app.config.ts', 'app.routes.ts'];
            /**
             * check for existing files and remove them so the are allowed to overwrite!
             */
            const destPath = join(appPath, path);
            if (tree.exists(destPath)) {
              for (const f of removeFiles) {
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
          mergeWith(appTemplateSource)
        ]);

      }
    }
  };
}


/**
 * remove files if isStandaloneApp
 * - routing.module
 */
function ruleRemoveFiles(optionsProject: UkisNgAddRoutingSchema['project']): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    // check if /views/example-view is existing from ng-add

    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, optionsProject);
    if (projectName) {
      const project = workspace.projects.get(projectName);

      if (project && checkProjectSourceRoot(project, context)) {
        let mainPath = getMainPath(project);
        const sourcePath = join(tree.root.path, normalize(project.root), project.sourceRoot); // project.sourceRoot

        const isStandalone = isStandaloneApp(tree, mainPath);
        const appPath = join(sourcePath, 'app');
        const standaloneRemove = ['app-routing.module.ts'].map(f => join(appPath, f));
        const moduleRemove = ['app.config.ts'].map(f => join(appPath, f));
        const removeFiles = (isStandalone) ? standaloneRemove : moduleRemove;

        /**
       * loop over the tree and then use tree.delete
       * check that the path is correct src/.. or /src/...
       */
        tree.visit(file => {
          for (const f of removeFiles) {
            if (file.startsWith(f)) {
              tree.delete(file);
            }
          }
        });
      }
    }
  };
}


/**
 * app.module.ts add imports
 * - core-ui components
 * - AppRoutingModule
 * - HttpClientModule?
 */
function ruleAddImportsInAppModule(optionsProject: UkisNgAddRoutingSchema['project']): Rule {
  const rules: Rule[] = [];
  const imports: ImoduleImport[] = [
    { classifiedName: 'AppRoutingModule', path: './app-routing.module', module: true },
    { classifiedName: 'ExampleRouteComponent', path: './route-components/example-route/example-route.component', declare: true }
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
 * https://www.softwarearchitekt.at/aktuelles/generating-custom-angular-code-with-the-cli-and-schematics-part-iii/
 * TODO
 */
/* function ruleAddImportsInAppComponent(_options: UkisNgAddRoutingSchema): Rule {
    const appCompPath = '/src/app/app.component.ts';
    const rules: Rule[] = [];
    const imports: ImoduleImport[] = [
        { classifiedName: 'Router', path: '@angular/router' }
    ];
    // create a rule for each insertImport/addProviderToModule because addProviderToModule is not working multiple times in one Rule???
    imports.map(item => {
        rules.push(addServiceComponentModule(_options, item, appCompPath));
    });

    // then chain the rules to one
    return chain(rules);
} */

