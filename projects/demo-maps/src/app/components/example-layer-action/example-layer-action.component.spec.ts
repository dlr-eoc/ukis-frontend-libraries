import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleLayerActionComponent } from './example-layer-action.component';

describe('ExampleLayerActionComponent', () => {
  let component: ExampleLayerActionComponent;
  let fixture: ComponentFixture<ExampleLayerActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleLayerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleLayerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
