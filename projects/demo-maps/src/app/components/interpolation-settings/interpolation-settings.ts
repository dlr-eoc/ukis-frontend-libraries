import { Component, effect, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrCheckboxModule, ClrCommonFormsModule, ClrInputModule } from '@clr/angular';

interface IinterpolationForm {
  power: FormControl<number>;
  smooth: FormControl<boolean>;
  labels: FormControl<boolean>;
}

@Component({
  imports: [FormsModule, ClrCommonFormsModule, ReactiveFormsModule, ClrInputModule, ClrCheckboxModule],
  selector: 'app-interpolation-settings',
  styleUrl: './interpolation-settings.scss',
  templateUrl: './interpolation-settings.html',
})
export class InterpolationSettings {
  changeHandler = input.required<(power: number, smooth: boolean, labels: boolean) => void>();

  public interpolationForm: FormGroup<IinterpolationForm>;

  constructor() {
    this.interpolationForm = new FormGroup<IinterpolationForm>({
      power: new FormControl(2, Validators.required) as FormControl<number>,
      smooth: new FormControl(true, Validators.required) as FormControl<boolean>,
      labels: new FormControl(false, Validators.required) as FormControl<boolean>
    });


    effect(() => {
      const changeHandler = this.changeHandler();
      this.interpolationForm.valueChanges.subscribe((newVal) => {
      changeHandler(newVal.power!, newVal.smooth!, newVal.labels!);
    });
    })
  }

}
