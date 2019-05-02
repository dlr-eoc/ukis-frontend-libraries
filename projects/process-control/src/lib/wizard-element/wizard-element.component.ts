import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImmutableProcess } from '../process/process';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { Parameter } from '@ukis/dynforms';
import { IProcessService } from '../process/process.service';



@Component({
  selector: 'ukis-wizard-element',
  templateUrl: './wizard-element.component.html',
  styleUrls: ['./wizard-element.component.css']
})
export class WizardElementComponent implements OnInit {

  @Output() configSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() reconfigureClicked: EventEmitter<string> = new EventEmitter<string>();
  @Input() process: ImmutableProcess;
  private paras: Parameter[];
  processForm: FormGroup;

  constructor() { }

  ngOnInit() {
    let formControls = {};
    this.paras = this.process.getConfig();
    this.paras.forEach((para: Parameter) => {
      let fc = new FormControl(para.defaultValue, [Validators.required]);
      formControls[para.id] = fc;
    });
    this.processForm = new FormGroup(formControls);
  }

  onSubmit(data) {
    let vals = this.processForm.value;
    this.configSubmitted.emit({processId: this.process.getId(), values: vals})
  }

  onNextClicked() {
    this.nextClicked.emit(this.process.getId());
  } 

  onReconfigureClicked () {
    this.reconfigureClicked.emit(this.process.getId());
  }

}
