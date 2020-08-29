import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sunlight',
  templateUrl: './sunlight.component.html',
  styleUrls: ['./sunlight.component.scss']
})
export class SunlightComponent implements OnInit {

  @Input() changeHandler: (x: number, y: number) => void;

  public sunlightForm = new FormGroup({
      x: new FormControl(0, Validators.required),
      y: new FormControl(0, Validators.required),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.sunlightForm.valueChanges.subscribe((newVal) => {
      this.changeHandler(parseInt(newVal.x) / 100.0, parseInt(newVal.y) / 100.0);
    });
  }

}
