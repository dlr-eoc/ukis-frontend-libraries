import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteUserComponent } from './route-user.component';

describe('RouteUserComponent', () => {
  let component: RouteUserComponent;
  let fixture: ComponentFixture<RouteUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
