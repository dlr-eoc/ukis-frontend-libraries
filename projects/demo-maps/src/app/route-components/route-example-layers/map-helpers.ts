import { FeatureCollection } from 'geojson';
import olTileWMS from 'ol/source/TileWMS';

export function getFeatureInfoPopup(obj, mapSvc, cb) {
  const source: olTileWMS = obj.source;
  const evt = obj.evt;
  const viewResolution = mapSvc.map.getView().getResolution();
  /* const url = `https://geoservice.dlr.de/eoc/land/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo` +
    `&QUERY_LAYERS=GUF28_DLR_v1_Mosaic&LAYERS=GUF28_DLR_v1_Mosaic&INFO_FORMAT=application%2Fjson&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=1.207031249999995%2C47.63671875%2C3.5742187499999947%2C50.00390625`; */
  const url = source.getFeatureInfoUrl(
    evt.coordinate, viewResolution, mapSvc.EPSG,
    { INFO_FORMAT: 'application/json' }
  );

  fetch(url).then(response => response.json())
    .catch((error) => {
      console.log(error);
    })
    .then((data: FeatureCollection) => {
      if (data.features.length) {
        const html = mapSvc.createPopupHtml(data.features[0].properties);
        cb(html);
      } else {
        const html = `<p>No Data!</p>`;
        cb(html);
      }
    });
}
