import { ServicesWps100Service } from "./services-wps.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IWpsProcessBrief, IWpsProcessDescription, IWpsDataInputs, IWpsResponseForm, IWpsExecuteResponse, IWpsCapabilities, IWpsProcessDescriptions, IWpsInputDescription, IWpsOutputDescription } from "@ukis/datatypes-ogc";


/**
 * This interface represents one single WPS. 
 * WPS-processes may be asynchronous. For this reason we need a mechanism to capture the current state of the WPS. That is what this class represents. 
 * The interface is implementation-agnostic: it does not care if the actual client uses WPS Version 1 or 2. 
 */
 export interface Wps {
    getAvailableProcesses(), 
    setProcess(selectedProcess), 
    getProcess(), 
    getProcessByTitle(processTitle), 
    getAvailableDescriptions(), 
    setDescription(selectedDescription),
    getDescription(),
    getOutputDescriptions(), 
    getInputDescriptions(),
    getDescriptionByTitle(title), 
    setInputs(inputs), 
    getInputs(),
    setResponseForm(responseForm),
    getResponseForm(),
    execute(), 
 }

@Injectable({
    providedIn: 'root'
  })
export class Wps100 implements Wps {

    private _availableProcesses: IWpsProcessBrief[];
    private _process: IWpsProcessBrief;
    private _availableDescriptions: IWpsProcessDescription[];
    private _description: IWpsProcessDescription;
    private _inputs: IWpsDataInputs;
    private _responseForm: IWpsResponseForm;
    private _response: IWpsExecuteResponse;

    constructor(
        private _wpsUrl: string,
        private wpsSvc: ServicesWps100Service) {}

    getWpsUrl(): string {
        return this._wpsUrl;
    }

    getAvailableProcesses(): Observable<IWpsProcessBrief[]> {
        // If data already cached, return it immediately.
        if(this._availableProcesses) return of(this._availableProcesses); 

        // Else: query server.
        return this.wpsSvc.getCapabilities(this._wpsUrl).pipe(
            // tap((capas)=> {
            //     console.log(capas);
            // }),
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

    setProcess(process: IWpsProcessBrief) {
        // We abstain from checking if the process is even one of the provided processes, so that we can configure the Wps without making any Http-requests. 
        // if(!this._availableProcesses.includes(process)) throw new Error(`The given process is not one of the available processes for the server ${this._wpsUrl}. Given process: ${JSON.stringify(process)}`);
        if(process == this._process) return;
        this._process = process;
        this._description = null;
        this._inputs = null;
        this._responseForm = null;
        this._response = null;
    }

    getProcess(): IWpsProcessBrief {
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

    setDescription(description: IWpsProcessDescription) {
        // We abstain from checking if the description is even one of the provided descriptions, so that we can configure the Wps without making any Http-requests. 
        // if(!this._availableDescriptions.includes(description)) throw new Error(`The given description is not one of the available descriptions for the server ${this._wpsUrl}. Given description: ${JSON.stringify(description)} `);
        if(description == this._description) return;
        this._description = description;
        this._inputs = null;
        this._responseForm = null;
        this._response = null;
    }

    getDescription(): IWpsProcessDescription {
        return this._description;
    }

    getInputDescriptions(): IWpsInputDescription[] {
        return this._description.dataInputs.input;
    }

    getOutputDescriptions(): IWpsOutputDescription[] {
        return this._description.processOutputs.output;
    }

    setInputs(inputs: IWpsDataInputs) {
        this.wpsSvc.ensureInputsSuitProcess(this._description, inputs);
        this._inputs = inputs;
        this._response = null;
    }

    getInputs(): IWpsDataInputs {
        return this._inputs;
    }

    setResponseForm(responseForm: IWpsResponseForm) {
        this.wpsSvc.ensureResponseFormSuitsProcess(this._description, responseForm);
        this._responseForm = responseForm;
        this._response = null;
    }

    getResponseForm(): IWpsResponseForm {
        return this._responseForm;
    }
    
    execute(): Observable<IWpsExecuteResponse> {
        return this.wpsSvc.executeProcess(this._wpsUrl, this._process, this._description, this._inputs, this._responseForm).pipe(
            tap((response: IWpsExecuteResponse) => {
                this._response = response;
            })
        );
    }

    getResponse(): IWpsExecuteResponse {
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