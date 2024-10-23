import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtileLayerActionComponent } from './vtile-layer-action.component';

describe('VtileLayerActionComponent', () => {
  let component: VtileLayerActionComponent;
  let fixture: ComponentFixture<VtileLayerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VtileLayerActionComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VtileLayerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
