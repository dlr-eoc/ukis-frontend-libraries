import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouteMap7Component } from './route-map7.component';


describe('RouteMap7', () => {
  let component: RouteMap7Component;
  let fixture: ComponentFixture<RouteMap7Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
