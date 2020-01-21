import { Tree, SchematicsException, SchematicContext, Rule } from '@angular-devkit/schematics';
import { UkisNgAddSchema } from './ng-add/schema';

import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/config';

import * as ts from 'typescript';
import { addProviderToModule, insertImport, addImportToModule, addDeclarationToModule } from '@schematics/angular/utility/ast-utils';

import { InsertChange, Change } from '@schematics/angular/utility/change';
import { normalize, join } from '@angular-devkit/core';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

export interface UpdateJsonFn<T> {
    (obj: T): T | void;
}

export interface TsConfigPartialType {
    compilerOptions: {
        baseUrl: string;
        paths: {
            [key: string]: string[];
        }
    };
}

export interface ImoduleImport {
    classifiedName: string;
    path: string;
    module?: boolean;
    provide?: boolean;
    declare?: boolean;
}

export function getProject(tree: Tree, _options: UkisNgAddSchema) {
    const workspace = getWorkspace(tree);

    if (!workspace.defaultProject) {
        throw new SchematicsException(`Could not find a default Project in the workspace and you didn't set a project`);
    }
    if (!_options.project) {
        _options.project = workspace.defaultProject;
    }

    if (!workspace.projects[_options.project]) {
        throw new SchematicsException(`Could not find Project in the workspace check your --project`);
    }
    const project = workspace.projects[_options.project];

    if (project && project.projectType === 'library') {
        throw new SchematicsException(`You should ad @ukis/core-ui only to an angular application not a library!`);
    }

    if (!project.sourceRoot) {
        project.sourceRoot = 'src';
        throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
    }

    return project;
}


function addInsertChange(changes: Change[] | Change, tree: Tree, modulePath: string) {
    if (Array.isArray(changes)) {
        const recorder = tree.beginUpdate(modulePath);
        for (const change of changes) {
            recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
        }
        tree.commitUpdate(recorder);
    } else {
        const recorder = tree.beginUpdate(modulePath);
        if (changes instanceof InsertChange) {
            recorder.insertLeft(changes.pos, changes.toAdd);
        }
        tree.commitUpdate(recorder);
    }
}

export function addServiceComponentModule(_options: UkisNgAddSchema, item: ImoduleImport): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        // context.logger.info('Updating appmodule');
        const project = getProject(tree, _options);

        if (!project.sourceRoot) {
            project.sourceRoot = 'src';
            throw new SchematicsException(`Project.sourceRoot is not defined in the workspace!`);
        }

        let mainPath: string = join(normalize(project.root), project.sourceRoot, 'main.ts');

        if (project.architect && project.architect.build && 'main' in project.architect.build.options) {
            mainPath = join(normalize(project.root), project.architect.build.options.main);
        }

        const modulePath = getAppModulePath(tree, mainPath);
        _context.logger.debug(`module path: ${modulePath}`);

        const moduleSource = getTsSourceFile(tree, modulePath);
        if (item.provide) {
            const changes = addProviderToModule(moduleSource, modulePath, item.classifiedName, item.path);
            addInsertChange(changes, tree, modulePath);
        } else if (item.module) {
            const change = addImportToModule(moduleSource, modulePath, item.classifiedName, item.path);
            addInsertChange(change, tree, modulePath);
        } else if (item.declare) {
            const changes = addDeclarationToModule(moduleSource, modulePath, item.classifiedName, item.path);
            addInsertChange(changes, tree, modulePath);
        } else {
            const change = insertImport(moduleSource, modulePath, item.classifiedName, item.path);
            addInsertChange(change, tree, modulePath);
        }
        return tree;
    };
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

export function updateWorkspaceFile(workspace: any) {
    return updateWorkspace(workspace);
}

