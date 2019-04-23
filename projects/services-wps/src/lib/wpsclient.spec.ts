import { WpsClient } from "./wpsclient";
import { WpsVerion, WpsInput, WpsOutputDescription, WpsLiteralInput, WpsComplexOutputDescription } from "./wps_marshaller";



describe(`Testing wps-client version 1 functionality`, () => {

    it("Wps-client should init correctly", () =>  {
        let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0");
        expect(c).toBeTruthy();
    });
    

    it("getCapabilities should work", (done) => {
        let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0");
        c.getCapabilities().subscribe(list => {
            expect(list.length).toBeGreaterThan(0);
            done();
        });
    });


    it("describeProcess should work", (done) => {
        done()
    })


    it("execute should work", (done) => {
        let c = new WpsClient("https://riesgos.52north.org/wps/WebProcessingService", "1.0.0");
        let algId = "org.n52.wps.python.algorithm.QuakeMLProcess";
        let inputs: WpsLiteralInput[] = [
            { type: "literal", id: "lonmin", data: 282,                 datatype: "double"},
            { type: "literal", id: "lonmax", data: 292,                 datatype: "double"},
            { type: "literal", id: "latmin", data: -70,                 datatype: "double"},
            { type: "literal", id: "latmax", data: -10,                 datatype: "double"},
            { type: "literal", id: "mmin",   data: 6.6,                 datatype: "double"},
            { type: "literal", id: "mmax",   data: 8.5,                 datatype: "double"},
            { type: "literal", id: "zmin",   data: 5,                   datatype: "double"},
            { type: "literal", id: "zmax",   data: 140,                 datatype: "double"},
            { type: "literal", id: "p",      data: 0.1,                 datatype: "double"},
            { type: "literal", id: "etype",  data: "deaggregation",     datatype: "string"},
            { type: "literal", id: "tlon",   data: -71.5730623712764,   datatype: "double"},
            { type: "literal", id: "tlat",   data: -33.1299174879672,   datatype: "double"}
        ];
        let output: WpsComplexOutputDescription = {
            type: "complex",
            id: "selected-rows", 
            outputFormat: "application/vnd.geo+json"
        };
        c.execute(algId, inputs, output).subscribe(list => {
            expect(list.length).toBeGreaterThan(0);
            done();
        });
    }, 30000);

    it("getStatus should work", (done) => {
        done()
    })

    it("dismiss should work", (done) => {
        done()
    })

});


// {
//     version: "2.0.0",
//     url: "http://tsunami-riesgos.awi.de:8080/wps/WebProcessingService"
// }
// https://riesgos.52north.org/wps/WebProcessingService
// http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService