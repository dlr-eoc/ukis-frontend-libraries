import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAlertComponent } from './global-alert.component';
import { AlertService, IAlert } from './alert.service';
import { ClarityModule } from '@clr/angular';

describe('GlobalAlertComponent', () => {
  let component: GlobalAlertComponent;
  let fixture: ComponentFixture<GlobalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, GlobalAlertComponent],
      providers: [AlertService]
    })
      .compileComponents();

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