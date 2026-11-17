import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicensesExample } from './licenses-example';

describe('LicensesExample', () => {
  let component: LicensesExample;
  let fixture: ComponentFixture<LicensesExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicensesExample],
    }).compileComponents();

    fixture = TestBed.createComponent(LicensesExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
