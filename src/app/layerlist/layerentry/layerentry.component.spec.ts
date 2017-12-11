import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerentryComponent } from './layerentry.component';

describe('LayerentryComponent', () => {
  let component: LayerentryComponent;
  let fixture: ComponentFixture<LayerentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
