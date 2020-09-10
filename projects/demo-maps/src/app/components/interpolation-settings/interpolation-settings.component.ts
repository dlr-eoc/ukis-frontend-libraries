import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColorRamp } from '@dlr-eoc/utils-maps';

@Component({
  selector: 'app-interpolation-settings',
  templateUrl: './interpolation-settings.component.html',
  styleUrls: ['./interpolation-settings.component.scss']
})
export class InterpolationSettingsComponent implements OnInit {

  @Input() changeHandler: (power: number, smooth: boolean, colorRamp: ColorRamp, labels: boolean) => void;

  public interpolationForm: FormGroup;

  public colorRampOptions = [
    {
      name: 'one',
      value: {
        0: [166, 97, 26],
        7: [223, 194, 125],
        12: [247, 247, 247],
        18: [128, 205, 193],
        22.5: [1, 133, 113]}
    }, {
      name: 'two',
      value: {
        0: [255, 255, 204],
        7: [161, 218, 180],
        12: [65, 182, 196],
        18: [44, 127, 184],
        22.5: [37, 52, 148]
       }
    }, {
      name: 'three',
      value: {
        0: [213, 62, 79],
        7: [254, 224, 139],
        12: [255, 255, 191],
        18: [153, 213, 148],
        22.5: [50, 136, 189]
       }
    }
  ];

  constructor() {
    this.interpolationForm = new FormGroup({
      power: new FormControl(2, Validators.required),
      smooth: new FormControl(true, Validators.required),
      labels: new FormControl(false, Validators.required),
      colorRamp: new FormControl(this.colorRampOptions[0].value, Validators.required),
  })
  }

  ngOnInit(): void {
    this.interpolationForm.valueChanges.subscribe((newVal) => {
      this.changeHandler(newVal.power, newVal.smooth, newVal.colorRamp, newVal.labels);
    });
  }

}
