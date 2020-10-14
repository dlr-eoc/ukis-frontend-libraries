import { WpsVersion } from '../wps_datatypes';

export class FakeWpsServer {

    creaExecuteAsyncResultResponse(version: WpsVersion): string  {
        switch (version) {
            case '1.0.0':
                return this.createExecuteResponse100();
            case '2.0.0':
                throw new Error("Method not implemented.");
        }
    }

    creaExecuteAsyncResponse(version: WpsVersion): string {
        switch (version) {
            case '1.0.0':
                return this.creaExecuteAsyncResponse100();
            case '2.0.0':
                return this.creaExecuteAsyncResponse200();
        }
    }

    creaExecuteAsyncResponse200(): string {
        return `
        <wps:StatusInfo xmlns:wps="http://www.opengis.net/wps/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/2.0 http://schemas.opengis.net/wps/2.0/wps.xsd">
            <wps:JobID>f05413a9-06ba-4229-a779-1d80de338992</wps:JobID>
            <wps:Status>Accepted</wps:Status>
        </wps:StatusInfo>`;
    }

    creaExecuteAsyncResponse100(): string {
        return `
        <wps:ExecuteResponse xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/1.1" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" serviceInstance="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?REQUEST=GetCapabilities&amp;SERVICE=WPS" xml:lang="en-US" service="WPS" version="1.0.0" statusLocation="http://rz-vm140.gfz-potsdam.de:80/wps/RetrieveResultServlet?id=7593c54d-8284-4074-be9d-31449487cbb6">
            <wps:Process wps:processVersion="1.0.0">
                <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ModelpropProcess</ows:Identifier>
                <ows:Title>ModelpropProcess</ows:Title>
            </wps:Process>
            <wps:Status creationTime="2020-10-02T14:37:50.966Z">
                <wps:ProcessAccepted>Process Accepted</wps:ProcessAccepted>
            </wps:Status>
        </wps:ExecuteResponse>`;
    }

    createExecuteResponse(version: WpsVersion): string {
        switch (version) {
            case '1.0.0':
                return this.createExecuteResponse100();
            case '2.0.0':
                return this.createExecuteResponse200();
        }
    }

    createExecuteResponse200(): string {
        return `
        <wps:Result xmlns:wps="http://www.opengis.net/wps/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlin="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/2.0 http://schemas.opengis.net/wps/2.0/wps.xsd">
        <wps:JobID>d2eb1498-9d79-4813-a0b0-ed559e430efc</wps:JobID>
        <wps:Output id="shakemap-output">
            <wps:Reference mimeType="application/WMS" xlin:href="https://riesgos.52north.org/wps/RetrieveResultServlet?id=d2eb1498-9d79-4813-a0b0-ed559e430efcshakemap-output.b6150f5e-4ded-4eaa-81c1-c1ab5d14d009"/>
        </wps:Output>
    </wps:Result>`;
    }

    createExecuteResponse100(): string {
        return `
        <wps:ExecuteResponse xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/1.1" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" serviceInstance="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?REQUEST=GetCapabilities&amp;SERVICE=WPS" xml:lang="en-US" service="WPS" version="1.0.0">
            <wps:Process wps:processVersion="1.0.0">
                <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeledgerProcess</ows:Identifier>
                <ows:Title>QuakeledgerProcess</ows:Title>
            </wps:Process>
            <wps:Status creationTime="2020-10-02T14:30:02.162Z">
                <wps:ProcessSucceeded>Process successful</wps:ProcessSucceeded>
            </wps:Status>
            <wps:ProcessOutputs>
                <wps:Output>
                    <ows:Identifier>selectedRows</ows:Identifier>
                    <ows:Title>selectedRows</ows:Title>
                    <wps:Data>
                        <wps:ComplexData encoding="UTF-8" mimeType="application/vnd.geo+json">{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.4418,-32.3742]},"properties":{"publicID":"quakeml:quakeledger\/80674884","preferredOriginID":"quakeml:quakeledger\/80674884","preferredMagnitudeID":"quakeml:quakeledger\/80674884","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674884","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"12.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674884","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674884","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674884"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.5308,-32.8178]},"properties":{"publicID":"quakeml:quakeledger\/80674885","preferredOriginID":"quakeml:quakeledger\/80674885","preferredMagnitudeID":"quakeml:quakeledger\/80674885","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674885","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"12.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674885","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674885","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674885"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2966,-32.3935]},"properties":{"publicID":"quakeml:quakeledger\/80674903","preferredOriginID":"quakeml:quakeledger\/80674903","preferredMagnitudeID":"quakeml:quakeledger\/80674903","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674903","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"17.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674903","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674903","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674903"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.3848,-32.8371]},"properties":{"publicID":"quakeml:quakeledger\/80674904","preferredOriginID":"quakeml:quakeledger\/80674904","preferredMagnitudeID":"quakeml:quakeledger\/80674904","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674904","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"17.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674904","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674904","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674904"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1513,-32.4128]},"properties":{"publicID":"quakeml:quakeledger\/80674922","preferredOriginID":"quakeml:quakeledger\/80674922","preferredMagnitudeID":"quakeml:quakeledger\/80674922","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674922","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"22.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674922","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674922","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674922"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2388,-32.8564]},"properties":{"publicID":"quakeml:quakeledger\/80674923","preferredOriginID":"quakeml:quakeledger\/80674923","preferredMagnitudeID":"quakeml:quakeledger\/80674923","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674923","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"22.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674923","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674923","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674923"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.0059,-32.4321]},"properties":{"publicID":"quakeml:quakeledger\/80674941","preferredOriginID":"quakeml:quakeledger\/80674941","preferredMagnitudeID":"quakeml:quakeledger\/80674941","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674941","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"27.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674941","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674941","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674941"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.0927,-32.8757]},"properties":{"publicID":"quakeml:quakeledger\/80674942","preferredOriginID":"quakeml:quakeledger\/80674942","preferredMagnitudeID":"quakeml:quakeledger\/80674942","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674942","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"27.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674942","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674942","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674942"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.7754,-32.0078]},"properties":{"publicID":"quakeml:quakeledger\/80674959","preferredOriginID":"quakeml:quakeledger\/80674959","preferredMagnitudeID":"quakeml:quakeledger\/80674959","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674959","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"32.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674959","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674959","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674959"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8605,-32.4514]},"properties":{"publicID":"quakeml:quakeledger\/80674960","preferredOriginID":"quakeml:quakeledger\/80674960","preferredMagnitudeID":"quakeml:quakeledger\/80674960","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674960","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"32.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674960","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674960","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674960"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.9465,-32.895]},"properties":{"publicID":"quakeml:quakeledger\/80674961","preferredOriginID":"quakeml:quakeledger\/80674961","preferredMagnitudeID":"quakeml:quakeledger\/80674961","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674961","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"32.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674961","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674961","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674961"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.6306,-32.0271]},"properties":{"publicID":"quakeml:quakeledger\/80674978","preferredOriginID":"quakeml:quakeledger\/80674978","preferredMagnitudeID":"quakeml:quakeledger\/80674978","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674978","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"37.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674978","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674978","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674978"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.715,-32.4707]},"properties":{"publicID":"quakeml:quakeledger\/80674979","preferredOriginID":"quakeml:quakeledger\/80674979","preferredMagnitudeID":"quakeml:quakeledger\/80674979","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674979","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"37.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674979","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674979","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674979"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8004,-32.9143]},"properties":{"publicID":"quakeml:quakeledger\/80674980","preferredOriginID":"quakeml:quakeledger\/80674980","preferredMagnitudeID":"quakeml:quakeledger\/80674980","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674980","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"37.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674980","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674980","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674980"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.4857,-32.0464]},"properties":{"publicID":"quakeml:quakeledger\/80674997","preferredOriginID":"quakeml:quakeledger\/80674997","preferredMagnitudeID":"quakeml:quakeledger\/80674997","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674997","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"42.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674997","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674997","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674997"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.5695,-32.49]},"properties":{"publicID":"quakeml:quakeledger\/80674998","preferredOriginID":"quakeml:quakeledger\/80674998","preferredMagnitudeID":"quakeml:quakeledger\/80674998","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674998","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"42.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674998","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674998","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674998"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.6541,-32.9336]},"properties":{"publicID":"quakeml:quakeledger\/80674999","preferredOriginID":"quakeml:quakeledger\/80674999","preferredMagnitudeID":"quakeml:quakeledger\/80674999","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80674999","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"42.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80674999","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80674999","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80674999"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.3408,-32.0657]},"properties":{"publicID":"quakeml:quakeledger\/80675016","preferredOriginID":"quakeml:quakeledger\/80675016","preferredMagnitudeID":"quakeml:quakeledger\/80675016","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80675016","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"47.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80675016","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80675016","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80675016"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.4238,-32.5093]},"properties":{"publicID":"quakeml:quakeledger\/80675017","preferredOriginID":"quakeml:quakeledger\/80675017","preferredMagnitudeID":"quakeml:quakeledger\/80675017","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80675017","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"47.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80675017","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80675017","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80675017"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.5077,-32.9529]},"properties":{"publicID":"quakeml:quakeledger\/80675018","preferredOriginID":"quakeml:quakeledger\/80675018","preferredMagnitudeID":"quakeml:quakeledger\/80675018","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80675018","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"47.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80675018","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80675018","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80675018"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.3869,-32.6458]},"properties":{"publicID":"quakeml:quakeledger\/80697115","preferredOriginID":"quakeml:quakeledger\/80697115","preferredMagnitudeID":"quakeml:quakeledger\/80697115","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80697115","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"16.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80697115","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80697115","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80697115"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2409,-32.6651]},"properties":{"publicID":"quakeml:quakeledger\/80697134","preferredOriginID":"quakeml:quakeledger\/80697134","preferredMagnitudeID":"quakeml:quakeledger\/80697134","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80697134","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"21.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80697134","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80697134","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80697134"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.6564,-32.7423]},"properties":{"publicID":"quakeml:quakeledger\/80697210","preferredOriginID":"quakeml:quakeledger\/80697210","preferredMagnitudeID":"quakeml:quakeledger\/80697210","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80697210","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"41.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80697210","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80697210","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80697210"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2564,-32.2902]},"properties":{"publicID":"quakeml:quakeledger\/80741575","preferredOriginID":"quakeml:quakeledger\/80741575","preferredMagnitudeID":"quakeml:quakeledger\/80741575","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741575","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"18.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741575","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741575","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741575"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1103,-32.3095]},"properties":{"publicID":"quakeml:quakeledger\/80741594","preferredOriginID":"quakeml:quakeledger\/80741594","preferredMagnitudeID":"quakeml:quakeledger\/80741594","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741594","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"23.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741594","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741594","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741594"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.9643,-32.3288]},"properties":{"publicID":"quakeml:quakeledger\/80741613","preferredOriginID":"quakeml:quakeledger\/80741613","preferredMagnitudeID":"quakeml:quakeledger\/80741613","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741613","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"28.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741613","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741613","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741613"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8181,-32.3481]},"properties":{"publicID":"quakeml:quakeledger\/80741632","preferredOriginID":"quakeml:quakeledger\/80741632","preferredMagnitudeID":"quakeml:quakeledger\/80741632","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741632","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"33.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741632","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741632","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741632"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.6719,-32.3674]},"properties":{"publicID":"quakeml:quakeledger\/80741651","preferredOriginID":"quakeml:quakeledger\/80741651","preferredMagnitudeID":"quakeml:quakeledger\/80741651","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741651","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"38.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741651","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741651","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741651"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.5257,-32.3867]},"properties":{"publicID":"quakeml:quakeledger\/80741670","preferredOriginID":"quakeml:quakeledger\/80741670","preferredMagnitudeID":"quakeml:quakeledger\/80741670","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741670","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"43.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741670","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741670","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741670"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.3793,-32.406]},"properties":{"publicID":"quakeml:quakeledger\/80741689","preferredOriginID":"quakeml:quakeledger\/80741689","preferredMagnitudeID":"quakeml:quakeledger\/80741689","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741689","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"48.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741689","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741689","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741689"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.2329,-32.4253]},"properties":{"publicID":"quakeml:quakeledger\/80741708","preferredOriginID":"quakeml:quakeledger\/80741708","preferredMagnitudeID":"quakeml:quakeledger\/80741708","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80741708","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"53.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80741708","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80741708","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80741708"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2533,-32.4361]},"properties":{"publicID":"quakeml:quakeledger\/80763805","preferredOriginID":"quakeml:quakeledger\/80763805","preferredMagnitudeID":"quakeml:quakeledger\/80763805","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80763805","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"19.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80763805","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80763805","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80763805"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1073,-32.4554]},"properties":{"publicID":"quakeml:quakeledger\/80763824","preferredOriginID":"quakeml:quakeledger\/80763824","preferredMagnitudeID":"quakeml:quakeledger\/80763824","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80763824","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"24.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80763824","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80763824","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80763824"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8752,-32.0311]},"properties":{"publicID":"quakeml:quakeledger\/80763842","preferredOriginID":"quakeml:quakeledger\/80763842","preferredMagnitudeID":"quakeml:quakeledger\/80763842","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80763842","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"29.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80763842","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80763842","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80763842"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8151,-32.494]},"properties":{"publicID":"quakeml:quakeledger\/80763862","preferredOriginID":"quakeml:quakeledger\/80763862","preferredMagnitudeID":"quakeml:quakeledger\/80763862","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80763862","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"34.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80763862","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80763862","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80763862"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.5842,-32.0697]},"properties":{"publicID":"quakeml:quakeledger\/80763880","preferredOriginID":"quakeml:quakeledger\/80763880","preferredMagnitudeID":"quakeml:quakeledger\/80763880","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80763880","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"39.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80763880","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80763880","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80763880"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.4496,-33.5083]},"properties":{"publicID":"quakeml:quakeledger\/80924453","preferredOriginID":"quakeml:quakeledger\/80924453","preferredMagnitudeID":"quakeml:quakeledger\/80924453","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924453","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"12.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924453","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924453","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924453"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.3124,-33.5575]},"properties":{"publicID":"quakeml:quakeledger\/80924461","preferredOriginID":"quakeml:quakeledger\/80924461","preferredMagnitudeID":"quakeml:quakeledger\/80924461","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924461","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"17.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924461","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924461","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924461"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1751,-33.6067]},"properties":{"publicID":"quakeml:quakeledger\/80924469","preferredOriginID":"quakeml:quakeledger\/80924469","preferredMagnitudeID":"quakeml:quakeledger\/80924469","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924469","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"22.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924469","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924469","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924469"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.0377,-33.6559]},"properties":{"publicID":"quakeml:quakeledger\/80924477","preferredOriginID":"quakeml:quakeledger\/80924477","preferredMagnitudeID":"quakeml:quakeledger\/80924477","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924477","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"27.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924477","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924477","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924477"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.9001,-33.7051]},"properties":{"publicID":"quakeml:quakeledger\/80924485","preferredOriginID":"quakeml:quakeledger\/80924485","preferredMagnitudeID":"quakeml:quakeledger\/80924485","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924485","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"32.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924485","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924485","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924485"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.7623,-33.7543]},"properties":{"publicID":"quakeml:quakeledger\/80924493","preferredOriginID":"quakeml:quakeledger\/80924493","preferredMagnitudeID":"quakeml:quakeledger\/80924493","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924493","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"37.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924493","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924493","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924493"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.6244,-33.8035]},"properties":{"publicID":"quakeml:quakeledger\/80924501","preferredOriginID":"quakeml:quakeledger\/80924501","preferredMagnitudeID":"quakeml:quakeledger\/80924501","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924501","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"42.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924501","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924501","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924501"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.4863,-33.8527]},"properties":{"publicID":"quakeml:quakeledger\/80924509","preferredOriginID":"quakeml:quakeledger\/80924509","preferredMagnitudeID":"quakeml:quakeledger\/80924509","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80924509","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"47.7","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80924509","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80924509","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80924509"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.2573,-33.3718]},"properties":{"publicID":"quakeml:quakeledger\/80933813","preferredOriginID":"quakeml:quakeledger\/80933813","preferredMagnitudeID":"quakeml:quakeledger\/80933813","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80933813","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"16.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80933813","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80933813","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80933813"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1201,-33.421]},"properties":{"publicID":"quakeml:quakeledger\/80933821","preferredOriginID":"quakeml:quakeledger\/80933821","preferredMagnitudeID":"quakeml:quakeledger\/80933821","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80933821","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"21.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80933821","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80933821","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80933821"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.9827,-33.4702]},"properties":{"publicID":"quakeml:quakeledger\/80933829","preferredOriginID":"quakeml:quakeledger\/80933829","preferredMagnitudeID":"quakeml:quakeledger\/80933829","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/80933829","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"26.4","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/80933829","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/80933829","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"23.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/80933829"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.258,-32.8592]},"properties":{"publicID":"quakeml:quakeledger\/81705295","preferredOriginID":"quakeml:quakeledger\/81705295","preferredMagnitudeID":"quakeml:quakeledger\/81705295","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/81705295","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"19.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/81705295","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/81705295","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"6.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/81705295"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.9629,-32.8871]},"properties":{"publicID":"quakeml:quakeledger\/81705297","preferredOriginID":"quakeml:quakeledger\/81705297","preferredMagnitudeID":"quakeml:quakeledger\/81705297","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/81705297","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"29.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/81705297","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/81705297","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"6.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/81705297"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-71.8152,-32.9011]},"properties":{"publicID":"quakeml:quakeledger\/81705298","preferredOriginID":"quakeml:quakeledger\/81705298","preferredMagnitudeID":"quakeml:quakeledger\/81705298","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/81705298","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"34.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/81705298","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/81705298","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"6.5","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/81705298"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.107,-32.455]},"properties":{"publicID":"quakeml:quakeledger\/82100023","preferredOriginID":"quakeml:quakeledger\/82100023","preferredMagnitudeID":"quakeml:quakeledger\/82100023","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/82100023","origin.time.value":"2019-01-01T00:00:00.000000Z","origin.depth.value":"24.5","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/82100023","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/82100023","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"20.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/82100023"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.0675,-32.2127]},"properties":{"publicID":"quakeml:quakeledger\/90000114","preferredOriginID":"quakeml:quakeledger\/90000114","preferredMagnitudeID":"quakeml:quakeledger\/90000114","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/90000114","origin.time.value":"2018-01-01T00:00:00.000000Z","origin.depth.value":"28.0","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/90000114","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/90000114","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"18.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/90000114"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.1558,-32.6563]},"properties":{"publicID":"quakeml:quakeledger\/90000115","preferredOriginID":"quakeml:quakeledger\/90000115","preferredMagnitudeID":"quakeml:quakeledger\/90000115","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/90000115","origin.time.value":"2018-01-01T00:00:00.000000Z","origin.depth.value":"28.0","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/90000115","magnitude.mag.value":"8.0","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/90000115","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"18.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/90000115"},{"type":"Feature","geometry":{"type":"Point","coordinates":[-72.0433,-32.2063]},"properties":{"publicID":"quakeml:quakeledger\/90000121","preferredOriginID":"quakeml:quakeledger\/90000121","preferredMagnitudeID":"quakeml:quakeledger\/90000121","type":"earthquake","description.text":"expert","origin.publicID":"quakeml:quakeledger\/90000121","origin.time.value":"2018-01-01T00:00:00.000000Z","origin.depth.value":"32.0","origin.creationInfo.value":"GFZ","magnitude.publicID":"quakeml:quakeledger\/90000121","magnitude.mag.value":"8.5","magnitude.type":"MW","magnitude.creationInfo.value":"GFZ","focalMechanism.publicID":"quakeml:quakeledger\/90000121","focalMechanism.nodalPlanes.nodalPlane1.strike.value":"9.0","focalMechanism.nodalPlanes.nodalPlane1.dip.value":"18.0","focalMechanism.nodalPlanes.nodalPlane1.rake.value":"90.0","focalMechanism.nodalPlanes.preferredPlane":"nodalPlane1"},"id":"quakeml:quakeledger\/90000121"}]}</wps:ComplexData>
                    </wps:Data>
                </wps:Output>
            </wps:ProcessOutputs>
        </wps:ExecuteResponse>`;
    }

    public createGetCapabilitiesResponse(version: WpsVersion): string {
        switch (version) {
            case '1.0.0':
                return this.createGetCapabilitiesResponse100();
            case '2.0.0':
                return this.createGetCapabilitiesResponse200();
        }
    }

    createGetCapabilitiesResponse200(): string {
        return `
        <wps:Capabilities xmlns:wps="http://www.opengis.net/wps/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/2.0" xmlns:xlin="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/2.0 http://schemas.opengis.net/wps/2.0/wps.xsd" service="WPS" version="2.0.0">
            <ows:ServiceIdentification>
                <ows:Title>52°North WPS 4.0.0-beta.10</ows:Title>
                <ows:Abstract>Service based on the 52°North implementation of WPS 1.0.0</ows:Abstract>
                <ows:Keywords>
                    <ows:Keyword>WPS</ows:Keyword>
                    <ows:Keyword>geospatial</ows:Keyword>
                    <ows:Keyword>geoprocessing</ows:Keyword>
                </ows:Keywords>
                <ows:ServiceType>WPS</ows:ServiceType>
                <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
                <ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion>
                <ows:Fees>NONE</ows:Fees>
                <ows:AccessConstraints>NONE</ows:AccessConstraints>
            </ows:ServiceIdentification>
            <ows:ServiceProvider>
                <ows:ProviderName>52North</ows:ProviderName>
                <ows:ProviderSite xlin:href="http://www.52north.org/"/>
                <ows:ServiceContact>
                    <ows:IndividualName>Your name</ows:IndividualName>
                    <ows:ContactInfo>
                        <ows:Address>
                            <ows:DeliveryPoint/>
                            <ows:City/>
                            <ows:AdministrativeArea/>
                            <ows:PostalCode/>
                            <ows:Country/>
                            <ows:ElectronicMailAddress/>
                        </ows:Address>
                    </ows:ContactInfo>
                </ows:ServiceContact>
            </ows:ServiceProvider>
            <ows:OperationsMetadata>
                <ows:Operation name="GetCapabilities">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="DescribeProcess">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="Execute">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Post xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="GetStatus">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="GetResult">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
            </ows:OperationsMetadata>
            <ows:Languages>
                <ows:Language>en-US</ows:Language>
            </ows:Languages>
            <wps:Contents>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute" outputTransmission="value reference">
                    <ows:Title>R Annotation Validation</ows:Title>
                    <ows:Identifier>org.n52.wps.server.algorithm.r.AnnotationValidation</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.wps.server.algorithm.r.AnnotationValidation"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>ShakemapTransformationProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>ShakygroundProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakygroundProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakygroundProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>QuakeledgerProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeledgerProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeledgerProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedVolcanusProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedVolcanusProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedVolcanusProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>QuakeMLTransformationProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeMLTransformationProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeMLTransformationProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>ShakemapCacheReader</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakemapCacheReader</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakemapCacheReader"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>QuakeMLCacheReader</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeMLCacheReader</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeMLCacheReader"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>VolcanusProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.VolcanusProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.VolcanusProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedAssetmasterProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedAssetmasterProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedAssetmasterProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedOldAssetmasterProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedOldAssetmasterProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedOldAssetmasterProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedModelpropProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedModelpropProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedModelpropProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>JSONCacheReader</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.JSONCacheReader</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.JSONCacheReader"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedShakygroundProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedShakygroundProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedShakygroundProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedFlooddamageProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedFlooddamageProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedFlooddamageProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>OldAssetmasterProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.OldAssetmasterProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.OldAssetmasterProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>FlooddamageProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.FlooddamageProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.FlooddamageProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>AssetmasterProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.AssetmasterProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.AssetmasterProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>NrmlTransformationProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.NrmlTransformationProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.NrmlTransformationProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedDeusProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedDeusProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedDeusProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>CachedQuakeledgerProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedQuakeledgerProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedQuakeledgerProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>ModelpropProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ModelpropProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ModelpropProcess"/>
                </wps:ProcessSummary>
                <wps:ProcessSummary processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                    <ows:Title>DeusProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.DeusProcess</ows:Identifier>
                    <ows:Metadata xlin:role="Process description" xlin:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=2.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.DeusProcess"/>
                </wps:ProcessSummary>
            </wps:Contents>
        </wps:Capabilities>
        `;
    }

    createGetCapabilitiesResponse100(): string {
        return `
        <wps:Capabilities xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WPS" version="1.0.0" xml:lang="en-US" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsGetCapabilities_response.xsd" updateSequence="1">
            <ows:ServiceIdentification>
                <ows:Title>52°North WPS 4.0.0-beta.10</ows:Title>
                <ows:Abstract>Service based on the 52°North implementation of WPS 1.0.0</ows:Abstract>
                <ows:Keywords>
                    <ows:Keyword>WPS</ows:Keyword>
                    <ows:Keyword>geospatial</ows:Keyword>
                    <ows:Keyword>geoprocessing</ows:Keyword>
                </ows:Keywords>
                <ows:ServiceType>WPS</ows:ServiceType>
                <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
                <ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion>
                <ows:Fees>NONE</ows:Fees>
                <ows:AccessConstraints>NONE</ows:AccessConstraints>
            </ows:ServiceIdentification>
            <ows:ServiceProvider>
                <ows:ProviderName>52North</ows:ProviderName>
                <ows:ProviderSite xlink:href="http://www.52north.org/"/>
                <ows:ServiceContact>
                    <ows:IndividualName>Your name</ows:IndividualName>
                    <ows:PositionName>Your position</ows:PositionName>
                    <ows:ContactInfo>
                        <ows:Phone>
                            <ows:Voice/>
                            <ows:Facsimile/>
                        </ows:Phone>
                        <ows:Address>
                            <ows:DeliveryPoint/>
                            <ows:City/>
                            <ows:AdministrativeArea/>
                            <ows:PostalCode/>
                            <ows:Country/>
                            <ows:ElectronicMailAddress/>
                        </ows:Address>
                    </ows:ContactInfo>
                </ows:ServiceContact>
            </ows:ServiceProvider>
            <ows:OperationsMetadata>
                <ows:Operation name="GetCapabilities">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="DescribeProcess">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Operation name="Execute">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?"/>
                            <ows:Post xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
            </ows:OperationsMetadata>
            <wps:ProcessOfferings>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.wps.server.algorithm.r.AnnotationValidation</ows:Identifier>
                    <ows:Title>R Annotation Validation</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.wps.server.algorithm.r.AnnotationValidation"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess</ows:Identifier>
                    <ows:Title>ShakemapTransformationProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakygroundProcess</ows:Identifier>
                    <ows:Title>ShakygroundProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakygroundProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeledgerProcess</ows:Identifier>
                    <ows:Title>QuakeledgerProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeledgerProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedVolcanusProcess</ows:Identifier>
                    <ows:Title>CachedVolcanusProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedVolcanusProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeMLTransformationProcess</ows:Identifier>
                    <ows:Title>QuakeMLTransformationProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeMLTransformationProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakemapCacheReader</ows:Identifier>
                    <ows:Title>ShakemapCacheReader</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakemapCacheReader"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.QuakeMLCacheReader</ows:Identifier>
                    <ows:Title>QuakeMLCacheReader</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.QuakeMLCacheReader"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.VolcanusProcess</ows:Identifier>
                    <ows:Title>VolcanusProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.VolcanusProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedAssetmasterProcess</ows:Identifier>
                    <ows:Title>CachedAssetmasterProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedAssetmasterProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedOldAssetmasterProcess</ows:Identifier>
                    <ows:Title>CachedOldAssetmasterProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedOldAssetmasterProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedModelpropProcess</ows:Identifier>
                    <ows:Title>CachedModelpropProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedModelpropProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.JSONCacheReader</ows:Identifier>
                    <ows:Title>JSONCacheReader</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.JSONCacheReader"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedShakygroundProcess</ows:Identifier>
                    <ows:Title>CachedShakygroundProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedShakygroundProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedFlooddamageProcess</ows:Identifier>
                    <ows:Title>CachedFlooddamageProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedFlooddamageProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.OldAssetmasterProcess</ows:Identifier>
                    <ows:Title>OldAssetmasterProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.OldAssetmasterProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.FlooddamageProcess</ows:Identifier>
                    <ows:Title>FlooddamageProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.FlooddamageProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.AssetmasterProcess</ows:Identifier>
                    <ows:Title>AssetmasterProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.AssetmasterProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.NrmlTransformationProcess</ows:Identifier>
                    <ows:Title>NrmlTransformationProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.NrmlTransformationProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedDeusProcess</ows:Identifier>
                    <ows:Title>CachedDeusProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedDeusProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.CachedQuakeledgerProcess</ows:Identifier>
                    <ows:Title>CachedQuakeledgerProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.CachedQuakeledgerProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ModelpropProcess</ows:Identifier>
                    <ows:Title>ModelpropProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ModelpropProcess"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.DeusProcess</ows:Identifier>
                    <ows:Title>DeusProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.DeusProcess"/>
                </wps:Process>
            </wps:ProcessOfferings>
            <wps:Languages>
                <wps:Default>
                    <ows:Language>en-US</ows:Language>
                </wps:Default>
                <wps:Supported>
                    <ows:Language>en-US</ows:Language>
                </wps:Supported>
            </wps:Languages>
        </wps:Capabilities>`;
    }


    public createDescribeProcessResponse(version: WpsVersion) {
        switch (version) {
            case '1.0.0':
                return this.createDescribeProcessResponse100();
            case '2.0.0':
                return this.createDescribeProcessResponse200();
        }
    }

    public createDescribeProcessResponse100() {
        return `
        <wps:ProcessDescriptions xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/1.1" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsDescribeProcess_response.xsd" xml:lang="en-US" service="WPS" version="1.0.0">
            <ProcessDescription statusSupported="true" storeSupported="true" wps:processVersion="1.0.0">
                <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.DeusProcess</ows:Identifier>
                <ows:Title>DeusProcess</ows:Title>
                <DataInputs>
                    <Input minOccurs="1" maxOccurs="1">
                        <ows:Identifier>intensity</ows:Identifier>
                        <ows:Title>intensity</ows:Title>
                        <ComplexData>
                            <Default>
                                <Format>
                                    <MimeType>text/xml</MimeType>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>text/xml</MimeType>
                                </Format>
                                <Format>
                                    <MimeType>text/xml; subtype=gml/2.1.2</MimeType>
                                    <Schema>http://schemas.opengis.net/gml/2.1.2/feature.xsd</Schema>
                                </Format>
                            </Supported>
                        </ComplexData>
                    </Input>
                    <Input minOccurs="1" maxOccurs="1">
                        <ows:Identifier>exposure</ows:Identifier>
                        <ows:Title>exposure</ows:Title>
                        <ComplexData>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexData>
                    </Input>
                    <Input minOccurs="1" maxOccurs="1">
                        <ows:Identifier>schema</ows:Identifier>
                        <ows:Title>schema</ows:Title>
                        <LiteralData>
                            <ows:DataType ows:reference="xs:string"/>
                            <ows:AnyValue/>
                        </LiteralData>
                    </Input>
                    <Input minOccurs="1" maxOccurs="1">
                        <ows:Identifier>fragility</ows:Identifier>
                        <ows:Title>fragility</ows:Title>
                        <ComplexData>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexData>
                    </Input>
                </DataInputs>
                <ProcessOutputs>
                    <Output>
                        <ows:Identifier>updated_exposure</ows:Identifier>
                        <ows:Title>updated_exposure</ows:Title>
                        <ComplexOutput>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexOutput>
                    </Output>
                    <Output>
                        <ows:Identifier>transition</ows:Identifier>
                        <ows:Title>transition</ows:Title>
                        <ComplexOutput>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexOutput>
                    </Output>
                    <Output>
                        <ows:Identifier>damage</ows:Identifier>
                        <ows:Title>damage</ows:Title>
                        <ComplexOutput>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexOutput>
                    </Output>
                    <Output>
                        <ows:Identifier>merged_output</ows:Identifier>
                        <ows:Title>merged_output</ows:Title>
                        <ComplexOutput>
                            <Default>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Default>
                            <Supported>
                                <Format>
                                    <MimeType>application/json</MimeType>
                                    <Encoding>UTF-8</Encoding>
                                </Format>
                            </Supported>
                        </ComplexOutput>
                    </Output>
                </ProcessOutputs>
            </ProcessDescription>
        </wps:ProcessDescriptions>`;
    }

    public createDescribeProcessResponse200() {
        return `
        <wps:ProcessOfferings xmlns:wps="http://www.opengis.net/wps/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/2.0" xsi:schemaLocation="http://www.opengis.net/wps/2.0 http://schemas.opengis.net/wps/2.0/wps.xsd">
            <wps:ProcessOffering processVersion="1.0.0" jobControlOptions="sync-execute async-execute" outputTransmission="value reference">
                <wps:Process>
                    <ows:Title>DeusProcess</ows:Title>
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.DeusProcess</ows:Identifier>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>input-boundingbox</ows:Title>
                        <ows:Abstract>bounding box for spatial search</ows:Abstract>
                        <ows:Identifier>input-boundingbox</ows:Identifier>
                        <wps:BoundingBoxData>
                            <wps:Format mimeType="text/xml" default="true"/>
                            <wps:SupportedCRS default="true">EPSG:4326</wps:SupportedCRS>
                            <wps:SupportedCRS>EPSG:4328</wps:SupportedCRS>
                        </wps:BoundingBoxData>
                    </wps:Input>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>mmin</ows:Title>
                        <ows:Abstract>minimum magnitude</ows:Abstract>
                        <ows:Identifier>mmin</ows:Identifier>
                        <wps:LiteralData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="text/plain"/>
                            <ns:Format mimeType="text/xml"/>
                            <LiteralDataDomain>
                                <ows:AnyValue/>
                                <ows:DataType ows:reference="xs:double"/>
                                <ows:DefaultValue>6.6</ows:DefaultValue>
                            </LiteralDataDomain>
                        </wps:LiteralData>
                    </wps:Input>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>intensity</ows:Title>
                        <ows:Identifier>intensity</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="text/xml"/>
                            <ns:Format mimeType="text/xml; subtype=gml/2.1.2" schema="http://schemas.opengis.net/gml/2.1.2/feature.xsd"/>
                        </wps:ComplexData>
                    </wps:Input>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>exposure</ows:Title>
                        <ows:Identifier>exposure</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Input>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>schema</ows:Title>
                        <ows:Identifier>schema</ows:Identifier>
                        <wps:LiteralData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="text/plain"/>
                            <ns:Format mimeType="text/xml"/>
                            <LiteralDataDomain>
                                <ows:AnyValue/>
                                <ows:DataType ows:reference="xs:string"/>
                            </LiteralDataDomain>
                        </wps:LiteralData>
                    </wps:Input>
                    <wps:Input minOccurs="1" maxOccurs="1">
                        <ows:Title>fragility</ows:Title>
                        <ows:Identifier>fragility</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Input>
                    <wps:Output>
                        <ows:Title>updated_exposure</ows:Title>
                        <ows:Identifier>updated_exposure</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Output>
                    <wps:Output>
                        <ows:Title>transition</ows:Title>
                        <ows:Identifier>transition</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Output>
                    <wps:Output>
                        <ows:Title>damage</ows:Title>
                        <ows:Identifier>damage</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Output>
                    <wps:Output>
                        <ows:Title>merged_output</ows:Title>
                        <ows:Identifier>merged_output</ows:Identifier>
                        <wps:ComplexData xmlns:ns="http://www.opengis.net/wps/2.0">
                            <ns:Format default="true" mimeType="application/json" encoding="UTF-8"/>
                        </wps:ComplexData>
                    </wps:Output>
                </wps:Process>
            </wps:ProcessOffering>
        </wps:ProcessOfferings>`;
    }

    public createRequestAcceptedResponse(serverUrl: string, pId: string): string {
        const currentStateUrl = `${serverUrl}?retrieveState`;
        return `
          <wps:ExecuteResponse
              xmlns:wps='http://www.opengis.net/wps/1.0.0'
              xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
              xmlns:ows='http://www.opengis.net/ows/1.1'
              xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
              serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
              xml:lang='en-US'
              service='WPS'
              version='1.0.0'
              statusLocation='${currentStateUrl}'>
              <wps:Process wps:processVersion='1.0.0'>
              <ows:Identifier>${pId}</ows:Identifier>
              </wps:Process>
              <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
              <wps:ProcessAccepted>Process Accepted</wps:ProcessAccepted>
              </wps:Status>
              </wps:ExecuteResponse>
              `;
    }

    public createWaitResponse(serverUrl: string, pId: string): string {
    const currentStateUrl = `${serverUrl}?retrieveState`;
    return `
        <wps:ExecuteResponse
            xmlns:wps='http://www.opengis.net/wps/1.0.0'
            xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
            xmlns:ows='http://www.opengis.net/ows/1.1'
            xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
            serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
            xml:lang='en-US'
            service='WPS'
            version='1.0.0'
            statusLocation='${currentStateUrl}'>
            <wps:Process wps:processVersion='1.0.0'>
                <ows:Identifier>${pId}</ows:Identifier>
            </wps:Process>
            <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
                <wps:ProcessStarted percentCompleted='0'/>
            </wps:Status>
        </wps:ExecuteResponse>
        `;
    }

    public createSuccessResponse(serverUrl: string, pId: string, outputId: string): string {
    const currentStateUrl = `${serverUrl}?retrieveState`;
    const resultUrl = `${serverUrl}?retrieveResult`;
    return `
        <wps:ExecuteResponse
            xmlns:wps='http://www.opengis.net/wps/1.0.0'
            xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
            xmlns:ows='http://www.opengis.net/ows/1.1'
            xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
            serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
            xml:lang='en-US'
            service='WPS'
            version='1.0.0'
            statusLocation='${currentStateUrl}'>
            <wps:Process wps:processVersion='1.0.0'>
                <ows:Identifier>${pId}</ows:Identifier>
            </wps:Process>
            <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
                <wps:ProcessSucceeded>Process successful</wps:ProcessSucceeded>
            </wps:Status>
            <wps:ProcessOutputs>
                <wps:Output>
                    <ows:Identifier>${outputId}</ows:Identifier>
                    <wps:Reference
                        encoding='UTF-8' mimeType='text/xml'
                        href='${resultUrl}'/>
                </wps:Output>
            </wps:ProcessOutputs>
        </wps:ExecuteResponse>
    `;
    }
}