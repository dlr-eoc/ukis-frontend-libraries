import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLandingpageComponent } from './route-landingpage.component';

describe('RouteLandingpageComponent', () => {
  let component: RouteLandingpageComponent;
  let fixture: ComponentFixture<RouteLandingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteLandingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
