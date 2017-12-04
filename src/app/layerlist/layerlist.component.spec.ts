import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerlistComponent } from './layerlist.component';

describe('LayerlistComponent', () => {
  let component: LayerlistComponent;
  let fixture: ComponentFixture<LayerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
