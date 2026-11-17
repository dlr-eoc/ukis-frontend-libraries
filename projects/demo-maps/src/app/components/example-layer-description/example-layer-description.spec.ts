import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleLayerDescription } from './example-layer-description';

describe('ExampleLayerDescription', () => {
  let component: ExampleLayerDescription;
  let fixture: ComponentFixture<ExampleLayerDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleLayerDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleLayerDescription);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('description', 'test');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
