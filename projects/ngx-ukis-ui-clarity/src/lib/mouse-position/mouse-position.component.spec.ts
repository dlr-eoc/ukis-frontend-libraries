import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MousePositionComponent } from './mouse-position.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService } from '@dlr-eoc/map-ol';

describe('MousePositionComponent', () => {
  let component: MousePositionComponent;
  let fixture: ComponentFixture<MousePositionComponent>;
  let mapStateSvc: MapStateService;
  let mapOlSvc: MapOlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ClarityModule, MousePositionComponent]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MousePositionComponent);
    component = fixture.componentInstance;
    mapStateSvc = TestBed.inject(MapStateService);
    mapOlSvc = TestBed.inject(MapOlService);
    component.mapState = mapStateSvc;
    component.mapSvc = mapOlSvc;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
