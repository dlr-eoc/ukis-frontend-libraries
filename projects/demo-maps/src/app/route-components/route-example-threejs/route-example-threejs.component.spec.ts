import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouteMap8Component } from './route-example-threejs.component';

describe('RouteExampleThreejsComponent', () => {
  let component: RouteMap8Component;
  let fixture: ComponentFixture<RouteMap8Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouteMap8Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
