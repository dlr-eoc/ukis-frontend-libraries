import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ClarityModule, ClrMainContainer } from '@clr/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'ukis-nested-component',
  template: `<clr-main-container><ukis-header></ukis-header></clr-main-container>`
})
class NestedTestComponent { }

describe('HeaderComponent', () => {
  let component: NestedTestComponent;
  let fixture: ComponentFixture<NestedTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule],
      declarations: [HeaderComponent, NestedTestComponent, ClrMainContainer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
