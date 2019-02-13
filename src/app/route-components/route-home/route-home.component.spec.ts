import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHomeComponent } from './route-home.component';

describe('RouteHomeComponent', () => {
  let component: RouteHomeComponent;
  let fixture: ComponentFixture<RouteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
