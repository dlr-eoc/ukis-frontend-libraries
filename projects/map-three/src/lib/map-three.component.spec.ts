import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapThreeComponent } from './map-three.component';

describe('MapThreeComponent', () => {
  let component: MapThreeComponent;
  let fixture: ComponentFixture<MapThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
