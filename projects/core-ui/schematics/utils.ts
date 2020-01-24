import { Tree, SchematicsException, SchematicContext, Rule } from '@angular-devkit/schematics';
import { UkisNgAddSchema } from './ng-add/schema';

import { getWorkspace } from '@schematics/angular/utility/config';

import * as ts from 'typescript';
import { addProviderToModule, insertImport, addImportToModule, addDeclarationToModule } from '@schematics/angular/utility/ast-utils';

import { InsertChange, Change } from '@schematics/angular/utility/change';
import { normalize, join, parseJson, JsonParseMode } from '@angular-devkit/core';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';

const RewritingStream = require('parse5-html-rewriting-stream');
import { Readable, Writable } from 'stream';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

export interface ImoduleImport {
    classifiedName: string;
    path: string;
    module?: boolean;
    provide?: boolean;
    declare?: boolean;
}

interface Iparse5Tag {
    tagName: string;
    attrs: [];
    selfClosing: boolean;
    sourceCodeLocation: {
        startLine: number;
        startCol: number;
        startOffset: number;
        endLine: number;
        endCol: number;
        endOffset: number;
    }
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

export function updateJsonFile<T>(path: string, cb: (pkgJson: T) => T): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        if (!tree.exists(path)) {
            throw new SchematicsException(`${path} is not in the workspace!`);
        }
        const source = tree.read(path);
        if (source) {
            const sourceText = source.toString('utf-8');
            let json = parseJson(sourceText, JsonParseMode.Loose) as any as T;
            json = cb(json);
            tree.overwrite(path, JSON.stringify(json, null, 2));
        }
        return tree;
    };
}


export function updateHtmlFile(path: string, _startTag: string, _endTag: string, items: string | string[], _options: UkisNgAddSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const buffer = tree.read(path);
        if (buffer === null) {
            throw new SchematicsException(`Could not read index file: ${path}`);
        }

        const rewriter = new RewritingStream();
        const startTags: Iparse5Tag[] = [];
        rewriter.on('startTag', (startTag: Iparse5Tag) => {
            startTags.push(startTag);
            rewriter.emitStartTag(startTag);
        });

        const endTags: Iparse5Tag[] = [];
        rewriter.on('endTag', (endTag: Iparse5Tag) => {
            endTags.push(endTag);
            if (endTag.tagName === _endTag) {
                if (Array.isArray(items)) {
                    for (const item of items) {
                        rewriter.emitRaw(item);
                    }
                } else {
                    rewriter.emitRaw(items);
                }
            }
            rewriter.emitEndTag(endTag);
        });
        _context.logger.info(`INFO: update of some Tags in ${path}`);


        return new Promise<void>(resolve => {
            const input = new Readable({
                encoding: 'utf8',
                read(): void {
                    this.push(buffer);
                    this.push(null);
                },
            });

            const chunks: Array<Buffer> = [];
            const output = new Writable({
                write(chunk: string | Buffer, encoding: string, callback: Function): void {
                    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk, encoding) : chunk);
                    callback();
                },
                final(callback: (error?: Error) => void): void {
                    const full = Buffer.concat(chunks);

                    const hasStartTag = startTags.find(i => i.tagName === _startTag);
                    if (!hasStartTag) {
                        _context.logger.warn(`startTag: ${_startTag} is not in the file ${path}`);
                    }
                    const hasEndTag = endTags.find(i => i.tagName === _endTag);
                    if (!hasEndTag) {
                        _context.logger.warn(`endTag: ${_endTag} is not in the file ${path}`);
                    }
                    tree.overwrite(path, full.toString());
                    callback();
                    resolve();
                },
            });

            input.pipe(rewriter).pipe(output);
        });
    };
}

export function getStyleExt(project: WorkspaceProject, workspace: WorkspaceSchema, _context: SchematicContext) {
    let styleExt = 'scss';
    if (project.schematics) {
        const schematics = project.schematics;
        if (schematics['@schematics/angular:component'] && schematics['@schematics/angular:component'].style) {
            styleExt = schematics['@schematics/angular:component'].style;
        }
    } else if (workspace.schematics) {
        const schematics = workspace.schematics;
        if (schematics['@schematics/angular:component'] && schematics['@schematics/angular:component'].style) {
            styleExt = schematics['@schematics/angular:component'].style;
        }
    } else {
        _context.logger.info(`In your workspace is no style extension defined use default ${styleExt}`);
    }
    return styleExt;
}

