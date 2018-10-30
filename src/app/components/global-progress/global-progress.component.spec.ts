import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProgressComponent } from './global-progress.component';

describe('GlobalProgressComponent', () => {
  let component: GlobalProgressComponent;
  let fixture: ComponentFixture<GlobalProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
