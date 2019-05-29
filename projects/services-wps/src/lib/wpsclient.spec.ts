import { WpsClient } from "./wpsclient";
import { HttpClient, HttpXhrBackend, XhrFactory } from "@angular/common/http";

class MyXhrFactory extends XhrFactory {
    build(): XMLHttpRequest {
        return new XMLHttpRequest();
    }
}

describe(`Testing wps-client version 1 functionality`, () => {

    let httpClient = new HttpClient(new HttpXhrBackend(new MyXhrFactory()));

    it("Wps-client should init correctly", () => {
        let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0", httpClient);
        expect(c).toBeTruthy();
    });


    // it("getCapabilities should work", (done) => {
    //     let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0", httpClient);
    //     c.getCapabilities().subscribe(list => {
    //         expect(list.length).toBeGreaterThan(0);
    //         done();
    //     });
    // });


    // it("describeProcess should work", (done) => {
    //     done()
    // })

    // it("executeAsync should work", (done) => {
    //     let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0", httpClient);
    //     let algId = "org.n52.wps.python.algorithm.QuakeMLProcess";
    //     let inputs: WpsInput[] = [
    //         { type: "literal", reference: false, id: "lonmin", data: 282, format: "double" },
    //         { type: "literal", reference: false, id: "lonmax", data: 292, format: "double" },
    //         { type: "literal", reference: false, id: "latmin", data: -70, format: "double" },
    //         { type: "literal", reference: false, id: "latmax", data: -10, format: "double" },
    //         { type: "literal", reference: false, id: "mmin", data: 6.6, format: "double" },
    //         { type: "literal", reference: false, id: "mmax", data: 8.5, format: "double" },
    //         { type: "literal", reference: false, id: "zmin", data: 5, format: "double" },
    //         { type: "literal", reference: false, id: "zmax", data: 140, format: "double" },
    //         { type: "literal", reference: false, id: "p", data: 0.1, format: "double" },
    //         { type: "literal", reference: false, id: "etype", data: "deaggregation", format: "string" },
    //         { type: "literal", reference: false, id: "tlon", data: -71.5730623712764, format: "double" },
    //         { type: "literal", reference: false, id: "tlat", data: -33.1299174879672, format: "double" }
    //     ];
    //     let output: WpsOutput = {
    //         type: "complex",
    //         id: "selected-rows",
    //         format: "application/vnd.geo+json",
    //         reference: false
    //     };
    //     c.executeAsync(algId, inputs, output, 500).subscribe(list => {
    //         expect(list.length).toBeGreaterThan(0);
    //         done();
    //     });
    // }, 30000);


    // it("execute should work", (done) => {
    //     let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0", httpClient);
    //     let algId = "org.n52.wps.python.algorithm.QuakeMLProcess";
    //     let inputs: WpsInput[] = [
    //         { type: "literal", reference: false, id: "lonmin", data: 282, format: "double" },
    //         { type: "literal", reference: false, id: "lonmax", data: 292, format: "double" },
    //         { type: "literal", reference: false, id: "latmin", data: -70, format: "double" },
    //         { type: "literal", reference: false, id: "latmax", data: -10, format: "double" },
    //         { type: "literal", reference: false, id: "mmin", data: 6.6, format: "double" },
    //         { type: "literal", reference: false, id: "mmax", data: 8.5, format: "double" },
    //         { type: "literal", reference: false, id: "zmin", data: 5, format: "double" },
    //         { type: "literal", reference: false, id: "zmax", data: 140, format: "double" },
    //         { type: "literal", reference: false, id: "p", data: 0.1, format: "double" },
    //         { type: "literal", reference: false, id: "etype", data: "deaggregation", format: "string" },
    //         { type: "literal", reference: false, id: "tlon", data: -71.5730623712764, format: "double" },
    //         { type: "literal", reference: false, id: "tlat", data: -33.1299174879672, format: "double" }
    //     ];
    //     let output: WpsOutput = {
    //         type: "complex",
    //         id: "selected-rows",
    //         format: "application/vnd.geo+json",
    //         reference: false
    //     };
    //     c.execute(algId, inputs, output).subscribe(list => {
    //         expect(list.length).toBeGreaterThan(0);
    //         done();
    //     });
    // }, 30000);


});


// {
//     version: "2.0.0",
//     url: "http://tsunami-riesgos.awi.de:8080/wps/WebProcessingService"
// }
// https://riesgos.52north.org/wps/WebProcessingService
// http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService