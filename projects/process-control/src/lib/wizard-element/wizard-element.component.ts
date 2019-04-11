import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Process } from '../process/process';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcessService } from '../process/process.service';
import { Parameter } from '@ukis/dynforms';



@Component({
  selector: 'ukis-wizard-element',
  templateUrl: './wizard-element.component.html',
  styleUrls: ['./wizard-element.component.css']
})
export class WizardElementComponent implements OnInit {

  @Output() configSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextClicked: EventEmitter<Process> = new EventEmitter<Process>();
  @Output() reconfigureClicked: EventEmitter<Process> = new EventEmitter<Process>();
  @Input() process: Process;
  private paras: Parameter[];
  processForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.paras = this.process.getParameters();
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
