import { Rule, SchematicContext, SchematicsException, } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { Readable, Writable } from 'stream';

export function loadEsmModule<T>(modulePath: string | URL): Promise<T> {
  return new Function('modulePath', `return import(modulePath);`)(modulePath) as Promise<T>;
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
  };
}

/**
 * Update a HTML File with 'parse5-html-rewriting-stream'
 * https://github.com/angular/angular-cli/blob/aedfcc1862afc599ea18c578248d0aa373a947bb/packages/angular_devkit/build_angular/src/utils/index-file/html-rewriting-stream.ts#L11
 */
export function updateHtmlFile(path: string, startTagStr: string, endTagStr: string, items: string | string[]): Rule {
  return async (tree: Tree, context: SchematicContext) => {

    const buffer = tree.read(path);
    if (buffer === null) {
      throw new SchematicsException(`Could not read index file: ${path}`);
    }

    const { RewritingStream } = await loadEsmModule<typeof import('parse5-html-rewriting-stream')>(
      'parse5-html-rewriting-stream',
    );

    const rewriter = new RewritingStream();
    const startTags: Iparse5Tag[] = [];
    rewriter.on('startTag', (startTag: Iparse5Tag) => {
      startTags.push(startTag);
      rewriter.emitStartTag(startTag);
    });

    const endTags: Iparse5Tag[] = [];
    rewriter.on('endTag', (endTag: Iparse5Tag) => {
      endTags.push(endTag);
      if (endTag.tagName === endTagStr) {
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
    // context.logger.info(`INFO: update of some Tags in ${path}`);


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
        write(chunk: string | Buffer, encoding: string, callback: () => void): void {
          // https://github.com/microsoft/TypeScript/issues/23155
          if (typeof chunk === 'string') {
            chunks.push(Buffer.from(chunk as any, encoding as any));
          } else {
            chunks.push(chunk);
          }
          callback();
        },
        final(callback: (error?: Error) => void): void {
          const full = Buffer.concat(chunks);

          const hasStartTag = startTags.find(i => i.tagName === startTagStr);
          if (!hasStartTag) {
            context.logger.warn(`startTag: ${startTagStr} is not in the file ${path}`);
          }
          const hasEndTag = endTags.find(i => i.tagName === endTagStr);
          if (!hasEndTag) {
            context.logger.warn(`endTag: ${endTagStr} is not in the file ${path}`);
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
