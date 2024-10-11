import { Tree, SchematicsException, SchematicContext, Rule, UpdateRecorder, noop } from '@angular-devkit/schematics';
import { UkisNgAddSchema } from './ng-add/schema';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addProviderToModule, insertImport, addImportToModule, addDeclarationToModule, findNodes, getDecoratorMetadata, getMetadataField } from '@schematics/angular/utility/ast-utils';

import { Change, RemoveChange, NoopChange, InsertChange, ReplaceChange } from '@schematics/angular/utility/change';
import { normalize, join } from '@angular-devkit/core';
import { getAppModulePath, isStandaloneApp } from '@schematics/angular/utility/ng-ast-utils';
import { addRootProvider } from '@schematics/angular/utility';


/**
 * https://github.com/angular/angular-cli/blob/fb14945c02a3f150d6965e77324416b1ec7cc575/packages/schematics/angular/utility/ast-utils.ts#L9
 * angular schematics is using it's own typescript so we have to import the same and not -> import * as ts from 'typescript';
 */
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { tags } from '@angular-devkit/core';
import { checkProjectSourceRoot, getProjectName, hasArchitectBuildOptionsMain } from './workspace-utils';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

export interface ImoduleImport {
  classifiedName: string;
  path: string;
  module?: boolean;
  provide?: boolean;
  declare?: boolean;
  standalone?: boolean;
}

type TmetadataFields = 'providers' | 'imports' | 'declarations' | 'exports' | 'bootstrap' | 'entryComponents';

function applyToUpdateRecorder(recorder: UpdateRecorder, changes: Change[]): void {
  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    } else if (change instanceof RemoveChange) {
      recorder.remove(change.order, change.toRemove.length);
    } else if (change instanceof ReplaceChange) {
      recorder.remove(change.order, change.oldText.length);
      recorder.insertLeft(change.order, change.newText);
    } else if (!(change instanceof NoopChange)) {
      throw new Error('Unknown Change type encountered when updating a recorder.');
    }
  }
}


function applyChanges(changes: Change[], tree: Tree, modulePath: string) {
  const recorder = tree.beginUpdate(modulePath);
  applyToUpdateRecorder(recorder, changes);
  tree.commitUpdate(recorder);
}



export interface AddInjectionContext {
  componentPath: string;
  // e. g. /src/app/app.component.ts
  servicePath: string;
  // e. g. ./core/side-menu/side-menu.service
  serviceClassName: string;
  // e. g. SideMenuService
}

export function getMainPath(project: ProjectDefinition) {
  let mainPath: string = join(normalize(project.root), project.sourceRoot || join(normalize(project.root), 'src'), 'main.ts');

  // https://github.com/angular/angular-cli/blob/HEAD/packages/angular/pwa/pwa/index.ts#L100
  if (hasArchitectBuildOptionsMain(project.extensions)) {
    mainPath = join(normalize(project.root), project.extensions.architect.build.options.main);
  }

  return mainPath;
}


export function addServiceComponentModule(optionsProject: UkisNgAddSchema['project'], item: ImoduleImport, modulePathStr?: string): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, optionsProject);
    if (projectName) {
      const project = workspace.projects.get(projectName);
      if (project && checkProjectSourceRoot(project, context)) {
        let mainPath = getMainPath(project);

        const isStandalone = isStandaloneApp(tree, mainPath);
        if (isStandalone) {

          if (item.provide) {
            return addRootProvider(projectName, ({ code, external }) =>
              code`${external(item.classifiedName, item.path)}`,
            );
          } else {
            return noop();
          }
        } else {
          let modulePath = getAppModulePath(tree, mainPath);

          if (modulePathStr && tree.exists(modulePathStr)) {
            modulePath = modulePathStr;
          }

          context.logger.debug(`module path: ${modulePath}`);

          const moduleSource = getTsSourceFile(tree, modulePath);

          if (!item.standalone) {
            if (item.provide) {
              const changes = addProviderToModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(changes, tree, modulePath);
            } else if (item.module) {
              const change = addImportToModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(change, tree, modulePath);
            } else if (item.declare) {
              const changes = addDeclarationToModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(changes, tree, modulePath);
            } else {
              const change = [insertImport(moduleSource, modulePath, item.classifiedName, item.path)];
              applyChanges(change, tree, modulePath);
            }
          }
        }
      }
    }
  };
}


export function removeServiceComponentModule(optionsProject: UkisNgAddSchema['project'], item: ImoduleImport, modulePathStr?: string): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = getProjectName(workspace, optionsProject);
    if (projectName) {
      const project = workspace.projects.get(projectName);
      if (project && checkProjectSourceRoot(project, context)) {
        let mainPath = getMainPath(project);

        const isStandalone = isStandaloneApp(tree, mainPath);
        if (isStandalone) {
          // TODO remove things
          return noop();
        } else {
          let modulePath = getAppModulePath(tree, mainPath);
          if (modulePathStr && tree.exists(modulePathStr)) {
            modulePath = modulePathStr;
          }
          context.logger.debug(`module path: ${modulePath}`);

          const moduleSource = getTsSourceFile(tree, modulePath);

          if (!item.standalone) {
            if (item.provide) {
              const changes = removeProviderFromModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(changes, tree, modulePath);
            } else if (item.module) {
              const change = removeImportFromModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(change, tree, modulePath);
            } else if (item.declare) {
              const changes = removeDeclarationFromModule(moduleSource, modulePath, item.classifiedName, item.path);
              applyChanges(changes, tree, modulePath);
            } else {
              const symbolName = item.classifiedName.replace(/\..*$/, '');
              const change = [...removeImport(moduleSource, modulePath, symbolName, item.path)];
              applyChanges(change, tree, modulePath);
            }
          }
        }
      }
    }
  };
}



function removeProviderFromModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[] {
  return removeSymbolFromNgModuleMetadata(source, modulePath, 'providers', classifiedName, importPath);
}

function removeImportFromModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[] {
  return removeSymbolFromNgModuleMetadata(source, modulePath, 'imports', classifiedName, importPath);
}

function removeDeclarationFromModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[] {
  return removeSymbolFromNgModuleMetadata(source, modulePath, 'declarations', classifiedName, importPath);
}

/**
 * https://github.com/angular/angular-cli/blob/fb14945c02a3f150d6965e77324416b1ec7cc575/packages/schematics/angular/utility/ast-utils.ts#L22
 * RemoveChange: host.read => content.substring // from pos to remove length
 *
 * If there are multiple same imports all get removed
 */
function removeImport(source: ts.SourceFile, fileToEdit: string, symbolName: string, fileName: string, isDefault = false): Change[] {
  const rootNode = source;
  // SyntaxKind: https://github.com/microsoft/TypeScript/blob/v4.2.3/src/compiler/types.ts#L21
  const allImports = findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);

  // get nodes that map to import statements from the file fileName
  const relevantImports = allImports.filter(node => {
    // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
    const importFiles = node.getChildren()
      .filter(ts.isStringLiteral)
      .map(n => n.text);

    return importFiles.filter(file => file === fileName).length === 1;
  });

  if (relevantImports.length > 0) {
    let importsAsterisk = false;
    // imports from import file
    // Node: https://github.com/microsoft/TypeScript/blob/v4.2.3/src/compiler/types.ts#L837
    const imports: ts.Node[] = [];
    relevantImports.forEach(node => {
      Array.prototype.push.apply(imports, findNodes(node, ts.SyntaxKind.Identifier));
      if (findNodes(node, ts.SyntaxKind.AsteriskToken).length > 0) {
        importsAsterisk = true;
      }
    });

    // if imports * from fileName, don't add symbolName
    if (importsAsterisk) {
      return [new NoopChange()];
    }

    const importTextNodes = imports.filter(n => (n as ts.Identifier).text === symbolName);
    // console.log(importTextNodes);

    // remove import if it's there
    if (importTextNodes.length) {
      const open = isDefault ? '' : '{ ';
      const close = isDefault ? '' : ' }';

      const changes = importTextNodes.map(node => {
        const position = node.getStart();
        const toRemove = `import ${open}${symbolName}${close}` +
          ` from '${fileName}'}`;
        return new RemoveChange(fileToEdit, position, toRemove);
      });

      return changes;
    } else {
      return [new NoopChange()];
    }
  } else {
    return [new NoopChange()];
  }
}

/**
 * https://github.com/angular/angular-cli/blob/fb14945c02a3f150d6965e77324416b1ec7cc575/packages/schematics/angular/utility/ast-utils.ts#L341
 */
function removeSymbolFromNgModuleMetadata(
  source: ts.SourceFile,
  ngModulePath: string,
  metadataField: TmetadataFields,
  symbolName: string,
  importPath: string | null = null,
): Change[] {
  const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
  let nodeArray = null as any as ts.NodeArray<ts.Expression>;
  let node: ts.Node = nodes[0];  // tslint:disable-line:no-any

  /* const printNodes = nodes.map(n => {
    const tempnode: any = n;
    tempnode.kindText = Object.keys(ts.SyntaxKind).map(k => {
      const value = (ts.SyntaxKind as any)[k];
      if (value === n.kind) {
        return k;
      }
    }).find(i => i !== undefined);
    return tempnode;
  });
  console.log(printNodes); */

  // Find the decorator declaration.
  if (!node) {
    return [];
  }

  // Get all the children property assignment of object literals.
  const matchingProperties = getMetadataField(
    node as ts.ObjectLiteralExpression,
    metadataField,
  );

  // We have found the field in the metadata declaration. So we try to remove it.
  if (matchingProperties.length) {
    const assignment = matchingProperties[0] as ts.PropertyAssignment;

    // If it's not an array, nothing we can do really.
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }

    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
      // Forward the property.
      node = arrLiteral;
    } else {
      nodeArray = arrLiteral.elements;
    }

    if (Array.isArray(nodeArray) && nodeArray.length) {
      // const nodeArray = node;
      const symbolsArray = nodeArray.map(n => tags.oneLine`${n.getText()}`);
      const hasIndex = symbolsArray.indexOf(tags.oneLine`${symbolName}`);
      // found symbol in nodes array
      if (hasIndex !== -1) {
        node = nodeArray[hasIndex];
      } else {
        // not found so return;
        return [];
      }
    }

    let toRemove: string;
    let position = node.getStart();
    if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
      // We found the field but it's empty. Insert it just before the `]`.
      position--;
      toRemove = `\n${tags.indentBy(4)`${symbolName}`}\n  `;
      console.log('We found the field but its empty', position, toRemove);
      return [];
    } else {
      // Get the indentation of the last element, if any.
      const text = node.getFullText(source);
      const matches = text.match(/^(\r?\n)(\s*)/);
      if (matches) {
        toRemove = `,${matches[1]}${tags.indentBy(matches[2].length)`${symbolName}`}`;
      } else {
        toRemove = `, ${symbolName}`;
      }
    }

    if (importPath !== null) {
      return [
        new RemoveChange(ngModulePath, position, toRemove),
        ...removeImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath),
      ];
    }

    return [new RemoveChange(ngModulePath, position, toRemove)];
  } else {
    return [new NoopChange()];
  }
}




function getTsSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

  return source;
}
