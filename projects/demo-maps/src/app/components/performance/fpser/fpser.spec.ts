import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fpser } from './fpser';

describe('Fpser', () => {
  let component: Fpser;
  let fixture: ComponentFixture<Fpser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fpser],
    }).compileComponents();

    fixture = TestBed.createComponent(Fpser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
