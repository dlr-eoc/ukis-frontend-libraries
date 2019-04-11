import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectParameter } from '../parameter';

@Component({
  selector: 'ukis-form-select-field',
  templateUrl: './form-select-field.component.html',
  styleUrls: ['./form-select-field.component.css']
})
export class FormSelectFieldComponent implements OnInit {

  @Input() parameter: SelectParameter;
  @Input() parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
