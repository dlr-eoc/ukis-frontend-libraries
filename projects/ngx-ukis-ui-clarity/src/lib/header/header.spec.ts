import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { ClarityModule, ClrMainContainer } from '@clr/angular';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ukis-nested-component',
  template: `<clr-main-container><ngx-ukis-header></ngx-ukis-header></clr-main-container>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ClarityModule, HeaderComponent]
})
class NestedTestComponent { }

describe('HeaderComponent', () => {
  let component: NestedTestComponent;
  let fixture: ComponentFixture<NestedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, HeaderComponent, NestedTestComponent],
      declarations: [ClrMainContainer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NestedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
