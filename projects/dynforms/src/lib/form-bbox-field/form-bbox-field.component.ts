import { Component, OnInit, Input } from '@angular/core';
import { BboxParameter } from '../parameter';
import { FormGroup, Form } from '@angular/forms';
import { MapOlService } from '@ukis/map-ol';

@Component({
  selector: 'ukis-form-bbox-field',
  templateUrl: './form-bbox-field.component.html',
  styleUrls: ['./form-bbox-field.component.css']
})
export class FormBboxFieldComponent implements OnInit {

  @Input() parameter: BboxParameter;
  @Input() parentFormGroup: FormGroup;
  selectionActive: boolean = false;

  constructor(
    private olService: MapOlService
  ) { }

  ngOnInit() {
    // passing all callbacks as array functions to add to avoid scoping issues with 'this'
    this.olService.addBboxSelection((evt) => this.boxSelectionAllowed(evt), () => this.onStartBoxSelection(), (ext) => this.onEndBoxSelection(ext));
  }

  onEndBoxSelection(extent) { 
    this.parentFormGroup.controls[this.parameter.id].setValue(extent);
    this.selectionActive = false;
  }

  onStartBoxSelection() {
  }

  boxSelectionAllowed(evt): boolean {
    return this.selectionActive;
  }

  onSelectButtonClicked() {
    this.selectionActive = true;
  }

}
