import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProgressComponent } from './global-progress.component';

describe('GlobalProgressComponent', () => {
  let component: GlobalProgressComponent;
  let fixture: ComponentFixture<GlobalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
