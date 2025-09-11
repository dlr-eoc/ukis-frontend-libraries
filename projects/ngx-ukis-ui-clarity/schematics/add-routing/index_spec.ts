import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { UkisNgAddRoutingSchema } from './schema';
import * as path from 'path';


const collectionPath = require.resolve(path.join(__dirname, '../collection.json'));

describe('add-routing Module or standalone', () => {
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
    standalone: false, // no standalone API.
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

  it('should add/update app files', async () => {
    const testFiles = [
      '/src/app/app.component.html',
      '/src/app/app.component.ts',
      '/src/app/app.routes.ts',
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
});


describe('add-routing Module App', () => {
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
    standalone: false, // no standalone API.
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

  it('should add app files', async () => {
    const testFiles = [
      '/src/app/app.routes.ts',
      '/src/app/app-routing.module.ts',
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).toContain(f);
    });
  });

  it('should not have app.config.ts', async () => {
    const testFiles = [
      '/src/app/app.config.ts'
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).not.toContain(f);
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

  it('should remove imports from views if routing is true', async () => {
    const testImports = [
      'ExampleViewComponent'
    ];
    const routingOptions = Object.assign({}, ngAddOptions, { routing: true });
    const tree = await schematicRunner.runSchematic('ng-add', routingOptions, appTree);
    const appModuleSource = tree.readContent('/src/app/app.module.ts').split('@NgModule');
    const appModule = appModuleSource[0];

    testImports.map(i => {
      expect(appModule).not.toContain(i);
    });
  });

  it('should remove Declarations from views if routing is true', async () => {
    const testDeclarations = [
      'ExampleViewComponent'
    ];
    const routingOptions = Object.assign({}, ngAddOptions, { routing: true });
    const tree = await schematicRunner.runSchematic('ng-add', routingOptions, appTree);
    const appModuleSource = tree.readContent('/src/app/app.module.ts').split('@NgModule');
    const appNgModule = `@NgModule${appModuleSource[1]}`;

    testDeclarations.map(i => {
      expect(appNgModule).not.toContain(i);
    });
  });
});

describe('add-routing standalone App', () => {
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
    standalone: true, // standalone API.
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


  it('should add app files', async () => {
    const testFiles = [
      '/src/app/app.config.ts',
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).toContain(f);
    });
  });

  it('should not have app-routing.module.ts', async () => {
    const testFiles = [
      '/src/app/app-routing.module.ts'
    ];
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).not.toContain(f);
    });
  });

  it('should remove import view from app if routing is true', async () => {
    const testImports = [
      'ExampleViewComponent'
    ];
    const routingOptions = Object.assign({}, ngAddOptions, { routing: true });
    const tree = await schematicRunner.runSchematic('ng-add', routingOptions, appTree);
    const appComponentSource = tree.readContent('/src/app/app.component.ts').split('@Component');
    const appComponent = appComponentSource[0];

    testImports.map(i => {
      expect(appComponent).not.toContain(i);
    });
  });

  it('should have Routes in app.config.ts', async () => {
    const tree = await schematicRunner.runSchematic('add-routing', ngAddOptions, appTree);
    const appConfig = tree.readContent('/src/app/app.config.ts');
    expect(appConfig).toContain(`import { routes } from './app.routes'`);
    expect(appConfig).toContain(`provideRouter(routes)`);
  });
});
