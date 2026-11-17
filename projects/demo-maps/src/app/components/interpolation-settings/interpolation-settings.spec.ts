import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterpolationSettings } from './interpolation-settings';

describe('InterpolationSettings', () => {
  let component: InterpolationSettings;
  let fixture: ComponentFixture<InterpolationSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterpolationSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(InterpolationSettings);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('changeHandler', (power: number, smooth: boolean, labels: boolean) => {});
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
