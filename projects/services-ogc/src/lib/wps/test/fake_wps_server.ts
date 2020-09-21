export class FakeWpsServer {
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