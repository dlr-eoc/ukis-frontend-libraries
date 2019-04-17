import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwcControlComponent } from './owc-control.component';
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';

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
