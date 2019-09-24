import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability } from "../wps_datatypes";
import { WPSCapabilitiesType } from "./wps_2.0";


export class WpsFactory200 implements WpsMarshaller {

    constructor() {}

    getCapabilitiesUrl(baseurl: string): string {
        return `${baseurl}?service=WPS&request=GetCapabilities&version=2.0.0`;
    }

    executeUrl(baseurl: string, processId: string): string {
        return `${baseurl}?service=WPS&request=Execute&version=2.0.0&identifier=${processId}`;
    }

    unmarshalCapabilities(capabilities: WPSCapabilitiesType): WpsCapability[] {
        const out: WpsCapability[] = [];
        capabilities.contents.processSummary.forEach(summary => {
            out.push({
                id: summary.identifier.value
            });
        });
        return out;
    }

    unmarshalExecuteResponse(responseJson): WpsResult[] {
        throw new Error("Method not implemented.");
        return [];
    }

    marshalExecBody(processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[]) {
        throw new Error("Method not implemented.");
        return null;
    }
}
