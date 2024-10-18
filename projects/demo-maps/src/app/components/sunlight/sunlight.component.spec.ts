import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SunlightComponent } from './sunlight.component';

describe('SunlightComponent', () => {
  let component: SunlightComponent;
  let fixture: ComponentFixture<SunlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SunlightComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
