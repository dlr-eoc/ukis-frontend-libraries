import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtentHelperComponent } from './extent-helper.component';

describe('ExtentHelperComponent', () => {
  let component: ExtentHelperComponent;
  let fixture: ComponentFixture<ExtentHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExtentHelperComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ExtentHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
