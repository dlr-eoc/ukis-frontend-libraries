import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorRamp } from '@dlr-eoc/utils-maps';
import { ClrCommonFormsModule, ClrInputModule, ClrCheckboxModule } from '@clr/angular';

interface IinterpolationForm {
  power: FormControl<number>;
  smooth: FormControl<boolean>;
  labels: FormControl<boolean>;
}
@Component({
    selector: 'app-interpolation-settings',
    templateUrl: './interpolation-settings.component.html',
    styleUrls: ['./interpolation-settings.component.scss'],
    imports: [FormsModule, ClrCommonFormsModule, ReactiveFormsModule, ClrInputModule, ClrCheckboxModule]
})
export class InterpolationSettingsComponent implements OnInit {

  @Input() changeHandler: (power: number, smooth: boolean, labels: boolean) => void;

  public interpolationForm: FormGroup<IinterpolationForm>;

  constructor() {
    this.interpolationForm = new FormGroup<IinterpolationForm>({
      power: new FormControl(2, Validators.required),
      smooth: new FormControl(true, Validators.required),
      labels: new FormControl(false, Validators.required)
    });
  }

  ngOnInit(): void {
    this.interpolationForm.valueChanges.subscribe((newVal) => {
      this.changeHandler(newVal.power, newVal.smooth, newVal.labels);
    });
  }

}
