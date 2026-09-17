import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalProgressComponent } from './global-progress';
import { ProgressService, IProgress } from './global-progress-svc';
import { ClarityModule } from '@clr/angular';

describe('GlobalProgressComponent', () => {
  let component: GlobalProgressComponent;
  let fixture: ComponentFixture<GlobalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, GlobalProgressComponent],
      providers: [ProgressService]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalProgressComponent);
    component = fixture.componentInstance;

    component.progress.set({indeterminate: true});

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});









