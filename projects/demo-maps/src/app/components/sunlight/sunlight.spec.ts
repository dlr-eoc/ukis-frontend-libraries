import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sunlight } from './sunlight';

describe('Sunlight', () => {
  let component: Sunlight;
  let fixture: ComponentFixture<Sunlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sunlight],
    }).compileComponents();

    fixture = TestBed.createComponent(Sunlight);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('changeHandler', (x: number, y: number) => {});
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
