
/**
* Get and set Version of Library projects from frontend-libraries
*
* arguments
* -l | --list 
* -s | --set
*
* node scripts/projetsVersion.js -l
*/

const replace = require("replace");
const PATH = require('path');
const NG = require('@angular/cli');

const CWD = process.cwd();
const PLACEHOLDER = "0.0.0-PLACEHOLDER";
const MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
const ANGULARJSON = require(PATH.join(CWD, 'angular.json'));

var getProjects = () => {
    let projects = [];

    Object.keys(ANGULARJSON.projects).forEach((project) => {
        let _project = {
            name: project,
            path: PATH.join(CWD, ANGULARJSON.projects[project].root),
            package: PATH.join(CWD, ANGULARJSON.projects[project].root, 'package.json')
        };
        projects.push(_project);
    })
    return projects;
}

var runTests = (offset = 0) => {
    let projects = getProjects().map(item => item.name);
    let project = projects[offset];
    let options = {
        cliArgs: ['test', '--watch=false', project]
    };

    if (project) {
        console.info(`>>> run ng test ${project}`)
        NG.default(options).then((result) => {
            offset++
            runTests(offset);
        })
    }
}

var runBuilds = (offset = 0) => {
    let projects = getProjects().map(item => item.name);
    let project = projects[offset];

    let options = {
        cliArgs: ['build', '--watch=false', project]
    };

    if (project) {
        console.info(`>>> run ng build ${project}`)
        //TODO: check if all deps build before
        NG.default(options).then((result) => {
            offset++
            runTests(offset);
        })
    }
}


var setVersionsOfProjects = () => {
    let projectsPaths = getProjects().map(item => item.package);
    let errors = listAllProjects(true);
    if (errors.length < 1 && MAINPACKAGE.version) {
        console.log(projectsPaths)
        replace({
            regex: PLACEHOLDER,
            replacement: MAINPACKAGE.version,
            paths: projectsPaths,
            recursive: true,
            silent: true,
            include: "package.json"
        })
        console.log(`replaced all ${PLACEHOLDER} with ${MAINPACKAGE.version}`);
    } else {
        console.log(`check main package.json version and projects for errors!`)
        console.table(errors)
    }
}

var listAllProjects = (silent) => {
    let projects = [], errors = [], projectsPaths = getProjects();

    projectsPaths.forEach((project) => {
        let projectPackage = require(project.package);
        let _project = {
            name: projectPackage.name,
            version: projectPackage.version,
        };

        if (projectPackage.version != PLACEHOLDER) {
            let error = `version of project: ${projectPackage.name} must be ${PLACEHOLDER} for build!`;
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error })
        }

        if (projectPackage.name.indexOf('@ukis/') == -1) {
            let error = `name of project: ${projectPackage.name} must be prefixed with the @ukis/ namespace!`;
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error })
        }

        if (projectPackage.dependencies) {
            _project.dependencies = Object.keys(projectPackage.dependencies).join(',') || null;

            Object.keys(projectPackage.dependencies).forEach((key) => {
                let dep = projectPackage.dependencies[key];
                if (key.indexOf('@ukis/') != -1 && dep != PLACEHOLDER) {
                    let error = `version of dependency: ${key} in project: ${projectPackage.name} must be ${PLACEHOLDER} for build!`;
                    if (!silent) {
                        errors.push({ project: projectPackage.name, error: error })
                    }
                    _project.error = true;
                    errors.push(error)
                }
            })
        }
        projects.push(_project)
    })
    if (!silent) {
        console.table(projects)
    }

    return errors;
}

process.argv.slice(2).forEach((arg) => {
    if (arg == '-l' || arg == '--list') {
        listAllProjects();
    }
    if (arg == '-s' || arg == '--set') {
        setVersionsOfProjects();
    }
    if (arg == '-t' || arg == '--test') {
        runTests();
    }
});



