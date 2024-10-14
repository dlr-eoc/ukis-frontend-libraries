import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExampleOwcLayersComponent } from './route-example-owc-layers.component';

describe('RouteExampleOwcLayersComponent', () => {
  let component: RouteExampleOwcLayersComponent;
  let fixture: ComponentFixture<RouteExampleOwcLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouteExampleOwcLayersComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteExampleOwcLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
