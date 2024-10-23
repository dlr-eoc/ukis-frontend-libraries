import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleLayerDescriptionComponent } from './example-layer-description.component';

describe('ExampleLayerDescriptionComponent', () => {
  let component: ExampleLayerDescriptionComponent;
  let fixture: ComponentFixture<ExampleLayerDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExampleLayerDescriptionComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ExampleLayerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
