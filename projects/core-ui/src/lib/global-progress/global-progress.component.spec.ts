import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProgressComponent } from './global-progress.component';
import { ProgressService, IProgress } from './progress.service';
import { ClarityModule } from '@clr/angular';

describe('GlobalProgressComponent', () => {
  let component: GlobalProgressComponent;
  let fixture: ComponentFixture<GlobalProgressComponent>;
  let progressSvc: ProgressService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule],
      declarations: [GlobalProgressComponent],
      providers: [ProgressService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProgressComponent);
    component = fixture.componentInstance;
    progressSvc = TestBed.get(ProgressService);
    component.progress = <IProgress>{
      indeterminate: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
