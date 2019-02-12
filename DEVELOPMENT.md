# Ho to create a new Project libraries

1. run ``ng generate library < name > --prefix ukis``

- rename lib package: "name": "@ukis/< name >"
- set lib package: "main": "src/public_api",
- create/develop services in the lib 
- add missing exports to public_api.ts
- create specs and run `ng test layers`
- if using required dependencies add it to ng-package.json/whitelistedNonPeerDependencies
- or lit it as peerDependencies
- build lib `ng build < name >`