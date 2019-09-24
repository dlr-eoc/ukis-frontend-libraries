import { TestBed } from '@angular/core/testing';
import { WpsClient } from './wpsclient';
import { HttpClient, HttpXhrBackend, XhrFactory } from '@angular/common/http';
import { WpsData, WpsDataDescription } from './wps_datatypes';

class MyXhrFactory extends XhrFactory {
    build(): XMLHttpRequest {
        return new XMLHttpRequest();
    }
}

describe(`Testing wps-client version 1 functionality`, () => {

    const httpClient = new HttpClient(new HttpXhrBackend(new MyXhrFactory()));

    it('Wps-client should init correctly', () => {
        const c = new WpsClient('1.0.0', httpClient);
        expect(c).toBeTruthy();
    });


    // it('GetCapabilites should work', (done) => {

    //     const url = 'http://tsunami-wps.awi.de/wps';

    //     const c = new WpsClient('1.0.0', httpClient);

    //     c.getCapabilities(url).subscribe(capabilites => {
    //         console.log('capabilites: ', capabilites)
    //         expect(capabilites.length).toBeGreaterThan(0);
    //         done();
    //     })

    // }, 30000);


    // it('executeAsync should work', (done) => {

    //     const url = 'http://tsunami-wps.awi.de/wps';

    //     const processId = 'get_scenario';

    //     const lat: WpsData = {
    //         description: {
    //             id: 'lat',
    //             reference: false,
    //             type: 'literal'
    //         },
    //         value: -32.6045
    //     };

    //     const lon: WpsData = {
    //         description: {
    //             id: 'lon',
    //             reference: false,
    //             type: 'literal'
    //         },
    //         value: -72.4619
    //     };

    //     const mag: WpsData = {
    //         description: {
    //             id: 'mag',
    //             reference: false,
    //             type: 'literal'
    //         },
    //         value: 6.95
    //     };

    //     const inputs = [lat, lon, mag];


    //     const outputDescription: WpsDataDescription = {
    //         id: 'epiCenter',
    //         reference: false,
    //         format: 'application/WMS',
    //         type: 'literal',
    //     };


    //     const c = new WpsClient('1.0.0', httpClient);

    //     c.executeAsync(url, processId, inputs, [outputDescription], 500).subscribe(resultList => {
    //         console.log('output tsunamp:', resultList);
    //         expect(resultList.length).toBeGreaterThan(0);
    //         done();
    //     });

    // }, 30000);



    // it('executeAsync: 2nd test', (done) => {

    //     const url = 'https://riesgos.52north.org/wps/WebProcessingService';

    //     const processId = 'org.n52.wps.python.algorithm.ShakemapProcess';

    //     const selectedEq: WpsData = {
    //         description: {
    //             id: 'quakeml-input',
    //             format: 'application/vnd.geo+json',
    //             reference: false,
    //             type: 'complex',
    //         },
    //         value: `{'type':'Feature','geometry':{'type':'Point','coordinates':[-72.4619,-32.6045]},'properties':{'preferredOriginID':'34053','preferredMagnitudeID':'34053','type':'earthquake','description.text':'stochastic','origin.publicID':'34053','origin.time.value':'0761-01-01T00:00:00.000000Z','origin.time.uncertainty':'nan','origin.depth.value':'21.77998','origin.depth.uncertainty':'nan','origin.creationInfo.value':'GFZ','originUncertainty.horizontalUncertainty':'nan','originUncertainty.minHorizontalUncertainty':'nan','originUncertainty.maxHorizontalUncertainty':'nan','originUncertainty.azimuthMaxHorizontalUncertainty':'nan','magnitude.publicID':'34053','magnitude.mag.value':'6.95','magnitude.mag.uncertainty':'nan','magnitude.type':'MW','magnitude.creationInfo.value':'GFZ','focalMechanism.publicID':'34053','focalMechanism.nodalPlanes.nodalPlane1.strike.value':'8.735077','focalMechanism.nodalPlanes.nodalPlane1.strike.uncertainty':'nan','focalMechanism.nodalPlanes.nodalPlane1.dip.value':'27.27001','focalMechanism.nodalPlanes.nodalPlane1.dip.uncertainty':'nan','focalMechanism.nodalPlanes.nodalPlane1.rake.value':'90.0','focalMechanism.nodalPlanes.nodalPlane1.rake.uncertainty':'nan','focalMechanism.nodalPlanes.preferredPlane':'nodalPlane1'},'id':'34053'}`
    //     }
        
        
    //     const outputDescription: WpsDataDescription = {
    //         id: 'shakemap-output',
    //         type: 'complex',
    //         reference: false,
    //         format: 'application/WMS'
    //     }

    //     let c = new WpsClient('1.0.0', httpClient);

    //     c.executeAsync(url, processId, [selectedEq], outputDescription, 500).subscribe(resultList => {
    //         console.log('output shakemap: ', resultList);
    //         expect(resultList.length).toBeGreaterThan(0);
    //         done();
    //     });

    // }, 30000);

});