import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExampleCesiumComponent } from './route-example-cesium.component';

describe('RouteExampleCesiumComponent', () => {
  let component: RouteExampleCesiumComponent;
  let fixture: ComponentFixture<RouteExampleCesiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteExampleCesiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteExampleCesiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
