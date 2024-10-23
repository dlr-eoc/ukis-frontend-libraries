import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpolationSettingsComponent } from './interpolation-settings.component';

describe('InterpolationSettingsComponent', () => {
  let component: InterpolationSettingsComponent;
  let fixture: ComponentFixture<InterpolationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [InterpolationSettingsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpolationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
