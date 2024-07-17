import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { UkisNgAddRoutingSchema } from './schema';
import * as path from 'path';


const collectionPath = require.resolve(path.join(__dirname, '../collection.json'));


describe('add-routing', () => {
  const schematicRunner = new SchematicTestRunner('@dlr-eoc/schematics', collectionPath);

  let appTree: UnitTestTree;

  const ngAddOptions: UkisNgAddRoutingSchema = {
    project: 'ukisapp',
    addFiles: true,
    updateFiles: true
  };

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '9.0.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'ukisapp',
    projectRoot: '',
    standalone: false, // We have not yet migrated to the standalone API.
    inlineStyle: false,
    inlineTemplate: false,
    routing: true,
    style: Style.Css,
    skipTests: false
  };

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree,
    );
  });

  it('should include the angular project file', async () => {
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    expect(tree.files.includes('/angular.json')).toBe(true);
  });


  it('should add app files', async () => {
    const testFiles = [
      '/src/app/app.component.html',
      '/src/app/app-routing.module.ts',
      '/src/app/route-components/README.md',
      '/src/app/route-components/example-route/example-route.component.html',
      '/src/app/route-components/example-route/example-route.component.ts',
      '/src/app/route-components/example-route/example-route.component.scss'
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).toContain(f);
    });
  });

  it('should add Imports', async () => {
    const testImports = [
      'AppRoutingModule',
      'ExampleRouteComponent'
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    const appModule = tree.readContent('/src/app/app.module.ts');
    testImports.every(i => {
      expect(appModule).toContain(i);
    });
  });
});
