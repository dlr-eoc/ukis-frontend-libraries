import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMaplibreComponent } from './map-maplibre.component';
import { MapMaplibreService } from './map-maplibre.service';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { LayersService } from '@dlr-eoc/services-layers';
import { Map } from 'maplibre-gl';
import { EocBasemapTile, OsmTileLayer, EocBaseoverlayTile } from '@dlr-eoc/base-layers-raster';
import { getRotation } from './maplibre.helpers';


function addSomeLayers(component: MapMaplibreComponent, mapSvc: MapMaplibreService) {
  /*
   * Unfortunately, component.subscribeToLayers() does not work in the test, so we have to add the layers manually instead of using layersSvc.
   */
  /**
   * baseLayers.forEach(l => {
        component.layersSvc.addLayer(l, 'Baselayers');
      });
   */

  const layers = [new OsmTileLayer(), new EocBaseoverlayTile(), new EocBasemapTile()];
  //@ts-ignore use of private function
  component.addUpdateLayers(layers.filter(l => mapSvc.layerIsSupported(l)), 'Layers');

  // mapSvc.setUkisLayers(baseLayers, 'Baselayers', component.map);
  return {
    layers
  };
}

/**
 *  Unfortunately running tests in watch with edit does not work
 *
 * -> Async function did not complete within 5000ms
 */
describe('MapMaplibreComponent', () => {
  let component: MapMaplibreComponent;
  let fixture: ComponentFixture<MapMaplibreComponent>;
  let mapSvc: MapMaplibreService;
  const mapSize = [1024, 768];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MapMaplibreComponent],
    providers: [
        MapMaplibreService,
        { provide: LayersService, useClass: LayersService },
        { provide: MapStateService, useClass: MapStateService }
    ]
}).compileComponents();

    fixture = TestBed.createComponent(MapMaplibreComponent);
    component = fixture.componentInstance;
    component.layersSvc = new LayersService();
    component.mapStateSvc = new MapStateService();
    mapSvc = TestBed.inject(MapMaplibreService);
    fixture.detectChanges();
    component.map._container.style.height = `${mapSize[1]}px`;
    component.map._container.style.width = `${mapSize[0]}px`;
    component.map.resize();
    fixture.detectChanges();

    // https://github.com/maplibre/maplibre-gl-js/discussions/2193
    await new Promise((resolve, reject) => {
      // idle
      component.map.once('load', (evt) => {
        resolve(evt);
      });
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a map and the map should be the same as from the mapSvc', () => {
    expect(component.map instanceof Map).toBeTruthy();
    expect(mapSvc.map.getValue()._mapId).toBe(component.map._mapId);
  });

  it('should set mapstate rotation', () => {
    //set rotation to 90°
    component.mapStateSvc.setRotation(90);
    expect(getRotation(component.map)).toEqual(90);
  });

  it('should set mapstate view angle', () => {
    //set view angle to 45°
    component.mapStateSvc.setViewAngle(45);
    expect(component.map.getPitch()).toEqual(45);
  });

  it('should add/update Layers to the style', () => {
    const { layers } = addSomeLayers(component, mapSvc);
    const mapStyle = component.map.getStyle();
    expect(mapStyle.layers.length).toBe(layers.length);
    expect(mapStyle.metadata[`ukis:LayersIDs`]).toEqual(layers.map(l => l.id));
  });
});
