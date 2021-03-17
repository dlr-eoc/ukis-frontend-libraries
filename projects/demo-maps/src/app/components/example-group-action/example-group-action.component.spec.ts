import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGroupActionComponent } from './example-group-action.component';

describe('ExampleGroupActionComponent', () => {
  let component: ExampleGroupActionComponent;
  let fixture: ComponentFixture<ExampleGroupActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleGroupActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleGroupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
