import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { UkisNgAddSchema } from './schema';
import * as path from 'path';
import { TsconfigJSON } from '../schema.tsconfig';


const collectionPath = require.resolve(path.join(__dirname, '../collection.json'));


describe('ng-add', () => {
  const schematicRunner = new SchematicTestRunner('@dlr-eoc/schematics', collectionPath);

  let appTree: UnitTestTree;

  const ngAddOptions: UkisNgAddSchema = {
    project: 'ukisapp',
    routing: false,
    addClr: false,
    addFiles: true,
    updateFiles: true, // TODO: this has to be implemented first
    addMap: false, // TODO: this has to be implemented first
    auth: false, // TODO: this has to be implemented first
  };

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '9.0.0'
  };

  const appOptions: ApplicationOptions = {
    name: 'ukisapp',
    projectRoot: '',
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
      appTree);
  });

  it('should have no workspace schematics', async () => {
    const projectFile = JSON.parse(appTree.readContent('/angular.json'));
    expect(projectFile.schematics).toBeFalsy();
  });

  it('should have no projects schematics for style because -> app style: Style.Css', async () => {
    const projectFile = JSON.parse(appTree.readContent('/angular.json'));
    expect(projectFile.projects[appOptions.name].schematics['@schematics/angular:component']?.style).toBeUndefined();
  });

  it('should include the angular project file', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
    expect(tree.files.includes('/angular.json')).toBe(true);
  });

  it('should replace style extension in project.targets.options.styles', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);

    const projectFile = JSON.parse(tree.readContent('/angular.json'));
    ['build', 'test'].forEach(target => {
      const styles: string[] = projectFile.projects[appOptions.name].architect[target].options.styles;
      styles.forEach(path => {
        if(path.includes('styles.')){
          expect(path.includes('.scss')).toBeTrue();
        }
      });
    });

  });

  it('should add assets', async () => {
    const dimensions = [72, 96, 128, 144, 152, 192, 384, 512];
    const iconBasePath = `/src/assets/icons/icon-`;
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
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

    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
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
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
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
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
    const appModule = tree.readContent('/src/app/app.module.ts');
    testImports.map(i => {
      expect(appModule).toContain(i);
    });
  });

  /* it('should add workspace schematics', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
    const projectFile = JSON.parse(tree.readContent('/angular.json'));
    console.log(projectFile);
    expect(projectFile?.schematics['@schematics/angular:component']?.style).toBe('scss');
  }); */

  it('should add project schematics', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
    const projectFile = JSON.parse(tree.readContent('/angular.json'));
    expect(projectFile.projects[appOptions.name]?.schematics['@schematics/angular:component']?.style).toBe('scss');
  });

  it('should update the tsconfig file', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
    const configs = ['/tsconfig.json', '/tsconfig.base.json'];
    configs.forEach(configFilePath => {
      if (tree.exists(configFilePath)) {
        const tsconfigFile = JSON.parse(tree.readContent(configFilePath)) as TsconfigJSON;
        const paths = tsconfigFile?.compilerOptions?.paths;
        expect(paths).toBeTruthy();
        if (paths) {
          expect('@dlr-eoc/*' in paths).toBe(true);
        }

        const skipLibCheck = tsconfigFile?.compilerOptions?.skipLibCheck;
        expect(skipLibCheck).toBeTruthy();
        if (skipLibCheck !== undefined) {
          expect(skipLibCheck).toBe(true);
        }
      }
    });
  });

  it('should update html files', async () => {
    const tree = await schematicRunner.runSchematic('ng-add', ngAddOptions, appTree);
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
    const skipOptions = Object.assign({}, ngAddOptions, { addFiles: false });
    const tree = await schematicRunner.runSchematic('ng-add', skipOptions, appTree);
    testFiles.map(f => {
      expect(tree.files.includes(f)).toBe(false);
    });
  });

  it('should remove /src/app/views files if routing is true', async () => {
    const testFiles = [
      '/src/app/views/example-view/example-view.component.html',
      '/src/app/views/example-view/example-view.component.scss',
      '/src/app/views/example-view/example-view.component.spec.ts',
      '/src/app/views/example-view/example-view.component.ts',
    ];
    const routingOptions = Object.assign({}, ngAddOptions, { routing: true });
    const tree = await schematicRunner.runSchematic('ng-add', routingOptions, appTree);
    testFiles.every(f => {
      expect(tree.files).not.toContain(f);
      // expect(tree.files).toContain(f);
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
