import { ServicesWpsService } from "./services-wps.service";
import { Injectable } from "@angular/core";
import { IWpsCapabilities, IWpsProcessBrief, IWpsProcessDescriptions, IWpsProcessDescription, IWpsInputDescription, IWpsOutputDescription, IWpsExecuteResponse, IWpsCode, IWpsDataInputs, IWpsResponseForm } from '@ukis/datatypes-wps';
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";


/**
 * This class represents one single WPS. 
 * WPS-processes may be asynchronous. For this reason we need a mechanism to capture the current state of the WPS. That is what this class represents. 
 * 
 * TODO: 
 *  - there are many "get" methods. A lot of them depend on some private property to have already been set. But what if they haven't been set yet? Should we return an observable that only returns data once they are set?
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
    private _response: IWpsExecuteResponse;

    constructor(
        private _wpsUrl: string,
        private wpsSvc: ServicesWpsService) {}

    get wpsUrl(): string {
        return this._wpsUrl;
    }

    getAvailableProcesses(): Observable<IWpsProcessBrief[]> {
        // If data already cached, return it immediately.
        if(this._availableProcesses) return of(this._availableProcesses); 

        // Else: query server.
        return this.wpsSvc.getCapabilities(this._wpsUrl).pipe(
            map((capas: IWpsCapabilities) => {
                return capas.value.processOfferings.process;
            }),
            tap((processes: IWpsProcessBrief[]) => {
                this._availableProcesses = processes;
            })
        );
    }

    getProcessByTitle(processTitle: string): IWpsProcessBrief {
        for(let process of this._availableProcesses) {
            if(process.title[0].value == processTitle) return process;
        }
    }

    set process(process: IWpsProcessBrief) {
        if(!this._availableProcesses.includes(process)) throw new Error(`The given process is not one of the available processes for the server ${this._wpsUrl}. Given process: ${JSON.stringify(process)}`);
        if(process == this._process) return;
        this._process = process;
        this._description = null;
        this._inputs = null;
        this._responseForm = null;
        this._response = null;
    }

    get process(): IWpsProcessBrief {
        return this._process;
    }

    getAvailableDescriptions(): Observable<IWpsProcessDescription[]> {
        // if data already cached, return it immediately
        if(this._availableDescriptions) return of(this._availableDescriptions);

        // Else: query server.
        return this.wpsSvc.describeProcess(this._wpsUrl, this._process).pipe(
            map((descriptions: IWpsProcessDescriptions) => {
                return descriptions.value.processDescription;
            }),
            tap((descriptions: IWpsProcessDescription[]) => {
                this._availableDescriptions = descriptions;
            })
        );
    }

    getDescriptionByTitle(title: string): IWpsProcessDescription {
        for(let description of this._availableDescriptions) {
            if(description.title[0].value == title) return description;
        }
    }

    set description(description: IWpsProcessDescription) {
        if(!this._availableDescriptions.includes(description)) throw new Error(`The given description is not one of the available descriptions for the server ${this._wpsUrl}. Given description: ${JSON.stringify(description)} `);
        if(description == this._description) return;
        this._description = description;
        this._inputs = null;
        this._responseForm = null;
        this._response = null;
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
        this._response = null;
    }

    get inputs(): IWpsDataInputs {
        return this._inputs;
    }

    set responseForm(responseForm: IWpsResponseForm) {
        this.wpsSvc.ensureResponseFormSuitsProcess(this._description, responseForm);
        this._responseForm = responseForm;
        this._response = null;
    }

    get responseForm(): IWpsResponseForm {
        return this._responseForm;
    }
    
    execute(): Observable<IWpsExecuteResponse> {
        return this.wpsSvc.executeProcess(this._wpsUrl, this._process, this._description, this._inputs, this._responseForm).pipe(
            tap((response: IWpsExecuteResponse) => {
                this._response = response;
            })
        );
    }

    get response(): IWpsExecuteResponse {
        return this._response;
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