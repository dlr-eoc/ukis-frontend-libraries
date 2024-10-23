import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExampleMaplibreComponent } from './route-example-maplibre.component';

describe('RouteExampleMaplibreComponent', () => {
  let component: RouteExampleMaplibreComponent;
  let fixture: ComponentFixture<RouteExampleMaplibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouteExampleMaplibreComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RouteExampleMaplibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
