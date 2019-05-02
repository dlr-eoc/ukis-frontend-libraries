import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectParameter } from '../parameter';

@Component({
  selector: 'ukis-form-select-field',
  templateUrl: './form-select-field.component.html',
  styleUrls: ['./form-select-field.component.css'], 
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => FormSelectFieldComponent),
  }]
})
export class FormSelectFieldComponent implements OnInit, ControlValueAccessor {

  @Input() parameter: SelectParameter;
  public disabled: boolean = false;
  public activeOption: any;
  public options; 
  private changeFunction; 


  constructor() { }

  ngOnInit() {
    this.options = this.parameter.options;
  }

  writeValue(obj: any): void {
    //console.log(`${this.parameter.id} writeValue`, obj);
    this.activeOption = obj;
  }

  registerOnChange(fn: any): void {
    //console.log(`${this.parameter.id} registering change function `, fn);
    this.changeFunction = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    //console.log(`${this.parameter.id} setDisabledState`, isDisabled);
    this.disabled = isDisabled;
  }

  onChange(newVal) {
    //console.log("calling changefunciton with ", newVal);
    this.activeOption = newVal;
    this.changeFunction(newVal);
  }
}
