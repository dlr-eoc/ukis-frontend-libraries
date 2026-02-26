import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProgressComponent } from './global-progress.component';
import { ProgressService, IProgress } from './progress.service';
import { ClarityModule } from '@clr/angular';

describe('GlobalProgressComponent', () => {
  let component: GlobalProgressComponent;
  let fixture: ComponentFixture<GlobalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, GlobalProgressComponent],
      providers: [ProgressService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GlobalProgressComponent);
    component = fixture.componentInstance;
    component.progress = {
      indeterminate: true
    } as IProgress;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
