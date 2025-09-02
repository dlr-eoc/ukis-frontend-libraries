import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUkisUtilities } from './ngx-ukis-utilities';

describe('NgxUkisUtilities', () => {
  let component: NgxUkisUtilities;
  let fixture: ComponentFixture<NgxUkisUtilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUkisUtilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUkisUtilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
