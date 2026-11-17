import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Popup2 } from './popup2';

describe('Popup2', () => {
  let component: Popup2;
  let fixture: ComponentFixture<Popup2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popup2],
    }).compileComponents();

    fixture = TestBed.createComponent(Popup2);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('data', {name: 'test'});

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
