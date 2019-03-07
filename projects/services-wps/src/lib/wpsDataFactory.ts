import { IWpsExecuteProcessBodyName, IWpsExecuteProcessBodyValue, IWpsProcessBrief, IWpsProcessDescription, IWpsProcessDescriptionDataInputs, IWpsProcessDescriptionProcessOutputs, IOwsCode, IWpsLanguageString, IWpsInput, IWpsComplexData, IWpsLiteralData, TWpsLiteralDataType, IWpsData, IWpsDataInputs, IWpsResponseForm, IWpsExecuteProcessBody } from "@ukis/datatypes-wps";


/**
 * The Wps-datatypes can be very verbose. This factory tries to make it easier to create Wps-data.
 */
export class WpsDataFactory {
    
    static createProcessBrief(processId: string, processTitle: string, processVersion: string): IWpsProcessBrief {
        let process: IWpsProcessBrief = {
            TYPE_NAME: "WPS_1_0_0.ProcessBriefType",
            processVersion: processVersion,
            title: [this.createTitleFromString(processTitle)],
            identifier: this.createCodeFromString(processId)
        };
        return process;
    }

    static createCodeFromString(str: string) {
        let code: IOwsCode = {
            TYPE_NAME: "OWS_1_1_0.CodeType",
            value: str
        };
        return code;
    }

    static createTitleFromString(str: string) {
        let title: IWpsLanguageString = {
            TYPE_NAME: "WPS_1_0_0.LanguageStringType",
            value: str
        };
        return title;
    }

    static createDescription(processTitle: string, processIdentifier: string, processVersion: string, statusSupported: boolean, storeSupported: boolean, dataInpts: IWpsProcessDescriptionDataInputs, processOutputs: IWpsProcessDescriptionProcessOutputs): IWpsProcessDescription {
        let description: IWpsProcessDescription = {
            TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType",
            processVersion: processVersion,
            statusSupported: statusSupported,
            storeSupported: storeSupported, 
            identifier: this.createCodeFromString(processIdentifier),
            title: [this.createTitleFromString(processTitle)],
            dataInputs: dataInpts,
            processOutputs: processOutputs
        }
        return description;
    }


    static createLiteralDataDescription(dataType: TWpsLiteralDataType, defaultValue?): IWpsData {
        let litData: IWpsLiteralData = {
            TYPE_NAME: "WPS_1_0_0.LiteralDataType",
            dataType: dataType
        };
        if(defaultValue) litData.defaultValue = defaultValue;
        let data: IWpsData = {
            TYPE_NAME: "WPS_1_0_0.DataType",
            literalData: litData
        };
        return data;
    }

    static createLiteralInputDescription(inputIdentifier: string, dataType: TWpsLiteralDataType, defaultValue, inputTitle?: string): IWpsInput {
        let input: IWpsInput = {
            TYPE_NAME: "WPS_1_0_0.InputType",
            identifier: this.createCodeFromString(inputIdentifier),
            data: this.createLiteralDataDescription(dataType, defaultValue)
        };
        if(inputTitle) input.title = this.createTitleFromString(inputTitle);
        return input;
    }

    static createInputsDescriptionFromArray(inputArray: IWpsInput[]): any {
        let inputs: IWpsDataInputs = {
            TYPE_NAME: "WPS_1_0_0.DataInputsType",
            input: inputArray
        };
        return inputs;
    }


    static generateExecuteProcessBody(processDescription: IWpsProcessDescription, inputs: IWpsDataInputs, responseForm: IWpsResponseForm): IWpsExecuteProcessBody {
    
        let bodyName: IWpsExecuteProcessBodyName = {
          key: "{http://www.opengis.net/wps/1.0.0}Execute",
          localPart: "Execute",
          namespaceURI: "http://www.opengis.net/wps/1.0.0",
          prefix: "wps",
          string: "{http://www.opengis.net/wps/1.0.0}wps:Execute"
        };
    
        let bodyValue: IWpsExecuteProcessBodyValue = {
          TYPE_NAME: "WPS_1_0_0.Execute",
          dataInputs: inputs,
          identifier: processDescription.identifier,
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
}