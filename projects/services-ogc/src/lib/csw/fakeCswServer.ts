export class FakeDataGovCswServer {
    public getCapabilities(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!-- pycsw 2.4.0 -->
        <csw:Capabilities xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0" xmlns:inspire_ds="http://inspire.ec.europa.eu/schemas/inspire_ds/1.0" xmlns:ogc="http://www.opengis.net/ogc" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" updateSequence="1597677695" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
            <ows:ServiceIdentification>
                <ows:Title>CSW interface for catalog.data.gov</ows:Title>
                <ows:Abstract>This catalog contains metadata for all first-order data, services, and applications harvested from registered metadata collections with data.gov. Data may be referenced from federal, state, local, tribal, academic, commercial, or non-profit organizations.</ows:Abstract>
                <ows:Keywords>
                    <ows:Keyword>earth science</ows:Keyword>
                    <ows:Keyword>oceans</ows:Keyword>
                    <ows:Keyword>noaa</ows:Keyword>
                    <ows:Keyword>u.s. department of commerce</ows:Keyword>
                    <ows:Keyword>nesdis</ows:Keyword>
                    <ows:Keyword>doc/noaa/nesdis/ncei</ows:Keyword>
                    <ows:Keyword>national centers for environmental information</ows:Keyword>
                    <ows:Keyword>ocean</ows:Keyword>
                    <ows:Keyword>bathymetry/seafloor topography</ows:Keyword>
                    <ows:Keyword>water depth</ows:Keyword>
                    <ows:Keyword>water temperature</ows:Keyword>
                    <ows:Keyword>ocean temperature</ows:Keyword>
                    <ows:Keyword>oceanography</ows:Keyword>
                    <ows:Keyword>national oceanographic data center</ows:Keyword>
                    <ows:Keyword>doc/noaa/nesdis/nodc</ows:Keyword>
                    <ows:Keyword>ships</ows:Keyword>
                    <ows:Keyword>united states of america</ows:Keyword>
                    <ows:Keyword>bathymetry</ows:Keyword>
                    <ows:Keyword>in situ ocean-based platforms</ows:Keyword>
                    <ows:Keyword>north america</ows:Keyword>
                    <ows:Type codeSpace="ISOTC211/19115">theme</ows:Type>
                </ows:Keywords>
                <ows:ServiceType codeSpace="OGC">CSW</ows:ServiceType>
                <ows:ServiceTypeVersion>2.0.2</ows:ServiceTypeVersion>
                <ows:ServiceTypeVersion>3.0.0</ows:ServiceTypeVersion>
                <ows:Fees>None</ows:Fees>
                <ows:AccessConstraints>None</ows:AccessConstraints>
            </ows:ServiceIdentification>
            <ows:ServiceProvider>
                <ows:ProviderName>U.S. General Services Administration</ows:ProviderName>
                <ows:ProviderSite xlink:type="simple" xlink:href="https://www.gsa.gov"/>
                <ows:ServiceContact>
                    <ows:IndividualName>Data.gov Administrator</ows:IndividualName>
                    <ows:PositionName>Data.gov Site Administrator</ows:PositionName>
                    <ows:ContactInfo>
                        <ows:Phone>
                            <ows:Voice>(800)-488-3111</ows:Voice>
                            <ows:Facsimile>DSN 465-1416</ows:Facsimile>
                        </ows:Phone>
                        <ows:Address>
                            <ows:DeliveryPoint>1800 F St NW</ows:DeliveryPoint>
                            <ows:City>Washington</ows:City>
                            <ows:AdministrativeArea>DC</ows:AdministrativeArea>
                            <ows:PostalCode>20405</ows:PostalCode>
                            <ows:Country>USA</ows:Country>
                            <ows:ElectronicMailAddress>datagov@gsa.gov</ows:ElectronicMailAddress>
                        </ows:Address>
                        <ows:OnlineResource xlink:type="simple" xlink:href="https://data.gov/contact"/>
                        <ows:HoursOfService>9:00am - 4:30pm ET</ows:HoursOfService>
                        <ows:ContactInstructions>Preferred method through email datagov@gsa.gov or contact URL https://data.gov/contact</ows:ContactInstructions>
                    </ows:ContactInfo>
                    <ows:Role codeSpace="ISOTC211/19115">publisher,custodian</ows:Role>
                </ows:ServiceContact>
            </ows:ServiceProvider>
            <ows:OperationsMetadata>
                <ows:Operation name="GetCapabilities">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                            <ows:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                    <ows:Parameter name="sections">
                        <ows:Value>Filter_Capabilities</ows:Value>
                        <ows:Value>OperationsMetadata</ows:Value>
                        <ows:Value>ServiceIdentification</ows:Value>
                        <ows:Value>ServiceProvider</ows:Value>
                    </ows:Parameter>
                </ows:Operation>
                <ows:Operation name="DescribeRecord">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                            <ows:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                    <ows:Parameter name="outputFormat">
                        <ows:Value>application/json</ows:Value>
                        <ows:Value>application/xml</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="schemaLanguage">
                        <ows:Value>http://www.w3.org/2001/XMLSchema</ows:Value>
                        <ows:Value>http://www.w3.org/TR/xmlschema-1/</ows:Value>
                        <ows:Value>http://www.w3.org/XML/Schema</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="typeName">
                        <ows:Value>csw:Record</ows:Value>
                        <ows:Value>gmd:MD_Metadata</ows:Value>
                    </ows:Parameter>
                </ows:Operation>
                <ows:Operation name="GetDomain">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                            <ows:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                    <ows:Parameter name="ParameterName">
                        <ows:Value>DescribeRecord.outputFormat</ows:Value>
                        <ows:Value>DescribeRecord.schemaLanguage</ows:Value>
                        <ows:Value>DescribeRecord.typeName</ows:Value>
                        <ows:Value>GetCapabilities.sections</ows:Value>
                        <ows:Value>GetRecordById.ElementSetName</ows:Value>
                        <ows:Value>GetRecordById.outputFormat</ows:Value>
                        <ows:Value>GetRecordById.outputSchema</ows:Value>
                        <ows:Value>GetRecords.CONSTRAINTLANGUAGE</ows:Value>
                        <ows:Value>GetRecords.ElementSetName</ows:Value>
                        <ows:Value>GetRecords.outputFormat</ows:Value>
                        <ows:Value>GetRecords.outputSchema</ows:Value>
                        <ows:Value>GetRecords.resultType</ows:Value>
                        <ows:Value>GetRecords.typeNames</ows:Value>
                    </ows:Parameter>
                </ows:Operation>
                <ows:Operation name="GetRecords">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                            <ows:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                    <ows:Parameter name="CONSTRAINTLANGUAGE">
                        <ows:Value>CQL_TEXT</ows:Value>
                        <ows:Value>FILTER</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="ElementSetName">
                        <ows:Value>brief</ows:Value>
                        <ows:Value>full</ows:Value>
                        <ows:Value>summary</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="outputFormat">
                        <ows:Value>application/json</ows:Value>
                        <ows:Value>application/xml</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="outputSchema">
                        <ows:Value>http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/</ows:Value>
                        <ows:Value>http://www.interlis.ch/INTERLIS2.3</ows:Value>
                        <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
                        <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
                        <ows:Value>http://www.opengis.net/cat/csw/csdgm</ows:Value>
                        <ows:Value>http://www.w3.org/2005/Atom</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="resultType">
                        <ows:Value>hits</ows:Value>
                        <ows:Value>results</ows:Value>
                        <ows:Value>validate</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="typeNames">
                        <ows:Value>csw:Record</ows:Value>
                        <ows:Value>gmd:MD_Metadata</ows:Value>
                    </ows:Parameter>
                    <ows:Constraint name="AdditionalQueryables">
                        <ows:Value>apiso:AccessConstraints</ows:Value>
                        <ows:Value>apiso:Classification</ows:Value>
                        <ows:Value>apiso:ConditionApplyingToAccessAndUse</ows:Value>
                        <ows:Value>apiso:Contributor</ows:Value>
                        <ows:Value>apiso:Creator</ows:Value>
                        <ows:Value>apiso:Degree</ows:Value>
                        <ows:Value>apiso:Lineage</ows:Value>
                        <ows:Value>apiso:OtherConstraints</ows:Value>
                        <ows:Value>apiso:Publisher</ows:Value>
                        <ows:Value>apiso:Relation</ows:Value>
                        <ows:Value>apiso:ResponsiblePartyRole</ows:Value>
                        <ows:Value>apiso:SpecificationDate</ows:Value>
                        <ows:Value>apiso:SpecificationDateType</ows:Value>
                        <ows:Value>apiso:SpecificationTitle</ows:Value>
                    </ows:Constraint>
                    <ows:Constraint name="SupportedDublinCoreQueryables">
                        <ows:Value>csw:AnyText</ows:Value>
                        <ows:Value>dc:contributor</ows:Value>
                        <ows:Value>dc:creator</ows:Value>
                        <ows:Value>dc:date</ows:Value>
                        <ows:Value>dc:format</ows:Value>
                        <ows:Value>dc:identifier</ows:Value>
                        <ows:Value>dc:language</ows:Value>
                        <ows:Value>dc:publisher</ows:Value>
                        <ows:Value>dc:relation</ows:Value>
                        <ows:Value>dc:rights</ows:Value>
                        <ows:Value>dc:source</ows:Value>
                        <ows:Value>dc:subject</ows:Value>
                        <ows:Value>dc:title</ows:Value>
                        <ows:Value>dc:type</ows:Value>
                        <ows:Value>dct:abstract</ows:Value>
                        <ows:Value>dct:alternative</ows:Value>
                        <ows:Value>dct:modified</ows:Value>
                        <ows:Value>dct:spatial</ows:Value>
                        <ows:Value>ows:BoundingBox</ows:Value>
                    </ows:Constraint>
                    <ows:Constraint name="SupportedISOQueryables">
                        <ows:Value>apiso:Abstract</ows:Value>
                        <ows:Value>apiso:AlternateTitle</ows:Value>
                        <ows:Value>apiso:AnyText</ows:Value>
                        <ows:Value>apiso:BoundingBox</ows:Value>
                        <ows:Value>apiso:CRS</ows:Value>
                        <ows:Value>apiso:CouplingType</ows:Value>
                        <ows:Value>apiso:CreationDate</ows:Value>
                        <ows:Value>apiso:Denominator</ows:Value>
                        <ows:Value>apiso:DistanceUOM</ows:Value>
                        <ows:Value>apiso:DistanceValue</ows:Value>
                        <ows:Value>apiso:Format</ows:Value>
                        <ows:Value>apiso:GeographicDescriptionCode</ows:Value>
                        <ows:Value>apiso:HasSecurityConstraints</ows:Value>
                        <ows:Value>apiso:Identifier</ows:Value>
                        <ows:Value>apiso:KeywordType</ows:Value>
                        <ows:Value>apiso:Language</ows:Value>
                        <ows:Value>apiso:Modified</ows:Value>
                        <ows:Value>apiso:OperatesOn</ows:Value>
                        <ows:Value>apiso:OperatesOnIdentifier</ows:Value>
                        <ows:Value>apiso:OperatesOnName</ows:Value>
                        <ows:Value>apiso:Operation</ows:Value>
                        <ows:Value>apiso:OrganisationName</ows:Value>
                        <ows:Value>apiso:ParentIdentifier</ows:Value>
                        <ows:Value>apiso:PublicationDate</ows:Value>
                        <ows:Value>apiso:ResourceLanguage</ows:Value>
                        <ows:Value>apiso:RevisionDate</ows:Value>
                        <ows:Value>apiso:ServiceType</ows:Value>
                        <ows:Value>apiso:ServiceTypeVersion</ows:Value>
                        <ows:Value>apiso:Subject</ows:Value>
                        <ows:Value>apiso:TempExtent_begin</ows:Value>
                        <ows:Value>apiso:TempExtent_end</ows:Value>
                        <ows:Value>apiso:Title</ows:Value>
                        <ows:Value>apiso:TopicCategory</ows:Value>
                        <ows:Value>apiso:Type</ows:Value>
                    </ows:Constraint>
                </ows:Operation>
                <ows:Operation name="GetRecordById">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                            <ows:Post xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                    <ows:Parameter name="ElementSetName">
                        <ows:Value>brief</ows:Value>
                        <ows:Value>full</ows:Value>
                        <ows:Value>summary</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="outputFormat">
                        <ows:Value>application/json</ows:Value>
                        <ows:Value>application/xml</ows:Value>
                    </ows:Parameter>
                    <ows:Parameter name="outputSchema">
                        <ows:Value>http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/</ows:Value>
                        <ows:Value>http://www.interlis.ch/INTERLIS2.3</ows:Value>
                        <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
                        <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
                        <ows:Value>http://www.opengis.net/cat/csw/csdgm</ows:Value>
                        <ows:Value>http://www.w3.org/2005/Atom</ows:Value>
                    </ows:Parameter>
                </ows:Operation>
                <ows:Operation name="GetRepositoryItem">
                    <ows:DCP>
                        <ows:HTTP>
                            <ows:Get xlink:type="simple" xlink:href="https://catalog.data.gov/csw-all"/>
                        </ows:HTTP>
                    </ows:DCP>
                </ows:Operation>
                <ows:Parameter name="service">
                    <ows:Value>CSW</ows:Value>
                </ows:Parameter>
                <ows:Parameter name="version">
                    <ows:Value>2.0.2</ows:Value>
                    <ows:Value>3.0.0</ows:Value>
                </ows:Parameter>
                <ows:Constraint name="MaxRecordDefault">
                    <ows:Value>500</ows:Value>
                </ows:Constraint>
                <ows:Constraint name="PostEncoding">
                    <ows:Value>XML</ows:Value>
                    <ows:Value>SOAP</ows:Value>
                </ows:Constraint>
                <ows:Constraint name="XPathQueryables">
                    <ows:Value>allowed</ows:Value>
                </ows:Constraint>
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
            </ows:OperationsMetadata>
            <ogc:Filter_Capabilities>
                <ogc:Spatial_Capabilities>
                    <ogc:GeometryOperands>
                        <ogc:GeometryOperand>gml:Point</ogc:GeometryOperand>
                        <ogc:GeometryOperand>gml:LineString</ogc:GeometryOperand>
                        <ogc:GeometryOperand>gml:Polygon</ogc:GeometryOperand>
                        <ogc:GeometryOperand>gml:Envelope</ogc:GeometryOperand>
                    </ogc:GeometryOperands>
                    <ogc:SpatialOperators>
                        <ogc:SpatialOperator name="BBOX"/>
                        <ogc:SpatialOperator name="Beyond"/>
                        <ogc:SpatialOperator name="Contains"/>
                        <ogc:SpatialOperator name="Crosses"/>
                        <ogc:SpatialOperator name="Disjoint"/>
                        <ogc:SpatialOperator name="DWithin"/>
                        <ogc:SpatialOperator name="Equals"/>
                        <ogc:SpatialOperator name="Intersects"/>
                        <ogc:SpatialOperator name="Overlaps"/>
                        <ogc:SpatialOperator name="Touches"/>
                        <ogc:SpatialOperator name="Within"/>
                    </ogc:SpatialOperators>
                </ogc:Spatial_Capabilities>
                <ogc:Scalar_Capabilities>
                    <ogc:LogicalOperators/>
                    <ogc:ComparisonOperators>
                        <ogc:ComparisonOperator>Between</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>EqualTo</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>GreaterThan</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>GreaterThanEqualTo</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>LessThan</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>LessThanEqualTo</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>Like</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>NotEqualTo</ogc:ComparisonOperator>
                        <ogc:ComparisonOperator>NullCheck</ogc:ComparisonOperator>
                    </ogc:ComparisonOperators>
                    <ogc:ArithmeticOperators>
                        <ogc:Functions>
                            <ogc:FunctionNames>
                                <ogc:FunctionName nArgs="1">length</ogc:FunctionName>
                                <ogc:FunctionName nArgs="1">lower</ogc:FunctionName>
                                <ogc:FunctionName nArgs="1">ltrim</ogc:FunctionName>
                                <ogc:FunctionName nArgs="1">rtrim</ogc:FunctionName>
                                <ogc:FunctionName nArgs="1">trim</ogc:FunctionName>
                                <ogc:FunctionName nArgs="1">upper</ogc:FunctionName>
                            </ogc:FunctionNames>
                        </ogc:Functions>
                    </ogc:ArithmeticOperators>
                </ogc:Scalar_Capabilities>
                <ogc:Id_Capabilities>
                    <ogc:EID/>
                    <ogc:FID/>
                </ogc:Id_Capabilities>
            </ogc:Filter_Capabilities>
        </csw:Capabilities>`;
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

    // https://catalog.data.gov/csw-all?service=CSW&version=2.0.2&request=GetRecords&ElementSetName=brief&typeNames=csw:Record&resultType=results&startPosition=1&maxRecords=10
    public getRecordsBrief(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!--  pycsw 2.4.0  -->
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
        <script/>
        <csw:SearchStatus timestamp="2020-08-18T12:50:48Z"/>
        <csw:SearchResults nextRecord="11" numberOfRecordsMatched="207381" numberOfRecordsReturned="10" recordSchema="http://www.opengis.net/cat/csw/2.0.2" elementSet="brief">
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/112391</dc:identifier>
        <dc:title>Financial Statement and Notes Data Sets</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/87721</dc:identifier>
        <dc:title>Closed-End Fund Information</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/86016</dc:identifier>
        <dc:title>Information About Registered Investment Advisers and Exempt Reporting Advisers</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/87756</dc:identifier>
        <dc:title>Public Company Bankruptcy Cases Opened and Monitored</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/92646</dc:identifier>
        <dc:title>Spreads and Depth by Individual Security</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://data.medicare.gov/api/views/ct36-nrcq</dc:identifier>
        <dc:title>Supplier Directory Data</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/86011</dc:identifier>
        <dc:title>Fails-to-Deliver Data</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/115361</dc:identifier>
        <dc:title>Mutual Fund Prospectus Risk/Return Summary Data Sets</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://www.sec.gov/node/87761</dc:identifier>
        <dc:title>Investment Company Series and Class Information</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        <csw:BriefRecord>
        <dc:identifier>https://doi.org/10.23719/1519181</dc:identifier>
        <dc:title>Where have all the nutrients gone? Long-term Decoupling of Inputs and Outputs in the Willamette River Watershed, Oregon, USA</dc:title>
        <dc:type>dataset</dc:type>
        </csw:BriefRecord>
        </csw:SearchResults>
        </csw:GetRecordsResponse>`;
    }

    // https://catalog.data.gov/csw-all?service=CSW&version=2.0.2&request=GetRecords&ElementSetName=summary&typeNames=csw:Record&resultType=results&startPosition=1&maxRecords=10
    public getRecordsSummary(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!--  pycsw 2.4.0  -->
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
        <script/>
        <csw:SearchStatus timestamp="2020-08-18T12:50:12Z"/>
        <csw:SearchResults nextRecord="11" numberOfRecordsMatched="207381" numberOfRecordsReturned="10" recordSchema="http://www.opengis.net/cat/csw/2.0.2" elementSet="summary">
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/112391</dc:identifier>
        <dc:title>Financial Statement and Notes Data Sets</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>XBRL filings</dc:subject>
        <dct:modified>2017-07-20T18:10:06Z</dct:modified>
        <dct:abstract>The data sets provide the text and detailed numeric information in all financial statements and their notes extracted from exhibits to corporate financial reports filed with the Commission using eXtensible Business Reporting Language (XBRL).</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/87721</dc:identifier>
        <dc:title>Closed-End Fund Information</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>Data Sets</dc:subject>
        <dc:subject>foiafreqdocs</dc:subject>
        <dct:modified>2020-07-13T15:46:25Z</dct:modified>
        <dct:abstract>This report provides basic identification information for all entities with an "active" filing status that are organized as closed-end investment companies (closed-end funds or CEFs).</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/86016</dc:identifier>
        <dc:title>Information About Registered Investment Advisers and Exempt Reporting Advisers</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>foia-freq-doc</dc:subject>
        <dct:modified>2019-06-03T09:48:09Z</dct:modified>
        <dct:abstract>The Investment Adviser Information Reports' data is collected from electronic submissions of Form ADV by investment adviser firms to the Investment Adviser Registration Depository (IARD) system.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/87756</dc:identifier>
        <dc:title>Public Company Bankruptcy Cases Opened and Monitored</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>Bankruptcy</dc:subject>
        <dct:modified>2017-05-05T07:30:36Z</dct:modified>
        <dct:abstract>This file contains a list of the bankruptcy cases for public companies filed under Chapter 11 of the Bankruptcy Code opened and monitored since the fiscal year 2009.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/92646</dc:identifier>
        <dc:title>Spreads and Depth by Individual Security</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>Data Sets</dc:subject>
        <dct:modified>2017-05-05T09:15:27Z</dct:modified>
        <dct:abstract>These datasets provide spreads and depth partitioned by individual ticker symbol and date for each day in 2013.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://data.medicare.gov/api/views/ct36-nrcq</dc:identifier>
        <dc:title>Supplier Directory Data</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>directory</dc:subject>
        <dc:subject>medical equipment</dc:subject>
        <dc:subject>supplier</dc:subject>
        <dc:subject>supplies</dc:subject>
        <dct:modified>2020-08-07</dct:modified>
        <dct:abstract>A list of Suppliers that indicates the supplies carried at that location and the supplier's Medicare participation status.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/86011</dc:identifier>
        <dc:title>Fails-to-Deliver Data</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>foia-freq-doc</dc:subject>
        <dct:modified>2018-07-02T12:12:50Z</dct:modified>
        <dct:abstract>This text file contains the date, CUSIP numbers, ticker symbols, issuer name, price, and total number of fails-to-deliver (i.e., the balance level outstanding) recorded in the National Securities Clearing Corporation's ("NSCC") Continuous Net Settlement (CNS) system aggregated over all NSCC members.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/115361</dc:identifier>
        <dc:title>Mutual Fund Prospectus Risk/Return Summary Data Sets</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>Data Sets</dc:subject>
        <dct:modified>2019-04-04T07:21:06Z</dct:modified>
        <dct:abstract>The Mutual Fund Prospectus Risk/Return Summary Data Sets provides text and numeric information extracted from the risk/return summary section of mutual fund prospectuses.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://www.sec.gov/node/87761</dc:identifier>
        <dc:title>Investment Company Series and Class Information</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>market structure</dc:subject>
        <dc:subject>foiafreqdocs</dc:subject>
        <dct:modified>2017-09-15T17:31:58Z</dct:modified>
        <dct:abstract>The Series and Class Report provides basic identification information for all active registered investment company series and classes have been issued IDs by the Commission.</dct:abstract>
        </csw:SummaryRecord>
        <csw:SummaryRecord>
        <dc:identifier>https://doi.org/10.23719/1519181</dc:identifier>
        <dc:title>Where have all the nutrients gone? Long-term Decoupling of Inputs and Outputs in the Willamette River Watershed, Oregon, USA</dc:title>
        <dc:type>dataset</dc:type>
        <dc:subject>phosphorus</dc:subject>
        <dc:subject>nutrients</dc:subject>
        <dc:subject>watersheds</dc:subject>
        <dc:subject>balance</dc:subject>
        <dc:subject>nitrogen</dc:subject>
        <dct:modified>2020-08-06</dct:modified>
        <dct:abstract>The following 4 tables accompany the peer-reviewed journal article GS Metson, J Lin, JE Compton, JA Harrison. Where have all the nutrients gone? Long-term Decoupling of Inputs and Outputs in the Willamette River Watershed, Oregon, USA. JGR Biogeoscience Values refer to the Willamette River Watershed, which was defined as the area draining to USGS gauge 14211720 (which is 29 018 km2 when delimiting using HydroSHEDs 15 arc-second flow direction maps (Lehner et al 2006)). These datasets were created May 2017. Authors and Affiliations: Genevieve S. Metson1,2†,3†,4†, Jiajia Lin2†,3†,5, John A. Harrison4 and Jana E. Compton3 1 Department of Physics, Chemistry, and Biology. Linköping University, Linköping, Sweden. 2 National Research Council, National Academies of Science, Washington, DC, USA 3 Pacific Ecological Systems Division, US Environmental Protection Agency, Corvallis, OR, USA 4 School of the Environment, Washington State University, Vancouver, WA, USA 5Oak Ridge Institute for Science and Education, Corvallis, OR, USA Corresponding author: Genevieve Metson (genevieve.metson@liu.se) † Affiliation at time of main research activities</dct:abstract>
        </csw:SummaryRecord>
        </csw:SearchResults>
        </csw:GetRecordsResponse>`;
    }

    // https://catalog.data.gov/csw-all?service=CSW&version=2.0.2&request=GetRecords&ElementSetName=full&typeNames=csw:Record&resultType=results&startPosition=1&maxRecords=10
    public getRecordsFull(body): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!--  pycsw 2.4.0  -->
<csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
<csw:SearchStatus timestamp="2020-08-18T13:00:00Z"/>
<csw:SearchResults nextRecord="11" numberOfRecordsMatched="207381" numberOfRecordsReturned="10" recordSchema="http://www.opengis.net/cat/csw/2.0.2" elementSet="full">
<csw:Record>
<dc:identifier>https://www.sec.gov/node/112391</dc:identifier>
<dc:title>Financial Statement and Notes Data Sets</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>XBRL filings</dc:subject>
<dct:modified>2017-07-20T18:10:06Z</dct:modified>
<dct:abstract>The data sets provide the text and detailed numeric information in all financial statements and their notes extracted from exhibits to corporate financial reports filed with the Commission using eXtensible Business Reporting Language (XBRL).</dct:abstract>
<dc:date>2017-07-20T18:10:06Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Economic and Risk Analysis'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/87721</dc:identifier>
<dc:title>Closed-End Fund Information</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>Data Sets</dc:subject>
<dc:subject>foiafreqdocs</dc:subject>
<dct:modified>2020-07-13T15:46:25Z</dct:modified>
<dct:abstract>This report provides basic identification information for all entities with an "active" filing status that are organized as closed-end investment companies (closed-end funds or CEFs).</dct:abstract>
<dc:date>2020-07-13T15:46:25Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Investment Management'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/86016</dc:identifier>
<dc:title>Information About Registered Investment Advisers and Exempt Reporting Advisers</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>foia-freq-doc</dc:subject>
<dct:modified>2019-06-03T09:48:09Z</dct:modified>
<dct:abstract>The Investment Adviser Information Reports' data is collected from electronic submissions of Form ADV by investment adviser firms to the Investment Adviser Registration Depository (IARD) system.</dct:abstract>
<dc:date>2019-06-03T09:48:09Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Investment Management'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/87756</dc:identifier>
<dc:title>Public Company Bankruptcy Cases Opened and Monitored</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>Bankruptcy</dc:subject>
<dct:modified>2017-05-05T07:30:36Z</dct:modified>
<dct:abstract>This file contains a list of the bankruptcy cases for public companies filed under Chapter 11 of the Bankruptcy Code opened and monitored since the fiscal year 2009.</dct:abstract>
<dc:date>2017-05-05T07:30:36Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Public Affairs'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/92646</dc:identifier>
<dc:title>Spreads and Depth by Individual Security</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>Data Sets</dc:subject>
<dct:modified>2017-05-05T09:15:27Z</dct:modified>
<dct:abstract>These datasets provide spreads and depth partitioned by individual ticker symbol and date for each day in 2013.</dct:abstract>
<dc:date>2017-05-05T09:15:27Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Trading and Markets'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://data.medicare.gov/api/views/ct36-nrcq</dc:identifier>
<dc:title>Supplier Directory Data</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>directory</dc:subject>
<dc:subject>medical equipment</dc:subject>
<dc:subject>supplier</dc:subject>
<dc:subject>supplies</dc:subject>
<dct:modified>2020-08-07</dct:modified>
<dct:abstract>A list of Suppliers that indicates the supplies carried at that location and the supplier's Medicare participation status.</dct:abstract>
<dc:date>2020-08-07</dc:date>
<dc:publisher>{u'@type': u'org:Organization', u'name': u'Centers for Medicare & Medicaid Services'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/86011</dc:identifier>
<dc:title>Fails-to-Deliver Data</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>foia-freq-doc</dc:subject>
<dct:modified>2018-07-02T12:12:50Z</dct:modified>
<dct:abstract>This text file contains the date, CUSIP numbers, ticker symbols, issuer name, price, and total number of fails-to-deliver (i.e., the balance level outstanding) recorded in the National Securities Clearing Corporation's ("NSCC") Continuous Net Settlement (CNS) system aggregated over all NSCC members.</dct:abstract>
<dc:date>2018-07-02T12:12:50Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Agency-Wide'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/115361</dc:identifier>
<dc:title>Mutual Fund Prospectus Risk/Return Summary Data Sets</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>Data Sets</dc:subject>
<dct:modified>2019-04-04T07:21:06Z</dct:modified>
<dct:abstract>The Mutual Fund Prospectus Risk/Return Summary Data Sets provides text and numeric information extracted from the risk/return summary section of mutual fund prospectuses.</dct:abstract>
<dc:date>2019-04-04T07:21:06Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Economic and Risk Analysis'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://www.sec.gov/node/87761</dc:identifier>
<dc:title>Investment Company Series and Class Information</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>market structure</dc:subject>
<dc:subject>foiafreqdocs</dc:subject>
<dct:modified>2017-09-15T17:31:58Z</dct:modified>
<dct:abstract>The Series and Class Report provides basic identification information for all active registered investment company series and classes have been issued IDs by the Commission.</dct:abstract>
<dc:date>2017-09-15T17:31:58Z</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Securities and Exchange Commission'}, u'name': u'Investment Management'}</dc:publisher>
</csw:Record>
<csw:Record>
<dc:identifier>https://doi.org/10.23719/1519181</dc:identifier>
<dc:title>Where have all the nutrients gone? Long-term Decoupling of Inputs and Outputs in the Willamette River Watershed, Oregon, USA</dc:title>
<dc:type>dataset</dc:type>
<dc:subject>phosphorus</dc:subject>
<dc:subject>nutrients</dc:subject>
<dc:subject>watersheds</dc:subject>
<dc:subject>balance</dc:subject>
<dc:subject>nitrogen</dc:subject>
<dct:modified>2020-08-06</dct:modified>
<dct:abstract>The following 4 tables accompany the peer-reviewed journal article GS Metson, J Lin, JE Compton, JA Harrison. Where have all the nutrients gone? Long-term Decoupling of Inputs and Outputs in the Willamette River Watershed, Oregon, USA. JGR Biogeoscience Values refer to the Willamette River Watershed, which was defined as the area draining to USGS gauge 14211720 (which is 29 018 km2 when delimiting using HydroSHEDs 15 arc-second flow direction maps (Lehner et al 2006)). These datasets were created May 2017. Authors and Affiliations: Genevieve S. Metson1,2†,3†,4†, Jiajia Lin2†,3†,5, John A. Harrison4 and Jana E. Compton3 1 Department of Physics, Chemistry, and Biology. Linköping University, Linköping, Sweden. 2 National Research Council, National Academies of Science, Washington, DC, USA 3 Pacific Ecological Systems Division, US Environmental Protection Agency, Corvallis, OR, USA 4 School of the Environment, Washington State University, Vancouver, WA, USA 5Oak Ridge Institute for Science and Education, Corvallis, OR, USA Corresponding author: Genevieve Metson (genevieve.metson@liu.se) † Affiliation at time of main research activities</dct:abstract>
<dc:date>2020-08-06</dc:date>
<dc:publisher>{u'subOrganizationOf': {u'subOrganizationOf': {u'name': u'U.S. Government'}, u'name': u'U.S. Environmental Protection Agency'}, u'name': u'U.S. EPA Office of Research and Development (ORD)'}</dc:publisher>
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


export class FakeGeotestCswServer {
    public getCapabilities(body): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <csw:Capabilities xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:inspire_ds="http://inspire.ec.europa.eu/schemas/inspire_ds/1.0" xmlns:inspire_com="http://inspire.ec.europa.eu/schemas/common/1.0" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd http://inspire.ec.europa.eu/schemas/inspire_ds/1.0 http://inspire.ec.europa.eu/schemas/inspire_ds/1.0/inspire_ds.xsd">
          <ows:ServiceIdentification>
            <ows:Title>EOC Catalogue</ows:Title>
            <ows:Abstract>This CSW Catalogue provides metadata for datasets and services of the Earth Observation Center (EOC) of the German Aerospace Center (DLR).</ows:Abstract>
            <ows:Keywords>
              <!-- Keywords are automatically added by GeoNetwork
              according to catalogue content. -->
              <ows:Keyword>Elevation</ows:Keyword>
              <ows:Keyword>Imagery base maps earth cover</ows:Keyword>
              <ows:Keyword>Orthoimagery</ows:Keyword>
              <ows:Keyword>Climatology, meteorology, atmosphere</ows:Keyword>
              <ows:Keyword>Land cover</ows:Keyword>
              <ows:Keyword>Atmospheric conditions</ows:Keyword>
              <ows:Keyword>DLR</ows:Keyword>
              <ows:Keyword>EOC</ows:Keyword>
              <ows:Keyword>Gesundheit und Sicherheit</ows:Keyword>
              <ows:Keyword>ZKI</ows:Keyword>
              <ows:Type>theme</ows:Type>
            </ows:Keywords>
            <ows:ServiceType>CSW</ows:ServiceType>
            <ows:ServiceTypeVersion>2.0.2</ows:ServiceTypeVersion>
            <ows:Fees>None</ows:Fees>
            <ows:AccessConstraints>None</ows:AccessConstraints>
          </ows:ServiceIdentification>
          <ows:ServiceProvider>
            <ows:ProviderName>DLR-DFD</ows:ProviderName>
            <ows:ProviderSite xlink:href="https://geotest.eoc.dlr.de:443/catalogue" />
            <ows:ServiceContact>
              <ows:IndividualName>admin admin</ows:IndividualName>
              <ows:PositionName>Administrator</ows:PositionName>
              <ows:ContactInfo>
                <ows:Phone>
                  <ows:Voice />
                  <ows:Facsimile />
                </ows:Phone>
                <ows:Address>
                  <ows:DeliveryPoint />
                  <ows:City />
                  <ows:AdministrativeArea />
                  <ows:PostalCode />
                  <ows:Country />
                  <ows:ElectronicMailAddress />
                </ows:Address>
                <ows:HoursOfService />
                <ows:ContactInstructions />
              </ows:ContactInfo>
              <ows:Role>pointOfContact</ows:Role>
            </ows:ServiceContact>
          </ows:ServiceProvider>
          <ows:OperationsMetadata>
            <ows:Operation name="GetCapabilities">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                </ows:HTTP>
              </ows:DCP>
              <ows:Parameter name="sections">
                <ows:Value>ServiceIdentification</ows:Value>
                <ows:Value>ServiceProvider</ows:Value>
                <ows:Value>OperationsMetadata</ows:Value>
                <ows:Value>Filter_Capabilities</ows:Value>
              </ows:Parameter>
              <ows:Constraint name="PostEncoding">
                <ows:Value>XML</ows:Value>
                <ows:Value>SOAP</ows:Value>
              </ows:Constraint>
            </ows:Operation>
            <ows:Operation name="DescribeRecord">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                </ows:HTTP>
              </ows:DCP>
              <ows:Parameter name="outputFormat">
                <ows:Value>application/xml</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="schemaLanguage">
                <ows:Value>http://www.w3.org/TR/xmlschema-1/</ows:Value>
              </ows:Parameter>
              <ows:Parameter xmlns:gfc="http://www.isotc211.org/2005/gfc" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:gmd="http://www.isotc211.org/2005/gmd" name="outputSchema">
                <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gfc</ows:Value>
                <ows:Value>http://www.w3.org/ns/dcat#</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
              </ows:Parameter>
              <ows:Constraint name="PostEncoding">
                <ows:Value>XML</ows:Value>
                <ows:Value>SOAP</ows:Value>
              </ows:Constraint>
            </ows:Operation>
            <ows:Operation name="GetDomain">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                </ows:HTTP>
              </ows:DCP>
            </ows:Operation>
            <ows:Operation name="GetRecords">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                </ows:HTTP>
              </ows:DCP>
              <!-- FIXME : Gets it from enum or conf -->
              <ows:Parameter name="resultType">
                <ows:Value>hits</ows:Value>
                <ows:Value>results</ows:Value>
                <ows:Value>validate</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="outputFormat">
                <ows:Value>application/xml</ows:Value>
              </ows:Parameter>
              <ows:Parameter xmlns:gfc="http://www.isotc211.org/2005/gfc" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:gmd="http://www.isotc211.org/2005/gmd" name="outputSchema">
                <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gfc</ows:Value>
                <ows:Value>http://www.w3.org/ns/dcat#</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
              </ows:Parameter>
              <ows:Parameter xmlns:gfc="http://www.isotc211.org/2005/gfc" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:gmd="http://www.isotc211.org/2005/gmd" name="typeNames">
                <ows:Value>csw:Record</ows:Value>
                <ows:Value>gfc:FC_FeatureCatalogue</ows:Value>
                <ows:Value>dcat</ows:Value>
                <ows:Value>gmd:MD_Metadata</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="CONSTRAINTLANGUAGE">
                <ows:Value>FILTER</ows:Value>
                <ows:Value>CQL_TEXT</ows:Value>
              </ows:Parameter>
              <ows:Constraint name="PostEncoding">
                <ows:Value>XML</ows:Value>
                <ows:Value>SOAP</ows:Value>
              </ows:Constraint>
              <ows:Constraint name="SupportedISOQueryables">
                <ows:Value>CreationDate</ows:Value>
                <ows:Value>GeographicDescriptionCode</ows:Value>
                <ows:Value>OperatesOn</ows:Value>
                <ows:Value>Modified</ows:Value>
                <ows:Value>DistanceUOM</ows:Value>
                <ows:Value>Operation</ows:Value>
                <ows:Value>ResourceIdentifier</ows:Value>
                <ows:Value>Format</ows:Value>
                <ows:Value>Identifier</ows:Value>
                <ows:Value>Language</ows:Value>
                <ows:Value>ServiceType</ows:Value>
                <ows:Value>OrganisationName</ows:Value>
                <ows:Value>KeywordType</ows:Value>
                <ows:Value>AnyText</ows:Value>
                <ows:Value>PublicationDate</ows:Value>
                <ows:Value>AlternateTitle</ows:Value>
                <ows:Value>Abstract</ows:Value>
                <ows:Value>HasSecurityConstraints</ows:Value>
                <ows:Value>Title</ows:Value>
                <ows:Value>CouplingType</ows:Value>
                <ows:Value>TopicCategory</ows:Value>
                <ows:Value>ParentIdentifier</ows:Value>
                <ows:Value>Subject</ows:Value>
                <ows:Value>ResourceLanguage</ows:Value>
                <ows:Value>TempExtent_end</ows:Value>
                <ows:Value>ServiceTypeVersion</ows:Value>
                <ows:Value>Type</ows:Value>
                <ows:Value>RevisionDate</ows:Value>
                <ows:Value>OperatesOnName</ows:Value>
                <ows:Value>Denominator</ows:Value>
                <ows:Value>DistanceValue</ows:Value>
                <ows:Value>TempExtent_begin</ows:Value>
                <ows:Value>OperatesOnIdentifier</ows:Value>
              </ows:Constraint>
              <ows:Constraint name="AdditionalQueryables">
                <ows:Value>SpecificationDate</ows:Value>
                <ows:Value>AccessConstraints</ows:Value>
                <ows:Value>ResponsiblePartyRole</ows:Value>
                <ows:Value>Degree</ows:Value>
                <ows:Value>Lineage</ows:Value>
                <ows:Value>OnlineResourceMimeType</ows:Value>
                <ows:Value>ConditionApplyingToAccessAndUse</ows:Value>
                <ows:Value>Date</ows:Value>
                <ows:Value>MetadataPointOfContact</ows:Value>
                <ows:Value>OnlineResourceType</ows:Value>
                <ows:Value>Relation</ows:Value>
                <ows:Value>SpecificationDateType</ows:Value>
                <ows:Value>Classification</ows:Value>
                <ows:Value>OtherConstraints</ows:Value>
                <ows:Value>SpecificationTitle</ows:Value>
              </ows:Constraint>
            </ows:Operation>
            <ows:Operation name="GetRecordById">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw" />
                </ows:HTTP>
              </ows:DCP>
              <ows:Parameter xmlns:gfc="http://www.isotc211.org/2005/gfc" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:gmd="http://www.isotc211.org/2005/gmd" name="outputSchema">
                <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gfc</ows:Value>
                <ows:Value>http://www.w3.org/ns/dcat#</ows:Value>
                <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="outputFormat">
                <ows:Value>application/xml</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="resultType">
                <ows:Value>hits</ows:Value>
                <ows:Value>results</ows:Value>
                <ows:Value>validate</ows:Value>
              </ows:Parameter>
              <ows:Parameter name="ElementSetName">
                <ows:Value>brief</ows:Value>
                <ows:Value>summary</ows:Value>
                <ows:Value>full</ows:Value>
              </ows:Parameter>
              <ows:Constraint name="PostEncoding">
                <ows:Value>XML</ows:Value>
                <ows:Value>SOAP</ows:Value>
              </ows:Constraint>
            </ows:Operation>
            <ows:Operation name="Transaction">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw-publication" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw-publication" />
                </ows:HTTP>
              </ows:DCP>
            </ows:Operation>
            <ows:Operation name="Harvest">
              <ows:DCP>
                <ows:HTTP>
                  <ows:Get xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw-publication" />
                  <ows:Post xlink:href="https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw-publication" />
                </ows:HTTP>
              </ows:DCP>
              <ows:Parameter name="ResourceType">
                <ows:Value>http://www.isotc211.org/schemas/2005/gmd/</ows:Value>
              </ows:Parameter>
            </ows:Operation>
            <ows:Parameter name="service">
              <ows:Value>http://www.opengis.net/cat/csw/2.0.2</ows:Value>
            </ows:Parameter>
            <ows:Parameter name="version">
              <ows:Value>2.0.2</ows:Value>
            </ows:Parameter>
            <ows:Constraint name="IsoProfiles">
              <ows:Value>http://www.isotc211.org/2005/gmd</ows:Value>
            </ows:Constraint>
            <ows:Constraint name="PostEncoding">
              <ows:Value>SOAP</ows:Value>
            </ows:Constraint>
            <inspire_ds:ExtendedCapabilities>
              <inspire_com:ResourceLocator>
                <inspire_com:URL>https://geotest.eoc.dlr.de:443/catalogue/srv/eng/csw?SERVICE=CSW&amp;VERSION=2.0.2&amp;REQUEST=GetCapabilities</inspire_com:URL>
                <inspire_com:MediaType>application/xml</inspire_com:MediaType>
              </inspire_com:ResourceLocator>
              <inspire_com:ResourceLocator>
                <inspire_com:URL>https://geotest.eoc.dlr.de:443/catalogue</inspire_com:URL>
                <inspire_com:MediaType>text/html</inspire_com:MediaType>
              </inspire_com:ResourceLocator>
              <inspire_com:ResourceType>service</inspire_com:ResourceType>
              <inspire_com:TemporalReference>
                <inspire_com:TemporalExtent>
                  <inspire_com:IntervalOfDates>
                    <inspire_com:StartingDate>2010-07-01T00:00:00</inspire_com:StartingDate>
                    <inspire_com:EndDate>2011-07-01T00:00:00</inspire_com:EndDate>
                  </inspire_com:IntervalOfDates>
                </inspire_com:TemporalExtent>
              </inspire_com:TemporalReference>
              <inspire_com:Conformity>
                <inspire_com:Specification xsi:type="inspire_com:citationInspireInteroperabilityRegulation_eng">
                  <inspire_com:Title>COMMISSION REGULATION (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services</inspire_com:Title>
                  <inspire_com:DateOfPublication>2010-12-08</inspire_com:DateOfPublication>
                  <inspire_com:URI>OJ:L:2010:323:0011:0102:EN:PDF</inspire_com:URI>
                  <inspire_com:ResourceLocator>
                    <inspire_com:URL>http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2010:323:0011:0102:EN:PDF</inspire_com:URL>
                    <inspire_com:MediaType>application/pdf</inspire_com:MediaType>
                  </inspire_com:ResourceLocator>
                </inspire_com:Specification>
                <inspire_com:Degree>notEvaluated</inspire_com:Degree>
              </inspire_com:Conformity>
              <inspire_com:MetadataPointOfContact>
                <inspire_com:OrganisationName />
                <inspire_com:EmailAddress />
              </inspire_com:MetadataPointOfContact>
              <inspire_com:MetadataDate>2010-07-15</inspire_com:MetadataDate>
              <inspire_com:SpatialDataServiceType>discovery</inspire_com:SpatialDataServiceType>
              <inspire_com:MandatoryKeyword xsi:type="inspire_com:classificationOfSpatialDataService">
                <inspire_com:KeywordValue>infoCatalogueService</inspire_com:KeywordValue>
              </inspire_com:MandatoryKeyword>
              <inspire_com:Keyword xsi:type="inspire_com:inspireTheme_eng">
                <inspire_com:OriginatingControlledVocabulary>
                  <inspire_com:Title>GEMET - INSPIRE themes</inspire_com:Title>
                  <inspire_com:DateOfPublication>2008-06-01</inspire_com:DateOfPublication>
                </inspire_com:OriginatingControlledVocabulary>
                <inspire_com:KeywordValue>Orthoimagery</inspire_com:KeywordValue>
              </inspire_com:Keyword>
              <inspire_com:SupportedLanguages>
                <!--
                List of supported languages
                -->
                <inspire_common:DefaultLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>eng</inspire_common:Language>
                </inspire_common:DefaultLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>fre</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>ger</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>spa</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>por</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>dut</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>fin</inspire_common:Language>
                </inspire_common:SupportedLanguage>
                <inspire_common:SupportedLanguage xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0">
                  <inspire_common:Language>ita</inspire_common:Language>
                </inspire_common:SupportedLanguage>
              </inspire_com:SupportedLanguages>
              <inspire_com:ResponseLanguage>
                <inspire_com:Language>eng</inspire_com:Language>
              </inspire_com:ResponseLanguage>
            </inspire_ds:ExtendedCapabilities>
          </ows:OperationsMetadata>
          <ogc:Filter_Capabilities>
            <ogc:Spatial_Capabilities>
              <ogc:GeometryOperands>
                <ogc:GeometryOperand>gml:Envelope</ogc:GeometryOperand>
                <ogc:GeometryOperand>gml:Point</ogc:GeometryOperand>
                <ogc:GeometryOperand>gml:LineString</ogc:GeometryOperand>
                <ogc:GeometryOperand>gml:Polygon</ogc:GeometryOperand>
              </ogc:GeometryOperands>
              <ogc:SpatialOperators>
                <ogc:SpatialOperator name="BBOX" />
                <ogc:SpatialOperator name="Equals" />
                <ogc:SpatialOperator name="Overlaps" />
                <ogc:SpatialOperator name="Disjoint" />
                <ogc:SpatialOperator name="Intersects" />
                <ogc:SpatialOperator name="Touches" />
                <ogc:SpatialOperator name="Crosses" />
                <ogc:SpatialOperator name="Within" />
                <ogc:SpatialOperator name="Contains" />
                <!--
                <ogc:SpatialOperator name="Beyond"/>
                <ogc:SpatialOperator name="DWithin"/>
                 The 'SpatialOperator' element can have a GeometryOperands child -->
              </ogc:SpatialOperators>
            </ogc:Spatial_Capabilities>
            <ogc:Scalar_Capabilities>
              <ogc:LogicalOperators />
              <ogc:ComparisonOperators>
                <ogc:ComparisonOperator>EqualTo</ogc:ComparisonOperator>
                <ogc:ComparisonOperator>Like</ogc:ComparisonOperator>
                <ogc:ComparisonOperator>LessThan</ogc:ComparisonOperator>
                <ogc:ComparisonOperator>GreaterThan</ogc:ComparisonOperator>
                <!-- LessThanOrEqualTo is in OGC Filter Spec, LessThanEqualTo is in OGC CSW schema -->
                <ogc:ComparisonOperator>LessThanEqualTo</ogc:ComparisonOperator>
                <!--<ogc:ComparisonOperator>LessThanOrEqualTo</ogc:ComparisonOperator>-->
                <!-- GreaterThanOrEqualTo is in OGC Filter Spec, GreaterThanEqualTo is in OGC CSW schema -->
                <ogc:ComparisonOperator>GreaterThanEqualTo</ogc:ComparisonOperator>
                <!--<ogc:ComparisonOperator>GreaterThanOrEqualTo</ogc:ComparisonOperator>-->
                <ogc:ComparisonOperator>NotEqualTo</ogc:ComparisonOperator>
                <ogc:ComparisonOperator>Between</ogc:ComparisonOperator>
                <ogc:ComparisonOperator>NullCheck</ogc:ComparisonOperator>
                <!-- FIXME : Check NullCheck operation is available -->
              </ogc:ComparisonOperators>
            </ogc:Scalar_Capabilities>
            <ogc:Id_Capabilities>
              <ogc:EID />
              <ogc:FID />
            </ogc:Id_Capabilities>
          </ogc:Filter_Capabilities>
        </csw:Capabilities>`;
    }

    // view-source:https://geotest.eoc.dlr.de/catalogue/srv/eng/csw?service=CSW&request=DescribeRecord&version=2.0.2
    public describeRecord(body): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <csw:DescribeRecordResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SchemaComponent targetNamespace="http://www.opengis.net/cat/csw/2.0.2" schemaLanguage="http://www.w3.org/XML/Schema">
            <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows" id="csw-record" targetNamespace="http://www.opengis.net/cat/csw/2.0.2" elementFormDefault="qualified" version="2.0.2">
              <xsd:annotation>
                <xsd:appinfo>
                  <dc:identifier>http://schemas.opengis.net/csw/2.0.2/record.xsd</dc:identifier>
                </xsd:appinfo>
                <xsd:documentation xml:lang="en">This schema defines the basic record types that must be supported
              by all CSW implementations. These correspond to full, summary, and
              brief views based on DCMI metadata terms.</xsd:documentation>
              </xsd:annotation>
              <xsd:import namespace="http://purl.org/dc/terms/" schemaLocation="rec-dcterms.xsd" />
              <xsd:import namespace="http://purl.org/dc/elements/1.1/" schemaLocation="rec-dcmes.xsd" />
              <xsd:import namespace="http://www.opengis.net/ows" schemaLocation="../../ows/1.0.0/owsAll.xsd" />
              <xsd:element name="AbstractRecord" id="AbstractRecord" type="csw:AbstractRecordType" abstract="true" />
              <xsd:complexType name="AbstractRecordType" id="AbstractRecordType" abstract="true" />
              <xsd:element name="DCMIRecord" type="csw:DCMIRecordType" substitutionGroup="csw:AbstractRecord" />
              <xsd:complexType name="DCMIRecordType">
                <xsd:annotation>
                  <xsd:documentation xml:lang="en">This type encapsulates all of the standard DCMI metadata terms,
                including the Dublin Core refinements; these terms may be mapped
                to the profile-specific information model.</xsd:documentation>
                </xsd:annotation>
                <xsd:complexContent>
                  <xsd:extension base="csw:AbstractRecordType">
                    <xsd:sequence>
                      <xsd:group ref="dct:DCMI-terms" />
                    </xsd:sequence>
                  </xsd:extension>
                </xsd:complexContent>
              </xsd:complexType>
              <xsd:element name="BriefRecord" type="csw:BriefRecordType" substitutionGroup="csw:AbstractRecord" />
              <xsd:complexType name="BriefRecordType" final="#all">
                <xsd:annotation>
                  <xsd:documentation xml:lang="en">This type defines a brief representation of the common record
                format. It extends AbstractRecordType to include only the
                dc:identifier and dc:type properties.</xsd:documentation>
                </xsd:annotation>
                <xsd:complexContent>
                  <xsd:extension base="csw:AbstractRecordType">
                    <xsd:sequence>
                      <xsd:element ref="dc:identifier" minOccurs="1" maxOccurs="unbounded" />
                      <xsd:element ref="dc:title" minOccurs="1" maxOccurs="unbounded" />
                      <xsd:element ref="dc:type" minOccurs="0" />
                      <xsd:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded" />
                    </xsd:sequence>
                  </xsd:extension>
                </xsd:complexContent>
              </xsd:complexType>
              <xsd:element name="SummaryRecord" type="csw:SummaryRecordType" substitutionGroup="csw:AbstractRecord" />
              <xsd:complexType name="SummaryRecordType" final="#all">
                <xsd:annotation>
                  <xsd:documentation xml:lang="en">This type defines a summary representation of the common record
                format. It extends AbstractRecordType to include the core
                properties.</xsd:documentation>
                </xsd:annotation>
                <xsd:complexContent>
                  <xsd:extension base="csw:AbstractRecordType">
                    <xsd:sequence>
                      <xsd:element ref="dc:identifier" minOccurs="1" maxOccurs="unbounded" />
                      <xsd:element ref="dc:title" minOccurs="1" maxOccurs="unbounded" />
                      <xsd:element ref="dc:type" minOccurs="0" />
                      <xsd:element ref="dc:subject" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="dc:format" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="dc:relation" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="dct:modified" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="dct:abstract" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="dct:spatial" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded" />
                    </xsd:sequence>
                  </xsd:extension>
                </xsd:complexContent>
              </xsd:complexType>
              <xsd:element name="Record" type="csw:RecordType" substitutionGroup="csw:AbstractRecord" />
              <xsd:complexType name="RecordType" final="#all">
                <xsd:annotation>
                  <xsd:documentation xml:lang="en">This type extends DCMIRecordType to add ows:BoundingBox;
                it may be used to specify a spatial envelope for the
                catalogued resource.</xsd:documentation>
                </xsd:annotation>
                <xsd:complexContent>
                  <xsd:extension base="csw:DCMIRecordType">
                    <xsd:sequence>
                      <xsd:element name="AnyText" type="csw:EmptyType" minOccurs="0" maxOccurs="unbounded" />
                      <xsd:element ref="ows:BoundingBox" minOccurs="0" maxOccurs="unbounded" />
                    </xsd:sequence>
                  </xsd:extension>
                </xsd:complexContent>
              </xsd:complexType>
              <xsd:complexType name="EmptyType" />
            </xsd:schema>
          </csw:SchemaComponent>
          <csw:SchemaComponent targetNamespace="http://www.opengis.net/cat/csw/2.0.2" schemaLanguage="http://www.w3.org/XML/Schema">
            <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" targetNamespace="http://www.isotc211.org/2005/gmd" elementFormDefault="qualified" version="0.1">
              <!-- ================================= Annotation ================================ -->
              <xs:annotation>
                <xs:documentation>This file was generated from ISO TC/211 UML class diagrams == 01-26-2005
              12:40:05 ======</xs:documentation>
              </xs:annotation>
              <!-- ================================== Imports ================================== -->
              <xs:import namespace="http://www.isotc211.org/2005/gco" schemaLocation="../gco/gco.xsd" />
              <xs:include schemaLocation="../gmd/constraints.xsd" />
              <xs:include schemaLocation="../gmd/distribution.xsd" />
              <xs:include schemaLocation="../gmd/maintenance.xsd" />
              <!-- ########################################################################### -->
              <!-- ########################################################################### -->
              <!-- ================================== Classes ================================= -->
              <xs:complexType name="AbstractMD_Identification_Type" abstract="true">
                <xs:annotation>
                  <xs:documentation>Basic information about data</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="citation" type="gmd:CI_Citation_PropertyType" />
                      <xs:element name="abstract" type="gco:CharacterString_PropertyType" />
                      <xs:element name="purpose" type="gco:CharacterString_PropertyType" minOccurs="0" />
                      <xs:element name="credit" type="gco:CharacterString_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="status" type="gmd:MD_ProgressCode_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="pointOfContact" type="gmd:CI_ResponsibleParty_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="resourceMaintenance" type="gmd:MD_MaintenanceInformation_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="graphicOverview" type="gmd:MD_BrowseGraphic_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="resourceFormat" type="gmd:MD_Format_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="descriptiveKeywords" type="gmd:MD_Keywords_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="resourceSpecificUsage" type="gmd:MD_Usage_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="resourceConstraints" type="gmd:MD_Constraints_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="aggregationInfo" type="gmd:MD_AggregateInformation_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="AbstractMD_Identification" type="gmd:AbstractMD_Identification_Type" abstract="true" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_Identification_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:AbstractMD_Identification" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_BrowseGraphic_Type">
                <xs:annotation>
                  <xs:documentation>Graphic that provides an illustration of the dataset (should include a
                legend for the graphic)</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="fileName" type="gco:CharacterString_PropertyType" />
                      <xs:element name="fileDescription" type="gco:CharacterString_PropertyType" minOccurs="0" />
                      <xs:element name="fileType" type="gco:CharacterString_PropertyType" minOccurs="0" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_BrowseGraphic" type="gmd:MD_BrowseGraphic_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_BrowseGraphic_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_BrowseGraphic" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_DataIdentification_Type">
                <xs:complexContent>
                  <xs:extension base="gmd:AbstractMD_Identification_Type">
                    <xs:sequence>
                      <xs:element name="spatialRepresentationType" type="gmd:MD_SpatialRepresentationTypeCode_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="spatialResolution" type="gmd:MD_Resolution_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="language" type="gco:CharacterString_PropertyType" maxOccurs="unbounded" />
                      <xs:element name="characterSet" type="gmd:MD_CharacterSetCode_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="topicCategory" type="gmd:MD_TopicCategoryCode_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="environmentDescription" type="gco:CharacterString_PropertyType" minOccurs="0" />
                      <xs:element name="extent" type="gmd:EX_Extent_PropertyType" minOccurs="0" maxOccurs="unbounded" />
                      <xs:element name="supplementalInformation" type="gco:CharacterString_PropertyType" minOccurs="0" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_DataIdentification" type="gmd:MD_DataIdentification_Type" substitutionGroup="gmd:AbstractMD_Identification" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_DataIdentification_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_DataIdentification" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_ServiceIdentification_Type">
                <xs:annotation>
                  <xs:documentation>See 19119 for further info</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gmd:AbstractMD_Identification_Type" />
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_ServiceIdentification" type="gmd:MD_ServiceIdentification_Type" substitutionGroup="gmd:AbstractMD_Identification" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_ServiceIdentification_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_ServiceIdentification" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_RepresentativeFraction_Type">
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="denominator" type="gco:Integer_PropertyType" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_RepresentativeFraction" type="gmd:MD_RepresentativeFraction_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_RepresentativeFraction_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_RepresentativeFraction" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_Usage_Type">
                <xs:annotation>
                  <xs:documentation>Brief description of ways in which the dataset is currently used.</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="specificUsage" type="gco:CharacterString_PropertyType" />
                      <xs:element name="usageDateTime" type="gco:DateTime_PropertyType" minOccurs="0" />
                      <xs:element name="userDeterminedLimitations" type="gco:CharacterString_PropertyType" minOccurs="0" />
                      <xs:element name="userContactInfo" type="gmd:CI_ResponsibleParty_PropertyType" maxOccurs="unbounded" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_Usage" type="gmd:MD_Usage_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_Usage_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_Usage" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_Keywords_Type">
                <xs:annotation>
                  <xs:documentation>Keywords, their type and reference source</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="keyword" type="gco:CharacterString_PropertyType" maxOccurs="unbounded" />
                      <xs:element name="type" type="gmd:MD_KeywordTypeCode_PropertyType" minOccurs="0" />
                      <xs:element name="thesaurusName" type="gmd:CI_Citation_PropertyType" minOccurs="0" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_Keywords" type="gmd:MD_Keywords_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_Keywords_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_Keywords" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="DS_Association_Type">
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence />
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="DS_Association" type="gmd:DS_Association_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="DS_Association_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:DS_Association" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_AggregateInformation_Type">
                <xs:annotation>
                  <xs:documentation>Encapsulates the dataset aggregation information</xs:documentation>
                </xs:annotation>
                <xs:complexContent>
                  <xs:extension base="gco:AbstractObject_Type">
                    <xs:sequence>
                      <xs:element name="aggregateDataSetName" type="gmd:CI_Citation_PropertyType" minOccurs="0" />
                      <xs:element name="aggregateDataSetIdentifier" type="gmd:MD_Identifier_PropertyType" minOccurs="0" />
                      <xs:element name="associationType" type="gmd:DS_AssociationTypeCode_PropertyType" />
                      <xs:element name="initiativeType" type="gmd:DS_InitiativeTypeCode_PropertyType" minOccurs="0" />
                    </xs:sequence>
                  </xs:extension>
                </xs:complexContent>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_AggregateInformation" type="gmd:MD_AggregateInformation_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_AggregateInformation_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_AggregateInformation" />
                </xs:sequence>
                <xs:attributeGroup ref="gco:ObjectReference" />
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:complexType name="MD_Resolution_Type">
                <xs:choice>
                  <xs:element name="equivalentScale" type="gmd:MD_RepresentativeFraction_PropertyType" />
                  <xs:element name="distance" type="gco:Distance_PropertyType" />
                </xs:choice>
              </xs:complexType>
              <!-- ........................................................................ -->
              <xs:element name="MD_Resolution" type="gmd:MD_Resolution_Type" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_Resolution_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_Resolution" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <xs:simpleType name="MD_TopicCategoryCode_Type">
                <xs:annotation>
                  <xs:documentation>High-level geospatial data thematic classification to assist in the grouping
                and search of available geospatial datasets</xs:documentation>
                </xs:annotation>
                <xs:restriction base="xs:string">
                  <xs:enumeration value="farming" />
                  <xs:enumeration value="biota" />
                  <xs:enumeration value="boundaries" />
                  <xs:enumeration value="climatologyMeteorologyAtmosphere" />
                  <xs:enumeration value="economy" />
                  <xs:enumeration value="elevation" />
                  <xs:enumeration value="environment" />
                  <xs:enumeration value="geoscientificInformation" />
                  <xs:enumeration value="health" />
                  <xs:enumeration value="imageryBaseMapsEarthCover" />
                  <xs:enumeration value="intelligenceMilitary" />
                  <xs:enumeration value="inlandWaters" />
                  <xs:enumeration value="location" />
                  <xs:enumeration value="oceans" />
                  <xs:enumeration value="planningCadastre" />
                  <xs:enumeration value="society" />
                  <xs:enumeration value="structure" />
                  <xs:enumeration value="transportation" />
                  <xs:enumeration value="utilitiesCommunication" />
                </xs:restriction>
              </xs:simpleType>
              <!-- ........................................................................ -->
              <xs:element name="MD_TopicCategoryCode" type="gmd:MD_TopicCategoryCode_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_TopicCategoryCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_TopicCategoryCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="MD_CharacterSetCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_CharacterSetCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_CharacterSetCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="MD_SpatialRepresentationTypeCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_SpatialRepresentationTypeCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_SpatialRepresentationTypeCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="MD_ProgressCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_ProgressCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_ProgressCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="MD_KeywordTypeCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="MD_KeywordTypeCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:MD_KeywordTypeCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="DS_AssociationTypeCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="DS_AssociationTypeCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:DS_AssociationTypeCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
              <!-- ........................................................................ -->
              <xs:element name="DS_InitiativeTypeCode" type="gco:CodeListValue_Type" substitutionGroup="gco:CharacterString" />
              <!-- ........................................................................ -->
              <xs:complexType name="DS_InitiativeTypeCode_PropertyType">
                <xs:sequence minOccurs="0">
                  <xs:element ref="gmd:DS_InitiativeTypeCode" />
                </xs:sequence>
                <xs:attribute ref="gco:nilReason" />
              </xs:complexType>
              <!-- =========================================================================== -->
            </xs:schema>
          </csw:SchemaComponent>
        </csw:DescribeRecordResponse>
        
        `;
    }

    // view-source:https://geotest.eoc.dlr.de/catalogue/srv/eng/csw?service=CSW&request=GetRecordById&version=2.0.2&id=49bbfedf-a826-46e7-9142-766a4a599206
    public getRecordById(body): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordByIdResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2">
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
        </csw:GetRecordByIdResponse>
        
        `;
    }

    // view-source:https://geotest.eoc.dlr.de/catalogue/srv/eng/csw?service=CSW&request=GetRecords&version=2.0.2&ElementSetName=brief&typenames=csw:Record&outputFormat=application/xml&outputSchema=http://www.opengis.net/cat/csw/2.0.2&namespace=csw:http://www.opengis.org/cat/csw&resultType=results&maxRecords=5&CONSTRAINTLANGUAGE=CQL_TEXT&constraint=%22title%20like%20%27%hysical%%27%22
    public getRecordsBrief(body): string {
        return `
        <?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SearchStatus timestamp="2020-08-18T15:05:22" />
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
        </csw:GetRecordsResponse>
        
        `;
    }

    // view-source:https://geotest.eoc.dlr.de/catalogue/srv/eng/csw?service=CSW&request=GetRecords&version=2.0.2&ElementSetName=summary&typenames=csw:Record&outputFormat=application/xml&outputSchema=http://www.opengis.net/cat/csw/2.0.2&namespace=csw:http://www.opengis.org/cat/csw&resultType=results&maxRecords=5&CONSTRAINTLANGUAGE=CQL_TEXT&constraint=%22title%20like%20%27%hysical%%27%22
    public getRecordsSummary(body): string {
        return `
        <?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SearchStatus timestamp="2020-08-18T15:05:59" />
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
        </csw:GetRecordsResponse>
        
        `;
    }

    // view-source:https://geotest.eoc.dlr.de/catalogue/srv/eng/csw?service=CSW&request=GetRecords&version=2.0.2&ElementSetName=full&typenames=csw:Record&outputFormat=application/xml&outputSchema=http://www.opengis.net/cat/csw/2.0.2&namespace=csw:http://www.opengis.org/cat/csw&resultType=results&maxRecords=5&CONSTRAINTLANGUAGE=CQL_TEXT&constraint=%22title%20like%20%27%hysical%%27%22
    public getRecordsFull(body): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <csw:GetRecordsResponse xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
          <csw:SearchStatus timestamp="2020-08-18T15:06:29" />
          <csw:SearchResults numberOfRecordsMatched="159" numberOfRecordsReturned="5" elementSet="full" nextRecord="6">
            <csw:Record xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:dct="http://purl.org/dc/terms/" xmlns:ows="http://www.opengis.net/ows">
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
          </csw:SearchResults>
        </csw:GetRecordsResponse>
        
        `;
    }

    public getDomain(body): string {
        console.warn('FakeGeotestCswServer.getDomain: This method is currently not yet implemented. Falling back to FakeDataGovCswServer.');
        const fdg = new FakeDataGovCswServer();
        return fdg.getDomain(body);
    }
}