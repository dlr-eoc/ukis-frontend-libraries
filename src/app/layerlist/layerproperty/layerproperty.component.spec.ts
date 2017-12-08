import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerpropertyComponent } from './layerproperty.component';

describe('LayerpropertyComponent', () => {
  let component: LayerpropertyComponent;
  let fixture: ComponentFixture<LayerpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
