import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MapNavigatorComponent } from './navigator';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapState } from '@dlr-eoc/services-map-state';
import { ClarityModule } from '@clr/angular';


describe('MapNavigatorComponent', () => {
  let component: MapNavigatorComponent;
  let fixture: ComponentFixture<MapNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ClarityModule, MapNavigatorComponent],
      providers: [MapStateService]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MapNavigatorComponent);
    component = fixture.componentInstance;
    // inject Service
    component.mapStateSvc = new MapStateService();
    // mock get state from Service
    component.mapstate = new MapState(7, {
      lat: 0,
      lon: 0
    }, { notifier: 'user' });
    fixture.detectChanges(); 
    
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
