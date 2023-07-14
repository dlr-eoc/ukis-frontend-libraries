import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICesiumControls, MapCesiumComponent } from './map-cesium.component';
import { LayersService } from '@dlr-eoc/services-layers';
import { MapCesiumService } from './map-cesium.service';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Viewer } from '@cesium/widgets';


describe('MapCesiumComponent', () => {
  let component: MapCesiumComponent;
  let fixture: ComponentFixture<MapCesiumComponent>;
  let mapSvc: MapCesiumService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapCesiumComponent],
      providers: [
        MapCesiumService,
        LayersService,
        MapStateService
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

  // TODO: add tests for adding layers
});
