import {
    Rule, SchematicContext, Tree, chain, apply, url, mergeWith, move,
    filter, noop, SchematicsException, applyTemplates
} from '@angular-devkit/schematics';
import { normalize, join, getSystemPath, Path } from '@angular-devkit/core';
import { UkisNgAddRoutingSchema } from './schema';
import { getProject, addServiceComponentModule, ImoduleImport } from '../utils';



// https://angular.io/guide/schematics-for-libraries
// https://dev.to/thisdotmedia/schematics-pt-3-add-tailwind-css-to-your-angular-project-40pp
export function addRouting(_options: UkisNgAddRoutingSchema): Rule {
    const rules: Rule[] = [
        (_options.addFiles === 'false') ? noop() : ruleAddFiles(_options),
        (_options.updateFiles === 'false') ? noop() : ruleAddImportsInAppModule(_options),
        // (_options.skip === 'true') ? noop() : ruleAddImportsInAppComponent(_options)
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
function ruleAddFiles(_options: UkisNgAddRoutingSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const project = getProject(tree, _options);

        if (!project.sourceRoot) {
            project.sourceRoot = 'src';
            throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
        }

        const sourcePath = join(normalize(project.root), project.sourceRoot); // project.sourceRoot
        const appPath = join(sourcePath, 'app');
        const templateVariabels = Object.assign(_options, {
            appPrefix: project.prefix
        });

        const appTemplateSource = apply(url('./files/src/app'), [
            applyTemplates({ ...templateVariabels }),
            filter((path: Path) => {
                const testFiles = ['app.component.html', 'app.component.ts', 'app-routing.module.ts'];
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
            mergeWith(appTemplateSource)
        ]);
    };
}

/**
 * app.module.ts add imports
 * - core-ui components
 * - AppRoutingModule
 * - HttpClientModule?
 */
function ruleAddImportsInAppModule(_options: UkisNgAddRoutingSchema): Rule {
    const rules: Rule[] = [];
    const imports: ImoduleImport[] = [
        { classifiedName: 'AppRoutingModule', path: './app-routing.module', module: true },
        { classifiedName: 'ExampleRouteComponent', path: './route-components/example-route/example-route.component', declare: true }
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

