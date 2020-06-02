import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteMap7Component } from './route-map7.component';


describe('RouteMap7', () => {
  let component: RouteMap7Component;
  let fixture: ComponentFixture<RouteMap7Component>;

  beforeEach(async(() => {
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
