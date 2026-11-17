import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleLayerAction } from './example-layer-action';

describe('ExampleLayerAction', () => {
  let component: ExampleLayerAction;
  let fixture: ComponentFixture<ExampleLayerAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleLayerAction],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleLayerAction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
