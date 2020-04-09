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
      appTree,
    ).toPromise();
  });

  it('should include the angular project file', (done) => {
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      expect(tree.files.includes('/angular.json')).toBe(true);
      done();
    }, done.fail);
  });

  it('should add assets', (done) => {
    const dimensions = [72, 96, 128, 144, 152, 192, 384, 512];
    const iconBasePath = `/src/assets/icons/icon-`;
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      dimensions.forEach(d => {
        const iconPath = `${iconBasePath}${d}x${d}.png`;
        expect(tree.exists(iconPath)).toEqual(true);
      });
      expect(tree.files).toContain('/src/favicon.ico');
      done();
    }, done.fail);
  });

  it('should add style files', (done) => {
    const testFiles = [
      '/src/styles.scss',
      '/src/styles/_overwrites-clr-variables.scss',
      '/src/styles/_clr-vertival-nav-layout.scss',
      '/src/styles/_ukis-core-ui-layout.scss',
      '/src/styles/_ukis-inputs.scss',
      '/src/styles/_ukis-layer-nav.scss',
      '/src/styles/_ukis-theme.scss',
      '/src/styles/_ukis-variables.scss',
    ];

    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      testFiles.map(f => {
        expect(tree.files).toContain(f);
      });
      done();
    }, done.fail);
  });

  it('should add app files', (done) => {
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
      '/src/app/components/icons/ukis.ts'
    ];
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      testFiles.map(f => {
        expect(tree.files).toContain(f);
      });
      done();
    }, done.fail);
  });

  it('should add Imports', (done) => {
    const testImports = [
      'HeaderComponent',
      'GlobalAlertComponent',
      'AlertService',
      'GlobalProgressComponent',
      'ProgressService'
    ];
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      const appModule = tree.readContent('/src/app/app.module.ts');
      testImports.map(i => {
        expect(appModule).toContain(i);
      });
      done();
    }, done.fail);
  });

  it('should update the angular project file', (done) => {
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      const projectFile = JSON.parse(tree.readContent('/angular.json'));
      expect(projectFile.projects[appOptions.name].schematics['@schematics/angular:component'].style).toBe('scss');
      done();
    }, done.fail);
  });

  it('should update the stconfig file', (done) => {
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      const tsconfigFile = JSON.parse(tree.readContent('/tsconfig.json'));
      expect('@dlr-eoc/*' in tsconfigFile.compilerOptions.paths).toBe(true);
      done();
    }, done.fail);
  });

  it('should update html files', (done) => {
    schematicRunner.runSchematicAsync('ng-add', ngAddOptions, appTree).toPromise().then(tree => {
      const tsconfigFile = tree.readContent('/src/index.html');
      expect(tsconfigFile).toContain('<meta name="description" content="This should be the description for');
      done();
    }, done.fail);
  });


  it('should skip add style files', (done) => {
    const testFiles = [
      '/src/styles/_overwrites.clarity.scss',
      '/src/styles/_ukis.layer.nav.scss',
      '/src/styles/_vertival.nav.scss'
    ];
    const skipOptions = Object.assign(ngAddOptions, { addFiles: 'false' });

    schematicRunner.runSchematicAsync('ng-add', skipOptions, appTree).toPromise().then(tree => {
      testFiles.map(f => {
        expect(tree.files.includes(f)).toBe(false);
      });
      done();
    }, done.fail);
  });
});
