import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwcControlComponent } from './owc-control.component';
import { LayersService } from '@ukis/services-layers/src/public_api';
import { MapStateService } from '@ukis/services-map-state/src/public_api';

describe('OwcControlComponent', () => {
  let component: OwcControlComponent;
  let fixture: ComponentFixture<OwcControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwcControlComponent ],
      providers: [LayersService, MapStateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwcControlComponent);
    component = fixture.componentInstance;
    component.layerSvc = new LayersService();
    component.mapStateSvc = new MapStateService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
