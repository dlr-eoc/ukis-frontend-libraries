import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsVerion, WpsResult } from "./wps_marshaller";
import { WpsFactory100 } from "./wps100/wps_1.0.0_factory";
import { WpsFactory200 } from "./wps200/wps_2.0_factory";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jsonix } from '@boundlessgeo/jsonix'; //let Jsonix = require('jsonix').Jsonix;
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; let XLink_1_0 = XLink_1_0_Factory.XLink_1_0; //let XLink_1_0 = require('w3c-schemas/lib/XLink_1_0').XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; let OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0; //let OWS_1_1_0 = require('ogc-schemas/lib/OWS_1_1_0').OWS_1_1_0;
import * as OWS_2_0_Factory from 'ogc-schemas/lib/OWS_2_0'; let OWS_2_0 = OWS_2_0_Factory.OWS_2_0; //let OWS_2_0 = require('ogc-schemas/lib/OWS_2_0').OWS_2_0;
import * as WPS_1_0_0_Factory from 'ogc-schemas/lib/WPS_1_0_0'; let WPS_1_0_0 = WPS_1_0_0_Factory.WPS_1_0_0; //let WPS_1_0_0 = require('ogc-schemas/lib/WPS_1_0_0').WPS_1_0_0;
import * as WPS_2_0_Factory from 'ogc-schemas/lib/WPS_2_0'; let WPS_2_0 = WPS_2_0_Factory.WPS_2_0; //let WPS_2_0 = require('ogc-schemas/lib/WPS_2_0').WPS_2_0;


/**
 * The Wps-client abstracts away the differences between Wps1.0.0 and Wps2.0.0
 * There are two layers of marshalling: 
 *  - the Wps-marshaller marshals user-facing data to wps-specific types
 *  - Jsonix marshals wps-specific data to xml.
 * user-facing data -> wpsmarshaller -> Wps-type-specific data -> Jsonix-marhsaller -> XML -> webclient -> WPS -> XML -> Jsonix-unmarshaller -> Wps-type-specific data -> wpsmarshaller -> user-facing data
 */
export class WpsClient {
    
    private wpsmarshaller: WpsMarshaller;
    private version: WpsVerion;
    private url: string;
    private xmlmarshaller;
    private xmlunmarshaller;

    constructor(url: string, version: WpsVerion, private webclient: HttpClient) {
        this.url = url;
        this.version = version;
        let context;
        if(this.version == "1.0.0") {
            this.wpsmarshaller = new WpsFactory100();
            context = new Jsonix.Context([XLink_1_0, OWS_1_1_0, WPS_1_0_0]);
        } 
        else if (this.version == "2.0.0") {
            this.wpsmarshaller = new WpsFactory200();
            context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
        }
        this.xmlunmarshaller = context.createUnmarshaller();
        this.xmlmarshaller = context.createMarshaller();
    }

    getCapabilities(): Observable<any> {
        let url = this.wpsmarshaller.getCapabilitiesUrl(this.url);
        return this.webclient.get(url).pipe(
            map(response =>  this.xmlunmarshaller.unmarshalString(response)),
            map(responseJson => this.wpsmarshaller.unmarshalCapabilities(responseJson.value)) // @TODO: handle case when instead of WpsCapabilites an ExceptionReport is returned
        );
    }

    describeProcess(processId: string): Observable<any> {
        throw new Error("Not implemented yet")
    }

    execute(processId: string, inputs: WpsInput[], output: WpsOutputDescription): Observable<WpsResult[]> {
        
        let url = this.wpsmarshaller.executeUrl(this.url, processId);
        let execbody = this.wpsmarshaller.marshalExecBody(processId, inputs, output);
        let xmlExecbody = this.xmlmarshaller.marshalString(execbody);

        let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
        return this.webclient.post(url, xmlExecbody, {headers: headers, responseType: 'text'}).pipe(
            map(response =>  this.xmlunmarshaller.unmarshalString(response) ),
            map(responseJson => this.wpsmarshaller.unmarshalExecuteResponse(responseJson) )
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
