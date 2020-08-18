import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { UkisNgAddSchema } from './schema';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('ng-add', () => {

  let appTree: UnitTestTree;

  const ngAddOptions: UkisNgAddSchema = {
    project: 'ukisapp',
    routing: 'false',
    addClr: 'false',
    addFiles: 'true',
    updateFiles: 'true',
    addMap: 'false', // TODO: this has to be implemented first
    auth: 'false', // TODO: this has to be implemented first
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
      appTree).toPromise();
  });

  it('should include the angular project file', async () => {
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    expect(tree.files.includes('/angular.json')).toBe(true);
  });

  it('should add assets', async () => {
    const dimensions = [72, 96, 128, 144, 152, 192, 384, 512];
    const iconBasePath = `/src/assets/icons/icon-`;
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    dimensions.every(d => {
      const iconPath = `${iconBasePath}${d}x${d}.png`;
      expect(tree.files).toContain(iconPath);
      // expect(tree.exists(iconPath)).toBeTruthy();
    });
    expect(tree.files).toContain('/src/favicon.ico');
  });

  it('should add style files', async () => {
    const testFiles = [
      '/src/styles.scss',
      '/src/styles/_clr-vertival-nav-layout.scss',
      '/src/styles/_overwrites-clr-variables.scss',
      '/src/styles/_ukis-core-ui-layout.scss',
      '/src/styles/_ukis-inputs.scss',
      '/src/styles/_ukis-layer-nav.scss',
      '/src/styles/_ukis-theme.scss',
      '/src/styles/_ukis-variables.scss'
    ];

    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    testFiles.every(f => {
      expect(tree.files).toContain(f);
      // expect(tree.exists(f)).toBeTruthy();
    });
  });

  it('should add app files', async () => {
    const testFiles = [
      '/src/app/app.component.html',
      '/src/app/app.component.scss',
      '/src/app/app.component.ts',
      '/src/app/components/README.md',

      '/src/app/components/header/header.component.html',
      '/src/app/components/header/header.component.scss',
      '/src/app/components/header/header.component.spec.ts',
      '/src/app/components/header/header.component.ts',

      '/src/app/components/icons/eoc_white.svg',
      '/src/app/components/icons/ukis-01-01.svg',
      '/src/app/components/icons/ukis.svg',
      '/src/app/components/icons/ukis.ts',

      'src/app/components/global-alert/alert.service.spec.ts',
      'src/app/components/global-alert/alert.service.ts',
      'src/app/components/global-alert/global-alert.component.html',
      'src/app/components/global-alert/global-alert.component.scss',
      'src/app/components/global-alert/global-alert.component.spec.ts',
      'src/app/components/global-alert/global-alert.component.ts',

      'src/app/components/global-progress/global-progress.component.html',
      'src/app/components/global-progress/global-progress.component.scss',
      'src/app/components/global-progress/global-progress.component.spec.ts',
      'src/app/components/global-progress/global-progress.component.ts',
      'src/app/components/global-progress/progress.service.spec.ts',
      'src/app/components/global-progress/progress.service.ts',

      'src/app/views/example-view/example-view.component.html',
      'src/app/views/example-view/example-view.component.scss',
      'src/app/views/example-view/example-view.component.spec.ts',
      'src/app/views/example-view/example-view.component.ts'
    ];
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    testFiles.every(f => {
      expect(tree.files).toContain(f);
      // expect(tree.exists(f)).toBeTruthy();
    });
  });

  it('should add Imports', async () => {
    const testImports = [
      'HeaderComponent',
      'GlobalAlertComponent',
      'AlertService',
      'GlobalProgressComponent',
      'ProgressService',
      'ExampleViewComponent'
    ];
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    const appModule = tree.readContent('/src/app/app.module.ts');
    testImports.map(i => {
      expect(appModule).toContain(i);
    });
  });

  it('should update the angular project file', async () => {
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    const projectFile = JSON.parse(tree.readContent('/angular.json'));
    expect(projectFile.projects[appOptions.name].schematics['@schematics/angular:component'].style).toBe('scss');
  });

  it('should update the tsconfig file', async () => {
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    const tsconfigFile = JSON.parse(tree.readContent('/tsconfig.base.json'));
    expect('@dlr-eoc/*' in tsconfigFile.compilerOptions.paths).toBe(true);
  });

  it('should update html files', async () => {
    const tree = await schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise();
    const tsconfigFile = tree.readContent('/src/index.html');
    expect(tsconfigFile).toContain('<meta name="description" content="This should be the description for');
  });


  it('should skip add style files', async () => {
    const testFiles = [
      '/src/styles/_overwrites-clr-variables.scss',
      '/src/styles/_clr-vertival-nav-layout.scss',
      '/src/styles/_ukis-core-ui-layout.scss',
      '/src/styles/_ukis-inputs.scss',
      '/src/styles/_ukis-layer-nav.scss',
      '/src/styles/_ukis-theme.scss',
      '/src/styles/_ukis-variables.scss',
    ];
    const skipOptions = Object.assign({}, ngAddOptions, { addFiles: 'false' });
    const tree = await schematicRunner.runSchematicAsync('ng-add', skipOptions, appTree).toPromise();
    testFiles.map(f => {
      expect(tree.files.includes(f)).toBe(false);
      // expect(tree.exists(f)).toBeFalsy();
    });
  });
});
