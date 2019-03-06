import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Wps } from '@ukis/services-wps';
import { IWpsProcessBrief, IWpsProcessDescription } from '@ukis/datatypes-wps';
import { FormGroup, FormControl } from '@angular/forms';


/**
 * This component serves as the interface between the user and a Wps.
 * It obtains from the user configuration data and gives it to the wps.
 * The wps returns results, which this component serves to the user. 
 * 
 * user --> data --> component --> wps --> results --> component --> user
 * 
 * The component also makes sure all the steps in the configuration of the wps are done in the correct order. 
 * This is acchieved by relying on clarities "wizard" component. 
 */

@Component({
  selector: 'ukis-wps-configuration',
  templateUrl: './wps-configuration.component.html',
  styleUrls: ['./wps-configuration.component.css']
})
export class WpsConfigurationComponent implements OnInit {

  @Input() wps: Wps;

  availableProcesses: IWpsProcessBrief[];
  availableDescriptions: IWpsProcessDescription[];

  wpsConfigurationForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.wps.getAvailableProcesses().subscribe((processes) => {
      this.availableProcesses = processes;
    });

    this.wpsConfigurationForm = new FormGroup({
      processFormControl: new FormControl(),
      descriptionFormControl: new FormControl()
    });
  }

  onProcessSelected(evt) {
    let selectedProcess = this.wpsConfigurationForm.controls["processFormControl"].value;
    this.wps.process = selectedProcess;
    this.wps.getAvailableDescriptions().subscribe((descriptions) => {
      this.availableDescriptions = descriptions;
    });
  }

  onDescriptionSelected(evt) {
    let selectedDescription = this.wpsConfigurationForm.controls["descriptionFormControl"].value;
    this.wps.description = selectedDescription;
  }

 
}
