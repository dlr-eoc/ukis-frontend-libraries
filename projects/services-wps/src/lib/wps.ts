import { ServicesWpsService } from "./services-wps.service";
import { Injectable } from "@angular/core";
import { IWpsCapabilities, IWpsProcessBrief, IWpsProcessDescriptions, IWpsProcessDescription, IWpsInputDescription, IWpsOutputDescription, IWpsExecuteResponse, IWpsCode, IWpsDataInputs, IWpsResponseForm } from "../../../datatypes-wps/src/lib/datatypes-wps";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";


/**
 * This class represents one single WPS. 
 * WPS-processes may be asynchronous. For this reason we need a mechanism to capture the current state of the WPS. That is what this class represents. 
 */

@Injectable({
    providedIn: 'root'
  })
export class Wps {

    private _availableProcesses: IWpsProcessBrief[];
    private _process: IWpsProcessBrief;
    private _availableDescriptions: IWpsProcessDescription[];
    private _description: IWpsProcessDescription;
    private _inputs: IWpsDataInputs;
    private _responseForm: IWpsResponseForm;

    constructor(
        private wpsUrl: string,
        private wpsSvc: ServicesWpsService) {}


    getAvailableProcesses(): Observable<IWpsProcessBrief[]> {
        return this.wpsSvc.getCapabilities(this.wpsUrl).pipe(
            map((capas: IWpsCapabilities) => {
                return capas.value.processOfferings.process;
            }),
            tap((processes: IWpsProcessBrief[]) => {
                this._availableProcesses = processes;
            })
        );
    }

    set process(process: IWpsProcessBrief) {
        if(!this._availableProcesses.includes(process)) throw new Error(`The given process ${process} is not one of the available processes for the server ${this.wpsUrl}.`);
        if(process == this._process) return;
        this._process = process;
        this._description = null;
        this._inputs = null;
        this._responseForm = null;
    }

    get process(): IWpsProcessBrief {
        return this._process;
    }

    getAvailableDescriptions(): Observable<IWpsProcessDescription[]> {
        return this.wpsSvc.describeProcess(this.wpsUrl, this._process).pipe(
            map((descriptions: IWpsProcessDescriptions) => {
                return descriptions.value.processDescription;
            }),
            tap((descriptions: IWpsProcessDescription[]) => {
                this._availableDescriptions = descriptions;
            })
        );
    }

    set description(description: IWpsProcessDescription) {
        if(!this._availableDescriptions.includes(description)) throw new Error(`The given description ${description} is not one of the available descriptions for the server ${this.wpsUrl}`);
        if(description == this._description) return;
        this._description = description;
        this._inputs = null;
        this._responseForm = null;
    }

    get description(): IWpsProcessDescription {
        return this._description;
    }

    get inputDescriptions(): IWpsInputDescription[] {
        return this._description.dataInputs.input;
    }

    get outputDescriptions(): IWpsOutputDescription[] {
        return this._description.processOutputs.output;
    }

    set inputs(inputs: IWpsDataInputs) {
        this.wpsSvc.ensureInputsSuitProcess(this._description, inputs);
        this._inputs = inputs;
    }

    set responseForm(responseForm: IWpsResponseForm) {
        this.wpsSvc.ensureResponseFormSuitsProcess(this._description, responseForm);
        this._responseForm = responseForm;
    }
    
    execute(): Observable<IWpsExecuteResponse> {
        return this.wpsSvc.executeProcess(this.wpsUrl, this._process, this._description, this._inputs, this._responseForm);
    }

    dismissProcess() {
        throw new Error("This method has not been implemented yet.");
    }
  
  
    requestStatus() {
        throw new Error("This method has not been implemented yet.");
    }
  
  
    getExecutionResult() {
        throw new Error("This method has not been implemented yet.");
    }

}