## This folder contains lot's of data for testing in the projects

To us it in an angular app add 

```json
{
  "glob": "**/*",
  "input": "./projects/shared-assets/",
  "output": "./assets"
},
```
to tha apps [assets configuration](angular.json#demo-maps).


or import files in with
```ts
import ... from '@dlr-eoc/shared-assets';
import ... from '@dlr-eoc/shared-assets/geojson/...';
```

