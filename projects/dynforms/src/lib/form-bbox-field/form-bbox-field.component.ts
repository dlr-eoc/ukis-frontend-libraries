import { Component, OnInit, Input } from '@angular/core';
import { BboxParameter } from '../parameter';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ukis-form-bbox-field',
  templateUrl: './form-bbox-field.component.html',
  styleUrls: ['./form-bbox-field.component.css']
})
export class FormBboxFieldComponent implements OnInit {

  @Input() parameter: BboxParameter;
  @Input() parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
