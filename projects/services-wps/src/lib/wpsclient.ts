import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsVerion } from "./wps_marshaller";
import { WpsFactory100 } from "./wps100/wps_1.0.0_factory";
import { WpsFactory200 } from "./wps200/wps_2.0_factory";
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { BrowserXhr } from "@angular/common/http/src/xhr";
let Jsonix = require('jsonix').Jsonix;
let XLink_1_0 = require('w3c-schemas/lib/XLink_1_0').XLink_1_0;
let OWS_1_1_0 = require('ogc-schemas/lib/OWS_1_1_0').OWS_1_1_0;
let OWS_2_0 = require('ogc-schemas/lib/OWS_2_0').OWS_2_0;
let WPS_1_0_0 = require('ogc-schemas/lib/WPS_1_0_0').WPS_1_0_0;
let WPS_2_0 = require('ogc-schemas/lib/WPS_2_0').WPS_2_0;


/**
 * The Wps-client abstracts away the differences between Wps1.0.0 and Wps2.0.0
 * There are two layers of marshalling: 
 *  - the Wps-marshaller marshals user-facing data to wps-specific types
 *  - Jsonix marshals wps-specific data to xml.
 * user-facing data -> wpsmarshaller -> Wps-type-specific data -> Jsonix-marhsaller -> XML -> webclient -> WPS -> XML -> Jsonix-unmarshaller -> Wps-type-specific data -> wpsmarshaller -> user-facing data
 */
export class WpsClient {
    
    private wpsmarsh: WpsMarshaller;
    private version: WpsVerion;
    private url: string;
    private marshaller;
    private unmarshaller;
    private webclient: HttpClient;

    constructor(url: string, version: WpsVerion) {
        this.webclient = new HttpClient(new HttpXhrBackend(new BrowserXhr()));
        this.url = url;
        this.version = version;
        let context;
        if(this.version == "1.0.0") {
            this.wpsmarsh = new WpsFactory100();
            context = new Jsonix.Context([XLink_1_0, OWS_1_1_0, WPS_1_0_0]);
        } 
        else if (this.version == "2.0.0") {
            this.wpsmarsh = new WpsFactory200();
            context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
        }
        this.unmarshaller = context.createUnmarshaller();
        this.marshaller = context.createMarshaller();
    }

    getCapabilities(): Observable<any> {
        let url = this.wpsmarsh.getCapabilitiesUrl(this.url);
        return this.webclient.get(url).pipe(
            map(response =>  this.unmarshaller.unmarshalString(response)),
            map(responseJson => this.wpsmarsh.unmarshalCapabilities(responseJson.value)) // @TODO: handle case when instead of WpsCapabilites an ExceptionReport is returned
        );
    }

    describeProcess(processId: string): Observable<any> {
        throw new Error("Not implemented yet")
    }

    execute(processId: string, inputs: WpsInput[], output: WpsOutputDescription): Observable<any> {
        let url = this.wpsmarsh.executeUrl(this.url, processId);
        let execbody = this.wpsmarsh.marshalExecBody(processId, inputs, output);
        let xmlExecbody = this.marshaller.marshalString(execbody);
        return this.webclient.post(url, xmlExecbody).pipe(
            map(response =>  this.unmarshaller.unmarshalString(response) ),
            map(responseJson => this.wpsmarsh.unmarshalExecuteResponse(responseJson) )
        );
    }

    getStatus(processId: string): Observable<any> {
        throw new Error("Not implemented yet")
    }

    getResult(processId: string): Observable<any> {
        throw new Error("Not implemented yet")
    }

    dismiss(processId: string): Observable<any> {
        throw new Error("Not implemented yet")
    }
}