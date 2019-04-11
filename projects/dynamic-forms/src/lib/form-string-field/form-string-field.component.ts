import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StringParameter } from '../parameter';

@Component({
  selector: 'ukis-form-string-field',
  templateUrl: './form-string-field.component.html',
  styleUrls: ['./form-string-field.component.css']
})
export class FormStringFieldComponent implements OnInit {

  @Input() parameter: StringParameter;
  @Input() parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
