import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MapNavigatorComponent } from './map-navigator.component';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapState } from '@dlr-eoc/services-map-state';
import { ClarityModule } from '@clr/angular';


describe('MapNavigatorComponent', () => {
  let component: MapNavigatorComponent;
  let fixture: ComponentFixture<MapNavigatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapNavigatorComponent],
      imports: [FormsModule, ClarityModule],
      providers: [MapStateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapNavigatorComponent);
    component = fixture.componentInstance;
    // inject Service
    component.mapState = new MapStateService();
    // mock get state from Service
    component.mapstate = new MapState(7, {
      lat: 0,
      lon: 0
    }, { notifier: 'user' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
