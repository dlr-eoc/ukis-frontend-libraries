import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColorRamp } from '../../route-components/route-example-custom-layers/customRenderers/interpolation_renderer';

@Component({
  selector: 'app-interpolation-settings',
  templateUrl: './interpolation-settings.component.html',
  styleUrls: ['./interpolation-settings.component.scss']
})
export class InterpolationSettingsComponent implements OnInit {

  @Input() changeHandler: (power: number, smooth: boolean, colorRamp: ColorRamp) => void;

  public interpolationForm = new FormGroup({
      power: new FormControl(1, Validators.required),
      smooth: new FormControl(true, Validators.required),
      colorRamp: new FormControl({
        0: [216, 179, 101],
        10: [245, 245, 245],
        22: [90, 180, 172]
      }, Validators.required),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.interpolationForm.valueChanges.subscribe((newVal) => {
      this.changeHandler(newVal.power, newVal.smooth, newVal.colorRamp);
    });
  }

}
