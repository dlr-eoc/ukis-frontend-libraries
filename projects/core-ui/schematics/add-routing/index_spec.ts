import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { UkisNgAddRoutingSchema } from './schema';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('add-routing', () => {

  let appTree: UnitTestTree;

  const ngAddOptions: UkisNgAddRoutingSchema = {
    project: 'ukisapp',
    addFiles: 'true',
    updateFiles: 'true'
  };

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'ukisapp',
    projectRoot: '',
    inlineStyle: false,
    inlineTemplate: false,
    routing: true,
    style: Style.Scss,
    skipTests: false
  };

  const schematicRunner = new SchematicTestRunner('@dlr-eoc/schematics', collectionPath);

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await schematicRunner.runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      appOptions,
      appTree,
    ).toPromise();
  });

  it('should include the angular project file', (done) => {
    schematicRunner.runSchematicAsync('add-routing', ngAddOptions, appTree).toPromise().then(tree => {
      expect(tree.files.includes('/angular.json')).toBe(true);
      done();
    }, done.fail);
  });


  /* it('should add app files', (done) => {
    const testFiles = [
      '/src/app/app.component.html',
      '/src/app/app-routing.module.ts',
      '/src/app/route-components/README.md',
      '/src/app/route-components/example-route/example-route.component.html',
      '/src/app/route-components/example-route/example-route.component.ts',
      '/src/app/route-components/example-route/example-route.component.scss'
    ];
    schematicRunner.runSchematicAsync('add-routing', ngAddOptions, appTree).toPromise().then(tree => {
      testFiles.map(f => {
        expect(tree.files).toContain(f);
      });
      done();
    }, done.fail);
  });

  it('should add Imports', (done) => {
    const testImports = [
      'AppRoutingModule',
      'ExampleRouteComponent'
    ];
    schematicRunner.runSchematicAsync('add-routing', ngAddOptions, appTree).toPromise().then(tree => {
      const appModule = tree.readContent('/src/app/app.module.ts');
      testImports.map(i => {
        expect(appModule).toContain(i);
      });
      done();
    }, done.fail);
  }); */
});
