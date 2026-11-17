import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePopup } from './table-popup';

describe('TablePopup', () => {
  let component: TablePopup;
  let fixture: ComponentFixture<TablePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePopup],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePopup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {name: 'test'});
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
