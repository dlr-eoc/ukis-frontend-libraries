import { Component, OnInit, Input } from '@angular/core';
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
  availableProcesses: Observable<IWpsProcessBrief[]>;
  availableDescriptions: Observable<IWpsProcessDescription[]>;
  
  wpsConfigurationForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.availableProcesses = this.wps.getAvailableProcesses();

    this.wpsConfigurationForm = new FormGroup({
      processFormControl: new FormControl(),
      descriptionFormControl: new FormControl()
    });
  }

  onProcessSelected(processTitle: string) {
    this.wps.process = this.wps.getProcessByTitle(processTitle);
    this.availableDescriptions = this.wps.getAvailableDescriptions();
  }

  onDescriptionSelected(descriptionTitle: string) {
    this.wps.description = this.wps.getDescriptionByTitle(descriptionTitle);
  }
}
