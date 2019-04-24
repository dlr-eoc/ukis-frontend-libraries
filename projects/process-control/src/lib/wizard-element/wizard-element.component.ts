import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImmutableProcess } from '../process/process';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { Parameter } from '@ukis/dynforms';



@Component({
  selector: 'ukis-wizard-element',
  templateUrl: './wizard-element.component.html',
  styleUrls: ['./wizard-element.component.css']
})
export class WizardElementComponent implements OnInit {

  @Output() configSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextClicked: EventEmitter<ImmutableProcess> = new EventEmitter<ImmutableProcess>();
  @Output() reconfigureClicked: EventEmitter<ImmutableProcess> = new EventEmitter<ImmutableProcess>();
  @Input() process: ImmutableProcess;
  private paras: Parameter[];
  processForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.paras = this.process.requiresParameters();
    let formControls = {};
    this.paras.forEach((para: Parameter) => {
      let fc = new FormControl(para.defaultValue, [Validators.required]);
      formControls[para.id] = fc;
    });
    this.processForm = new FormGroup(formControls);
  }

  onSubmit(data) {
    this.configSubmitted.emit({process: this.process, values: this.processForm.value})
  }

  onNextClicked() {
    this.nextClicked.emit(this.process);
  } 

  onReconfigureClicked () {
    this.reconfigureClicked.emit(this.process);
  }

}
