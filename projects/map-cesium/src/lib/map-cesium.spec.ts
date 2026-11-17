import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Service } from '@angular/core';
import { LayerGroup, LayersService, RasterLayer, VectorLayer } from '@dlr-eoc/services-layers';
import { of } from 'rxjs';
import { MapCesiumService } from './map-cesium-svc';
import { MapCesiumComponent, ICesiumControls } from './map-cesium';
import { IMapState, MapStateService } from '@dlr-eoc/services-map-state';
import { Viewer } from '@cesium/widgets';
import { OsmTileLayer, EocBasemapTile } from '@dlr-eoc/base-layers-raster';


import { Math as CesiumMath } from '@cesium/engine';

@Service()
class MockLayersService extends LayersService {

  override getLayerGroups() {
    const l = new RasterLayer(
      {
        url: 'blabl',
        name: 'name',
        id: '5',
        type: 'wms',
        filtertype: 'Baselayers'
      }
    );
    const group = new LayerGroup({
      id: 'g',
      name: 'Test',
      layers: [l],
      filtertype: 'Baselayers'
    });
    return of([group]);
  }
}


function addSomeLayers(component: MapCesiumComponent) {
  const osmLayer = new OsmTileLayer();
  const EocBasemap = new EocBasemapTile();
  const baseLayers = [osmLayer, EocBasemap];
  baseLayers.forEach(l => {
    component.twoDlayersSvc.addLayer(l, 'Baselayers');
  });

  //-----------------------------------------------

  const testVector = new VectorLayer({
    id: 'vectorLayer',
    name: 'vectorLayer',
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [11.71142578125, 46.5739667965278]
        }
      }]
    }
  });
  const ukisGeoJsonLayer = new VectorLayer({
    id: 'ID-ukis-vector',
    name: 'GeoJSON Vector Layer',
    type: 'geojson',
    data: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                8.67919921875,
                49.167338606291075
              ],
              [
                10.458984375,
                48.4146186174932
              ],
              [
                11.997070312499998,
                48.4146186174932
              ],
              [
                13.24951171875,
                48.821332549646634
              ],
              [
                13.7109375,
                49.396675075193976
              ]
            ]
          }
        }
      ]
    },
    visible: false
  });


  let layers = [testVector, ukisGeoJsonLayer];
  layers.forEach(l => {
    component.twoDlayersSvc.addLayer(l, 'Layers');
  });

  return {
    osmLayer,
    EocBasemap,
    testVector,
    ukisGeoJsonLayer
  };
}

describe('MapCesiumComponent', () => {
  let component: MapCesiumComponent;
  let fixture: ComponentFixture<MapCesiumComponent>;
  let mapSvc: MapCesiumService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCesiumComponent],
      providers: [
        MapCesiumService,
        // { provide: LayersService, useClass: MockLayersService }, thers are set as input no need to provide
        // { provide: MapStateService, useClass: MapStateService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MapCesiumComponent);
    component = fixture.componentInstance;

    mapSvc = TestBed.inject(MapCesiumService);

    component.twoDlayersSvc = new LayersService();
    component.mapStateSvc = new MapStateService();

    const controls: ICesiumControls = {
      globeColor: '#00FF00'
    }

    component.controls = controls;
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';


    const startState: IMapState = {
      zoom: 3,
      center: {
        lat: 40,
        lon: 13
      },
      rotation: 0,
      viewAngle: 0
    };
    component.mapStateSvc.setMapState(startState);


    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have inputs set', () => {
    expect(component.mapStateSvc).toBeTruthy();
    expect(component.twoDlayersSvc).toBeTruthy();
    expect(component.mapSvc).toBeTruthy();
  });


  it('should have a viewer and the viewer should be the same as from the mapSvc', () => {
    expect(component.viewer instanceof Viewer).toBeTruthy();
    expect(component.viewer === mapSvc.viewer).toBeTruthy();
  });

  it('should set mapstate rotation', async () => {
    //set rotation to 90°
    component.mapStateSvc.setRotation(90); // here we would need to pass flyToOptions.complete cb 
    // we have to wait for the flyTo to finish -> mapStateSvc.setRotation -> mapSvc.setRotation
    await new Promise(resolve => setTimeout(resolve, 2000));
    // some radians to degree conversions are made, so there are some rounding errors to be expected
    expect(mapSvc.getRotation()).toBeCloseTo(90);
  });

  it('should set mapstate view angle', async () => {
    //set view angle to 55°
    component.mapStateSvc.setViewAngle(55);
    // we have to wait for the flyTo to finish
    await new Promise(resolve => setTimeout(resolve, 2000));
    // some radians to degree conversions are made, so there are some rounding errors to be expected
    expect(mapSvc.getViewAngle()).toBeCloseTo(55);
  });

  it('should add Imagery layers', () => {
    let { osmLayer, EocBasemap } = addSomeLayers(component);
    const baseLayers = [osmLayer, EocBasemap];

    expect(component.viewer.imageryLayers.length).toEqual(2);
    expect(mapSvc.get2DImageryLayersSize('Baselayers')).toEqual(baseLayers.length);
  });

  it('should add DataSource layers', () => {
    let { testVector, ukisGeoJsonLayer } = addSomeLayers(component);
    const layers = [testVector, ukisGeoJsonLayer];

    //expect(component.viewer.dataSources.length).toEqual(2);
    expect(mapSvc.getAll2DLayersSize('Layers')).toEqual(layers.length);
  });
});

