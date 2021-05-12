import { Tree, SchematicsException, SchematicContext, Rule } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  workspaces
} from '@angular-devkit/core';

import { ProjectType } from '@schematics/angular/utility/workspace-models';

interface IArchitectMain extends workspaces.ProjectDefinition {
  architect: { build: { options: { main: string; } }; };
}
/**
 * Type Guard
 *
 * workspaces.ProjectDefinition: extensions?.architect?.build?.options?.main
 */
export function hasArchitectBuildOptionsMain(extensions: any): extensions is IArchitectMain {
  return extensions?.architect?.build?.options?.main;
}

interface IArchitectTestStyles extends workspaces.ProjectDefinition {
  architect: {
    test: { options: { styles: string[] } };
  };
}
/**
 * Type Guard
 *
 * workspaces.ProjectDefinition: extensions?.architect?.test?.options?.styles;
 */
export function hasArchitectTestOptionsStyles(extensions: any): extensions is IArchitectTestStyles {
  return extensions?.architect?.test?.options?.styles;
}

interface IArchitectBuildStyles extends workspaces.ProjectDefinition {
  architect: {
    build: { options: { styles: string[] } };
  };
}
/**
 * Type Guard
 *
 * workspaces.ProjectDefinition: extensions?.architect?.build?.options?.styles
 */
export function hasArchitectBuildOptionsStyles(extensions: any): extensions is IArchitectBuildStyles {
  return extensions?.architect?.build?.options?.styles;
}



/**
 * https://github.com/angular/angular-cli/blob/HEAD/packages/angular/cli/utilities/config.ts#L408
 */
interface IProjectSchematics {
  schematics: {
    '@schematics/angular:component': {
      style: string;
    }
  };
}

/**
 * Type Guard
 *
 * workspaces.WorkspaceDefinition or workspaces.ProjectDefinition: extensions?.schematics
 */
export function hasSchematicsStyle(extensions: any): extensions is IProjectSchematics {
  return extensions?.schematics?.['@schematics/angular:component'];
}

/**
 * Check if the Project exists in workspaces.WorkspaceDefinition
 */
function checkForProject(workspace: workspaces.WorkspaceDefinition, projectName: string) {
  if (!workspace.projects.has(projectName)) {
    throw new SchematicsException(`Could not find Project ${projectName} in the workspace check your --project`);
  } else {
    return workspace.projects.get(projectName);
  }
}

/**
 * Check if the Project in workspaces.WorkspaceDefinition is of type application
 */
export function checkProjectIsApplication(workspace: workspaces.WorkspaceDefinition, projectName?: string) {
  const projecOrDefaultName = projectName || getDefaultProjectName(workspace);
  if (projecOrDefaultName) {
    const project = checkForProject(workspace, projecOrDefaultName);
    if (project) {
      // https://github.com/angular/angular-cli/blob/HEAD/packages/angular/pwa/pwa/index.ts#L100
      if (project.extensions['projectType'] !== ProjectType.Application) {
        throw new SchematicsException(`You should add @dlr-eoc/core-ui only to an angular application not a library!`);
      }
    }
  }
}


interface IProjectSourceRoot extends workspaces.ProjectDefinition {
  sourceRoot: string;
}

export function checkProjectSourceRoot(project: workspaces.ProjectDefinition, context: SchematicContext): project is IProjectSourceRoot {
  if (!project.sourceRoot) {
    project.sourceRoot = 'src';
    context.logger.warn(`Project.sourceRoot is not defined in the workspace, assuming /src!`);
    return true;
  } else {
    return true;
  }
}

/**
 * Get the defaultProject from workspaces.WorkspaceDefinition if there is a defaultProject
 */
export function getDefaultProjectName(workspace: workspaces.WorkspaceDefinition) {
  const defaultProjectName = workspace.extensions['defaultProject'] as string;
  if (defaultProjectName) {
    return defaultProjectName;
  } else if (!defaultProjectName) {
    throw new SchematicsException(`Could not find a default Project in the workspace and you didn't set a project`);
  }
}

/**
 * Returns projectName or the defaultProject
 */
export function getProjectName(workspace: workspaces.WorkspaceDefinition, projectName?: string) {
  if (!projectName) {
    return getDefaultProjectName(workspace);
  } else {
    return projectName;
  }
}

/**
 * Get the Style extension of workspaces.ProjectDefinition or workspaces.WorkspaceDefinition or 'scss'
 */
export function getStyleExt(project: workspaces.ProjectDefinition, workspace: workspaces.WorkspaceDefinition, context: SchematicContext) {
  let styleExt = 'scss';
  if (hasSchematicsStyle(project.extensions)) {
    styleExt = project.extensions.schematics['@schematics/angular:component'].style;
  } else if (hasSchematicsStyle(workspace.extensions)) {
    styleExt = workspace.extensions.schematics['@schematics/angular:component'].style;
  } else {
    context.logger.info(`In your workspace is no style extension defined use default ${styleExt}`);
  }
  return styleExt;
}


/**
 * Install node packages
 */
export function ruleInstallTask(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

