import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapThreeComponent } from './map-three.component';

describe('MapThree', () => {
  let component: MapThreeComponent;
  let fixture: ComponentFixture<MapThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapThreeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});