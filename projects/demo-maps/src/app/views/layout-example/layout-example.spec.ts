import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutExample } from './layout-example';

describe('LayoutExample', () => {
  let component: LayoutExample;
  let fixture: ComponentFixture<LayoutExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutExample],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
