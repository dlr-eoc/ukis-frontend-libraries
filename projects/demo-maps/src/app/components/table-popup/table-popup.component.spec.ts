import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePopupComponent } from './table-popup.component';

describe('TablePopupComponent', () => {
  let component: TablePopupComponent;
  let fixture: ComponentFixture<TablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
