export class FakeCswServer {
    public getCapabilities(body): string {
        return `
        <csw30:Capabilities xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:csw30="http://www.opengis.net/cat/csw/3.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:fes20="http://www.opengis.net/fes/2.0" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0" xmlns:inspire_ds="http://inspire.ec.europa.eu/schemas/inspire_ds/1.0" xmlns:ows="http://www.opengis.net/ows" xmlns:ows11="http://www.opengis.net/ows/1.1" xmlns:ows20="http://www.opengis.net/ows/2.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" updateSequence="1596168017" version="3.0.0" xsi:schemaLocation="http://www.opengis.net/cat/csw/3.0 http://schemas.opengis.net/cat/csw/3.0/cswGetCapabilities.xsd">
            <ows20:ServiceIdentification>
                <ows20:Title>CSW interface for catalog.data.gov</ows20:Title>
                <ows20:Abstract>This catalog contains metadata for all first-order data, services, and applications harvested from registered metadata collections with data.gov. Data may be referenced from federal, state, local, tribal, academic, commercial, or non-profit organizations.</ows20:Abstract>
                <ows20:Keywords>
                    <ows20:Keyword>earth science</ows20:Keyword>
                    <ows20:Keyword>oceans</ows20:Keyword>
                    <ows20:Keyword>noaa</ows20:Keyword>
                    <ows20:Keyword>u.s. department of commerce</ows20:Keyword>
                    <ows20:Keyword>nesdis</ows20:Keyword>
                    <ows20:Keyword>doc/noaa/nesdis/ncei</ows20:Keyword>
                    <ows20:Keyword>national centers for environmental information</ows20:Keyword>
                    <ows20:Keyword>ocean</ows20:Keyword>
                    <ows20:Keyword>bathymetry/seafloor topography</ows20:Keyword>
                    <ows20:Keyword>water depth</ows20:Keyword>
                    <ows20:Keyword>water temperature</ows20:Keyword>
                    <ows20:Keyword>ocean temperature</ows20:Keyword>
                    <ows20:Keyword>oceanography</ows20:Keyword>
                    <ows20:Keyword>national oceanographic data center</ows20:Keyword>
                    <ows20:Keyword>doc/noaa/nesdis/nodc</ows20:Keyword>
                    <ows20:Keyword>ships</ows20:Keyword>
                    <ows20:Keyword>united states of america</ows20:Keyword>
                    <ows20:Keyword>bathymetry</ows20:Keyword>
                    <ows20:Keyword>north america</ows20:Keyword>
                    <ows20:Keyword>in situ ocean-based platforms</ows20:Keyword>
                    <ows20:Type codeSpace="ISOTC211/19115">theme</ows20:Type>
                </ows20:Keywords>
                <ows20:ServiceType codeSpace="OGC">CSW</ows20:ServiceType>
                <ows20:ServiceTypeVersion>2.0.2</ows20:ServiceTypeVersion>
                <ows20:ServiceTypeVersion>3.0.0</ows20:ServiceTypeVersion>
                <ows20:Profile>http://www.opengis.net/cat/csw/apiso/1.0</ows20:Profile>
                <ows20:Fees>None</ows20:Fees>
                <ows20:AccessConstraints>None</ows20:AccessConstraints>
            </ows20:ServiceIdentification>
            <ows20:ServiceProvider>
                <ows20:ProviderName>U.S. General Services Administration</ows20:ProviderName>
                <ows20:ProviderSite xlink:type="simple" xlink:href="https://www.gsa.gov" />
                <ows20:ServiceContact>
                    <ows20:IndividualName>Data.gov Administrator</ows20:IndividualName>
                    <ows20:PositionName>Data.gov Site Administrator</ows20:PositionName>
                    <ows20:ContactInfo>
                        <ows20:Phone>
                            <ows20:Voice>(800)-488-3111</ows20:Voice>
                            <ows20:Facsimile>DSN 465-1416</ows20:Facsimile>
                        </ows20:Phone>
                        <ows20:Address>
                            <ows20:DeliveryPoint>1800 F St NW</ows20:DeliveryPoint>
                            <ows20:City>Washington</ows20:City>
                            <ows20:AdministrativeArea>DC</ows20:AdministrativeArea>
                            <ows20:PostalCode>20405</ows20:PostalCode>
                            <ows20:Country>USA</ows20:Country>
                            <ows20:ElectronicMailAddress>datagov@gsa.gov</ows20:ElectronicMailAddress>
                        </ows20:Address>
                        <ows20:OnlineResource xlink:type="simple" xlink:href="https://data.gov/contact" />
                        <ows20:HoursOfService>9:00am - 4:30pm ET</ows20:HoursOfService>
                        <ows20:ContactInstructions>Preferred method through email datagov@gsa.gov or contact URL https://data.gov/contact</ows20:ContactInstructions>
                    </ows20:ContactInfo>
                    <ows20:Role codeSpace="ISOTC211/19115">publisher,custodian</ows20:Role>
                </ows20:ServiceContact>
            </ows20:ServiceProvider>
            <ows20:OperationsMetadata>
                <ows20:Operation name="GetCapabilities">
                    <ows20:DCP>
                        <ows20:HTTP>
                            <ows20:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                            <ows20:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                        </ows20:HTTP>
                    </ows20:DCP>
                    <ows20:Parameter name="acceptFormats">
                        <ows20:AllowedValues>
                            <ows20:Value>application/xml</ows20:Value>
                            <ows20:Value>text/xml</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="acceptVersions">
                        <ows20:AllowedValues>
                            <ows20:Value>2.0.2</ows20:Value>
                            <ows20:Value>3.0.0</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="sections">
                        <ows20:AllowedValues>
                            <ows20:Value>All</ows20:Value>
                            <ows20:Value>Filter_Capabilities</ows20:Value>
                            <ows20:Value>OperationsMetadata</ows20:Value>
                            <ows20:Value>ServiceIdentification</ows20:Value>
                            <ows20:Value>ServiceProvider</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                </ows20:Operation>
                <ows20:Operation name="GetDomain">
                    <ows20:DCP>
                        <ows20:HTTP>
                            <ows20:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                            <ows20:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                        </ows20:HTTP>
                    </ows20:DCP>
                    <ows20:Parameter name="ParameterName">
                        <ows20:AllowedValues>
                            <ows20:Value>GetCapabilities.acceptFormats</ows20:Value>
                            <ows20:Value>GetCapabilities.acceptVersions</ows20:Value>
                            <ows20:Value>GetCapabilities.sections</ows20:Value>
                            <ows20:Value>GetRecordById.ElementSetName</ows20:Value>
                            <ows20:Value>GetRecordById.outputFormat</ows20:Value>
                            <ows20:Value>GetRecordById.outputSchema</ows20:Value>
                            <ows20:Value>GetRecords.CONSTRAINTLANGUAGE</ows20:Value>
                            <ows20:Value>GetRecords.ElementSetName</ows20:Value>
                            <ows20:Value>GetRecords.outputFormat</ows20:Value>
                            <ows20:Value>GetRecords.outputSchema</ows20:Value>
                            <ows20:Value>GetRecords.typeNames</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                </ows20:Operation>
                <ows20:Operation name="GetRecords">
                    <ows20:DCP>
                        <ows20:HTTP>
                            <ows20:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                            <ows20:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                        </ows20:HTTP>
                    </ows20:DCP>
                    <ows20:Parameter name="CONSTRAINTLANGUAGE">
                        <ows20:AllowedValues>
                            <ows20:Value>CQL_TEXT</ows20:Value>
                            <ows20:Value>FILTER</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="ElementSetName">
                        <ows20:AllowedValues>
                            <ows20:Value>brief</ows20:Value>
                            <ows20:Value>full</ows20:Value>
                            <ows20:Value>summary</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="outputFormat">
                        <ows20:AllowedValues>
                            <ows20:Value>application/atom+xml</ows20:Value>
                            <ows20:Value>application/json</ows20:Value>
                            <ows20:Value>application/xml</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="outputSchema">
                        <ows20:AllowedValues>
                            <ows20:Value>http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/</ows20:Value>
                            <ows20:Value>http://www.interlis.ch/INTERLIS2.3</ows20:Value>
                            <ows20:Value>http://www.isotc211.org/2005/gmd</ows20:Value>
                            <ows20:Value>http://www.opengis.net/cat/csw/3.0</ows20:Value>
                            <ows20:Value>http://www.opengis.net/cat/csw/csdgm</ows20:Value>
                            <ows20:Value>http://www.w3.org/2005/Atom</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="typeNames">
                        <ows20:AllowedValues>
                            <ows20:Value>csw30:Record</ows20:Value>
                            <ows20:Value>csw:Record</ows20:Value>
                            <ows20:Value>gmd:MD_Metadata</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Constraint name="AdditionalQueryables">
                        <ows20:AllowedValues>
                            <ows20:Value>apiso:AccessConstraints</ows20:Value>
                            <ows20:Value>apiso:Classification</ows20:Value>
                            <ows20:Value>apiso:ConditionApplyingToAccessAndUse</ows20:Value>
                            <ows20:Value>apiso:Contributor</ows20:Value>
                            <ows20:Value>apiso:Creator</ows20:Value>
                            <ows20:Value>apiso:Degree</ows20:Value>
                            <ows20:Value>apiso:Lineage</ows20:Value>
                            <ows20:Value>apiso:OtherConstraints</ows20:Value>
                            <ows20:Value>apiso:Publisher</ows20:Value>
                            <ows20:Value>apiso:Relation</ows20:Value>
                            <ows20:Value>apiso:ResponsiblePartyRole</ows20:Value>
                            <ows20:Value>apiso:SpecificationDate</ows20:Value>
                            <ows20:Value>apiso:SpecificationDateType</ows20:Value>
                            <ows20:Value>apiso:SpecificationTitle</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Constraint>
                    <ows20:Constraint name="SupportedISOQueryables">
                        <ows20:AllowedValues>
                            <ows20:Value>apiso:Abstract</ows20:Value>
                            <ows20:Value>apiso:AlternateTitle</ows20:Value>
                            <ows20:Value>apiso:AnyText</ows20:Value>
                            <ows20:Value>apiso:BoundingBox</ows20:Value>
                            <ows20:Value>apiso:CRS</ows20:Value>
                            <ows20:Value>apiso:CouplingType</ows20:Value>
                            <ows20:Value>apiso:CreationDate</ows20:Value>
                            <ows20:Value>apiso:Denominator</ows20:Value>
                            <ows20:Value>apiso:DistanceUOM</ows20:Value>
                            <ows20:Value>apiso:DistanceValue</ows20:Value>
                            <ows20:Value>apiso:Format</ows20:Value>
                            <ows20:Value>apiso:GeographicDescriptionCode</ows20:Value>
                            <ows20:Value>apiso:HasSecurityConstraints</ows20:Value>
                            <ows20:Value>apiso:Identifier</ows20:Value>
                            <ows20:Value>apiso:KeywordType</ows20:Value>
                            <ows20:Value>apiso:Language</ows20:Value>
                            <ows20:Value>apiso:Modified</ows20:Value>
                            <ows20:Value>apiso:OperatesOn</ows20:Value>
                            <ows20:Value>apiso:OperatesOnIdentifier</ows20:Value>
                            <ows20:Value>apiso:OperatesOnName</ows20:Value>
                            <ows20:Value>apiso:Operation</ows20:Value>
                            <ows20:Value>apiso:OrganisationName</ows20:Value>
                            <ows20:Value>apiso:ParentIdentifier</ows20:Value>
                            <ows20:Value>apiso:PublicationDate</ows20:Value>
                            <ows20:Value>apiso:ResourceLanguage</ows20:Value>
                            <ows20:Value>apiso:RevisionDate</ows20:Value>
                            <ows20:Value>apiso:ServiceType</ows20:Value>
                            <ows20:Value>apiso:ServiceTypeVersion</ows20:Value>
                            <ows20:Value>apiso:Subject</ows20:Value>
                            <ows20:Value>apiso:TempExtent_begin</ows20:Value>
                            <ows20:Value>apiso:TempExtent_end</ows20:Value>
                            <ows20:Value>apiso:Title</ows20:Value>
                            <ows20:Value>apiso:TopicCategory</ows20:Value>
                            <ows20:Value>apiso:Type</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Constraint>
                    <ows20:Constraint name="MaxRecordDefault">
                        <ows20:AllowedValues>
                            <ows20:Value>500</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Constraint>
                    <ows20:Constraint name="OpenSearchDescriptionDocument">
                        <ows20:AllowedValues>
                            <ows20:Value>https://catalog.data.gov/csw-all?mode=opensearch&amp;service=CSW&amp;version=3.0.0&amp;request=GetCapabilities</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Constraint>
                </ows20:Operation>
                <ows20:Operation name="GetRecordById">
                    <ows20:DCP>
                        <ows20:HTTP>
                            <ows20:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                            <ows20:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                        </ows20:HTTP>
                    </ows20:DCP>
                    <ows20:Parameter name="ElementSetName">
                        <ows20:AllowedValues>
                            <ows20:Value>brief</ows20:Value>
                            <ows20:Value>full</ows20:Value>
                            <ows20:Value>summary</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="outputFormat">
                        <ows20:AllowedValues>
                            <ows20:Value>application/atom+xml</ows20:Value>
                            <ows20:Value>application/json</ows20:Value>
                            <ows20:Value>application/xml</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                    <ows20:Parameter name="outputSchema">
                        <ows20:AllowedValues>
                            <ows20:Value>http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/</ows20:Value>
                            <ows20:Value>http://www.interlis.ch/INTERLIS2.3</ows20:Value>
                            <ows20:Value>http://www.isotc211.org/2005/gmd</ows20:Value>
                            <ows20:Value>http://www.opengis.net/cat/csw/3.0</ows20:Value>
                            <ows20:Value>http://www.opengis.net/cat/csw/csdgm</ows20:Value>
                            <ows20:Value>http://www.w3.org/2005/Atom</ows20:Value>
                        </ows20:AllowedValues>
                    </ows20:Parameter>
                </ows20:Operation>
                <ows20:Operation name="GetRepositoryItem">
                    <ows20:DCP>
                        <ows20:HTTP>
                            <ows20:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all" />
                        </ows20:HTTP>
                    </ows20:DCP>
                </ows20:Operation>
                <ows20:Parameter name="service">
                    <ows20:AllowedValues>
                        <ows20:Value>CSW</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Parameter>
                <ows20:Parameter name="version">
                    <ows20:AllowedValues>
                        <ows20:Value>2.0.2</ows20:Value>
                        <ows20:Value>3.0.0</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Parameter>
                <ows20:Constraint name="CoreQueryables">
                    <ows20:AllowedValues>
                        <ows20:Value>csw:AnyText</ows20:Value>
                        <ows20:Value>dc:contributor</ows20:Value>
                        <ows20:Value>dc:creator</ows20:Value>
                        <ows20:Value>dc:date</ows20:Value>
                        <ows20:Value>dc:format</ows20:Value>
                        <ows20:Value>dc:identifier</ows20:Value>
                        <ows20:Value>dc:language</ows20:Value>
                        <ows20:Value>dc:publisher</ows20:Value>
                        <ows20:Value>dc:relation</ows20:Value>
                        <ows20:Value>dc:rights</ows20:Value>
                        <ows20:Value>dc:source</ows20:Value>
                        <ows20:Value>dc:subject</ows20:Value>
                        <ows20:Value>dc:title</ows20:Value>
                        <ows20:Value>dc:type</ows20:Value>
                        <ows20:Value>dct:abstract</ows20:Value>
                        <ows20:Value>dct:alternative</ows20:Value>
                        <ows20:Value>dct:modified</ows20:Value>
                        <ows20:Value>dct:spatial</ows20:Value>
                        <ows20:Value>ows:BoundingBox</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="MaxRecordDefault">
                    <ows20:AllowedValues>
                        <ows20:Value>500</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="PostEncoding">
                    <ows20:AllowedValues>
                        <ows20:Value>SOAP</ows20:Value>
                        <ows20:Value>XML</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="XPathQueryables">
                    <ows20:AllowedValues>
                        <ows20:Value>allowed</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/CoreQueryables">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/CoreSortables">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/DefaultSortingAlgorithm">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Filter-CQL">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Filter-FES-KVP-Advanced">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Filter-FES-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetCapabilities-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetDomain-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetDomain-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecordById-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecords-Async-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecords-Async-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecords-Basic-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecords-Distributed-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/GetRecords-Distributed-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Async-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Async-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Basic-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Basic-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Periodic-KVP">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Harvest-Periodic-XML">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/OpenSearch">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/SupportedGMLVersions">
                    <ows20:AllowedValues>
                        <ows20:Value>http://www.opengis.net/gml</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <ows20:Constraint name="http://www.opengis.net/spec/csw/3.0/conf/Transaction">
                    <ows20:AllowedValues>
                        <ows20:Value>TRUE</ows20:Value>
                    </ows20:AllowedValues>
                </ows20:Constraint>
                <inspire_ds:ExtendedCapabilities xsi:schemaLocation="http://inspire.ec.europa.eu/schemas/inspire_ds/1.0 http://inspire.ec.europa.eu/schemas/inspire_ds/1.0/inspire_ds.xsd">
                    <inspire_common:ResourceLocator>
                        <inspire_common:URL>https://catalog.data.gov/csw-all?service=CSW&amp;version=2.0.2&amp;request=GetCapabilities</inspire_common:URL>
                        <inspire_common:MediaType>application/xml</inspire_common:MediaType>
                    </inspire_common:ResourceLocator>
                    <inspire_common:ResourceType>service</inspire_common:ResourceType>
                    <inspire_common:TemporalReference>
                        <inspire_common:TemporalExtent>
                            <inspire_common:IntervalOfDates>
                                <inspire_common:StartingDate>YYYY-MM-DD</inspire_common:StartingDate>
                                <inspire_common:EndDate>YYYY-MM-DD</inspire_common:EndDate>
                            </inspire_common:IntervalOfDates>
                        </inspire_common:TemporalExtent>
                    </inspire_common:TemporalReference>
                    <inspire_common:Conformity>
                        <inspire_common:Specification xsi:type="inspire_common:citationInspireInteroperabilityRegulation_eng">
                            <inspire_common:Title>COMMISSION REGULATION (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services</inspire_common:Title>
                            <inspire_common:DateOfPublication>2010-12-08</inspire_common:DateOfPublication>
                            <inspire_common:URI>OJ:L:2010:323:0011:0102:EN:PDF</inspire_common:URI>
                            <inspire_common:ResourceLocator>
                                <inspire_common:URL>http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2010:323:0011:0102:EN:PDF</inspire_common:URL>
                                <inspire_common:MediaType>application/pdf</inspire_common:MediaType>
                            </inspire_common:ResourceLocator>
                        </inspire_common:Specification>
                        <inspire_common:Degree>notEvaluated</inspire_common:Degree>
                    </inspire_common:Conformity>
                    <inspire_common:MetadataPointOfContact>
                        <inspire_common:OrganisationName>Organization Name</inspire_common:OrganisationName>
                        <inspire_common:EmailAddress>Email Address</inspire_common:EmailAddress>
                    </inspire_common:MetadataPointOfContact>
                    <inspire_common:MetadataDate>YYYY-MM-DD</inspire_common:MetadataDate>
                    <inspire_common:SpatialDataServiceType>discovery</inspire_common:SpatialDataServiceType>
                    <inspire_common:MandatoryKeyword xsi:type="inspire_common:classificationOfSpatialDataService">
                        <inspire_common:KeywordValue>infoCatalogueService</inspire_common:KeywordValue>
                    </inspire_common:MandatoryKeyword>
                    <inspire_common:Keyword xsi:type="inspire_common:inspireTheme_eng">
                        <inspire_common:OriginatingControlledVocabulary>
                            <inspire_common:Title>GEMET - INSPIRE themes</inspire_common:Title>
                            <inspire_common:DateOfPublication>2008-06-01</inspire_common:DateOfPublication>
                        </inspire_common:OriginatingControlledVocabulary>
                        <inspire_common:KeywordValue>Utility and governmental services</inspire_common:KeywordValue>
                    </inspire_common:Keyword>
                    <inspire_common:SupportedLanguages>
                        <inspire_common:DefaultLanguage>
                            <inspire_common:Language>eng</inspire_common:Language>
                        </inspire_common:DefaultLanguage>
                        <inspire_common:SupportedLanguage>
                            <inspire_common:Language>eng</inspire_common:Language>
                        </inspire_common:SupportedLanguage>
                        <inspire_common:SupportedLanguage>
                            <inspire_common:Language>gre</inspire_common:Language>
                        </inspire_common:SupportedLanguage>
                    </inspire_common:SupportedLanguages>
                    <inspire_common:ResponseLanguage>
                        <inspire_common:Language>eng</inspire_common:Language>
                    </inspire_common:ResponseLanguage>
                </inspire_ds:ExtendedCapabilities>
            </ows20:OperationsMetadata>
            <ows20:Languages>
                <ows20:Language>en</ows20:Language>
            </ows20:Languages>
            <fes20:Filter_Capabilities>
                <fes20:Conformance>
                    <fes20:Constraint name="ImplementsQuery">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsAdHocQuery">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsFunctions">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsResourceld">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsMinStandardFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsStandardFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsMinSpatialFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsSpatialFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsMinTemporalFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsTemporalFilter">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsVersionNav">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsSorting">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsExtendedOperators">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsMinimumXPath">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                    <fes20:Constraint name="ImplementsSchemaElementFunc">
                        <ows11:NoValues />
                        <ows11:DefaultValue>TRUE</ows11:DefaultValue>
                    </fes20:Constraint>
                </fes20:Conformance>
                <fes20:Id_Capabilities>
                    <fes20:ResourceIdentifier name="csw30:id" />
                </fes20:Id_Capabilities>
                <fes20:Scalar_Capabilities>
                    <fes20:LogicalOperators />
                    <fes20:ComparisonOperators>
                        <fes20:ComparisonOperator name="PropertyIsBetween" />
                        <fes20:ComparisonOperator name="PropertyIsEqualTo" />
                        <fes20:ComparisonOperator name="PropertyIsGreaterThan" />
                        <fes20:ComparisonOperator name="PropertyIsGreaterThanOrEqualTo" />
                        <fes20:ComparisonOperator name="PropertyIsLessThan" />
                        <fes20:ComparisonOperator name="PropertyIsLessThanOrEqualTo" />
                        <fes20:ComparisonOperator name="PropertyIsLike" />
                        <fes20:ComparisonOperator name="PropertyIsNotEqualTo" />
                        <fes20:ComparisonOperator name="PropertyIsNull" />
                    </fes20:ComparisonOperators>
                </fes20:Scalar_Capabilities>
                <fes20:Spatial_Capabilities>
                    <fes20:GeometryOperands>
                        <fes20:GeometryOperand name="gml:Point" />
                        <fes20:GeometryOperand name="gml:LineString" />
                        <fes20:GeometryOperand name="gml:Polygon" />
                        <fes20:GeometryOperand name="gml:Envelope" />
                    </fes20:GeometryOperands>
                    <fes20:SpatialOperators>
                        <fes20:SpatialOperator name="BBOX" />
                        <fes20:SpatialOperator name="Beyond" />
                        <fes20:SpatialOperator name="Contains" />
                        <fes20:SpatialOperator name="Crosses" />
                        <fes20:SpatialOperator name="Disjoint" />
                        <fes20:SpatialOperator name="DWithin" />
                        <fes20:SpatialOperator name="Equals" />
                        <fes20:SpatialOperator name="Intersects" />
                        <fes20:SpatialOperator name="Overlaps" />
                        <fes20:SpatialOperator name="Touches" />
                        <fes20:SpatialOperator name="Within" />
                    </fes20:SpatialOperators>
                </fes20:Spatial_Capabilities>
                <fes20:Functions>
                    <fes20:Function name="length">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                    <fes20:Function name="lower">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                    <fes20:Function name="ltrim">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                    <fes20:Function name="rtrim">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                    <fes20:Function name="trim">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                    <fes20:Function name="upper">
                        <fes20:Returns>xs:string</fes20:Returns>
                    </fes20:Function>
                </fes20:Functions>
            </fes20:Filter_Capabilities>
        </csw30:Capabilities>`;
    }

    public describeRecord(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!-- pycsw 2.4.0 -->
        <csw:DescribeRecordResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
            <csw:SchemaComponent schemaLanguage="XMLSCHEMA" targetNamespace="http://www.opengis.net/cat/csw/2.0.2">
                <xs:schema id="csw-record" targetNamespace="http://www.opengis.net/cat/csw/2.0.2" elementFormDefault="qualified" version="2.0.2 2010-01-22">
                    <xs:annotation>
                        <xs:appinfo>
                            <dc:identifier>http://schemas.opengis.net/csw/2.0.2/record.xsd</dc:identifier>
                        </xs:appinfo>
                        <xs:documentation xml:lang="en">
                 This schema defines the basic record types that must be supported
                 by all CSW implementations. These correspond to full, summary, and
                 brief views based on DCMI metadata terms.
                 
                 CSW is an OGC Standard.
                 Copyright (c) 2004,2010 Open Geospatial Consortium, Inc. All Rights Reserved.
                 To obtain additional rights of use, visit http://www.opengeospatial.org/legal/ .
              </xs:documentation>
                    </xs:annotation>
                    <xs:import namespace="http://purl.org/dc/terms/" schemaLocation="rec-dcterms.xsd"/>
                    <xs:import namespace="http://purl.org/dc/elements/1.1/" schemaLocation="rec-dcmes.xsd"/>
                    <xs:import namespace="http://www.opengis.net/ows" schemaLocation="../../ows/1.0.0/owsAll.xsd"/>
                    <xs:element name="AbstractRecord" id="AbstractRecord" type="csw:AbstractRecordType" abstract="true"/>
                    <xs:complexType name="AbstractRecordType" id="AbstractRecordType" abstract="true"/>
                    <xs:element name="DCMIRecord" type="csw:DCMIRecordType" substitutionGroup="csw:AbstractRecord"/>
                    <xs:complexType name="DCMIRecordType">
                        <xs:annotation>
                            <xs:documentation xml:lang="en">
                    This type encapsulates all of the standard DCMI metadata terms,
                    including the Dublin Core refinements; these terms may be mapped
                    to the profile-specific information model.
                 </xs:documentation>
                        </xs:annotation>
                        <xs:complexContent>
                            <xs:extension base="csw:AbstractRecordType">
                                <xs:sequence>
                                    <xs:group ref="dct:DCMI-terms"/>
                                </xs:sequence>
                            </xs:extension>
                        </xs:complexContent>
                    </xs:complexType>
                    <xs:element name="BriefRecord" type="csw:BriefRecordType" substitutionGroup="csw:AbstractRecord"/>
                    <xs:complexType name="BriefRecordType" final="#all">
                        <xs:annotation>
                            <xs:documentation xml:lang="en">
                    This type defines a brief representation of the common record
                    format.  It extends AbstractRecordType to include only the
                     dc:identifier and dc:type properties.
                 </xs:documentation>
                        </xs:annotation>
                        <xs:complexContent>
                            <xs:extension base="csw:AbstractRecordType">
                                <xs:sequence>
                                    <xs:element ref="dc:identifier" minOccurs="1" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:title" minOccurs="1" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:type" minOccurs="0"/>
                                    <xs:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded"/>
                                </xs:sequence>
                            </xs:extension>
                        </xs:complexContent>
                    </xs:complexType>
                    <xs:element name="SummaryRecord" type="csw:SummaryRecordType" substitutionGroup="csw:AbstractRecord"/>
                    <xs:complexType name="SummaryRecordType" final="#all">
                        <xs:annotation>
                            <xs:documentation xml:lang="en">
                    This type defines a summary representation of the common record
                    format.  It extends AbstractRecordType to include the core
                    properties.
                 </xs:documentation>
                        </xs:annotation>
                        <xs:complexContent>
                            <xs:extension base="csw:AbstractRecordType">
                                <xs:sequence>
                                    <xs:element ref="dc:identifier" minOccurs="1" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:title" minOccurs="1" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:type" minOccurs="0"/>
                                    <xs:element ref="dc:subject" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:format" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="dc:relation" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="dct:modified" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="dct:abstract" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="dct:spatial" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded"/>
                                </xs:sequence>
                            </xs:extension>
                        </xs:complexContent>
                    </xs:complexType>
                    <xs:element name="Record" type="csw:RecordType" substitutionGroup="csw:AbstractRecord"/>
                    <xs:complexType name="RecordType" final="#all">
                        <xs:annotation>
                            <xs:documentation xml:lang="en">
                    This type extends DCMIRecordType to add ows:BoundingBox;
                    it may be used to specify a spatial envelope for the
                    catalogued resource.
                 </xs:documentation>
                        </xs:annotation>
                        <xs:complexContent>
                            <xs:extension base="csw:DCMIRecordType">
                                <xs:sequence>
                                    <xs:element name="AnyText" type="csw:EmptyType" minOccurs="0" maxOccurs="unbounded"/>
                                    <xs:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded"/>
                                </xs:sequence>
                            </xs:extension>
                        </xs:complexContent>
                    </xs:complexType>
                    <xs:complexType name="EmptyType"/>
                </xs:schema>
            </csw:SchemaComponent>
        </csw:DescribeRecordResponse>`;
    }

    public getRecordById(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!-- pycsw 2.4.0 -->
        <csw:GetRecordByIdResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
            <csw:SummaryRecord>
                <dc:identifier>351ae465-7427-4462-aa16-3ee0822c386d</dc:identifier>
                <dc:title>EPA Office of Water (OW): 303(d) Listed Impaired Waters NHDPlus Indexed Dataset</dc:title>
                <dc:type>dataset</dc:type>
                <dc:subject>impaired waters</dc:subject>
                <dc:subject>303d</dc:subject>
                <dc:subject>TMDL</dc:subject>
                <dc:subject>clean water act</dc:subject>
                <dc:subject>National Hydrography Dataset</dc:subject>
                <dc:subject>NHD</dc:subject>
                <dc:subject>NHDPlus</dc:subject>
                <dc:subject>listed waters</dc:subject>
                <dc:subject>shapefile</dc:subject>
                <dc:subject>total maximum daily loads</dc:subject>
                <dc:subject>TMDLs</dc:subject>
                <dc:subject>feature service</dc:subject>
                <dc:subject>CWA</dc:subject>
                <dc:subject>point source</dc:subject>
                <dc:subject>GIS</dc:subject>
                <dc:subject>EPA</dc:subject>
                <dc:subject>Stream</dc:subject>
                <dc:subject>reach</dc:subject>
                <dc:subject>US</dc:subject>
                <dc:subject>National</dc:subject>
                <dc:subject scheme="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_TopicCategoryCode">environment</dc:subject>
                <dct:references scheme="None">http://water.epa.gov/scitech/datait/tools/waters/data/downloads.cfm</dct:references>
                <dct:references scheme="None">https://edg.epa.gov/clipship/</dct:references>
                <dct:references scheme="ESRI:ArcGIS">http://watersgeo.epa.gov/arcgis/rest/services/OWRAD_NP21/303D_NP21/MapServer/</dct:references>
                <dct:references scheme="OGC:WMS">http://watersgeo.epa.gov/arcgis/rest/services/OWRAD_NP21/303D_NP21/MapServer/WMSServer?request=GetCapabilities&amp;service=WMS</dct:references>
                <dct:references scheme="ESRI:ArcGIS">http://watersgeo.epa.gov/ArcGIS/rest/services/OWRAD_NP21/303D_NP21/MapServer?f=json&amp;pretty=true</dct:references>
                <dct:references scheme="ESRI:ArcGIS">http://watersgeo.epa.gov/ArcGIS/services/OWRAD_NP21/303D_NP21/MapServer?wsdl</dct:references>
                <dct:modified>2020-01-24</dct:modified>
                <dct:abstract>The 303(d) Listed Impaired Waters program system provides impaired water data and impaired water features reflecting river segments, lakes, and estuaries designated under Section 303(d) of the Clean Water Act. Each State will establish Total Maximum Daily Loads (TMDLs) for these waters. Note the CWA Section 303(d) list of impaired waters does not represent waters that are impaired but have an EPA-approved TMDL established, impaired waters for which other pollution control mechanisms are in place and expected to attain water quality standards, or waters impaired as a result of pollution and is not caused by a pollutant. Therefore, the "Impaired Waters" layers do not represent all impaired waters reported in a state's Integrated Report, but only the waters comprised of a state's approved 303(d) list. For more information regarding impaired waters refer to EPA's Integrated Reporting Guidance at: http://water.epa.gov/lawsregs/lawsguidance/cwa/tmdl/guidance.cfm. 303(d) waterbodies are coded onto NHDPlus v2.1 flowline and waterbody features to create line, area, and point events. In addition to NHDPlus reach indexed data there may also be custom event data (point, line, or polygon) that are not associated with NHDPlus and are in an EPA standard format that is compatible with EPA's Reach Address Database. These custom features are used to represent locations of 303(d) waterbodies that are not represented well in NHDPlus. R2GIS selected out the Region 2 extent plus a one mile buffer from the National RAD 303d 05/01/2015 SNAPSHOT ESRI file geodatabase. R2GIS created two relationship classes on each of the three R2 RAD 303d SNAPSHOT 20150501 layers ( points, lines and areas). The relationships were built to the attgeo_303dcaussrce and rad_303d_sfid tables from the national RAD 303d 303d SNAPSHOT 20150501 database (selected on R2 extent plus one mile). Information on the attgeo_303dcaussrce table can be found at: 303(d) Listed Impaired Waters by Causes of Impairment and Probable Sources Location: http://www.epa.gov/waters/data/downloads.html#303(d) Listed Impaired Waters Entity Type Label: ATTGEO_303DCAUSSRCE Entity Type Definition: 303D Program Attributes Entity Type Definition Source: EPA ATTAINS. The rad_303d_sfid table provides information on the Start Date, Cycle Year, Event Count, Load Date, Update Date and area and length of features. Users should understand that the 05/01/2015 RAD 303d snapshot was made up of 303d reporting for the 2012 Cycle for NY, the 2010 cycle for NJ, mostly the 2012 cycle for PR and the 2012 cycle for VI. Since the one mile buffer used in the selection operation included hydrological features from CT, VT and PA, the Integrated Reporting cycles for this data ranges from 2002 (for PA) to 2012 for CT and VT.</dct:abstract>
                <ows:BoundingBox crs="urn:x-ogc:def:crs:EPSG:6.11:4326" dimensions="2">
                    <ows:LowerCorner>16.74 -94.04</ows:LowerCorner>
                    <ows:UpperCorner>45.03 -62.19</ows:UpperCorner>
                </ows:BoundingBox>
            </csw:SummaryRecord>
            <csw:SummaryRecord>
                <dc:identifier>f470a3d5-f5cb-4209-93a6-c974f7d5a0a4</dc:identifier>
                <dc:title>City of Pittsburgh Signalized Intersections</dc:title>
                <dc:type>dataset</dc:type>
                <dc:subject>_etl</dc:subject>
                <dc:subject>etl</dc:subject>
                <dc:subject>intersection</dc:subject>
                <dc:subject>lights</dc:subject>
                <dc:subject>signals</dc:subject>
                <dc:subject>traffic</dc:subject>
                <dct:modified>2018-01-08T16:45:21.603943</dct:modified>
                <dct:abstract>Signalized intersections operated and maintained by the City of Pittsburgh's Department of Public Works</dct:abstract>
            </csw:SummaryRecord>
        </csw:GetRecordByIdResponse>`;
    }

    public getRecordsBrief(body): string {
        return `
        <?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SearchStatus timestamp="2020-07-31T14:02:09" />
          <csw:SearchResults numberOfRecordsMatched="159" numberOfRecordsReturned="5" elementSet="brief" nextRecord="6">
            <csw:BriefRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:ows="http://www.opengis.net/ows">
              <dc:identifier>49bbfedf-a826-46e7-9142-766a4a599206</dc:identifier>
              <dc:title>SWACI: Scintillation indices</dc:title>
              <dc:type>series</dc:type>
              <ows:BoundingBox crs="EPSG::WGS 84 (EPSG:4326)">
                <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
              </ows:BoundingBox>
            </csw:BriefRecord>
            <csw:BriefRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:ows="http://www.opengis.net/ows">
              <dc:identifier>2457713e-8707-4064-9e0e-058be6eca777</dc:identifier>
              <dc:title>SWACI: Equivalent Slab Thickness / F2 Layer Critical Frequency</dc:title>
              <dc:type>series</dc:type>
              <ows:BoundingBox crs="EPSG::WGS 84 (EPSG:4326)">
                <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
              </ows:BoundingBox>
            </csw:BriefRecord>
            <csw:BriefRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:ows="http://www.opengis.net/ows">
              <dc:identifier>19d0992f-b2f3-48ff-984b-7c3b04dee256</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Europe L2</dc:title>
              <dc:type>series</dc:type>
              <ows:BoundingBox crs="EPSG::WGS 84 (EPSG:4326)">
                <ows:LowerCorner>50 29.999999999999996</ows:LowerCorner>
                <ows:UpperCorner>-29.999999999999996 73</ows:UpperCorner>
              </ows:BoundingBox>
            </csw:BriefRecord>
            <csw:BriefRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:ows="http://www.opengis.net/ows">
              <dc:identifier>3bce902b-9aae-40a8-b724-463418c1e548</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Maps</dc:title>
              <dc:type>series</dc:type>
              <ows:BoundingBox crs="EPSG::WGS 84 (EPSG:4326)">
                <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
              </ows:BoundingBox>
            </csw:BriefRecord>
            <csw:BriefRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:ows="http://www.opengis.net/ows">
              <dc:identifier>d4434602-2574-48a6-b9e5-1c1a0423e364</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Error Maps</dc:title>
              <dc:type>series</dc:type>
              <ows:BoundingBox crs="EPSG::WGS 84 (EPSG:4326)">
                <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
              </ows:BoundingBox>
            </csw:BriefRecord>
          </csw:SearchResults>
        </csw:GetRecordsResponse>`;
    }

    public getRecordsSummary(body): string {
        return `
        <?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SearchStatus timestamp="2020-07-31T13:55:29" />
          <csw:SearchResults numberOfRecordsMatched="159" numberOfRecordsReturned="5" elementSet="summary" nextRecord="6">
            <csw:SummaryRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/">
              <dc:identifier>49bbfedf-a826-46e7-9142-766a4a599206</dc:identifier>
              <dc:title>SWACI: Scintillation indices</dc:title>
              <dc:type>series</dc:type>
              <dc:subject>Atmospheric conditions</dc:subject>
              <dc:subject>urn:eop:DLR:EOWEB:SWACI.GROUNDBASED.SCINT</dc:subject>
              <dc:subject>SWACI</dc:subject>
              <dc:subject>Scintillation indices</dc:subject>
              <dc:subject>Ionosphere</dc:subject>
              <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
              <dc:format />
              <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        
        Small scale irregularities of the ionospheric plasma may cause fluctuations of the signal strength of radio waves. The S4-Index is a measure to describe the amplitude- respectively the intensity fluctuations of a signal. The σφ-Index, describes the behaviour of carrier phase fluctuations. Both indices are calculated over a one minute interval. 
        
        DLR’s high rate GNSS measurement network ranges from auroral to equatorial latitudes. The measurements are provided in near real time by DLR’s Experimentation and Verification Network (EVnet) [Noack et al., 2004, 2005]. We thank the hosting institutes for supplying the required infrastructure.</dct:abstract>
            </csw:SummaryRecord>
            <csw:SummaryRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/">
              <dc:identifier>2457713e-8707-4064-9e0e-058be6eca777</dc:identifier>
              <dc:title>SWACI: Equivalent Slab Thickness / F2 Layer Critical Frequency</dc:title>
              <dc:type>series</dc:type>
              <dc:subject>Atmospheric conditions</dc:subject>
              <dc:subject>urn:eop:DLR:EOWEB:SWACI.SLAB-THICKNESS.L2</dc:subject>
              <dc:subject>SWACI</dc:subject>
              <dc:subject>Equivalent Slab Thickness</dc:subject>
              <dc:subject>Ionosphere</dc:subject>
              <dc:subject>F2 Layer Critical Frequency</dc:subject>
              <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
              <dc:format />
              <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The equivalent slab thickness is a measure of the width of the shape of the vertical electron density profile of the ionosphere. The equivalent slab thickness is defined by the ratio of the total electron content (TEC) and the peak electron density of the local ionosphere. To compute the peak electron density, vertical sounding data from different ionosonde stations are used. The corresponding TEC data are extracted from the SWACI TEC maps.
        For more details see http://swaciweb.dlr.de/data-and-products/public/slabthickness/?L=1.</dct:abstract>
            </csw:SummaryRecord>
            <csw:SummaryRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/">
              <dc:identifier>19d0992f-b2f3-48ff-984b-7c3b04dee256</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Europe L2</dc:title>
              <dc:type>series</dc:type>
              <dc:subject>Atmospheric conditions</dc:subject>
              <dc:subject>urn:eop:DLR:EOWEB:SWACI.GROUNDBASED.TEC.EU.L2</dc:subject>
              <dc:subject>SWACI</dc:subject>
              <dc:subject>total electron content</dc:subject>
              <dc:subject>Ionosphere</dc:subject>
              <dc:subject>TEC</dc:subject>
              <dc:subject>EU</dc:subject>
              <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
              <dc:format />
              <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
            </csw:SummaryRecord>
            <csw:SummaryRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/">
              <dc:identifier>3bce902b-9aae-40a8-b724-463418c1e548</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Maps</dc:title>
              <dc:type>series</dc:type>
              <dc:subject>Atmospheric conditions</dc:subject>
              <dc:subject>urn:eop:DLR:EOWEB:TEC-Maps</dc:subject>
              <dc:subject>SWACI</dc:subject>
              <dc:subject>total electron content maps</dc:subject>
              <dc:subject>Ionosphere</dc:subject>
              <dc:subject>TEC</dc:subject>
              <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
              <dc:format />
              <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
            </csw:SummaryRecord>
            <csw:SummaryRecord xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/">
              <dc:identifier>d4434602-2574-48a6-b9e5-1c1a0423e364</dc:identifier>
              <dc:title>SWACI: Total Electron Content (TEC) Error Maps</dc:title>
              <dc:type>series</dc:type>
              <dc:subject>Atmospheric conditions</dc:subject>
              <dc:subject>urn:eop:DLR:EOWEB:TEC-Error-Maps</dc:subject>
              <dc:subject>SWACI</dc:subject>
              <dc:subject>total electron content error maps</dc:subject>
              <dc:subject>Ionosphere</dc:subject>
              <dc:subject>TEC</dc:subject>
              <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
              <dc:format />
              <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
            </csw:SummaryRecord>
          </csw:SearchResults>
        </csw:GetRecordsResponse>`;
    }

    public getRecordsFull(body): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
            <csw:SearchStatus timestamp="2020-07-31T11:44:47" />
            <csw:SearchResults numberOfRecordsMatched="159" numberOfRecordsReturned="10" elementSet="full" nextRecord="11">
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" 
                xmlns:geonet="http://www.fao.org/geonetwork" 
                xmlns:dct="http://purl.org/dc/terms/" 
                xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>49bbfedf-a826-46e7-9142-766a4a599206</dc:identifier>
                    <dc:date>2015-03-10T12:39:47</dc:date>
                    <dc:title>SWACI: Scintillation indices</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:SWACI.GROUNDBASED.SCINT</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>Scintillation indices</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.

        Small scale irregularities of the ionospheric plasma may cause fluctuations of the signal strength of radio waves. The S4-Index is a measure to describe the amplitude- respectively the intensity fluctuations of a signal. The σφ-Index, describes the behaviour of carrier phase fluctuations. Both indices are calculated over a one minute interval. 
        
        DLR’s high rate GNSS measurement network ranges from auroral to equatorial latitudes. The measurements are provided in near real time by DLR’s Experimentation and Verification Network (EVnet) [Noack et al., 2004, 2005]. We thank the hosting institutes for supplying the required infrastructure.</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        
        Small scale irregularities of the ionospheric plasma may cause fluctuations of the signal strength of radio waves. The S4-Index is a measure to describe the amplitude- respectively the intensity fluctuations of a signal. The σφ-Index, describes the behaviour of carrier phase fluctuations. Both indices are calculated over a one minute interval. 
        
        DLR’s high rate GNSS measurement network ranges from auroral to equatorial latitudes. The measurements are provided in near real time by DLR’s Experimentation and Verification Network (EVnet) [Noack et al., 2004, 2005]. We thank the hosting institutes for supplying the required infrastructure.</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/index.php?id=216&amp;L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Scintillation indices L1 access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ASWACI.GROUNDBASED.SCINT</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/radiooccultation/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/49bbfedf-a826-46e7-9142-766a4a599206/attachments/SWACI.GROUNDBASED.SCINT.L1_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/49bbfedf-a826-46e7-9142-766a4a599206/attachments/SWACI.GROUNDBASED.SCINT.L1_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>2457713e-8707-4064-9e0e-058be6eca777</dc:identifier>
                    <dc:date>2015-03-10T15:29:16</dc:date>
                    <dc:title>SWACI: Equivalent Slab Thickness / F2 Layer Critical Frequency</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:SWACI.SLAB-THICKNESS.L2</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>Equivalent Slab Thickness</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>F2 Layer Critical Frequency</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The equivalent slab thickness is a measure of the width of the shape of the vertical electron density profile of the ionosphere. The equivalent slab thickness is defined by the ratio of the total electron content (TEC) and the peak electron density of the local ionosphere. To compute the peak electron density, vertical sounding data from different ionosonde stations are used. The corresponding TEC data are extracted from the SWACI TEC maps.
        For more details see http://swaciweb.dlr.de/data-and-products/public/slabthickness/?L=1.</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The equivalent slab thickness is a measure of the width of the shape of the vertical electron density profile of the ionosphere. The equivalent slab thickness is defined by the ratio of the total electron content (TEC) and the peak electron density of the local ionosphere. To compute the peak electron density, vertical sounding data from different ionosonde stations are used. The corresponding TEC data are extracted from the SWACI TEC maps.
        For more details see http://swaciweb.dlr.de/data-and-products/public/slabthickness/?L=1.</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/slabthickness/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Equivalent Slab Thickness / F2 Layer Critical Frequency access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ASWACI.SLAB-THICKNESS.L2</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/slabthickness/?L=1c/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/2457713e-8707-4064-9e0e-058be6eca777/attachments/SWACI.SLAB-THICKNESS.L2_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/2457713e-8707-4064-9e0e-058be6eca777/attachments/SWACI.SLAB-THICKNESS.L2_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>19d0992f-b2f3-48ff-984b-7c3b04dee256</dc:identifier>
                    <dc:date>2015-03-10T15:29:52</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC) Europe L2</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:SWACI.GROUNDBASED.TEC.EU.L2</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>EU</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>50 29.999999999999996</ows:LowerCorner>
                        <ows:UpperCorner>-29.999999999999996 73</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) Europe L2 access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ASWACI.GROUNDBASED.TEC.EU.L2</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/19d0992f-b2f3-48ff-984b-7c3b04dee256/attachments/SWACI.GROUNDBASED.TEC.EU.L2_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/19d0992f-b2f3-48ff-984b-7c3b04dee256/attachments/SWACI.GROUNDBASED.TEC.EU.L2_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>3bce902b-9aae-40a8-b724-463418c1e548</dc:identifier>
                    <dc:date>2015-03-11T09:14:53</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC) Maps</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:TEC-Maps</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content maps</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) Maps access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ATEC-Maps</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/3bce902b-9aae-40a8-b724-463418c1e548/attachments/SWACI.TEC.MAPS_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/3bce902b-9aae-40a8-b724-463418c1e548/attachments/SWACI.TEC.MAPS_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>d4434602-2574-48a6-b9e5-1c1a0423e364</dc:identifier>
                    <dc:date>2015-03-11T09:41:15</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC) Error Maps</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:TEC-Error-Maps</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content error maps</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) Error Maps access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ATEC-Error-Maps</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/d4434602-2574-48a6-b9e5-1c1a0423e364/attachments/TEC_ERROR_GB_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/d4434602-2574-48a6-b9e5-1c1a0423e364/attachments/TEC_ERROR_GB_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>c9c42efc-5ff7-4fdb-b1d2-b51b90f4f17d</dc:identifier>
                    <dc:date>2015-03-11T13:54:49</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC): Longitudinal-TEC-Gradients</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:Longitudinal-TEC-Gradients</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>Longitudinal-TEC-Gradients</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) Longitudinal-TEC-Gradients access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ALongitudinal-TEC-Gradients</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/c9c42efc-5ff7-4fdb-b1d2-b51b90f4f17d/attachments/TEC_Lon_Gradients_GB_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/c9c42efc-5ff7-4fdb-b1d2-b51b90f4f17d/attachments/TEC_Lon_Gradients_GB.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>879a446e-cea3-47f7-beb5-c061be1c654c</dc:identifier>
                    <dc:date>2015-03-11T13:55:39</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC): Latitudinal-TEC-Gradients</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:Latitudinal-TEC-Gradients</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>Latitudinal-TEC-Gradients</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) Latitudinal-TEC-Gradients access" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ALatitudinal-TEC-Gradients</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/879a446e-cea3-47f7-beb5-c061be1c654c/attachments/TEC_Lat_Gradients_GB_QL_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/879a446e-cea3-47f7-beb5-c061be1c654c/attachments/TEC_Lat_Gradients_GB_QL.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>92ce1eaa-8117-4845-aa8c-fb5c580fcea7</dc:identifier>
                    <dc:date>2015-03-11T14:13:18</dc:date>
                    <dc:title>SWACI: Total Electron Content (TEC): Rate of Change</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:TEC-Rate-Of-Change</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>total electron content</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>TEC</dc:subject>
                    <dc:subject>TEC-Rate-Of-Change</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        The total electron content (TEC) is defined as the integral of the electron density along the ray path between satellite and receiver. Thus, TEC provides the number of electrons per square meter. The most frequently used unit is 1TECU = 1x1016 electrons / m2. 
        TEC is derived from dual frequency code and carrier phase measurements provided by Global Navigation Satellite Systems (GNSS). SWACI uses GPS measurements from various European GNSS networks such as the International GNSS Service (IGS), European Reference Frame (EUREF), Norwegian Mapping Authority (NMA), and ascos distributed by the Federal Agency of Cartography and Geodesy (BKG) Frankfurt. The global TEC maps are mainly created by using data provided by the International GNSS Service Real-Time Pilot Project (IGS-RTPP). 
        To generate TEC maps of vertical TEC, the slant measurements have to be transformed to the vertical. In a first approximation the ionospheric range error in GNSS is proportional to TEC. 
        These TEC maps are used to derive latitudinal and zonal gradients, rate of change of TEC (5 min increments), 27 days medians, hourly forecasts of TEC, and corresponding error estimates. 
        Spatial resolution (latitude x longitude): 2 °x 2° (Europe), 2.5° x 5° (globally)</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Total Electron Content (TEC) TEC-Rate-Of-Change" description="EOWEB Collection (not available yet)">http://geotest.eoc.dlr.de/egp/main?ecswCollection=urn%3Aeop%3ADLR%3AEOWEB%3ATEC-Rate-Of-Change</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/tec/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/92ce1eaa-8117-4845-aa8c-fb5c580fcea7/attachments/TEC_RATE_GB_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/92ce1eaa-8117-4845-aa8c-fb5c580fcea7/attachments/TEC_RATE_GB.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>eee89542-fca6-4fcf-8804-af8846b26f1b</dc:identifier>
                    <dc:date>2015-06-19T05:42:24</dc:date>
                    <dc:title>SWACI: Radio Occultation Relative TEC</dc:title>
                    <dc:type>series</dc:type>
                    <dc:subject>Atmospheric conditions</dc:subject>
                    <dc:subject>urn:eop:DLR:EOWEB:Occultation-Relative-TEC</dc:subject>
                    <dc:subject>SWACI</dc:subject>
                    <dc:subject>Occultation-Relative-TEC</dc:subject>
                    <dc:subject>Ionosphere</dc:subject>
                    <dc:subject>Radio Occultation</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        GPS radio occultation measurements onboard geo research satellites such as CHAMP and GRACE are used for retrieving vertical electron density profiles of the ionosphere. At present, only GPS measurements from GRACE are available. These data are routinely provided by GFZ Potsdam. Thus, the derived electron density profiles retrieved in SWACI are a common data product of DLR and GFZ Potsdam. Users are asked to acknowledge this in a proper way.</dct:abstract>
                    <dc:description>SWACI is a research project of DLR supported by the State Government of Mecklenburg-Vorpommern. Radio signals, transmitted by modern communication and navigation systems may be heavily disturbed by space weather hazards. Thus, severe temporal and spatial changes of the electron density in the ionosphere may significantly degrade the signal quality of various radio systems which even may lead to a complete loss of the signal. By providing specific space weather information, in particular now- and forecast of the ionospheric state, the accuracy and reliability of impacted communication and navigation systems shall be improved.
        GPS radio occultation measurements onboard geo research satellites such as CHAMP and GRACE are used for retrieving vertical electron density profiles of the ionosphere. At present, only GPS measurements from GRACE are available. These data are routinely provided by GFZ Potsdam. Thus, the derived electron density profiles retrieved in SWACI are a common data product of DLR and GFZ Potsdam. Users are asked to acknowledge this in a proper way.</dc:description>
                    <dc:rights>otherRestrictions</dc:rights>
                    <dc:rights>license</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>For details see:
        http://swaciweb.dlr.de/index.php?id=48&amp;L=1</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::WGS 84 (EPSG:4326)">
                        <ows:LowerCorner>180.0 -90.0</ows:LowerCorner>
                        <ows:UpperCorner>-180.0 90.0</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="Occultation-Relative-TEC access" description="EOWEB">http://eoweb.dlr.de/</dc:URI>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="" description="SWACI Homepage">http://swaciweb.dlr.de/data-and-products/public/radiooccultation/?L=1</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/eee89542-fca6-4fcf-8804-af8846b26f1b/attachments/radio_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/eee89542-fca6-4fcf-8804-af8846b26f1b/attachments/radio.png</dc:URI>
                </csw:Record>
                <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
                    <dc:identifier>c7acf9c0-160a-4bb3-b091-f1774295f2b7</dc:identifier>
                    <dc:date>2015-06-19T06:23:54</dc:date>
                    <dc:title>Monthly Ozone Total Column Merged Product</dc:title>
                    <dc:type>dataset</dc:type>
                    <dc:subject>Meteorological geographical features</dc:subject>
                    <dc:subject>Ozone</dc:subject>
                    <dc:subject>Total Column</dc:subject>
                    <dc:subject>global</dc:subject>
                    <dc:subject>CCI</dc:subject>
                    <dc:subject>climatologyMeteorologyAtmosphere</dc:subject>
                    <dc:format />
                    <dct:abstract>Total ozone data sets covering different time periods have been derived from different instruments (e.g. TOMS, OMI, GOME, SCIAMACHY, etc). For climatological assessments and investigations of long-term changes individual instrument records are mostly too short and it is necessary to merge data sets available on shorter periods from different instruments. This data set is the merge result of of the ozone total column data sets from GOME, SCIAMACHY and GOME-2 within the CCI project. The aim was to generate a consistent and well characterized long-term level-3 total ozone data set from European sensors covering the full period from 1995 until 2011.\\nIn the following, the target uncertainties and the product specification for level 3 total ozone data products are presented. All total ozone data products generated in Ozone_cci will follow the user requirements for NetCDF CF standard.</dct:abstract>
                    <dc:description>Total ozone data sets covering different time periods have been derived from different instruments (e.g. TOMS, OMI, GOME, SCIAMACHY, etc). For climatological assessments and investigations of long-term changes individual instrument records are mostly too short and it is necessary to merge data sets available on shorter periods from different instruments. This data set is the merge result of of the ozone total column data sets from GOME, SCIAMACHY and GOME-2 within the CCI project. The aim was to generate a consistent and well characterized long-term level-3 total ozone data set from European sensors covering the full period from 1995 until 2011.\\nIn the following, the target uncertainties and the product specification for level 3 total ozone data products are presented. All total ozone data products generated in Ozone_cci will follow the user requirements for NetCDF CF standard.</dc:description>
                    <dc:rights>copyright</dc:rights>
                    <dc:rights>copyright</dc:rights>
                    <dc:language>eng</dc:language>
                    <dc:source>Total column L2 input data from GOME, SCIAMACHY and GOME-2.\\nTarget Uncertainties\\nHorizontal resolution:	200 km\\nObservation frequency:	3 days\\nRandom uncertainty:	 2 %\\nSystematic uncertainty:	3 %\\n\\nStability:	 1-2 % / decade</dc:source>
                    <dc:format />
                    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.6:4326">
                        <ows:LowerCorner>180 -90</ows:LowerCorner>
                        <ows:UpperCorner>-180 90</ows:UpperCorner>
                    </ows:BoundingBox>
                    <dc:URI protocol="WWW:LINK-1.0-http--link" name="ESA Ozone CCI" description="">http://www.esa-ozone-cci.org/</dc:URI>
                    <dc:URI protocol="WWW:DOWNLOAD-1.0-ftp--download" name="FTP data access" description="">ftp://cci_web@ftp-ae.oma.be/esacci/ozone</dc:URI>
                    <dc:URI protocol="image/png" name="thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/c7acf9c0-160a-4bb3-b091-f1774295f2b7/attachments/O3_CCI_TotalColumn_ql_s.png</dc:URI>
                    <dc:URI protocol="image/png" name="large_thumbnail">http://geotest.eoc.dlr.de:80/catalogue/srv/api/records/c7acf9c0-160a-4bb3-b091-f1774295f2b7/attachments/O3_CCI_TotalColumn_ql.png</dc:URI>
                </csw:Record>
            </csw:SearchResults>
        </csw:GetRecordsResponse>`;
    }

    public getDomain(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!-- pycsw 2.4.0 -->
        <csw:GetDomainResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
            <csw:DomainValues type="csw:Record">
                <csw:ParameterName>title</csw:ParameterName>
            </csw:DomainValues>
        </csw:GetDomainResponse>`;
    }
}
