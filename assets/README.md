## This folder contains lot's of data for testing in the projects

TODO: license of srtm, osm, zpos and positron-gl-style not comatible with Apache-2.0???


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

## Credits
- [kml/timezones.kml](https://github1s.com/openlayers/openlayers/blob/HEAD/examples/data/kml/timezones.kml) from [OpenLayers](https://openlayers.org/)
- image/osmTestImg.jpg from [OSM](https://www.openstreetmap.org) Tiles
- image/srtm_small.png from [nasa](https://www2.jpl.nasa.gov/srtm)
- image/zpos.png from ?
- open-map-styles/open-map-style.json derived from [positron-gl-style](https://github.com/openmaptiles/positron-gl-style)
