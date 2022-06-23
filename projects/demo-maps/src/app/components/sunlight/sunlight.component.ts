import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


interface IsunlightForm {
  x: FormControl<number>;
  y: FormControl<number>;
}
@Component({
  selector: 'app-sunlight',
  templateUrl: './sunlight.component.html',
  styleUrls: ['./sunlight.component.scss']
})
export class SunlightComponent implements OnInit {

  @Input() changeHandler: (x: number, y: number) => void;

  public sunlightForm: FormGroup<IsunlightForm>

  constructor() {
    this.sunlightForm = new FormGroup<IsunlightForm>({
      x: new FormControl(0, Validators.required),
      y: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
    this.sunlightForm.valueChanges.subscribe((newVal) => {
      this.changeHandler(parseInt(newVal.x.toString(), 10) / 100.0, parseInt(newVal.y.toString(), 10) / 100.0);
    });
  }

}
