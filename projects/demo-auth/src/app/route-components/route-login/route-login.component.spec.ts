import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLoginComponent } from './route-login.component';

describe('RouteLoginComponent', () => {
  let component: RouteLoginComponent;
  let fixture: ComponentFixture<RouteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
