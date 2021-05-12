import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GlobalAlertComponent } from './global-alert.component';
import { AlertService, IAlert } from './alert.service';
import { ClarityModule } from '@clr/angular';

describe('GlobalAlertComponent', () => {
  let component: GlobalAlertComponent;
  let fixture: ComponentFixture<GlobalAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule],
      declarations: [GlobalAlertComponent],
      providers: [AlertService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAlertComponent);
    component = fixture.componentInstance;
    component.alert = {
      type: 'info',
      text: 'test Alert',
      closeable: true
    } as IAlert;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
