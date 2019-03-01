import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { wps } from './jsonixMappings/wps';
//var Jsonix = require('jsonix').Jsonix;
import { Jsonix } from '@boundlessgeo/jsonix';
import { IWpsCapabilities, IWpsProcessBrief, IWpsProcessDescriptions, IWpsExecuteProcessBody, IWpsExecuteProcessBodyName, IWpsExecuteProcessBodyValue, IWpsResponseForm, IWpsCode, IWpsDataInputs, IWpsOutputDefinition, IWpsInput, IWpsProcessDescription, IWpsOutputDescription, IWpsExecuteResponse } from '@ukis/datatypes-wps';



/**
 * This service exposes an interface to talk to any WPS.
 * It does not contain any state that is specific to any single WPS, so it can be used to talk to more than one WPS.
 */


@Injectable({
  providedIn: 'root'
})
export class ServicesWpsService {
  
  unmarshallerXmlToJson: any;
  marshallerJsonToXml: any;

  constructor(private http: HttpClient) {
    let jsonixContext = new Jsonix.Context([wps], {namespacePrefixes: []});
    this.unmarshallerXmlToJson = jsonixContext.createUnmarshaller();
    this.marshallerJsonToXml = jsonixContext.createMarshaller();
  }

 
  /**
   * http://geoprocessing.info/wpsdoc/serv?request=HYPERLINKED&schema=wps:Capabilities
   */
  getCapabilities(url: string): Observable<IWpsCapabilities> {

    let wpsQueryParams = {
      service: 'WPS',
      version: '1.0.0',
      request: 'GetCapabilities'
    };

    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

    return this.http.get(wpsUrl, {headers: headers, responseType: 'text'}).pipe(
      map((response: string): IWpsCapabilities => {
        return this.unmarshallerXmlToJson.unmarshalString(response);
      })
    );
  }

  /**
   * http://geoprocessing.info/wpsdoc/serv?request=HYPERLINKED&schema=wps:ProcessDescription
   */
  describeProcess(url: string, process: IWpsProcessBrief): Observable<IWpsProcessDescriptions> {

    let identifier = process.title[0].value;

    let wpsQueryParams = {
        service: 'WPS',
        version: '1.0.0',
        request: 'DescribeProcess',
        identifier: identifier
    };

    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

    return this.http.get(wpsUrl, {headers: headers, responseType: 'text'}).pipe(
      map((response: string): IWpsProcessDescriptions => {
        return this.unmarshallerXmlToJson.unmarshalString(response);
      })
    );
  }

  /**
   * http://geoprocessing.info/wpsdoc/1x0Execute
   */
  executeProcess(url:string, process: IWpsProcessBrief, processDescription: IWpsProcessDescription, inputs: IWpsDataInputs, responseForm: IWpsResponseForm): Observable<IWpsExecuteResponse> {

    let identifier = process.title[0].value;

    let body = this.generateExecuteProcessBody(processDescription, inputs, responseForm);
    let bodyString = this.marshallerJsonToXml.marshalString(body);

    var wpsQueryParams = {
        service: 'WPS',
        version: '1.0.0',
        request: 'Execute',
        identifier: identifier
    };
    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    return this.http.post(wpsUrl, bodyString, {headers: headers, responseType: 'text'}).pipe(
      map((response) => {
        return this.unmarshallerXmlToJson.unmarshalString(response)
      })
    );
  }


  dismissProcess(url:string) {

  }


  requestStatus(url: string) {

  }


  getExecutionResult(url: string) {

  }


  private generateExecuteProcessBody(processDescription: IWpsProcessDescription, inputs: IWpsDataInputs, responseForm: IWpsResponseForm): IWpsExecuteProcessBody {

    this.ensureInputsSuitProcess(processDescription, inputs);
    this.ensureResponseFormSuitsProcess(processDescription, responseForm);

    let bodyName: IWpsExecuteProcessBodyName = {
      key: "{http://www.opengis.net/wps/1.0.0}Execute",
      localPart: "Execute",
      namespaceURI: "http://www.opengis.net/wps/1.0.0",
      prefix: "wps",
      string: "{http://www.opengis.net/wps/1.0.0}wps:Execute"
    };

    let identifier: IWpsCode;
    if(processDescription.identifier) {
      identifier = processDescription.identifier;
    } else {
      identifier = {
        TYPE_NAME: "wps.CodeType",
        value: processDescription.title[0].value
      };
    }

    let bodyValue: IWpsExecuteProcessBodyValue = {
      TYPE_NAME: "wps.Execute",
      dataInputs: inputs,
      identifier: identifier,
      responseForm: responseForm,
      service: "WPS",
      version: "1.0.0"
    };
    
    let body: IWpsExecuteProcessBody = {
      name: bodyName,
      value: bodyValue
    };

    return body;
  }

  /**
   * This method is not part of the WPS specification.
   * @param processDescription 
   * @param responseForm 
   */
  ensureResponseFormSuitsProcess(processDescription: IWpsProcessDescription, responseForm: IWpsResponseForm) {
    // TODO
  }

  /**
   * This method is not part of the WPS specification.
   * @param processDescription 
   * @param inputs 
   */
  ensureInputsSuitProcess(processDescription: IWpsProcessDescription, inputs: IWpsDataInputs) {
    // TODO
  }

  private objectToUriParameters(obj: Object) : string {
    var query = "?";
    for (var k in obj) {
        query += k + "=" + obj[k] + "&";
    }
    //TODO: uri encode proposed in RFC not working with Django-AS
    query = query.substr(0, query.length - 1);
    return query;
}

}

