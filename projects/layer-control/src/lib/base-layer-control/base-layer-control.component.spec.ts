import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayerControlComponent } from './base-layer-control.component';

describe('BaseLayerControlComponent', () => {
  let component: BaseLayerControlComponent;
  let fixture: ComponentFixture<BaseLayerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLayerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
