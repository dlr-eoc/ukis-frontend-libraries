import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICesiumControls, MapCesiumComponent } from './map-cesium.component';
import { CustomLayer, LayerGroup, LayersService, RasterLayer, VectorLayer } from '@dlr-eoc/services-layers';
import { MapCesiumService } from './map-cesium.service';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Viewer } from '@cesium/widgets';
import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { OsmTileLayer, EocBasemapTile } from '@dlr-eoc/base-layers-raster';

/**
 * this service extends the LayersService to mimic its behavior. The getLayerGroups function is overwritten to
 * get test data for following tests.
 */
@Injectable()
class MockLayersService extends LayersService {

  getLayerGroups() {
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


let instrumentedMockupCompId = 0;
@Component({
  selector: 'app-mock-popup',
  template: `<div>{{ data | json }}</div>`
})
class InstrumentedMockPopupComponent implements OnInit, OnDestroy {
  @Input() initCallback: (id: number) => void;
  @Input() destroyCallback: (id: number) => void;
  private id: number;

  constructor() {
    this.id = instrumentedMockupCompId;
    instrumentedMockupCompId++;
  }

  ngOnInit(): void {
    this.initCallback(this.id);
  }

  ngOnDestroy(): void {
    this.destroyCallback(this.id);
  }
}

function addSomeLayers(component: MapCesiumComponent, mapSvc: MapCesiumService) {
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
      declarations: [MapCesiumComponent],
      providers: [
        MapCesiumService,
        { provide: LayersService, useClass: MockLayersService },
        { provide: MapStateService, useClass: MapStateService }
      ]
    })
      .compileComponents();

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }

    fixture = TestBed.createComponent(MapCesiumComponent);
    component = fixture.componentInstance;
    component.twoDlayersSvc = new LayersService();
    component.mapStateSvc = new MapStateService();
    mapSvc = TestBed.inject(MapCesiumService);
    component.controls = controls;
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a viewer and the viewer should be the same as from the mapSvc', () => {
    expect(component.viewer instanceof Viewer).toBeTruthy();
    expect(component.viewer === mapSvc.viewer).toBeTruthy();
  });

  it('should add Imagery layers', () => {
    let { osmLayer, EocBasemap} = addSomeLayers(component, mapSvc);
    const baseLayers = [osmLayer, EocBasemap];

    expect(component.viewer.imageryLayers.length).toEqual(2);
    expect(mapSvc.get2DImageryLayersSize('Baselayers')).toEqual(baseLayers.length);
  });

  it('should add DataSource layers', () => {
    let {testVector, ukisGeoJsonLayer} = addSomeLayers(component, mapSvc);
    const layers = [testVector, ukisGeoJsonLayer];

    //expect(component.viewer.dataSources.length).toEqual(2);
    expect(mapSvc.getAll2DLayersSize('Layers')).toEqual(layers.length);
  });


});
