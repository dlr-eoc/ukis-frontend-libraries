var wps_Module_Factory = function () {
  var wps = {
    name: 'wps',
    defaultElementNamespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1',
    typeInfos: [{
        localName: 'ValueType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }]
      }, {
        localName: 'ProcessBriefType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ProcessBriefType'
        },
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'profile',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Profile',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            }
          }, {
            name: 'wsdl',
            elementName: {
              localPart: 'WSDL',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.WSDL'
          }, {
            name: 'processVersion',
            required: true,
            attributeName: {
              localPart: 'processVersion',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TitleEltType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'titleEltType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'NoValues',
        typeName: null
      }, {
        localName: 'OperationsMetadata',
        typeName: null,
        propertyInfos: [{
            name: 'operation',
            required: true,
            minOccurs: 2,
            collection: true,
            elementName: 'Operation',
            typeInfo: '.Operation'
          }, {
            name: 'parameter',
            minOccurs: 0,
            collection: true,
            elementName: 'Parameter',
            typeInfo: '.DomainType'
          }, {
            name: 'constraint',
            minOccurs: 0,
            collection: true,
            elementName: 'Constraint',
            typeInfo: '.DomainType'
          }, {
            name: 'extendedCapabilities',
            elementName: 'ExtendedCapabilities',
            typeInfo: 'AnyType'
          }]
      }, {
        localName: 'LanguageStringType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'DescriptionType'
        },
        propertyInfos: [{
            name: 'identifier',
            required: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'title',
            required: true,
            elementName: 'Title',
            typeInfo: '.LanguageStringType'
          }, {
            name: '_abstract',
            elementName: 'Abstract',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }]
      }, {
        localName: 'ResourceType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'resourceType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'label',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AcceptFormatsType',
        propertyInfos: [{
            name: 'outputFormat',
            minOccurs: 0,
            collection: true,
            elementName: 'OutputFormat'
          }]
      }, {
        localName: 'CapabilitiesBaseType',
        propertyInfos: [{
            name: 'serviceIdentification',
            elementName: 'ServiceIdentification',
            typeInfo: '.ServiceIdentification'
          }, {
            name: 'serviceProvider',
            elementName: 'ServiceProvider',
            typeInfo: '.ServiceProvider'
          }, {
            name: 'operationsMetadata',
            elementName: 'OperationsMetadata',
            typeInfo: '.OperationsMetadata'
          }, {
            name: 'version',
            required: true,
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'updateSequence',
            attributeName: {
              localPart: 'updateSequence'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ArcType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'arcType'
        },
        propertyInfos: [{
            name: 'locatorTitle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'from',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'from',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'to',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'to',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DataType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'DataType'
        },
        propertyInfos: [{
            name: 'complexData',
            required: true,
            elementName: {
              localPart: 'ComplexData',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ComplexDataType'
          }, {
            name: 'literalData',
            required: true,
            elementName: {
              localPart: 'LiteralData',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.LiteralDataType'
          }, {
            name: 'boundingBoxData',
            required: true,
            elementName: {
              localPart: 'BoundingBoxData',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.BoundingBoxType'
          }]
      }, {
        localName: 'ExecuteResponse.ProcessOutputs',
        typeName: null,
        propertyInfos: [{
            name: 'output',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Output',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.OutputDataType'
          }]
      }, {
        localName: 'SupportedUOMsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'SupportedUOMsType'
        },
        propertyInfos: [{
            name: '_default',
            required: true,
            elementName: {
              localPart: 'Default'
            },
            typeInfo: '.SupportedUOMsType.Default'
          }, {
            name: 'supported',
            required: true,
            elementName: {
              localPart: 'Supported'
            },
            typeInfo: '.UOMsType'
          }]
      }, {
        localName: 'ProcessOfferings',
        typeName: null,
        propertyInfos: [{
            name: 'process',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Process',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessBriefType'
          }]
      }, {
        localName: 'WGS84BoundingBoxType',
        baseTypeInfo: '.BoundingBoxType'
      }, {
        localName: 'ServiceReferenceType',
        baseTypeInfo: '.ReferenceType',
        propertyInfos: [{
            name: 'requestMessage',
            required: true,
            elementName: 'RequestMessage',
            typeInfo: 'AnyType'
          }, {
            name: 'requestMessageReference',
            required: true,
            elementName: 'RequestMessageReference'
          }]
      }, {
        localName: 'ProcessDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ProcessDescriptionType'
        },
        baseTypeInfo: '.ProcessBriefType',
        propertyInfos: [{
            name: 'dataInputs',
            elementName: {
              localPart: 'DataInputs'
            },
            typeInfo: '.ProcessDescriptionType.DataInputs'
          }, {
            name: 'processOutputs',
            required: true,
            elementName: {
              localPart: 'ProcessOutputs'
            },
            typeInfo: '.ProcessDescriptionType.ProcessOutputs'
          }, {
            name: 'storeSupported',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'storeSupported'
            },
            type: 'attribute'
          }, {
            name: 'statusSupported',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'statusSupported'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BasicIdentificationType',
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'identifier',
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }]
      }, {
        localName: 'DomainType',
        baseTypeInfo: '.UnNamedDomainType',
        propertyInfos: [{
            name: 'name',
            required: true,
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ProcessDescriptionType.DataInputs',
        typeName: null,
        propertyInfos: [{
            name: 'input',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Input'
            },
            typeInfo: '.InputDescriptionType'
          }]
      }, {
        localName: 'OutputDataType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'OutputDataType'
        },
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'reference',
            required: true,
            elementName: {
              localPart: 'Reference',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.OutputReferenceType'
          }, {
            name: 'data',
            required: true,
            elementName: {
              localPart: 'Data',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DataType'
          }]
      }, {
        localName: 'AcceptVersionsType',
        propertyInfos: [{
            name: 'version',
            required: true,
            collection: true,
            elementName: 'Version'
          }]
      }, {
        localName: 'SupportedUOMsType.Default',
        typeName: null,
        propertyInfos: [{
            name: 'uom',
            required: true,
            elementName: 'UOM',
            typeInfo: '.DomainMetadataType'
          }]
      }, {
        localName: 'StatusType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'StatusType'
        },
        propertyInfos: [{
            name: 'processAccepted',
            required: true,
            elementName: {
              localPart: 'ProcessAccepted',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            }
          }, {
            name: 'processStarted',
            required: true,
            elementName: {
              localPart: 'ProcessStarted',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessStartedType'
          }, {
            name: 'processPaused',
            required: true,
            elementName: {
              localPart: 'ProcessPaused',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessStartedType'
          }, {
            name: 'processSucceeded',
            required: true,
            elementName: {
              localPart: 'ProcessSucceeded',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            }
          }, {
            name: 'processFailed',
            required: true,
            elementName: {
              localPart: 'ProcessFailed',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessFailedType'
          }, {
            name: 'creationTime',
            required: true,
            typeInfo: 'DateTime',
            attributeName: {
              localPart: 'creationTime'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Operation',
        typeName: null,
        propertyInfos: [{
            name: 'dcp',
            required: true,
            collection: true,
            elementName: 'DCP',
            typeInfo: '.DCP'
          }, {
            name: 'parameter',
            minOccurs: 0,
            collection: true,
            elementName: 'Parameter',
            typeInfo: '.DomainType'
          }, {
            name: 'constraint',
            minOccurs: 0,
            collection: true,
            elementName: 'Constraint',
            typeInfo: '.DomainType'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }, {
            name: 'name',
            required: true,
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexDataCombinationsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ComplexDataCombinationsType'
        },
        propertyInfos: [{
            name: 'format',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Format'
            },
            typeInfo: '.ComplexDataDescriptionType'
          }]
      }, {
        localName: 'CodeType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InputDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'InputDescriptionType'
        },
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'complexData',
            required: true,
            elementName: {
              localPart: 'ComplexData'
            },
            typeInfo: '.SupportedComplexDataInputType'
          }, {
            name: 'literalData',
            required: true,
            elementName: {
              localPart: 'LiteralData'
            },
            typeInfo: '.LiteralInputType'
          }, {
            name: 'boundingBoxData',
            required: true,
            elementName: {
              localPart: 'BoundingBoxData'
            },
            typeInfo: '.SupportedCRSsType'
          }, {
            name: 'minOccurs',
            required: true,
            typeInfo: 'NonNegativeInteger',
            attributeName: {
              localPart: 'minOccurs'
            },
            type: 'attribute'
          }, {
            name: 'maxOccurs',
            required: true,
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'maxOccurs'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexDataDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ComplexDataDescriptionType'
        },
        propertyInfos: [{
            name: 'mimeType',
            required: true,
            elementName: {
              localPart: 'MimeType'
            }
          }, {
            name: 'encoding',
            elementName: {
              localPart: 'Encoding'
            }
          }, {
            name: 'schema',
            elementName: {
              localPart: 'Schema'
            }
          }]
      }, {
        localName: 'SupportedComplexDataInputType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'SupportedComplexDataInputType'
        },
        baseTypeInfo: '.SupportedComplexDataType',
        propertyInfos: [{
            name: 'maximumMegabytes',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'maximumMegabytes'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ValuesReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ValuesReferenceType'
        },
        propertyInfos: [{
            name: 'reference',
            attributeName: {
              localPart: 'reference',
              namespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            type: 'attribute'
          }, {
            name: 'valuesForm',
            attributeName: {
              localPart: 'valuesForm'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RequestMethodType',
        baseTypeInfo: '.OnlineResourceType',
        propertyInfos: [{
            name: 'constraint',
            minOccurs: 0,
            collection: true,
            elementName: 'Constraint',
            typeInfo: '.DomainType'
          }]
      }, {
        localName: 'ReferenceGroupType',
        baseTypeInfo: '.BasicIdentificationType',
        propertyInfos: [{
            name: 'abstractReferenceBase',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractReferenceBase',
            typeInfo: '.AbstractReferenceBaseType',
            type: 'elementRef'
          }]
      }, {
        localName: 'IdentificationType',
        baseTypeInfo: '.BasicIdentificationType',
        propertyInfos: [{
            name: 'boundingBox',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'BoundingBox',
            typeInfo: '.BoundingBoxType',
            type: 'elementRef'
          }, {
            name: 'outputFormat',
            minOccurs: 0,
            collection: true,
            elementName: 'OutputFormat'
          }, {
            name: 'availableCRS',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AvailableCRS',
            type: 'elementRef'
          }]
      }, {
        localName: 'DCP',
        typeName: null,
        propertyInfos: [{
            name: 'http',
            required: true,
            elementName: 'HTTP',
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'ContactType',
        propertyInfos: [{
            name: 'phone',
            elementName: 'Phone',
            typeInfo: '.TelephoneType'
          }, {
            name: 'address',
            elementName: 'Address',
            typeInfo: '.AddressType'
          }, {
            name: 'onlineResource',
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResourceType'
          }, {
            name: 'hoursOfService',
            elementName: 'HoursOfService'
          }, {
            name: 'contactInstructions',
            elementName: 'ContactInstructions'
          }]
      }, {
        localName: 'ValuesReference',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'reference',
            required: true,
            attributeName: {
              localPart: 'reference',
              namespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DatasetDescriptionSummaryBaseType',
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'wgs84BoundingBox',
            minOccurs: 0,
            collection: true,
            elementName: 'WGS84BoundingBox',
            typeInfo: '.WGS84BoundingBoxType'
          }, {
            name: 'identifier',
            required: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'boundingBox',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'BoundingBox',
            typeInfo: '.BoundingBoxType',
            type: 'elementRef'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }, {
            name: 'datasetDescriptionSummary',
            minOccurs: 0,
            collection: true,
            elementName: 'DatasetDescriptionSummary',
            typeInfo: '.DatasetDescriptionSummaryBaseType'
          }]
      }, {
        localName: 'OnlineResourceType',
        propertyInfos: [{
            name: 'type',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OutputDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'OutputDescriptionType'
        },
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'complexOutput',
            required: true,
            elementName: {
              localPart: 'ComplexOutput'
            },
            typeInfo: '.SupportedComplexDataType'
          }, {
            name: 'literalOutput',
            required: true,
            elementName: {
              localPart: 'LiteralOutput'
            },
            typeInfo: '.LiteralOutputType'
          }, {
            name: 'boundingBoxOutput',
            required: true,
            elementName: {
              localPart: 'BoundingBoxOutput'
            },
            typeInfo: '.SupportedCRSsType'
          }]
      }, {
        localName: 'GetCapabilitiesType',
        propertyInfos: [{
            name: 'acceptVersions',
            elementName: 'AcceptVersions',
            typeInfo: '.AcceptVersionsType'
          }, {
            name: 'sections',
            elementName: 'Sections',
            typeInfo: '.SectionsType'
          }, {
            name: 'acceptFormats',
            elementName: 'AcceptFormats',
            typeInfo: '.AcceptFormatsType'
          }, {
            name: 'updateSequence',
            attributeName: {
              localPart: 'updateSequence'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AnyValue',
        typeName: null
      }, {
        localName: 'DataInputsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'DataInputsType'
        },
        propertyInfos: [{
            name: 'input',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Input',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.InputType'
          }]
      }, {
        localName: 'CRSsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'CRSsType'
        },
        propertyInfos: [{
            name: 'crs',
            required: true,
            collection: true,
            elementName: {
              localPart: 'CRS'
            }
          }]
      }, {
        localName: 'BoundingBoxType',
        propertyInfos: [{
            name: 'lowerCorner',
            required: true,
            elementName: 'LowerCorner',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Double'
            }
          }, {
            name: 'upperCorner',
            required: true,
            elementName: 'UpperCorner',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Double'
            }
          }, {
            name: 'crs',
            attributeName: {
              localPart: 'crs'
            },
            type: 'attribute'
          }, {
            name: 'dimensions',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'dimensions'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ResponsiblePartyType',
        propertyInfos: [{
            name: 'individualName',
            elementName: 'IndividualName'
          }, {
            name: 'organisationName',
            elementName: 'OrganisationName'
          }, {
            name: 'positionName',
            elementName: 'PositionName'
          }, {
            name: 'contactInfo',
            elementName: 'ContactInfo',
            typeInfo: '.ContactType'
          }, {
            name: 'role',
            required: true,
            elementName: 'Role',
            typeInfo: '.CodeType'
          }]
      }, {
        localName: 'GetCapabilities',
        typeName: null,
        propertyInfos: [{
            name: 'acceptVersions',
            elementName: {
              localPart: 'AcceptVersions',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.AcceptVersionsType'
          }, {
            name: 'service',
            required: true,
            attributeName: {
              localPart: 'service'
            },
            type: 'attribute'
          }, {
            name: 'language',
            attributeName: {
              localPart: 'language'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ReferenceType',
        baseTypeInfo: '.AbstractReferenceBaseType',
        propertyInfos: [{
            name: 'identifier',
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: '_abstract',
            minOccurs: 0,
            collection: true,
            elementName: 'Abstract',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'format',
            elementName: 'Format'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }]
      }, {
        localName: 'Extended',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'extended'
        },
        propertyInfos: [{
            name: 'extendedModel',
            minOccurs: 0,
            collection: true,
            elementTypeInfos: [{
                elementName: {
                  localPart: 'title',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.TitleEltType'
              }, {
                elementName: {
                  localPart: 'resource',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ResourceType'
              }, {
                elementName: {
                  localPart: 'locator',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.LocatorType'
              }, {
                elementName: {
                  localPart: 'arc',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ArcType'
              }],
            type: 'elements'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UOMsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'UOMsType'
        },
        propertyInfos: [{
            name: 'uom',
            required: true,
            collection: true,
            elementName: 'UOM',
            typeInfo: '.DomainMetadataType'
          }]
      }, {
        localName: 'Execute',
        typeName: null,
        baseTypeInfo: '.RequestBaseType',
        propertyInfos: [{
            name: 'identifier',
            required: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'dataInputs',
            elementName: {
              localPart: 'DataInputs',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DataInputsType'
          }, {
            name: 'responseForm',
            elementName: {
              localPart: 'ResponseForm',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ResponseFormType'
          }]
      }, {
        localName: 'ProcessStartedType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ProcessStartedType'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'percentCompleted',
            typeInfo: 'Int',
            attributeName: {
              localPart: 'percentCompleted'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AddressType',
        propertyInfos: [{
            name: 'deliveryPoint',
            minOccurs: 0,
            collection: true,
            elementName: 'DeliveryPoint'
          }, {
            name: 'city',
            elementName: 'City'
          }, {
            name: 'administrativeArea',
            elementName: 'AdministrativeArea'
          }, {
            name: 'postalCode',
            elementName: 'PostalCode'
          }, {
            name: 'country',
            elementName: 'Country'
          }, {
            name: 'electronicMailAddress',
            minOccurs: 0,
            collection: true,
            elementName: 'ElectronicMailAddress'
          }]
      }, {
        localName: 'SupportedCRSsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'SupportedCRSsType'
        },
        propertyInfos: [{
            name: '_default',
            required: true,
            elementName: {
              localPart: 'Default'
            },
            typeInfo: '.SupportedCRSsType.Default'
          }, {
            name: 'supported',
            required: true,
            elementName: {
              localPart: 'Supported'
            },
            typeInfo: '.CRSsType'
          }]
      }, {
        localName: 'ResponseFormType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ResponseFormType'
        },
        propertyInfos: [{
            name: 'responseDocument',
            required: true,
            elementName: {
              localPart: 'ResponseDocument',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ResponseDocumentType'
          }, {
            name: 'rawDataOutput',
            required: true,
            elementName: {
              localPart: 'RawDataOutput',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.OutputDefinitionType'
          }]
      }, {
        localName: 'LocatorType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'locatorType'
        },
        propertyInfos: [{
            name: 'locatorTitle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'label',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ProcessDescriptionType.ProcessOutputs',
        typeName: null,
        propertyInfos: [{
            name: 'output',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Output'
            },
            typeInfo: '.OutputDescriptionType'
          }]
      }, {
        localName: 'AbstractReferenceBaseType',
        propertyInfos: [{
            name: 'type',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            type: 'attribute'
          }, {
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'WSDL',
        typeName: null,
        propertyInfos: [{
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ProcessDescriptions',
        typeName: null,
        baseTypeInfo: '.ResponseBaseType',
        propertyInfos: [{
            name: 'processDescription',
            required: true,
            collection: true,
            elementName: {
              localPart: 'ProcessDescription'
            },
            typeInfo: '.ProcessDescriptionType'
          }]
      }, {
        localName: 'InputReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'InputReferenceType'
        },
        propertyInfos: [{
            name: 'header',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Header',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.InputReferenceType.Header'
          }, {
            name: 'body',
            required: true,
            elementName: {
              localPart: 'Body',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: 'AnyType'
          }, {
            name: 'bodyReference',
            required: true,
            elementName: {
              localPart: 'BodyReference',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.InputReferenceType.BodyReference'
          }, {
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'method',
            attributeName: {
              localPart: 'method'
            },
            type: 'attribute'
          }, {
            name: 'mimeType',
            attributeName: {
              localPart: 'mimeType'
            },
            type: 'attribute'
          }, {
            name: 'encoding',
            attributeName: {
              localPart: 'encoding'
            },
            type: 'attribute'
          }, {
            name: 'schema',
            attributeName: {
              localPart: 'schema'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'KeywordsType',
        propertyInfos: [{
            name: 'keyword',
            required: true,
            collection: true,
            elementName: 'Keyword',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'type',
            elementName: 'Type',
            typeInfo: '.CodeType'
          }]
      }, {
        localName: 'InputReferenceType.BodyReference',
        typeName: null,
        propertyInfos: [{
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UnNamedDomainType',
        propertyInfos: [{
            name: 'allowedValues',
            required: true,
            elementName: 'AllowedValues',
            typeInfo: '.AllowedValues'
          }, {
            name: 'anyValue',
            required: true,
            elementName: 'AnyValue',
            typeInfo: '.AnyValue'
          }, {
            name: 'noValues',
            required: true,
            elementName: 'NoValues',
            typeInfo: '.NoValues'
          }, {
            name: 'valuesReference',
            required: true,
            elementName: 'ValuesReference',
            typeInfo: '.ValuesReference'
          }, {
            name: 'defaultValue',
            elementName: 'DefaultValue',
            typeInfo: '.ValueType'
          }, {
            name: 'meaning',
            elementName: 'Meaning',
            typeInfo: '.DomainMetadataType'
          }, {
            name: 'dataType',
            elementName: 'DataType',
            typeInfo: '.DomainMetadataType'
          }, {
            name: 'uom',
            required: true,
            elementName: 'UOM',
            typeInfo: '.DomainMetadataType'
          }, {
            name: 'referenceSystem',
            required: true,
            elementName: 'ReferenceSystem',
            typeInfo: '.DomainMetadataType'
          }, {
            name: 'metadata',
            minOccurs: 0,
            collection: true,
            elementName: 'Metadata',
            typeInfo: '.MetadataType'
          }]
      }, {
        localName: 'LiteralInputType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'LiteralInputType'
        },
        baseTypeInfo: '.LiteralOutputType',
        propertyInfos: [{
            name: 'allowedValues',
            required: true,
            elementName: 'AllowedValues',
            typeInfo: '.AllowedValues'
          }, {
            name: 'anyValue',
            required: true,
            elementName: 'AnyValue',
            typeInfo: '.AnyValue'
          }, {
            name: 'valuesReference',
            required: true,
            elementName: {
              localPart: 'ValuesReference'
            },
            typeInfo: '.ValuesReferenceType'
          }, {
            name: 'defaultValue',
            elementName: {
              localPart: 'DefaultValue'
            }
          }]
      }, {
        localName: 'OutputDefinitionsType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'OutputDefinitionsType'
        },
        propertyInfos: [{
            name: 'output',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Output',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DocumentOutputDefinitionType'
          }]
      }, {
        localName: 'SectionsType',
        propertyInfos: [{
            name: 'section',
            minOccurs: 0,
            collection: true,
            elementName: 'Section'
          }]
      }, {
        localName: 'ExecuteResponse',
        typeName: null,
        baseTypeInfo: '.ResponseBaseType',
        propertyInfos: [{
            name: 'process',
            required: true,
            elementName: {
              localPart: 'Process',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessBriefType'
          }, {
            name: 'status',
            required: true,
            elementName: {
              localPart: 'Status',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.StatusType'
          }, {
            name: 'dataInputs',
            elementName: {
              localPart: 'DataInputs',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DataInputsType'
          }, {
            name: 'outputDefinitions',
            elementName: {
              localPart: 'OutputDefinitions',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.OutputDefinitionsType'
          }, {
            name: 'processOutputs',
            elementName: {
              localPart: 'ProcessOutputs',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ExecuteResponse.ProcessOutputs'
          }, {
            name: 'serviceInstance',
            required: true,
            attributeName: {
              localPart: 'serviceInstance'
            },
            type: 'attribute'
          }, {
            name: 'statusLocation',
            attributeName: {
              localPart: 'statusLocation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ExceptionReport',
        typeName: null,
        propertyInfos: [{
            name: 'exception',
            required: true,
            collection: true,
            elementName: 'Exception',
            typeInfo: '.ExceptionType'
          }, {
            name: 'version',
            required: true,
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RequestBaseType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'RequestBaseType'
        },
        propertyInfos: [{
            name: 'service',
            required: true,
            attributeName: {
              localPart: 'service'
            },
            type: 'attribute'
          }, {
            name: 'version',
            required: true,
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'language',
            attributeName: {
              localPart: 'language'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexDataCombinationType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ComplexDataCombinationType'
        },
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: {
              localPart: 'Format'
            },
            typeInfo: '.ComplexDataDescriptionType'
          }]
      }, {
        localName: 'Languages.Default',
        typeName: null,
        propertyInfos: [{
            name: 'language',
            required: true,
            elementName: 'Language',
            typeInfo: 'Language'
          }]
      }, {
        localName: 'WPSCapabilitiesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'WPSCapabilitiesType'
        },
        baseTypeInfo: '.CapabilitiesBaseType',
        propertyInfos: [{
            name: 'processOfferings',
            required: true,
            elementName: {
              localPart: 'ProcessOfferings',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.ProcessOfferings'
          }, {
            name: 'languages',
            required: true,
            elementName: {
              localPart: 'Languages',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.Languages'
          }, {
            name: 'wsdl',
            elementName: {
              localPart: 'WSDL',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.WSDL'
          }, {
            name: 'service',
            required: true,
            typeInfo: 'AnySimpleType',
            attributeName: {
              localPart: 'service'
            },
            type: 'attribute'
          }, {
            name: 'lang',
            required: true,
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TelephoneType',
        propertyInfos: [{
            name: 'voice',
            minOccurs: 0,
            collection: true,
            elementName: 'Voice'
          }, {
            name: 'facsimile',
            minOccurs: 0,
            collection: true,
            elementName: 'Facsimile'
          }]
      }, {
        localName: 'InputType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'InputType'
        },
        propertyInfos: [{
            name: 'identifier',
            required: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'title',
            elementName: 'Title',
            typeInfo: '.LanguageStringType'
          }, {
            name: '_abstract',
            elementName: 'Abstract',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'reference',
            required: true,
            elementName: {
              localPart: 'Reference',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.InputReferenceType'
          }, {
            name: 'data',
            required: true,
            elementName: {
              localPart: 'Data',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DataType'
          }]
      }, {
        localName: 'HTTP',
        typeName: null,
        propertyInfos: [{
            name: 'getOrPost',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'Get',
                typeInfo: '.RequestMethodType'
              }, {
                elementName: 'Post',
                typeInfo: '.RequestMethodType'
              }],
            type: 'elementRefs'
          }]
      }, {
        localName: 'ProcessFailedType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ProcessFailedType'
        },
        propertyInfos: [{
            name: 'exceptionReport',
            required: true,
            elementName: 'ExceptionReport',
            typeInfo: '.ExceptionReport'
          }]
      }, {
        localName: 'ExceptionType',
        propertyInfos: [{
            name: 'exceptionText',
            minOccurs: 0,
            collection: true,
            elementName: 'ExceptionText'
          }, {
            name: 'exceptionCode',
            required: true,
            attributeName: {
              localPart: 'exceptionCode'
            },
            type: 'attribute'
          }, {
            name: 'locator',
            attributeName: {
              localPart: 'locator'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LiteralDataType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'LiteralDataType'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'dataType',
            attributeName: {
              localPart: 'dataType'
            },
            type: 'attribute'
          }, {
            name: 'uom',
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DocumentOutputDefinitionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'DocumentOutputDefinitionType'
        },
        baseTypeInfo: '.OutputDefinitionType',
        propertyInfos: [{
            name: 'title',
            elementName: 'Title',
            typeInfo: '.LanguageStringType'
          }, {
            name: '_abstract',
            elementName: 'Abstract',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'asReference',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'asReference'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DescribeProcess',
        typeName: null,
        baseTypeInfo: '.RequestBaseType',
        propertyInfos: [{
            name: 'identifier',
            required: true,
            collection: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }]
      }, {
        localName: 'Simple',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'simple'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ServiceProvider',
        typeName: null,
        propertyInfos: [{
            name: 'providerName',
            required: true,
            elementName: 'ProviderName'
          }, {
            name: 'providerSite',
            elementName: 'ProviderSite',
            typeInfo: '.OnlineResourceType'
          }, {
            name: 'serviceContact',
            required: true,
            elementName: 'ServiceContact',
            typeInfo: '.ResponsiblePartySubsetType'
          }]
      }, {
        localName: 'ComplexDataType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ComplexDataType'
        },
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'content',
            collection: true,
            allowTypedObject: false,
            type: 'anyElement'
          }, {
            name: 'mimeType',
            attributeName: {
              localPart: 'mimeType'
            },
            type: 'attribute'
          }, {
            name: 'encoding',
            attributeName: {
              localPart: 'encoding'
            },
            type: 'attribute'
          }, {
            name: 'schema',
            attributeName: {
              localPart: 'schema'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ResponsiblePartySubsetType',
        propertyInfos: [{
            name: 'individualName',
            elementName: 'IndividualName'
          }, {
            name: 'positionName',
            elementName: 'PositionName'
          }, {
            name: 'contactInfo',
            elementName: 'ContactInfo',
            typeInfo: '.ContactType'
          }, {
            name: 'role',
            elementName: 'Role',
            typeInfo: '.CodeType'
          }]
      }, {
        localName: 'ContentsBaseType',
        propertyInfos: [{
            name: 'datasetDescriptionSummary',
            minOccurs: 0,
            collection: true,
            elementName: 'DatasetDescriptionSummary',
            typeInfo: '.DatasetDescriptionSummaryBaseType'
          }, {
            name: 'otherSource',
            minOccurs: 0,
            collection: true,
            elementName: 'OtherSource',
            typeInfo: '.MetadataType'
          }]
      }, {
        localName: 'DescriptionType',
        propertyInfos: [{
            name: 'title',
            minOccurs: 0,
            collection: true,
            elementName: 'Title',
            typeInfo: '.LanguageStringType'
          }, {
            name: '_abstract',
            minOccurs: 0,
            collection: true,
            elementName: 'Abstract',
            typeInfo: '.LanguageStringType'
          }, {
            name: 'keywords',
            minOccurs: 0,
            collection: true,
            elementName: 'Keywords',
            typeInfo: '.KeywordsType'
          }]
      }, {
        localName: 'GetResourceByIdType',
        propertyInfos: [{
            name: 'resourceID',
            minOccurs: 0,
            collection: true,
            elementName: 'ResourceID'
          }, {
            name: 'outputFormat',
            elementName: 'OutputFormat'
          }, {
            name: 'service',
            required: true,
            attributeName: {
              localPart: 'service'
            },
            type: 'attribute'
          }, {
            name: 'version',
            required: true,
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DomainMetadataType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'reference',
            attributeName: {
              localPart: 'reference',
              namespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LiteralOutputType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'LiteralOutputType'
        },
        propertyInfos: [{
            name: 'dataType',
            elementName: 'DataType',
            typeInfo: '.DomainMetadataType'
          }, {
            name: 'uoMs',
            elementName: {
              localPart: 'UOMs'
            },
            typeInfo: '.SupportedUOMsType'
          }]
      }, {
        localName: 'ResponseBaseType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ResponseBaseType'
        },
        propertyInfos: [{
            name: 'service',
            required: true,
            attributeName: {
              localPart: 'service'
            },
            type: 'attribute'
          }, {
            name: 'version',
            required: true,
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'lang',
            required: true,
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SupportedCRSsType.Default',
        typeName: null,
        propertyInfos: [{
            name: 'crs',
            required: true,
            elementName: {
              localPart: 'CRS'
            }
          }]
      }, {
        localName: 'RangeType',
        propertyInfos: [{
            name: 'minimumValue',
            elementName: 'MinimumValue',
            typeInfo: '.ValueType'
          }, {
            name: 'maximumValue',
            elementName: 'MaximumValue',
            typeInfo: '.ValueType'
          }, {
            name: 'spacing',
            elementName: 'Spacing',
            typeInfo: '.ValueType'
          }, {
            name: 'rangeClosure',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'rangeClosure',
              namespaceURI: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OutputDefinitionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'OutputDefinitionType'
        },
        propertyInfos: [{
            name: 'identifier',
            required: true,
            elementName: 'Identifier',
            typeInfo: '.CodeType'
          }, {
            name: 'uom',
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }, {
            name: 'mimeType',
            attributeName: {
              localPart: 'mimeType'
            },
            type: 'attribute'
          }, {
            name: 'encoding',
            attributeName: {
              localPart: 'encoding'
            },
            type: 'attribute'
          }, {
            name: 'schema',
            attributeName: {
              localPart: 'schema'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Languages',
        typeName: null,
        propertyInfos: [{
            name: '_default',
            required: true,
            elementName: {
              localPart: 'Default',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.Languages.Default'
          }, {
            name: 'supported',
            required: true,
            elementName: {
              localPart: 'Supported',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.LanguagesType'
          }]
      }, {
        localName: 'ServiceIdentification',
        typeName: null,
        baseTypeInfo: '.DescriptionType',
        propertyInfos: [{
            name: 'serviceType',
            required: true,
            elementName: 'ServiceType',
            typeInfo: '.CodeType'
          }, {
            name: 'serviceTypeVersion',
            required: true,
            collection: true,
            elementName: 'ServiceTypeVersion'
          }, {
            name: 'profile',
            minOccurs: 0,
            collection: true,
            elementName: 'Profile'
          }, {
            name: 'fees',
            elementName: 'Fees'
          }, {
            name: 'accessConstraints',
            minOccurs: 0,
            collection: true,
            elementName: 'AccessConstraints'
          }]
      }, {
        localName: 'SupportedComplexDataType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'SupportedComplexDataType'
        },
        propertyInfos: [{
            name: '_default',
            required: true,
            elementName: {
              localPart: 'Default'
            },
            typeInfo: '.ComplexDataCombinationType'
          }, {
            name: 'supported',
            required: true,
            elementName: {
              localPart: 'Supported'
            },
            typeInfo: '.ComplexDataCombinationsType'
          }]
      }, {
        localName: 'MetadataType',
        propertyInfos: [{
            name: 'abstractMetaData',
            elementName: 'AbstractMetaData',
            typeInfo: 'AnyType'
          }, {
            name: 'about',
            attributeName: {
              localPart: 'about'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ManifestType',
        baseTypeInfo: '.BasicIdentificationType',
        propertyInfos: [{
            name: 'referenceGroup',
            required: true,
            collection: true,
            elementName: 'ReferenceGroup',
            typeInfo: '.ReferenceGroupType'
          }]
      }, {
        localName: 'ResponseDocumentType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'ResponseDocumentType'
        },
        propertyInfos: [{
            name: 'output',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Output',
              namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            typeInfo: '.DocumentOutputDefinitionType'
          }, {
            name: 'storeExecuteResponse',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'storeExecuteResponse'
            },
            type: 'attribute'
          }, {
            name: 'lineage',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'lineage'
            },
            type: 'attribute'
          }, {
            name: 'status',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'status'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AllowedValues',
        typeName: null,
        propertyInfos: [{
            name: 'valueOrRange',
            required: true,
            collection: true,
            elementTypeInfos: [{
                elementName: 'Value',
                typeInfo: '.ValueType'
              }, {
                elementName: 'Range',
                typeInfo: '.RangeType'
              }],
            type: 'elements'
          }]
      }, {
        localName: 'InputReferenceType.Header',
        typeName: null,
        propertyInfos: [{
            name: 'key',
            required: true,
            attributeName: {
              localPart: 'key'
            },
            type: 'attribute'
          }, {
            name: 'value',
            required: true,
            attributeName: {
              localPart: 'value'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LanguagesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'LanguagesType'
        },
        propertyInfos: [{
            name: 'language',
            required: true,
            collection: true,
            elementName: 'Language',
            typeInfo: 'Language'
          }]
      }, {
        localName: 'OutputReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0',
          localPart: 'OutputReferenceType'
        },
        propertyInfos: [{
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href'
            },
            type: 'attribute'
          }, {
            name: 'mimeType',
            attributeName: {
              localPart: 'mimeType'
            },
            type: 'attribute'
          }, {
            name: 'encoding',
            attributeName: {
              localPart: 'encoding'
            },
            type: 'attribute'
          }, {
            name: 'schema',
            attributeName: {
              localPart: 'schema'
            },
            type: 'attribute'
          }]
      }, {
        type: 'enumInfo',
        localName: 'TypeType',
        baseTypeInfo: 'Token',
        values: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }, {
        type: 'enumInfo',
        localName: 'ShowType',
        baseTypeInfo: 'Token',
        values: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        type: 'enumInfo',
        localName: 'ActuateType',
        baseTypeInfo: 'Token',
        values: ['onLoad', 'onRequest', 'other', 'none']
      }],
    elementInfos: [{
        elementName: 'Identifier',
        typeInfo: '.CodeType'
      }, {
        elementName: 'DataType',
        typeInfo: '.DomainMetadataType'
      }, {
        elementName: {
          localPart: 'ProcessOfferings',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.ProcessOfferings'
      }, {
        elementName: 'AnyValue',
        typeInfo: '.AnyValue'
      }, {
        elementName: {
          localPart: 'arc',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.ArcType'
      }, {
        elementName: 'AbstractReferenceBase',
        typeInfo: '.AbstractReferenceBaseType'
      }, {
        elementName: 'GetResourceByID',
        typeInfo: '.GetResourceByIdType'
      }, {
        elementName: 'OtherSource',
        typeInfo: '.MetadataType'
      }, {
        elementName: 'Keywords',
        typeInfo: '.KeywordsType'
      }, {
        elementName: {
          localPart: 'Capabilities',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.WPSCapabilitiesType'
      }, {
        elementName: 'MinimumValue',
        typeInfo: '.ValueType'
      }, {
        elementName: 'BoundingBox',
        typeInfo: '.BoundingBoxType'
      }, {
        elementName: {
          localPart: 'DescribeProcess',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.DescribeProcess'
      }, {
        elementName: 'IndividualName'
      }, {
        elementName: 'ReferenceSystem',
        typeInfo: '.DomainMetadataType'
      }, {
        elementName: 'ExceptionReport',
        typeInfo: '.ExceptionReport'
      }, {
        elementName: 'Metadata',
        typeInfo: '.MetadataType'
      }, {
        elementName: 'ReferenceGroup',
        typeInfo: '.ReferenceGroupType'
      }, {
        elementName: 'ContactInfo',
        typeInfo: '.ContactType'
      }, {
        elementName: 'OperationsMetadata',
        typeInfo: '.OperationsMetadata'
      }, {
        elementName: 'AvailableCRS'
      }, {
        elementName: 'PositionName'
      }, {
        elementName: {
          localPart: 'WSDL',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.WSDL'
      }, {
        elementName: 'ServiceIdentification',
        typeInfo: '.ServiceIdentification'
      }, {
        elementName: 'Post',
        typeInfo: '.RequestMethodType',
        scope: '.HTTP'
      }, {
        elementName: 'ServiceReference',
        typeInfo: '.ServiceReferenceType',
        substitutionHead: 'Reference'
      }, {
        elementName: {
          localPart: 'ExecuteResponse',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.ExecuteResponse'
      }, {
        elementName: 'Exception',
        typeInfo: '.ExceptionType'
      }, {
        elementName: {
          localPart: 'GetCapabilities',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.GetCapabilities'
      }, {
        elementName: 'Reference',
        typeInfo: '.ReferenceType',
        substitutionHead: 'AbstractReferenceBase'
      }, {
        elementName: {
          localPart: 'locator',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.LocatorType'
      }, {
        elementName: {
          localPart: 'ProcessDescriptions',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.ProcessDescriptions'
      }, {
        elementName: 'HTTP',
        typeInfo: '.HTTP'
      }, {
        elementName: 'Range',
        typeInfo: '.RangeType'
      }, {
        elementName: 'DatasetDescriptionSummary',
        typeInfo: '.DatasetDescriptionSummaryBaseType'
      }, {
        elementName: 'Fees'
      }, {
        elementName: 'GetCapabilities',
        typeInfo: '.GetCapabilitiesType'
      }, {
        elementName: 'DCP',
        typeInfo: '.DCP'
      }, {
        elementName: 'InputData',
        typeInfo: '.ManifestType'
      }, {
        elementName: 'WGS84BoundingBox',
        typeInfo: '.WGS84BoundingBoxType',
        substitutionHead: 'BoundingBox'
      }, {
        elementName: 'PointOfContact',
        typeInfo: '.ResponsiblePartyType'
      }, {
        elementName: 'Language',
        typeInfo: 'Language'
      }, {
        elementName: 'UOM',
        typeInfo: '.DomainMetadataType'
      }, {
        elementName: 'Meaning',
        typeInfo: '.DomainMetadataType'
      }, {
        elementName: 'AccessConstraints'
      }, {
        elementName: {
          localPart: 'resource',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.ResourceType'
      }, {
        elementName: {
          localPart: 'Languages',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.Languages'
      }, {
        elementName: 'Role',
        typeInfo: '.CodeType'
      }, {
        elementName: 'Value',
        typeInfo: '.ValueType'
      }, {
        elementName: 'Spacing',
        typeInfo: '.ValueType'
      }, {
        elementName: 'Resource',
        typeInfo: 'AnyType'
      }, {
        elementName: 'ValuesReference',
        typeInfo: '.ValuesReference'
      }, {
        elementName: {
          localPart: 'Execute',
          namespaceURI: 'http:\/\/www.opengis.net\/wps\/1.0.0'
        },
        typeInfo: '.Execute'
      }, {
        elementName: 'Operation',
        typeInfo: '.Operation'
      }, {
        elementName: 'OperationResponse',
        typeInfo: '.ManifestType'
      }, {
        elementName: 'NoValues',
        typeInfo: '.NoValues'
      }, {
        elementName: 'Abstract',
        typeInfo: '.LanguageStringType'
      }, {
        elementName: 'OrganisationName'
      }, {
        elementName: 'AllowedValues',
        typeInfo: '.AllowedValues'
      }, {
        elementName: 'OutputFormat'
      }, {
        elementName: 'DefaultValue',
        typeInfo: '.ValueType'
      }, {
        elementName: 'Get',
        typeInfo: '.RequestMethodType',
        scope: '.HTTP'
      }, {
        elementName: {
          localPart: 'title',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.TitleEltType'
      }, {
        elementName: 'ServiceProvider',
        typeInfo: '.ServiceProvider'
      }, {
        elementName: 'AbstractMetaData',
        typeInfo: 'AnyType'
      }, {
        elementName: 'Title',
        typeInfo: '.LanguageStringType'
      }, {
        elementName: 'MaximumValue',
        typeInfo: '.ValueType'
      }, {
        elementName: 'SupportedCRS',
        substitutionHead: 'AvailableCRS'
      }, {
        elementName: 'ExtendedCapabilities',
        typeInfo: 'AnyType'
      }, {
        elementName: 'Manifest',
        typeInfo: '.ManifestType'
      }]
  };
  return {
    wps: wps
  };
};
if (typeof define === 'function' && define.amd) {
  define([], wps_Module_Factory);
}
else {
  var wps_Module = wps_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.wps = wps_Module.wps;
  }
  else {
    var wps = wps_Module.wps;
  }
}