import { Component, effect, input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrCommonFormsModule, ClrRangeModule } from '@clr/angular';

interface IsunlightForm {
  x: FormControl<number>;
  y: FormControl<number>;
}

@Component({
  imports: [FormsModule, ClrCommonFormsModule, ReactiveFormsModule, ClrRangeModule],
  selector: 'app-sunlight',
  styleUrl: './sunlight.scss',
  templateUrl: './sunlight.html',
})
export class Sunlight {
  changeHandler = input.required<(x: number, y: number) => void>();

  public sunlightForm: FormGroup<IsunlightForm>

  constructor() {
    this.sunlightForm = new FormGroup<IsunlightForm>({
      x: new FormControl(0, Validators.required) as FormControl<number>,
      y: new FormControl(0, Validators.required) as FormControl<number>,
    });

    effect(() => {
      const changeHandler = this.changeHandler();
      this.sunlightForm.valueChanges.subscribe((newVal) => {
        const x = newVal.x?.toString();
        const y = newVal.y?.toString();
        if (x && y) {
          changeHandler(parseInt(x.toString(), 10) / 100.0, parseInt(y.toString(), 10) / 100.0);
        }
      });
    })
  }
}
