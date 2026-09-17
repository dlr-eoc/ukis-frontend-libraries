import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAlertComponent } from './global-alert';
import { AlertService, IAlert } from './global-alert-svc';
import { ClarityModule } from '@clr/angular';

describe('GlobalAlertComponent', () => {
  let component: GlobalAlertComponent;
  let fixture: ComponentFixture<GlobalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, GlobalAlertComponent],
      providers: [AlertService]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalAlertComponent);
    component = fixture.componentInstance;
    component.alert.set({
      type: 'info',
      text: 'test Alert',
      closeable: true
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});