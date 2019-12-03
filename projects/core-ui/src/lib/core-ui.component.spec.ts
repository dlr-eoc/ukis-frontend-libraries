import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreUiComponent } from './core-ui.component';

describe('CoreUiComponent', () => {
  let component: CoreUiComponent;
  let fixture: ComponentFixture<CoreUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
