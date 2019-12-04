import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('ng-add', () => {

  let appTree: UnitTestTree;

  const defaultOptions = {
    project: 'ukisapp',
    target: 'build',
    configuration: 'production',
    title: 'UKIS App',
    tsconfigPaths: {
      '@ukis/*': [
        'dist/*',
        'projects/*'
      ]
    }
  };

  const workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
  };

  const appOptions = {
    name: 'ukisapp',
    inlineStyle: false,
    inlineTemplate: false,
    routing: true,
    style: 'scss',
    skipTests: false
  };

  const schematicRunner = new SchematicTestRunner('@ukis/schematics', collectionPath);

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await schematicRunner.runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      appOptions,
      appTree,
    ).toPromise();
  });

  it('works', (done) => {
    schematicRunner.runSchematicAsync('ng-add', defaultOptions, appTree).toPromise().then(tree => {
      expect(tree.files).toEqual([]);
      done();
    }, done.fail);
  });

  /* it('should add icon files', (done) => {
    const dimensions = [72, 96, 128, 144, 152, 192, 384, 512];
    const iconPath = `/projects/${defaultOptions.project}/src/assets/icons/icon-`;
    schematicRunner.runSchematicAsync('ng-add', defaultOptions, appTree).toPromise().then(tree => {
      dimensions.forEach(d => {
        const _path = `${iconPath}${d}x${d}.png`;
        expect(tree.exists(_path)).toEqual(true);
      });
      done();
    }, done.fail);
  }); */

  /* it('should set paths in tsconfig', (done) => {
    schematicRunner.runSchematicAsync('ng-add', defaultOptions, appTree).toPromise().then(tree => {
      const tsconfigJson = tree.readContent(`/projects/${defaultOptions.project}/src/tsconfig.json`);
      const _tsconfig = JSON.parse(tsconfigJson);
      expect(_tsconfig.compilerOptions.paths).toEqual(defaultOptions.tsconfigPaths);
      done();
    }, done.fail);
  }); */
});
