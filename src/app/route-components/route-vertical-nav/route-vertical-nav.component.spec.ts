import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteVerticalNavComponent } from './route-vertical-nav.component';

describe('RouteVerticalNavComponent', () => {
  let component: RouteVerticalNavComponent;
  let fixture: ComponentFixture<RouteVerticalNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteVerticalNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteVerticalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
