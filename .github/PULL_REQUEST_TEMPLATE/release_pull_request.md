## Release PR Checklist


For creating a new version see [DEVELOPMENT/new version](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/main/DEVELOPMENT.md#How-to-publish-a-new-version-for-all-projects) and see [Release pull request](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/main/DEVELOPMENT.md#Release-pull-request).


Please check if your PR fulfills the following requirements in this order:

1. [ ] The PR name follows the naming convention `release-v[0-9]+.[0-9]+.[0-9]`.
2. [ ] The brach follows the naming convention `release-v[0-9]+.[0-9]+.[0-9]`.
3. [ ] The CHANGELOG.md is updated with a version header `# [<version>](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/v<version>) (<date>) (<description>)`.
4. [ ] The correct version and tag was set with `npm version <major | minor | patch> -m "Version for release XYZ"`.
5. [ ] All versions are synced with `node scripts/library/index.js --set-source`.
6. [ ] The main package-lock.json was updated with `npm intsall`.
7. [ ] The Tag v[0-9]+.[0-9]+.[0-9] was pushed with the branch. 
8. [ ] The Project is building without errors [see](https://github.com/dlr-eoc/ukis-frontend-libraries/actions/workflows/package-main-release.yml) and check if the build job was successful.
9. [ ] Add the Label `RELEASE` to the PR.

Then a release on GitHub is created and the built packages are published.

If everything works fine the PR can be merged.
