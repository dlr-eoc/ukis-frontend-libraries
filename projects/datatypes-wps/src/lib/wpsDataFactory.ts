import { IWpsExecuteProcessBodyName, IWpsExecuteProcessBodyValue, IWpsProcessBrief, IWpsProcessDescription, IWpsProcessDescriptionDataInputs, IWpsProcessDescriptionProcessOutputs, IOwsCode, IOwsLanguageString, IWpsInput, IWpsComplexData, IWpsLiteralData, TWpsLiteralDataType, IWpsData, IWpsDataInputs, IWpsResponseForm, IWpsExecuteProcessBody, IWpsOutputDescription, IWpsSupportedComplexData, TMimeType, IWpsComplexDataCombination, IWpsComplexDataCombinations, IWpsComplexDataDescription, IWpsInputDescription, IWpsLiteralInput, IWpsResponseFormDoc, IWpsLiteralInputDescription, IWpsComplexInputDescription, IWpsSupportedComplexDataInput } from "./datatypes-wps";


/**
 * The Wps-datatypes can be very verbose. This factory tries to make it easier to create Wps-data.
 */
export class WpsDataFactory {

    /****************************************************************************
     *              DATA DESCRIPTION
     ****************************************************************************/

     /**
     * TODO:
     *  input.ValuesReference
        input.allowedValues
        input.anyValue
     */
    static literalInput(defaultValue?, dataType? : TWpsLiteralDataType): IWpsLiteralInput {
        let input: IWpsLiteralInput = {
            TYPE_NAME: "WPS_1_0_0.LiteralInputType"
        };
        if(defaultValue) input.defaultValue = defaultValue;
        if(dataType) input.dataType = {TYPE_NAME: "OWS_1_1_0.DomainMetadataType", value: dataType};
        return input;
    }

    static literalInputDescription(inputIdentifier: string, inputTitle: string, literalInput: IWpsLiteralInput, minOccurs: number = 1,  maxOccurs: number = 1): IWpsLiteralInputDescription {
        let description: IWpsLiteralInputDescription = {
            TYPE_NAME: "WPS_1_0_0.InputDescriptionType",
            identifier: this.codeFromString(inputIdentifier),
            title: this.titleFromString(inputTitle),
            minOccurs: minOccurs,
            maxOccurs: maxOccurs,
            literalData: literalInput
        };
        return description;
    }

    static complexInput(mimeType: TMimeType, schema?: string, encoding?: string): IWpsSupportedComplexDataInput {
        let defaultFormat: IWpsComplexDataDescription = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataDescriptionType",
            mimeType: mimeType,
            schema: schema,
            encoding: encoding
        };
        let deflt: IWpsComplexDataCombination = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationType",
            format: defaultFormat
        };
        let options: IWpsComplexDataCombinations = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationsType",
            format: [defaultFormat]
        };
        let input: IWpsSupportedComplexDataInput = {
            TYPE_NAME: "WPS_1_0_0.SupportedComplexDataInputType",
            supported: options,
            _default: deflt
        };
        return input;
    }

    static complexInputDescription(inputIdentifier: string, inputTitle: string, complexInput: IWpsSupportedComplexDataInput, minOccurs: number = 1,  maxOccurs: number = 1): IWpsComplexInputDescription {
        let description: IWpsComplexInputDescription = {
            TYPE_NAME: "WPS_1_0_0.InputDescriptionType",
            identifier: this.codeFromString(inputIdentifier),
            title: this.titleFromString(inputTitle),
            minOccurs: minOccurs,
            maxOccurs: maxOccurs,
            complexData: complexInput
        }
        return description;
    }

    static bboxInputDescription(): IWpsBbox

    static inputsDescriptionFromArray(inputArray: IWpsInputDescription[]): IWpsProcessDescriptionDataInputs {
        let inputs: IWpsProcessDescriptionDataInputs = {
            TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.DataInputs",
            input: inputArray
        };
        return inputs;
    }

    static complexDataDescription(mimeType: TMimeType, schema?: string, encoding?: string): IWpsComplexDataDescription {
        let description: IWpsComplexDataDescription = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataDescriptionType",
            mimeType: mimeType
        }
        if(encoding) description.encoding = encoding;
        if(schema) description.schema = schema;
        return description;
    }

    static complexDataCombination(description: IWpsComplexDataDescription): IWpsComplexDataCombination {
        let comb: IWpsComplexDataCombination = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationType",
            format: description
        };
        return comb;
    }

    static complexDataCombinationsFromArray(descriptions: IWpsComplexDataDescription[]): IWpsComplexDataCombinations {
        let combs: IWpsComplexDataCombinations = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationsType",
            format: descriptions
        };
        return combs;
    }

    static processDescriptionComplexProcessOutputs(outputId: string, outputTitle: string, supported: IWpsComplexDataCombinations,  defaultValue: IWpsComplexDataCombination): IWpsProcessDescriptionProcessOutputs {
        let complexData: IWpsSupportedComplexData = {
            TYPE_NAME: "WPS_1_0_0.SupportedComplexDataType",
            supported: supported,
            _default: defaultValue
        };
        let output: IWpsOutputDescription = {
            TYPE_NAME: "WPS_1_0_0.OutputDescriptionType",
            title: [this.titleFromString(outputTitle)],
            identifier: this.codeFromString(outputId),
            complexOutput: complexData
        };
        let description: IWpsProcessDescriptionProcessOutputs = {
            TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.ProcessOutputs",
            output: [output]
        }; 
        return description;
    }

    static description(processTitle: string, processIdentifier: string, processVersion: string, statusSupported: boolean, storeSupported: boolean, dataInpts: IWpsProcessDescriptionDataInputs, processOutputs: IWpsProcessDescriptionProcessOutputs): IWpsProcessDescription {
        let description: IWpsProcessDescription = {
            TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType",
            processVersion: processVersion,
            statusSupported: statusSupported,
            storeSupported: storeSupported, 
            identifier: this.codeFromString(processIdentifier),
            title: [this.titleFromString(processTitle)],
            dataInputs: dataInpts,
            processOutputs: processOutputs
        }
        return description;
    }


    static documentResponseForm(processDescriptionOutputId: string, asReference: boolean, mimeType?: TMimeType, schema?: string, encoding?: string): IWpsResponseForm {
        let form: IWpsResponseFormDoc = {
            TYPE_NAME: "WPS_1_0_0.ResponseFormType",
            responseDocument: {
                TYPE_NAME: "WPS_1_0_0.ResponseDocumentType",
                output: [{
                    TYPE_NAME: "WPS_1_0_0.DocumentOutputDefinitionType",
                    identifier: this.codeFromString(processDescriptionOutputId),
                    asReference: asReference, 
                    mimeType: mimeType,
                    schema: schema, 
                    encoding: encoding
                }]
            }
        };
        return form;
    }

    static getSingleInputDescription(inputId: string, description: IWpsProcessDescription): IWpsInputDescription {
        return description.dataInputs.input.find(inpt => inpt.identifier.value == inputId);
    }

    /****************************************************************************
     *              ACTUAL DATA
     ****************************************************************************/

    static literalData(dataType: TWpsLiteralDataType, value: string): IWpsData {
        let literalData: IWpsLiteralData = {
            TYPE_NAME: "WPS_1_0_0.LiteralDataType",
            dataType: dataType,
            value: value
        };
        let data: IWpsData = {
            TYPE_NAME: "WPS_1_0_0.DataType",
            literalData: literalData
        };      
        return data;
    }

    static complexData(mimeType: TMimeType, content: any, otherAttributes?: any): IWpsData {
        let complexData: IWpsComplexData = {
            TYPE_NAME: "WPS_1_0_0.ComplexDataType",
            content: content,
            mimeType: mimeType
        };
        if(otherAttributes) complexData.otherAttributes = otherAttributes;
        let data: IWpsData = {
            TYPE_NAME: "WPS_1_0_0.DataType",
            complexData: complexData
        };      
        return data;
    }

    static input(inputId: string, data?: IWpsData): IWpsInput {
        let input: IWpsInput = {
            TYPE_NAME: "WPS_1_0_0.InputType",
            identifier: this.codeFromString(inputId)
        };
        if(data) input.data = data;
        return input; 
    }
  
    static dataInputsFromArray(inputArr: IWpsInput[]): IWpsDataInputs {
        let inputs: IWpsDataInputs = {
            TYPE_NAME: "WPS_1_0_0.DataInputsType",
            input: inputArr
        };
        return inputs;
    }

    

    /****************************************************************************
     *              MISC
     ****************************************************************************/

    static processBrief(processId: string, processTitle: string, processVersion: string): IWpsProcessBrief {
        let process: IWpsProcessBrief = {
            TYPE_NAME: "WPS_1_0_0.ProcessBriefType",
            processVersion: processVersion,
            title: [this.titleFromString(processTitle)],
            identifier: this.codeFromString(processId)
        };
        return process;
    }

    static codeFromString(str: string) {
        let code: IOwsCode = {
            TYPE_NAME: "OWS_1_1_0.CodeType",
            value: str
        };
        return code;
    }

    static titleFromString(str: string) {
        let title: IOwsLanguageString = {
            TYPE_NAME: "OWS_1_1_0.LanguageStringType",
            value: str
        };
        return title;
    }


    static executeProcessBody(processDescription: IWpsProcessDescription, inputs: IWpsDataInputs, responseForm: IWpsResponseForm): IWpsExecuteProcessBody {
    
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