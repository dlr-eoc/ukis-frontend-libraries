import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePrivacyComponent } from './route-privacy.component';

describe('RoutePrivacyComponent', () => {
  let component: RoutePrivacyComponent;
  let fixture: ComponentFixture<RoutePrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
