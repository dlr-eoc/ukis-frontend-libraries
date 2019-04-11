import * as Primitive from '../../xml-primitives';
import * as gco from './gco';
import * as gml from '../../www.opengis.net/gml/3.2';
import * as gsr from './gsr';
import * as gss from './gss';
import * as gts from './gts';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/iso/19139/20070417/gmd/applicationSchema.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/citation.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/constraints.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/content.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/dataQuality.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/distribution.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/extent.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/freeText.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/gmd.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/identification.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/maintenance.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/metadataApplication.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/metadataEntity.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/metadataExtension.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/portrayalCatalogue.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/referenceSystem.xsd
// http://schemas.opengis.net/iso/19139/20070417/gmd/spatialRepresentation.xsd


declare module './gco' {
export interface _CharacterStringProxyType {
	MD_ObligationCode?: MD_ObligationCode_Type;
	MD_DatatypeCode?: gco.CodeListValue_Type;
	MD_PixelOrientationCode?: MD_PixelOrientationCode_Type;
	MD_TopologyLevelCode?: gco.CodeListValue_Type;
	MD_GeometricObjectTypeCode?: gco.CodeListValue_Type;
	MD_CellGeometryCode?: gco.CodeListValue_Type;
	MD_DimensionNameTypeCode?: gco.CodeListValue_Type;
	MD_CoverageContentTypeCode?: gco.CodeListValue_Type;
	MD_ImagingConditionCode?: gco.CodeListValue_Type;
	DQ_EvaluationMethodTypeCode?: gco.CodeListValue_Type;
	LocalisedCharacterString?: LocalisedCharacterString_Type;
	LanguageCode?: gco.CodeListValue_Type;
	Country?: gco.CodeListValue_Type;
	CI_RoleCode?: gco.CodeListValue_Type;
	CI_PresentationFormCode?: gco.CodeListValue_Type;
	CI_OnLineFunctionCode?: gco.CodeListValue_Type;
	CI_DateTypeCode?: gco.CodeListValue_Type;
	MD_TopicCategoryCode?: MD_TopicCategoryCode_Type;
	MD_CharacterSetCode?: gco.CodeListValue_Type;
	MD_SpatialRepresentationTypeCode?: gco.CodeListValue_Type;
	MD_ProgressCode?: gco.CodeListValue_Type;
	MD_KeywordTypeCode?: gco.CodeListValue_Type;
	DS_AssociationTypeCode?: gco.CodeListValue_Type;
	DS_InitiativeTypeCode?: gco.CodeListValue_Type;
	MD_ClassificationCode?: gco.CodeListValue_Type;
	MD_RestrictionCode?: gco.CodeListValue_Type;
	MD_DistributionUnits?: gco.CodeListValue_Type;
	MD_MediumFormatCode?: gco.CodeListValue_Type;
	MD_MediumNameCode?: gco.CodeListValue_Type;
	MD_MaintenanceFrequencyCode?: gco.CodeListValue_Type;
	MD_ScopeCode?: gco.CodeListValue_Type;
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractDQ_Completeness_Type extends _AbstractDQ_Element_Type {}
export interface AbstractDQ_Completeness_Type extends _AbstractDQ_Completeness_Type { constructor: { new(): AbstractDQ_Completeness_Type }; }
export var AbstractDQ_Completeness_Type: { new(): AbstractDQ_Completeness_Type };

interface _AbstractDQ_CompletenessProxyType extends BaseType {
	DQ_CompletenessOmission?: DQ_CompletenessOmission_Type;
	DQ_CompletenessCommission?: DQ_CompletenessCommission_Type;
}
interface AbstractDQ_CompletenessProxyType extends _AbstractDQ_CompletenessProxyType { constructor: { new(): AbstractDQ_CompletenessProxyType }; }

interface _AbstractDQ_Element_Type extends gco._AbstractObject_Type {
	dateTime?: gco.DateTime_PropertyType[];
	evaluationMethodDescription?: gco.CharacterString_PropertyType;
	evaluationMethodType?: DQ_EvaluationMethodTypeCode_PropertyType;
	evaluationProcedure?: CI_Citation_PropertyType;
	measureDescription?: gco.CharacterString_PropertyType;
	measureIdentification?: MD_Identifier_PropertyType;
	nameOfMeasure?: gco.CharacterString_PropertyType[];
	result: DQ_Result_PropertyType[];
}
export interface AbstractDQ_Element_Type extends _AbstractDQ_Element_Type { constructor: { new(): AbstractDQ_Element_Type }; }
export var AbstractDQ_Element_Type: { new(): AbstractDQ_Element_Type };

interface _AbstractDQ_ElementProxyType extends _AbstractDQ_PositionalAccuracyProxyType, _AbstractDQ_TemporalAccuracyProxyType, _AbstractDQ_ThematicAccuracyProxyType, _AbstractDQ_LogicalConsistencyProxyType, _AbstractDQ_CompletenessProxyType {}
interface AbstractDQ_ElementProxyType extends _AbstractDQ_ElementProxyType { constructor: { new(): AbstractDQ_ElementProxyType }; }

interface _AbstractDQ_LogicalConsistency_Type extends _AbstractDQ_Element_Type {}
export interface AbstractDQ_LogicalConsistency_Type extends _AbstractDQ_LogicalConsistency_Type { constructor: { new(): AbstractDQ_LogicalConsistency_Type }; }
export var AbstractDQ_LogicalConsistency_Type: { new(): AbstractDQ_LogicalConsistency_Type };

interface _AbstractDQ_LogicalConsistencyProxyType extends BaseType {
	DQ_TopologicalConsistency?: DQ_TopologicalConsistency_Type;
	DQ_FormatConsistency?: DQ_FormatConsistency_Type;
	DQ_DomainConsistency?: DQ_DomainConsistency_Type;
	DQ_ConceptualConsistency?: DQ_ConceptualConsistency_Type;
}
interface AbstractDQ_LogicalConsistencyProxyType extends _AbstractDQ_LogicalConsistencyProxyType { constructor: { new(): AbstractDQ_LogicalConsistencyProxyType }; }

interface _AbstractDQ_PositionalAccuracy_Type extends _AbstractDQ_Element_Type {}
export interface AbstractDQ_PositionalAccuracy_Type extends _AbstractDQ_PositionalAccuracy_Type { constructor: { new(): AbstractDQ_PositionalAccuracy_Type }; }
export var AbstractDQ_PositionalAccuracy_Type: { new(): AbstractDQ_PositionalAccuracy_Type };

interface _AbstractDQ_PositionalAccuracyProxyType extends BaseType {
	DQ_RelativeInternalPositionalAccuracy?: DQ_RelativeInternalPositionalAccuracy_Type;
	DQ_GriddedDataPositionalAccuracy?: DQ_GriddedDataPositionalAccuracy_Type;
	DQ_AbsoluteExternalPositionalAccuracy?: DQ_AbsoluteExternalPositionalAccuracy_Type;
}
interface AbstractDQ_PositionalAccuracyProxyType extends _AbstractDQ_PositionalAccuracyProxyType { constructor: { new(): AbstractDQ_PositionalAccuracyProxyType }; }

interface _AbstractDQ_Result_Type extends gco._AbstractObject_Type {}
export interface AbstractDQ_Result_Type extends _AbstractDQ_Result_Type { constructor: { new(): AbstractDQ_Result_Type }; }
export var AbstractDQ_Result_Type: { new(): AbstractDQ_Result_Type };

interface _AbstractDQ_ResultProxyType extends BaseType {
	DQ_ConformanceResult?: DQ_ConformanceResult_Type;
	DQ_QuantitativeResult?: DQ_QuantitativeResult_Type;
}
interface AbstractDQ_ResultProxyType extends _AbstractDQ_ResultProxyType { constructor: { new(): AbstractDQ_ResultProxyType }; }

interface _AbstractDQ_TemporalAccuracy_Type extends _AbstractDQ_Element_Type {}
export interface AbstractDQ_TemporalAccuracy_Type extends _AbstractDQ_TemporalAccuracy_Type { constructor: { new(): AbstractDQ_TemporalAccuracy_Type }; }
export var AbstractDQ_TemporalAccuracy_Type: { new(): AbstractDQ_TemporalAccuracy_Type };

interface _AbstractDQ_TemporalAccuracyProxyType extends BaseType {
	DQ_TemporalValidity?: DQ_TemporalValidity_Type;
	DQ_TemporalConsistency?: DQ_TemporalConsistency_Type;
	DQ_AccuracyOfATimeMeasurement?: DQ_AccuracyOfATimeMeasurement_Type;
}
interface AbstractDQ_TemporalAccuracyProxyType extends _AbstractDQ_TemporalAccuracyProxyType { constructor: { new(): AbstractDQ_TemporalAccuracyProxyType }; }

interface _AbstractDQ_ThematicAccuracy_Type extends _AbstractDQ_Element_Type {}
export interface AbstractDQ_ThematicAccuracy_Type extends _AbstractDQ_ThematicAccuracy_Type { constructor: { new(): AbstractDQ_ThematicAccuracy_Type }; }
export var AbstractDQ_ThematicAccuracy_Type: { new(): AbstractDQ_ThematicAccuracy_Type };

interface _AbstractDQ_ThematicAccuracyProxyType extends BaseType {
	DQ_QuantitativeAttributeAccuracy?: DQ_QuantitativeAttributeAccuracy_Type;
	DQ_NonQuantitativeAttributeAccuracy?: DQ_NonQuantitativeAttributeAccuracy_Type;
	DQ_ThematicClassificationCorrectness?: DQ_ThematicClassificationCorrectness_Type;
}
interface AbstractDQ_ThematicAccuracyProxyType extends _AbstractDQ_ThematicAccuracyProxyType { constructor: { new(): AbstractDQ_ThematicAccuracyProxyType }; }

/** Identifiable collection of datasets */
interface _AbstractDS_Aggregate_Type extends gco._AbstractObject_Type {
	composedOf: DS_DataSet_PropertyType[];
	seriesMetadata: MD_Metadata_PropertyType[];
	subset?: DS_Aggregate_PropertyType[];
	superset?: DS_Aggregate_PropertyType[];
}
export interface AbstractDS_Aggregate_Type extends _AbstractDS_Aggregate_Type { constructor: { new(): AbstractDS_Aggregate_Type }; }
export var AbstractDS_Aggregate_Type: { new(): AbstractDS_Aggregate_Type };

interface _AbstractDS_AggregateProxyType extends _DS_OtherAggregateProxyType, _DS_SeriesProxyType {
	DS_Initiative?: DS_Initiative_Type;
}
interface AbstractDS_AggregateProxyType extends _AbstractDS_AggregateProxyType { constructor: { new(): AbstractDS_AggregateProxyType }; }

/** Geographic area of the dataset */
interface _AbstractEX_GeographicExtent_Type extends gco._AbstractObject_Type {
	extentTypeCode?: gco.Boolean_PropertyType;
}
export interface AbstractEX_GeographicExtent_Type extends _AbstractEX_GeographicExtent_Type { constructor: { new(): AbstractEX_GeographicExtent_Type }; }
export var AbstractEX_GeographicExtent_Type: { new(): AbstractEX_GeographicExtent_Type };

interface _AbstractEX_GeographicExtentProxyType extends BaseType {
	EX_BoundingPolygon?: EX_BoundingPolygon_Type;
	EX_GeographicBoundingBox?: EX_GeographicBoundingBox_Type;
	EX_GeographicDescription?: EX_GeographicDescription_Type;
}
interface AbstractEX_GeographicExtentProxyType extends _AbstractEX_GeographicExtentProxyType { constructor: { new(): AbstractEX_GeographicExtentProxyType }; }

interface _AbstractMD_ContentInformation_Type extends gco._AbstractObject_Type {}
export interface AbstractMD_ContentInformation_Type extends _AbstractMD_ContentInformation_Type { constructor: { new(): AbstractMD_ContentInformation_Type }; }
export var AbstractMD_ContentInformation_Type: { new(): AbstractMD_ContentInformation_Type };

interface _AbstractMD_ContentInformationProxyType extends _MD_CoverageDescriptionProxyType {
	MD_FeatureCatalogueDescription?: MD_FeatureCatalogueDescription_Type;
}
interface AbstractMD_ContentInformationProxyType extends _AbstractMD_ContentInformationProxyType { constructor: { new(): AbstractMD_ContentInformationProxyType }; }

/** Basic information about data */
interface _AbstractMD_Identification_Type extends gco._AbstractObject_Type {
	abstract: gco.CharacterString_PropertyType;
	aggregationInfo?: MD_AggregateInformation_PropertyType[];
	citation: CI_Citation_PropertyType;
	credit?: gco.CharacterString_PropertyType[];
	descriptiveKeywords?: MD_Keywords_PropertyType[];
	graphicOverview?: MD_BrowseGraphic_PropertyType[];
	pointOfContact?: CI_ResponsibleParty_PropertyType[];
	purpose?: gco.CharacterString_PropertyType;
	resourceConstraints?: MD_Constraints_PropertyType[];
	resourceFormat?: MD_Format_PropertyType[];
	resourceMaintenance?: MD_MaintenanceInformation_PropertyType[];
	resourceSpecificUsage?: MD_Usage_PropertyType[];
	status?: MD_ProgressCode_PropertyType[];
}
export interface AbstractMD_Identification_Type extends _AbstractMD_Identification_Type { constructor: { new(): AbstractMD_Identification_Type }; }
export var AbstractMD_Identification_Type: { new(): AbstractMD_Identification_Type };

interface _AbstractMD_IdentificationProxyType extends BaseType {
	MD_DataIdentification?: MD_DataIdentification_Type;
	MD_ServiceIdentification?: MD_ServiceIdentification_Type;
}
interface AbstractMD_IdentificationProxyType extends _AbstractMD_IdentificationProxyType { constructor: { new(): AbstractMD_IdentificationProxyType }; }

/** Digital mechanism used to represent spatial information */
interface _AbstractMD_SpatialRepresentation_Type extends gco._AbstractObject_Type {}
export interface AbstractMD_SpatialRepresentation_Type extends _AbstractMD_SpatialRepresentation_Type { constructor: { new(): AbstractMD_SpatialRepresentation_Type }; }
export var AbstractMD_SpatialRepresentation_Type: { new(): AbstractMD_SpatialRepresentation_Type };

interface _AbstractMD_SpatialRepresentationProxyType extends _MD_GridSpatialRepresentationProxyType {
	MD_VectorSpatialRepresentation?: MD_VectorSpatialRepresentation_Type;
}
interface AbstractMD_SpatialRepresentationProxyType extends _AbstractMD_SpatialRepresentationProxyType { constructor: { new(): AbstractMD_SpatialRepresentationProxyType }; }

/** Description of the spatial and temporal reference systems used in the dataset */
interface _AbstractRS_ReferenceSystem_Type extends gco._AbstractObject_Type {
	domainOfValidity?: EX_Extent_PropertyType[];
	name: RS_Identifier_PropertyType;
}
export interface AbstractRS_ReferenceSystem_Type extends _AbstractRS_ReferenceSystem_Type { constructor: { new(): AbstractRS_ReferenceSystem_Type }; }
export var AbstractRS_ReferenceSystem_Type: { new(): AbstractRS_ReferenceSystem_Type };

interface _AbstractRS_ReferenceSystemProxyType extends BaseType {}
interface AbstractRS_ReferenceSystemProxyType extends _AbstractRS_ReferenceSystemProxyType { constructor: { new(): AbstractRS_ReferenceSystemProxyType }; }

interface _CI_Address_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Address?: CI_Address_Type;
}
export interface CI_Address_PropertyType extends _CI_Address_PropertyType { constructor: { new(): CI_Address_PropertyType }; }
export var CI_Address_PropertyType: { new(): CI_Address_PropertyType };

/** Location of the responsible individual or organisation */
interface _CI_Address_Type extends gco._AbstractObject_Type {
	administrativeArea?: gco.CharacterString_PropertyType;
	city?: gco.CharacterString_PropertyType;
	country?: gco.CharacterString_PropertyType;
	deliveryPoint?: gco.CharacterString_PropertyType[];
	electronicMailAddress?: gco.CharacterString_PropertyType[];
	postalCode?: gco.CharacterString_PropertyType;
}
export interface CI_Address_Type extends _CI_Address_Type { constructor: { new(): CI_Address_Type }; }
export var CI_Address_Type: { new(): CI_Address_Type };

interface _CI_Citation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Citation?: CI_Citation_Type;
}
export interface CI_Citation_PropertyType extends _CI_Citation_PropertyType { constructor: { new(): CI_Citation_PropertyType }; }
export var CI_Citation_PropertyType: { new(): CI_Citation_PropertyType };

/** Standardized resource reference */
interface _CI_Citation_Type extends gco._AbstractObject_Type {
	alternateTitle?: gco.CharacterString_PropertyType[];
	citedResponsibleParty?: CI_ResponsibleParty_PropertyType[];
	collectiveTitle?: gco.CharacterString_PropertyType;
	date: CI_Date_PropertyType[];
	edition?: gco.CharacterString_PropertyType;
	editionDate?: gco.Date_PropertyType;
	identifier?: MD_Identifier_PropertyType[];
	ISBN?: gco.CharacterString_PropertyType;
	ISSN?: gco.CharacterString_PropertyType;
	otherCitationDetails?: gco.CharacterString_PropertyType;
	presentationForm?: CI_PresentationFormCode_PropertyType[];
	series?: CI_Series_PropertyType;
	title: gco.CharacterString_PropertyType;
}
export interface CI_Citation_Type extends _CI_Citation_Type { constructor: { new(): CI_Citation_Type }; }
export var CI_Citation_Type: { new(): CI_Citation_Type };

interface _CI_Contact_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Contact?: CI_Contact_Type;
}
export interface CI_Contact_PropertyType extends _CI_Contact_PropertyType { constructor: { new(): CI_Contact_PropertyType }; }
export var CI_Contact_PropertyType: { new(): CI_Contact_PropertyType };

/** Information required enabling contact with the  responsible person and/or organisation */
interface _CI_Contact_Type extends gco._AbstractObject_Type {
	address?: CI_Address_PropertyType;
	contactInstructions?: gco.CharacterString_PropertyType;
	hoursOfService?: gco.CharacterString_PropertyType;
	onlineResource?: CI_OnlineResource_PropertyType;
	phone?: CI_Telephone_PropertyType;
}
export interface CI_Contact_Type extends _CI_Contact_Type { constructor: { new(): CI_Contact_Type }; }
export var CI_Contact_Type: { new(): CI_Contact_Type };

interface _CI_Date_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Date?: CI_Date_Type;
}
export interface CI_Date_PropertyType extends _CI_Date_PropertyType { constructor: { new(): CI_Date_PropertyType }; }
export var CI_Date_PropertyType: { new(): CI_Date_PropertyType };

interface _CI_Date_Type extends gco._AbstractObject_Type {
	date: gco.Date_PropertyType;
	dateType: CI_DateTypeCode_PropertyType;
}
export interface CI_Date_Type extends _CI_Date_Type { constructor: { new(): CI_Date_Type }; }
export var CI_Date_Type: { new(): CI_Date_Type };

interface _CI_DateTypeCode_PropertyType extends BaseType {
	nilReason: string;
	CI_DateTypeCode?: gco.CodeListValue_Type;
}
export interface CI_DateTypeCode_PropertyType extends _CI_DateTypeCode_PropertyType { constructor: { new(): CI_DateTypeCode_PropertyType }; }
export var CI_DateTypeCode_PropertyType: { new(): CI_DateTypeCode_PropertyType };

interface _CI_OnLineFunctionCode_PropertyType extends BaseType {
	nilReason: string;
	CI_OnLineFunctionCode?: gco.CodeListValue_Type;
}
export interface CI_OnLineFunctionCode_PropertyType extends _CI_OnLineFunctionCode_PropertyType { constructor: { new(): CI_OnLineFunctionCode_PropertyType }; }
export var CI_OnLineFunctionCode_PropertyType: { new(): CI_OnLineFunctionCode_PropertyType };

interface _CI_OnlineResource_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_OnlineResource?: CI_OnlineResource_Type;
}
export interface CI_OnlineResource_PropertyType extends _CI_OnlineResource_PropertyType { constructor: { new(): CI_OnlineResource_PropertyType }; }
export var CI_OnlineResource_PropertyType: { new(): CI_OnlineResource_PropertyType };

/** Information about online sources from which the dataset, specification, or community profile name and extended metadata elements can be obtained. */
interface _CI_OnlineResource_Type extends gco._AbstractObject_Type {
	applicationProfile?: gco.CharacterString_PropertyType;
	description?: gco.CharacterString_PropertyType;
	function?: CI_OnLineFunctionCode_PropertyType;
	linkage: URL_PropertyType;
	name?: gco.CharacterString_PropertyType;
	protocol?: gco.CharacterString_PropertyType;
}
export interface CI_OnlineResource_Type extends _CI_OnlineResource_Type { constructor: { new(): CI_OnlineResource_Type }; }
export var CI_OnlineResource_Type: { new(): CI_OnlineResource_Type };

interface _CI_PresentationFormCode_PropertyType extends BaseType {
	nilReason: string;
	CI_PresentationFormCode?: gco.CodeListValue_Type;
}
export interface CI_PresentationFormCode_PropertyType extends _CI_PresentationFormCode_PropertyType { constructor: { new(): CI_PresentationFormCode_PropertyType }; }
export var CI_PresentationFormCode_PropertyType: { new(): CI_PresentationFormCode_PropertyType };

interface _CI_ResponsibleParty_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_ResponsibleParty?: CI_ResponsibleParty_Type;
}
export interface CI_ResponsibleParty_PropertyType extends _CI_ResponsibleParty_PropertyType { constructor: { new(): CI_ResponsibleParty_PropertyType }; }
export var CI_ResponsibleParty_PropertyType: { new(): CI_ResponsibleParty_PropertyType };

/** Identification of, and means of communication with, person(s) and organisations associated with the dataset */
interface _CI_ResponsibleParty_Type extends gco._AbstractObject_Type {
	contactInfo?: CI_Contact_PropertyType;
	individualName?: gco.CharacterString_PropertyType;
	organisationName?: gco.CharacterString_PropertyType;
	positionName?: gco.CharacterString_PropertyType;
	role: CI_RoleCode_PropertyType;
}
export interface CI_ResponsibleParty_Type extends _CI_ResponsibleParty_Type { constructor: { new(): CI_ResponsibleParty_Type }; }
export var CI_ResponsibleParty_Type: { new(): CI_ResponsibleParty_Type };

interface _CI_RoleCode_PropertyType extends BaseType {
	nilReason: string;
	CI_RoleCode?: gco.CodeListValue_Type;
}
export interface CI_RoleCode_PropertyType extends _CI_RoleCode_PropertyType { constructor: { new(): CI_RoleCode_PropertyType }; }
export var CI_RoleCode_PropertyType: { new(): CI_RoleCode_PropertyType };

interface _CI_Series_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Series?: CI_Series_Type;
}
export interface CI_Series_PropertyType extends _CI_Series_PropertyType { constructor: { new(): CI_Series_PropertyType }; }
export var CI_Series_PropertyType: { new(): CI_Series_PropertyType };

interface _CI_Series_Type extends gco._AbstractObject_Type {
	issueIdentification?: gco.CharacterString_PropertyType;
	name?: gco.CharacterString_PropertyType;
	page?: gco.CharacterString_PropertyType;
}
export interface CI_Series_Type extends _CI_Series_Type { constructor: { new(): CI_Series_Type }; }
export var CI_Series_Type: { new(): CI_Series_Type };

interface _CI_Telephone_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	CI_Telephone?: CI_Telephone_Type;
}
export interface CI_Telephone_PropertyType extends _CI_Telephone_PropertyType { constructor: { new(): CI_Telephone_PropertyType }; }
export var CI_Telephone_PropertyType: { new(): CI_Telephone_PropertyType };

/** Telephone numbers for contacting the responsible individual or organisation */
interface _CI_Telephone_Type extends gco._AbstractObject_Type {
	facsimile?: gco.CharacterString_PropertyType[];
	voice?: gco.CharacterString_PropertyType[];
}
export interface CI_Telephone_Type extends _CI_Telephone_Type { constructor: { new(): CI_Telephone_Type }; }
export var CI_Telephone_Type: { new(): CI_Telephone_Type };

interface _Country_PropertyType extends BaseType {
	nilReason: string;
	Country?: gco.CodeListValue_Type;
}
export interface Country_PropertyType extends _Country_PropertyType { constructor: { new(): Country_PropertyType }; }
export var Country_PropertyType: { new(): Country_PropertyType };

interface _DQ_AbsoluteExternalPositionalAccuracy_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_AbsoluteExternalPositionalAccuracy?: DQ_AbsoluteExternalPositionalAccuracy_Type;
}
export interface DQ_AbsoluteExternalPositionalAccuracy_PropertyType extends _DQ_AbsoluteExternalPositionalAccuracy_PropertyType { constructor: { new(): DQ_AbsoluteExternalPositionalAccuracy_PropertyType }; }
export var DQ_AbsoluteExternalPositionalAccuracy_PropertyType: { new(): DQ_AbsoluteExternalPositionalAccuracy_PropertyType };

interface _DQ_AbsoluteExternalPositionalAccuracy_Type extends _AbstractDQ_PositionalAccuracy_Type {}
export interface DQ_AbsoluteExternalPositionalAccuracy_Type extends _DQ_AbsoluteExternalPositionalAccuracy_Type { constructor: { new(): DQ_AbsoluteExternalPositionalAccuracy_Type }; }
export var DQ_AbsoluteExternalPositionalAccuracy_Type: { new(): DQ_AbsoluteExternalPositionalAccuracy_Type };

interface _DQ_AccuracyOfATimeMeasurement_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_AccuracyOfATimeMeasurement?: DQ_AccuracyOfATimeMeasurement_Type;
}
export interface DQ_AccuracyOfATimeMeasurement_PropertyType extends _DQ_AccuracyOfATimeMeasurement_PropertyType { constructor: { new(): DQ_AccuracyOfATimeMeasurement_PropertyType }; }
export var DQ_AccuracyOfATimeMeasurement_PropertyType: { new(): DQ_AccuracyOfATimeMeasurement_PropertyType };

interface _DQ_AccuracyOfATimeMeasurement_Type extends _AbstractDQ_TemporalAccuracy_Type {}
export interface DQ_AccuracyOfATimeMeasurement_Type extends _DQ_AccuracyOfATimeMeasurement_Type { constructor: { new(): DQ_AccuracyOfATimeMeasurement_Type }; }
export var DQ_AccuracyOfATimeMeasurement_Type: { new(): DQ_AccuracyOfATimeMeasurement_Type };

interface _DQ_Completeness_PropertyType extends _AbstractDQ_CompletenessProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_Completeness_PropertyType extends _DQ_Completeness_PropertyType { constructor: { new(): DQ_Completeness_PropertyType }; }
export var DQ_Completeness_PropertyType: { new(): DQ_Completeness_PropertyType };

interface _DQ_CompletenessCommission_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_CompletenessCommission?: DQ_CompletenessCommission_Type;
}
export interface DQ_CompletenessCommission_PropertyType extends _DQ_CompletenessCommission_PropertyType { constructor: { new(): DQ_CompletenessCommission_PropertyType }; }
export var DQ_CompletenessCommission_PropertyType: { new(): DQ_CompletenessCommission_PropertyType };

interface _DQ_CompletenessCommission_Type extends _AbstractDQ_Completeness_Type {}
export interface DQ_CompletenessCommission_Type extends _DQ_CompletenessCommission_Type { constructor: { new(): DQ_CompletenessCommission_Type }; }
export var DQ_CompletenessCommission_Type: { new(): DQ_CompletenessCommission_Type };

interface _DQ_CompletenessOmission_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_CompletenessOmission?: DQ_CompletenessOmission_Type;
}
export interface DQ_CompletenessOmission_PropertyType extends _DQ_CompletenessOmission_PropertyType { constructor: { new(): DQ_CompletenessOmission_PropertyType }; }
export var DQ_CompletenessOmission_PropertyType: { new(): DQ_CompletenessOmission_PropertyType };

interface _DQ_CompletenessOmission_Type extends _AbstractDQ_Completeness_Type {}
export interface DQ_CompletenessOmission_Type extends _DQ_CompletenessOmission_Type { constructor: { new(): DQ_CompletenessOmission_Type }; }
export var DQ_CompletenessOmission_Type: { new(): DQ_CompletenessOmission_Type };

interface _DQ_ConceptualConsistency_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_ConceptualConsistency?: DQ_ConceptualConsistency_Type;
}
export interface DQ_ConceptualConsistency_PropertyType extends _DQ_ConceptualConsistency_PropertyType { constructor: { new(): DQ_ConceptualConsistency_PropertyType }; }
export var DQ_ConceptualConsistency_PropertyType: { new(): DQ_ConceptualConsistency_PropertyType };

interface _DQ_ConceptualConsistency_Type extends _AbstractDQ_LogicalConsistency_Type {}
export interface DQ_ConceptualConsistency_Type extends _DQ_ConceptualConsistency_Type { constructor: { new(): DQ_ConceptualConsistency_Type }; }
export var DQ_ConceptualConsistency_Type: { new(): DQ_ConceptualConsistency_Type };

interface _DQ_ConformanceResult_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_ConformanceResult?: DQ_ConformanceResult_Type;
}
export interface DQ_ConformanceResult_PropertyType extends _DQ_ConformanceResult_PropertyType { constructor: { new(): DQ_ConformanceResult_PropertyType }; }
export var DQ_ConformanceResult_PropertyType: { new(): DQ_ConformanceResult_PropertyType };

/** quantitative_result from Quality Procedures -  - renamed to remove implied use limitiation. */
interface _DQ_ConformanceResult_Type extends _AbstractDQ_Result_Type {
	explanation: gco.CharacterString_PropertyType;
	pass: gco.Boolean_PropertyType;
	specification: CI_Citation_PropertyType;
}
export interface DQ_ConformanceResult_Type extends _DQ_ConformanceResult_Type { constructor: { new(): DQ_ConformanceResult_Type }; }
export var DQ_ConformanceResult_Type: { new(): DQ_ConformanceResult_Type };

interface _DQ_DataQuality_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_DataQuality?: DQ_DataQuality_Type;
}
export interface DQ_DataQuality_PropertyType extends _DQ_DataQuality_PropertyType { constructor: { new(): DQ_DataQuality_PropertyType }; }
export var DQ_DataQuality_PropertyType: { new(): DQ_DataQuality_PropertyType };

interface _DQ_DataQuality_Type extends gco._AbstractObject_Type {
	lineage?: LI_Lineage_PropertyType;
	report?: DQ_Element_PropertyType[];
	scope: DQ_Scope_PropertyType;
}
export interface DQ_DataQuality_Type extends _DQ_DataQuality_Type { constructor: { new(): DQ_DataQuality_Type }; }
export var DQ_DataQuality_Type: { new(): DQ_DataQuality_Type };

interface _DQ_DomainConsistency_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_DomainConsistency?: DQ_DomainConsistency_Type;
}
export interface DQ_DomainConsistency_PropertyType extends _DQ_DomainConsistency_PropertyType { constructor: { new(): DQ_DomainConsistency_PropertyType }; }
export var DQ_DomainConsistency_PropertyType: { new(): DQ_DomainConsistency_PropertyType };

interface _DQ_DomainConsistency_Type extends _AbstractDQ_LogicalConsistency_Type {}
export interface DQ_DomainConsistency_Type extends _DQ_DomainConsistency_Type { constructor: { new(): DQ_DomainConsistency_Type }; }
export var DQ_DomainConsistency_Type: { new(): DQ_DomainConsistency_Type };

interface _DQ_Element_PropertyType extends _AbstractDQ_ElementProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_Element_PropertyType extends _DQ_Element_PropertyType { constructor: { new(): DQ_Element_PropertyType }; }
export var DQ_Element_PropertyType: { new(): DQ_Element_PropertyType };

interface _DQ_EvaluationMethodTypeCode_PropertyType extends BaseType {
	nilReason: string;
	DQ_EvaluationMethodTypeCode?: gco.CodeListValue_Type;
}
export interface DQ_EvaluationMethodTypeCode_PropertyType extends _DQ_EvaluationMethodTypeCode_PropertyType { constructor: { new(): DQ_EvaluationMethodTypeCode_PropertyType }; }
export var DQ_EvaluationMethodTypeCode_PropertyType: { new(): DQ_EvaluationMethodTypeCode_PropertyType };

interface _DQ_FormatConsistency_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_FormatConsistency?: DQ_FormatConsistency_Type;
}
export interface DQ_FormatConsistency_PropertyType extends _DQ_FormatConsistency_PropertyType { constructor: { new(): DQ_FormatConsistency_PropertyType }; }
export var DQ_FormatConsistency_PropertyType: { new(): DQ_FormatConsistency_PropertyType };

interface _DQ_FormatConsistency_Type extends _AbstractDQ_LogicalConsistency_Type {}
export interface DQ_FormatConsistency_Type extends _DQ_FormatConsistency_Type { constructor: { new(): DQ_FormatConsistency_Type }; }
export var DQ_FormatConsistency_Type: { new(): DQ_FormatConsistency_Type };

interface _DQ_GriddedDataPositionalAccuracy_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_GriddedDataPositionalAccuracy?: DQ_GriddedDataPositionalAccuracy_Type;
}
export interface DQ_GriddedDataPositionalAccuracy_PropertyType extends _DQ_GriddedDataPositionalAccuracy_PropertyType { constructor: { new(): DQ_GriddedDataPositionalAccuracy_PropertyType }; }
export var DQ_GriddedDataPositionalAccuracy_PropertyType: { new(): DQ_GriddedDataPositionalAccuracy_PropertyType };

interface _DQ_GriddedDataPositionalAccuracy_Type extends _AbstractDQ_PositionalAccuracy_Type {}
export interface DQ_GriddedDataPositionalAccuracy_Type extends _DQ_GriddedDataPositionalAccuracy_Type { constructor: { new(): DQ_GriddedDataPositionalAccuracy_Type }; }
export var DQ_GriddedDataPositionalAccuracy_Type: { new(): DQ_GriddedDataPositionalAccuracy_Type };

interface _DQ_LogicalConsistency_PropertyType extends _AbstractDQ_LogicalConsistencyProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_LogicalConsistency_PropertyType extends _DQ_LogicalConsistency_PropertyType { constructor: { new(): DQ_LogicalConsistency_PropertyType }; }
export var DQ_LogicalConsistency_PropertyType: { new(): DQ_LogicalConsistency_PropertyType };

interface _DQ_NonQuantitativeAttributeAccuracy_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_NonQuantitativeAttributeAccuracy?: DQ_NonQuantitativeAttributeAccuracy_Type;
}
export interface DQ_NonQuantitativeAttributeAccuracy_PropertyType extends _DQ_NonQuantitativeAttributeAccuracy_PropertyType { constructor: { new(): DQ_NonQuantitativeAttributeAccuracy_PropertyType }; }
export var DQ_NonQuantitativeAttributeAccuracy_PropertyType: { new(): DQ_NonQuantitativeAttributeAccuracy_PropertyType };

interface _DQ_NonQuantitativeAttributeAccuracy_Type extends _AbstractDQ_ThematicAccuracy_Type {}
export interface DQ_NonQuantitativeAttributeAccuracy_Type extends _DQ_NonQuantitativeAttributeAccuracy_Type { constructor: { new(): DQ_NonQuantitativeAttributeAccuracy_Type }; }
export var DQ_NonQuantitativeAttributeAccuracy_Type: { new(): DQ_NonQuantitativeAttributeAccuracy_Type };

interface _DQ_PositionalAccuracy_PropertyType extends _AbstractDQ_PositionalAccuracyProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_PositionalAccuracy_PropertyType extends _DQ_PositionalAccuracy_PropertyType { constructor: { new(): DQ_PositionalAccuracy_PropertyType }; }
export var DQ_PositionalAccuracy_PropertyType: { new(): DQ_PositionalAccuracy_PropertyType };

interface _DQ_QuantitativeAttributeAccuracy_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_QuantitativeAttributeAccuracy?: DQ_QuantitativeAttributeAccuracy_Type;
}
export interface DQ_QuantitativeAttributeAccuracy_PropertyType extends _DQ_QuantitativeAttributeAccuracy_PropertyType { constructor: { new(): DQ_QuantitativeAttributeAccuracy_PropertyType }; }
export var DQ_QuantitativeAttributeAccuracy_PropertyType: { new(): DQ_QuantitativeAttributeAccuracy_PropertyType };

interface _DQ_QuantitativeAttributeAccuracy_Type extends _AbstractDQ_ThematicAccuracy_Type {}
export interface DQ_QuantitativeAttributeAccuracy_Type extends _DQ_QuantitativeAttributeAccuracy_Type { constructor: { new(): DQ_QuantitativeAttributeAccuracy_Type }; }
export var DQ_QuantitativeAttributeAccuracy_Type: { new(): DQ_QuantitativeAttributeAccuracy_Type };

interface _DQ_QuantitativeResult_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_QuantitativeResult?: DQ_QuantitativeResult_Type;
}
export interface DQ_QuantitativeResult_PropertyType extends _DQ_QuantitativeResult_PropertyType { constructor: { new(): DQ_QuantitativeResult_PropertyType }; }
export var DQ_QuantitativeResult_PropertyType: { new(): DQ_QuantitativeResult_PropertyType };

/** Quantitative_conformance_measure from Quality Procedures.  -  - Renamed to remove implied use limitation -  - OCL - -- result is type specified by valueDomain - result.tupleType = valueDomain */
interface _DQ_QuantitativeResult_Type extends _AbstractDQ_Result_Type {
	errorStatistic?: gco.CharacterString_PropertyType;
	value: gco.Record_PropertyType[];
	valueType?: gco.RecordType_PropertyType;
	valueUnit: gco.UnitOfMeasure_PropertyType;
}
export interface DQ_QuantitativeResult_Type extends _DQ_QuantitativeResult_Type { constructor: { new(): DQ_QuantitativeResult_Type }; }
export var DQ_QuantitativeResult_Type: { new(): DQ_QuantitativeResult_Type };

interface _DQ_RelativeInternalPositionalAccuracy_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_RelativeInternalPositionalAccuracy?: DQ_RelativeInternalPositionalAccuracy_Type;
}
export interface DQ_RelativeInternalPositionalAccuracy_PropertyType extends _DQ_RelativeInternalPositionalAccuracy_PropertyType { constructor: { new(): DQ_RelativeInternalPositionalAccuracy_PropertyType }; }
export var DQ_RelativeInternalPositionalAccuracy_PropertyType: { new(): DQ_RelativeInternalPositionalAccuracy_PropertyType };

interface _DQ_RelativeInternalPositionalAccuracy_Type extends _AbstractDQ_PositionalAccuracy_Type {}
export interface DQ_RelativeInternalPositionalAccuracy_Type extends _DQ_RelativeInternalPositionalAccuracy_Type { constructor: { new(): DQ_RelativeInternalPositionalAccuracy_Type }; }
export var DQ_RelativeInternalPositionalAccuracy_Type: { new(): DQ_RelativeInternalPositionalAccuracy_Type };

interface _DQ_Result_PropertyType extends _AbstractDQ_ResultProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_Result_PropertyType extends _DQ_Result_PropertyType { constructor: { new(): DQ_Result_PropertyType }; }
export var DQ_Result_PropertyType: { new(): DQ_Result_PropertyType };

interface _DQ_Scope_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_Scope?: DQ_Scope_Type;
}
export interface DQ_Scope_PropertyType extends _DQ_Scope_PropertyType { constructor: { new(): DQ_Scope_PropertyType }; }
export var DQ_Scope_PropertyType: { new(): DQ_Scope_PropertyType };

interface _DQ_Scope_Type extends gco._AbstractObject_Type {
	extent?: EX_Extent_PropertyType;
	level: MD_ScopeCode_PropertyType;
	levelDescription?: MD_ScopeDescription_PropertyType[];
}
export interface DQ_Scope_Type extends _DQ_Scope_Type { constructor: { new(): DQ_Scope_Type }; }
export var DQ_Scope_Type: { new(): DQ_Scope_Type };

interface _DQ_TemporalAccuracy_PropertyType extends _AbstractDQ_TemporalAccuracyProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_TemporalAccuracy_PropertyType extends _DQ_TemporalAccuracy_PropertyType { constructor: { new(): DQ_TemporalAccuracy_PropertyType }; }
export var DQ_TemporalAccuracy_PropertyType: { new(): DQ_TemporalAccuracy_PropertyType };

interface _DQ_TemporalConsistency_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_TemporalConsistency?: DQ_TemporalConsistency_Type;
}
export interface DQ_TemporalConsistency_PropertyType extends _DQ_TemporalConsistency_PropertyType { constructor: { new(): DQ_TemporalConsistency_PropertyType }; }
export var DQ_TemporalConsistency_PropertyType: { new(): DQ_TemporalConsistency_PropertyType };

interface _DQ_TemporalConsistency_Type extends _AbstractDQ_TemporalAccuracy_Type {}
export interface DQ_TemporalConsistency_Type extends _DQ_TemporalConsistency_Type { constructor: { new(): DQ_TemporalConsistency_Type }; }
export var DQ_TemporalConsistency_Type: { new(): DQ_TemporalConsistency_Type };

interface _DQ_TemporalValidity_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_TemporalValidity?: DQ_TemporalValidity_Type;
}
export interface DQ_TemporalValidity_PropertyType extends _DQ_TemporalValidity_PropertyType { constructor: { new(): DQ_TemporalValidity_PropertyType }; }
export var DQ_TemporalValidity_PropertyType: { new(): DQ_TemporalValidity_PropertyType };

interface _DQ_TemporalValidity_Type extends _AbstractDQ_TemporalAccuracy_Type {}
export interface DQ_TemporalValidity_Type extends _DQ_TemporalValidity_Type { constructor: { new(): DQ_TemporalValidity_Type }; }
export var DQ_TemporalValidity_Type: { new(): DQ_TemporalValidity_Type };

interface _DQ_ThematicAccuracy_PropertyType extends _AbstractDQ_ThematicAccuracyProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DQ_ThematicAccuracy_PropertyType extends _DQ_ThematicAccuracy_PropertyType { constructor: { new(): DQ_ThematicAccuracy_PropertyType }; }
export var DQ_ThematicAccuracy_PropertyType: { new(): DQ_ThematicAccuracy_PropertyType };

interface _DQ_ThematicClassificationCorrectness_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_ThematicClassificationCorrectness?: DQ_ThematicClassificationCorrectness_Type;
}
export interface DQ_ThematicClassificationCorrectness_PropertyType extends _DQ_ThematicClassificationCorrectness_PropertyType { constructor: { new(): DQ_ThematicClassificationCorrectness_PropertyType }; }
export var DQ_ThematicClassificationCorrectness_PropertyType: { new(): DQ_ThematicClassificationCorrectness_PropertyType };

interface _DQ_ThematicClassificationCorrectness_Type extends _AbstractDQ_ThematicAccuracy_Type {}
export interface DQ_ThematicClassificationCorrectness_Type extends _DQ_ThematicClassificationCorrectness_Type { constructor: { new(): DQ_ThematicClassificationCorrectness_Type }; }
export var DQ_ThematicClassificationCorrectness_Type: { new(): DQ_ThematicClassificationCorrectness_Type };

interface _DQ_TopologicalConsistency_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DQ_TopologicalConsistency?: DQ_TopologicalConsistency_Type;
}
export interface DQ_TopologicalConsistency_PropertyType extends _DQ_TopologicalConsistency_PropertyType { constructor: { new(): DQ_TopologicalConsistency_PropertyType }; }
export var DQ_TopologicalConsistency_PropertyType: { new(): DQ_TopologicalConsistency_PropertyType };

interface _DQ_TopologicalConsistency_Type extends _AbstractDQ_LogicalConsistency_Type {}
export interface DQ_TopologicalConsistency_Type extends _DQ_TopologicalConsistency_Type { constructor: { new(): DQ_TopologicalConsistency_Type }; }
export var DQ_TopologicalConsistency_Type: { new(): DQ_TopologicalConsistency_Type };

interface _DS_Aggregate_PropertyType extends _AbstractDS_AggregateProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DS_Aggregate_PropertyType extends _DS_Aggregate_PropertyType { constructor: { new(): DS_Aggregate_PropertyType }; }
export var DS_Aggregate_PropertyType: { new(): DS_Aggregate_PropertyType };

interface _DS_Association_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_Association?: DS_Association_Type;
}
export interface DS_Association_PropertyType extends _DS_Association_PropertyType { constructor: { new(): DS_Association_PropertyType }; }
export var DS_Association_PropertyType: { new(): DS_Association_PropertyType };

interface _DS_Association_Type extends gco._AbstractObject_Type {}
export interface DS_Association_Type extends _DS_Association_Type { constructor: { new(): DS_Association_Type }; }
export var DS_Association_Type: { new(): DS_Association_Type };

interface _DS_AssociationTypeCode_PropertyType extends BaseType {
	nilReason: string;
	DS_AssociationTypeCode?: gco.CodeListValue_Type;
}
export interface DS_AssociationTypeCode_PropertyType extends _DS_AssociationTypeCode_PropertyType { constructor: { new(): DS_AssociationTypeCode_PropertyType }; }
export var DS_AssociationTypeCode_PropertyType: { new(): DS_AssociationTypeCode_PropertyType };

interface _DS_DataSet_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_DataSet?: DS_DataSet_Type;
}
export interface DS_DataSet_PropertyType extends _DS_DataSet_PropertyType { constructor: { new(): DS_DataSet_PropertyType }; }
export var DS_DataSet_PropertyType: { new(): DS_DataSet_PropertyType };

/** Identifiable collection of data */
interface _DS_DataSet_Type extends gco._AbstractObject_Type {
	has: MD_Metadata_PropertyType[];
	partOf?: DS_Aggregate_PropertyType[];
}
export interface DS_DataSet_Type extends _DS_DataSet_Type { constructor: { new(): DS_DataSet_Type }; }
export var DS_DataSet_Type: { new(): DS_DataSet_Type };

interface _DS_Initiative_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_Initiative?: DS_Initiative_Type;
}
export interface DS_Initiative_PropertyType extends _DS_Initiative_PropertyType { constructor: { new(): DS_Initiative_PropertyType }; }
export var DS_Initiative_PropertyType: { new(): DS_Initiative_PropertyType };

interface _DS_Initiative_Type extends _AbstractDS_Aggregate_Type {}
export interface DS_Initiative_Type extends _DS_Initiative_Type { constructor: { new(): DS_Initiative_Type }; }
export var DS_Initiative_Type: { new(): DS_Initiative_Type };

interface _DS_InitiativeTypeCode_PropertyType extends BaseType {
	nilReason: string;
	DS_InitiativeTypeCode?: gco.CodeListValue_Type;
}
export interface DS_InitiativeTypeCode_PropertyType extends _DS_InitiativeTypeCode_PropertyType { constructor: { new(): DS_InitiativeTypeCode_PropertyType }; }
export var DS_InitiativeTypeCode_PropertyType: { new(): DS_InitiativeTypeCode_PropertyType };

interface _DS_OtherAggregate_PropertyType extends _DS_OtherAggregateProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DS_OtherAggregate_PropertyType extends _DS_OtherAggregate_PropertyType { constructor: { new(): DS_OtherAggregate_PropertyType }; }
export var DS_OtherAggregate_PropertyType: { new(): DS_OtherAggregate_PropertyType };

interface _DS_OtherAggregate_Type extends _AbstractDS_Aggregate_Type {}
export interface DS_OtherAggregate_Type extends _DS_OtherAggregate_Type { constructor: { new(): DS_OtherAggregate_Type }; }
export var DS_OtherAggregate_Type: { new(): DS_OtherAggregate_Type };

interface _DS_OtherAggregateProxyType extends BaseType {
	DS_OtherAggregate?: DS_OtherAggregate_Type;
	DS_StereoMate?: DS_StereoMate_Type;
}
interface DS_OtherAggregateProxyType extends _DS_OtherAggregateProxyType { constructor: { new(): DS_OtherAggregateProxyType }; }

interface _DS_Platform_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_Platform?: DS_Platform_Type;
}
export interface DS_Platform_PropertyType extends _DS_Platform_PropertyType { constructor: { new(): DS_Platform_PropertyType }; }
export var DS_Platform_PropertyType: { new(): DS_Platform_PropertyType };

interface _DS_Platform_Type extends _DS_Series_Type {}
export interface DS_Platform_Type extends _DS_Platform_Type { constructor: { new(): DS_Platform_Type }; }
export var DS_Platform_Type: { new(): DS_Platform_Type };

interface _DS_ProductionSeries_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_ProductionSeries?: DS_ProductionSeries_Type;
}
export interface DS_ProductionSeries_PropertyType extends _DS_ProductionSeries_PropertyType { constructor: { new(): DS_ProductionSeries_PropertyType }; }
export var DS_ProductionSeries_PropertyType: { new(): DS_ProductionSeries_PropertyType };

interface _DS_ProductionSeries_Type extends _DS_Series_Type {}
export interface DS_ProductionSeries_Type extends _DS_ProductionSeries_Type { constructor: { new(): DS_ProductionSeries_Type }; }
export var DS_ProductionSeries_Type: { new(): DS_ProductionSeries_Type };

interface _DS_Sensor_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_Sensor?: DS_Sensor_Type;
}
export interface DS_Sensor_PropertyType extends _DS_Sensor_PropertyType { constructor: { new(): DS_Sensor_PropertyType }; }
export var DS_Sensor_PropertyType: { new(): DS_Sensor_PropertyType };

interface _DS_Sensor_Type extends _DS_Series_Type {}
export interface DS_Sensor_Type extends _DS_Sensor_Type { constructor: { new(): DS_Sensor_Type }; }
export var DS_Sensor_Type: { new(): DS_Sensor_Type };

interface _DS_Series_PropertyType extends _DS_SeriesProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface DS_Series_PropertyType extends _DS_Series_PropertyType { constructor: { new(): DS_Series_PropertyType }; }
export var DS_Series_PropertyType: { new(): DS_Series_PropertyType };

interface _DS_Series_Type extends _AbstractDS_Aggregate_Type {}
export interface DS_Series_Type extends _DS_Series_Type { constructor: { new(): DS_Series_Type }; }
export var DS_Series_Type: { new(): DS_Series_Type };

interface _DS_SeriesProxyType extends BaseType {
	DS_Series?: DS_Series_Type;
	DS_Platform?: DS_Platform_Type;
	DS_Sensor?: DS_Sensor_Type;
	DS_ProductionSeries?: DS_ProductionSeries_Type;
}
interface DS_SeriesProxyType extends _DS_SeriesProxyType { constructor: { new(): DS_SeriesProxyType }; }

interface _DS_StereoMate_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	DS_StereoMate?: DS_StereoMate_Type;
}
export interface DS_StereoMate_PropertyType extends _DS_StereoMate_PropertyType { constructor: { new(): DS_StereoMate_PropertyType }; }
export var DS_StereoMate_PropertyType: { new(): DS_StereoMate_PropertyType };

interface _DS_StereoMate_Type extends _DS_OtherAggregate_Type {}
export interface DS_StereoMate_Type extends _DS_StereoMate_Type { constructor: { new(): DS_StereoMate_Type }; }
export var DS_StereoMate_Type: { new(): DS_StereoMate_Type };

interface _EX_BoundingPolygon_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_BoundingPolygon?: EX_BoundingPolygon_Type;
}
export interface EX_BoundingPolygon_PropertyType extends _EX_BoundingPolygon_PropertyType { constructor: { new(): EX_BoundingPolygon_PropertyType }; }
export var EX_BoundingPolygon_PropertyType: { new(): EX_BoundingPolygon_PropertyType };

/** Boundary enclosing the dataset expressed as the closed set of (x,y) coordinates of the polygon (last point replicates first point) */
interface _EX_BoundingPolygon_Type extends _AbstractEX_GeographicExtent_Type {
	polygon: gss.GM_Object_PropertyType[];
}
export interface EX_BoundingPolygon_Type extends _EX_BoundingPolygon_Type { constructor: { new(): EX_BoundingPolygon_Type }; }
export var EX_BoundingPolygon_Type: { new(): EX_BoundingPolygon_Type };

interface _EX_Extent_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_Extent?: EX_Extent_Type;
}
export interface EX_Extent_PropertyType extends _EX_Extent_PropertyType { constructor: { new(): EX_Extent_PropertyType }; }
export var EX_Extent_PropertyType: { new(): EX_Extent_PropertyType };

/** Information about spatial, vertical, and temporal extent */
interface _EX_Extent_Type extends gco._AbstractObject_Type {
	description?: gco.CharacterString_PropertyType;
	geographicElement?: EX_GeographicExtent_PropertyType[];
	temporalElement?: EX_TemporalExtent_PropertyType[];
	verticalElement?: EX_VerticalExtent_PropertyType[];
}
export interface EX_Extent_Type extends _EX_Extent_Type { constructor: { new(): EX_Extent_Type }; }
export var EX_Extent_Type: { new(): EX_Extent_Type };

interface _EX_GeographicBoundingBox_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_GeographicBoundingBox?: EX_GeographicBoundingBox_Type;
}
export interface EX_GeographicBoundingBox_PropertyType extends _EX_GeographicBoundingBox_PropertyType { constructor: { new(): EX_GeographicBoundingBox_PropertyType }; }
export var EX_GeographicBoundingBox_PropertyType: { new(): EX_GeographicBoundingBox_PropertyType };

/** Geographic area of the entire dataset referenced to WGS 84 */
interface _EX_GeographicBoundingBox_Type extends _AbstractEX_GeographicExtent_Type {
	eastBoundLongitude: gco.Decimal_PropertyType;
	northBoundLatitude: gco.Decimal_PropertyType;
	southBoundLatitude: gco.Decimal_PropertyType;
	westBoundLongitude: gco.Decimal_PropertyType;
}
export interface EX_GeographicBoundingBox_Type extends _EX_GeographicBoundingBox_Type { constructor: { new(): EX_GeographicBoundingBox_Type }; }
export var EX_GeographicBoundingBox_Type: { new(): EX_GeographicBoundingBox_Type };

interface _EX_GeographicDescription_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_GeographicDescription?: EX_GeographicDescription_Type;
}
export interface EX_GeographicDescription_PropertyType extends _EX_GeographicDescription_PropertyType { constructor: { new(): EX_GeographicDescription_PropertyType }; }
export var EX_GeographicDescription_PropertyType: { new(): EX_GeographicDescription_PropertyType };

interface _EX_GeographicDescription_Type extends _AbstractEX_GeographicExtent_Type {
	geographicIdentifier: MD_Identifier_PropertyType;
}
export interface EX_GeographicDescription_Type extends _EX_GeographicDescription_Type { constructor: { new(): EX_GeographicDescription_Type }; }
export var EX_GeographicDescription_Type: { new(): EX_GeographicDescription_Type };

interface _EX_GeographicExtent_PropertyType extends _AbstractEX_GeographicExtentProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface EX_GeographicExtent_PropertyType extends _EX_GeographicExtent_PropertyType { constructor: { new(): EX_GeographicExtent_PropertyType }; }
export var EX_GeographicExtent_PropertyType: { new(): EX_GeographicExtent_PropertyType };

interface _EX_SpatialTemporalExtent_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_SpatialTemporalExtent?: EX_SpatialTemporalExtent_Type;
}
export interface EX_SpatialTemporalExtent_PropertyType extends _EX_SpatialTemporalExtent_PropertyType { constructor: { new(): EX_SpatialTemporalExtent_PropertyType }; }
export var EX_SpatialTemporalExtent_PropertyType: { new(): EX_SpatialTemporalExtent_PropertyType };

/** Extent with respect to date and time */
interface _EX_SpatialTemporalExtent_Type extends _EX_TemporalExtent_Type {
	spatialExtent: EX_GeographicExtent_PropertyType[];
}
export interface EX_SpatialTemporalExtent_Type extends _EX_SpatialTemporalExtent_Type { constructor: { new(): EX_SpatialTemporalExtent_Type }; }
export var EX_SpatialTemporalExtent_Type: { new(): EX_SpatialTemporalExtent_Type };

interface _EX_TemporalExtent_PropertyType extends _EX_TemporalExtentProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface EX_TemporalExtent_PropertyType extends _EX_TemporalExtent_PropertyType { constructor: { new(): EX_TemporalExtent_PropertyType }; }
export var EX_TemporalExtent_PropertyType: { new(): EX_TemporalExtent_PropertyType };

/** Time period covered by the content of the dataset */
interface _EX_TemporalExtent_Type extends gco._AbstractObject_Type {
	extent: gts.TM_Primitive_PropertyType;
}
export interface EX_TemporalExtent_Type extends _EX_TemporalExtent_Type { constructor: { new(): EX_TemporalExtent_Type }; }
export var EX_TemporalExtent_Type: { new(): EX_TemporalExtent_Type };

interface _EX_TemporalExtentProxyType extends BaseType {
	EX_TemporalExtent?: EX_TemporalExtent_Type;
	EX_SpatialTemporalExtent?: EX_SpatialTemporalExtent_Type;
}
interface EX_TemporalExtentProxyType extends _EX_TemporalExtentProxyType { constructor: { new(): EX_TemporalExtentProxyType }; }

interface _EX_VerticalExtent_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	EX_VerticalExtent?: EX_VerticalExtent_Type;
}
export interface EX_VerticalExtent_PropertyType extends _EX_VerticalExtent_PropertyType { constructor: { new(): EX_VerticalExtent_PropertyType }; }
export var EX_VerticalExtent_PropertyType: { new(): EX_VerticalExtent_PropertyType };

/** Vertical domain of dataset */
interface _EX_VerticalExtent_Type extends gco._AbstractObject_Type {
	maximumValue: gco.Real_PropertyType;
	minimumValue: gco.Real_PropertyType;
	verticalCRS: gsr.SC_CRS_PropertyType;
}
export interface EX_VerticalExtent_Type extends _EX_VerticalExtent_Type { constructor: { new(): EX_VerticalExtent_Type }; }
export var EX_VerticalExtent_Type: { new(): EX_VerticalExtent_Type };

interface _LanguageCode_PropertyType extends BaseType {
	nilReason: string;
	LanguageCode?: gco.CodeListValue_Type;
}
export interface LanguageCode_PropertyType extends _LanguageCode_PropertyType { constructor: { new(): LanguageCode_PropertyType }; }
export var LanguageCode_PropertyType: { new(): LanguageCode_PropertyType };

interface _LI_Lineage_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	LI_Lineage?: LI_Lineage_Type;
}
export interface LI_Lineage_PropertyType extends _LI_Lineage_PropertyType { constructor: { new(): LI_Lineage_PropertyType }; }
export var LI_Lineage_PropertyType: { new(): LI_Lineage_PropertyType };

interface _LI_Lineage_Type extends gco._AbstractObject_Type {
	processStep?: LI_ProcessStep_PropertyType[];
	source?: LI_Source_PropertyType[];
	statement?: gco.CharacterString_PropertyType;
}
export interface LI_Lineage_Type extends _LI_Lineage_Type { constructor: { new(): LI_Lineage_Type }; }
export var LI_Lineage_Type: { new(): LI_Lineage_Type };

interface _LI_ProcessStep_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	LI_ProcessStep?: LI_ProcessStep_Type;
}
export interface LI_ProcessStep_PropertyType extends _LI_ProcessStep_PropertyType { constructor: { new(): LI_ProcessStep_PropertyType }; }
export var LI_ProcessStep_PropertyType: { new(): LI_ProcessStep_PropertyType };

interface _LI_ProcessStep_Type extends gco._AbstractObject_Type {
	dateTime?: gco.DateTime_PropertyType;
	description: gco.CharacterString_PropertyType;
	processor?: CI_ResponsibleParty_PropertyType[];
	rationale?: gco.CharacterString_PropertyType;
	source?: LI_Source_PropertyType[];
}
export interface LI_ProcessStep_Type extends _LI_ProcessStep_Type { constructor: { new(): LI_ProcessStep_Type }; }
export var LI_ProcessStep_Type: { new(): LI_ProcessStep_Type };

interface _LI_Source_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	LI_Source?: LI_Source_Type;
}
export interface LI_Source_PropertyType extends _LI_Source_PropertyType { constructor: { new(): LI_Source_PropertyType }; }
export var LI_Source_PropertyType: { new(): LI_Source_PropertyType };

interface _LI_Source_Type extends gco._AbstractObject_Type {
	description?: gco.CharacterString_PropertyType;
	scaleDenominator?: MD_RepresentativeFraction_PropertyType;
	sourceCitation?: CI_Citation_PropertyType;
	sourceExtent?: EX_Extent_PropertyType[];
	sourceReferenceSystem?: MD_ReferenceSystem_PropertyType;
	sourceStep?: LI_ProcessStep_PropertyType[];
}
export interface LI_Source_Type extends _LI_Source_Type { constructor: { new(): LI_Source_Type }; }
export var LI_Source_Type: { new(): LI_Source_Type };

interface _LocalisedCharacterString_PropertyType extends gco._ObjectReference_PropertyType {
	LocalisedCharacterString?: LocalisedCharacterString_Type;
}
export interface LocalisedCharacterString_PropertyType extends _LocalisedCharacterString_PropertyType { constructor: { new(): LocalisedCharacterString_PropertyType }; }
export var LocalisedCharacterString_PropertyType: { new(): LocalisedCharacterString_PropertyType };

interface _LocalisedCharacterString_Type extends Primitive._string {
	id: string;
	locale: string;
}
export interface LocalisedCharacterString_Type extends _LocalisedCharacterString_Type { constructor: { new(): LocalisedCharacterString_Type }; }
export var LocalisedCharacterString_Type: { new(): LocalisedCharacterString_Type };

interface _MD_AggregateInformation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_AggregateInformation?: MD_AggregateInformation_Type;
}
export interface MD_AggregateInformation_PropertyType extends _MD_AggregateInformation_PropertyType { constructor: { new(): MD_AggregateInformation_PropertyType }; }
export var MD_AggregateInformation_PropertyType: { new(): MD_AggregateInformation_PropertyType };

/** Encapsulates the dataset aggregation information */
interface _MD_AggregateInformation_Type extends gco._AbstractObject_Type {
	aggregateDataSetIdentifier?: MD_Identifier_PropertyType;
	aggregateDataSetName?: CI_Citation_PropertyType;
	associationType: DS_AssociationTypeCode_PropertyType;
	initiativeType?: DS_InitiativeTypeCode_PropertyType;
}
export interface MD_AggregateInformation_Type extends _MD_AggregateInformation_Type { constructor: { new(): MD_AggregateInformation_Type }; }
export var MD_AggregateInformation_Type: { new(): MD_AggregateInformation_Type };

interface _MD_ApplicationSchemaInformation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_ApplicationSchemaInformation?: MD_ApplicationSchemaInformation_Type;
}
export interface MD_ApplicationSchemaInformation_PropertyType extends _MD_ApplicationSchemaInformation_PropertyType { constructor: { new(): MD_ApplicationSchemaInformation_PropertyType }; }
export var MD_ApplicationSchemaInformation_PropertyType: { new(): MD_ApplicationSchemaInformation_PropertyType };

/** Information about the application schema used to build the dataset */
interface _MD_ApplicationSchemaInformation_Type extends gco._AbstractObject_Type {
	constraintLanguage: gco.CharacterString_PropertyType;
	graphicsFile?: gco.Binary_PropertyType;
	name: CI_Citation_PropertyType;
	schemaAscii?: gco.CharacterString_PropertyType;
	schemaLanguage: gco.CharacterString_PropertyType;
	softwareDevelopmentFile?: gco.Binary_PropertyType;
	softwareDevelopmentFileFormat?: gco.CharacterString_PropertyType;
}
export interface MD_ApplicationSchemaInformation_Type extends _MD_ApplicationSchemaInformation_Type { constructor: { new(): MD_ApplicationSchemaInformation_Type }; }
export var MD_ApplicationSchemaInformation_Type: { new(): MD_ApplicationSchemaInformation_Type };

interface _MD_Band_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Band?: MD_Band_Type;
}
export interface MD_Band_PropertyType extends _MD_Band_PropertyType { constructor: { new(): MD_Band_PropertyType }; }
export var MD_Band_PropertyType: { new(): MD_Band_PropertyType };

interface _MD_Band_Type extends _MD_RangeDimension_Type {
	bitsPerValue?: gco.Integer_PropertyType;
	maxValue?: gco.Real_PropertyType;
	minValue?: gco.Real_PropertyType;
	offset?: gco.Real_PropertyType;
	peakResponse?: gco.Real_PropertyType;
	scaleFactor?: gco.Real_PropertyType;
	toneGradation?: gco.Integer_PropertyType;
	units?: gco.UomLength_PropertyType;
}
export interface MD_Band_Type extends _MD_Band_Type { constructor: { new(): MD_Band_Type }; }
export var MD_Band_Type: { new(): MD_Band_Type };

interface _MD_BrowseGraphic_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_BrowseGraphic?: MD_BrowseGraphic_Type;
}
export interface MD_BrowseGraphic_PropertyType extends _MD_BrowseGraphic_PropertyType { constructor: { new(): MD_BrowseGraphic_PropertyType }; }
export var MD_BrowseGraphic_PropertyType: { new(): MD_BrowseGraphic_PropertyType };

/** Graphic that provides an illustration of the dataset (should include a legend for the graphic) */
interface _MD_BrowseGraphic_Type extends gco._AbstractObject_Type {
	fileDescription?: gco.CharacterString_PropertyType;
	fileName: gco.CharacterString_PropertyType;
	fileType?: gco.CharacterString_PropertyType;
}
export interface MD_BrowseGraphic_Type extends _MD_BrowseGraphic_Type { constructor: { new(): MD_BrowseGraphic_Type }; }
export var MD_BrowseGraphic_Type: { new(): MD_BrowseGraphic_Type };

interface _MD_CellGeometryCode_PropertyType extends BaseType {
	nilReason: string;
	MD_CellGeometryCode?: gco.CodeListValue_Type;
}
export interface MD_CellGeometryCode_PropertyType extends _MD_CellGeometryCode_PropertyType { constructor: { new(): MD_CellGeometryCode_PropertyType }; }
export var MD_CellGeometryCode_PropertyType: { new(): MD_CellGeometryCode_PropertyType };

interface _MD_CharacterSetCode_PropertyType extends BaseType {
	nilReason: string;
	MD_CharacterSetCode?: gco.CodeListValue_Type;
}
export interface MD_CharacterSetCode_PropertyType extends _MD_CharacterSetCode_PropertyType { constructor: { new(): MD_CharacterSetCode_PropertyType }; }
export var MD_CharacterSetCode_PropertyType: { new(): MD_CharacterSetCode_PropertyType };

interface _MD_ClassificationCode_PropertyType extends BaseType {
	nilReason: string;
	MD_ClassificationCode?: gco.CodeListValue_Type;
}
export interface MD_ClassificationCode_PropertyType extends _MD_ClassificationCode_PropertyType { constructor: { new(): MD_ClassificationCode_PropertyType }; }
export var MD_ClassificationCode_PropertyType: { new(): MD_ClassificationCode_PropertyType };

interface _MD_Constraints_PropertyType extends _MD_ConstraintsProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_Constraints_PropertyType extends _MD_Constraints_PropertyType { constructor: { new(): MD_Constraints_PropertyType }; }
export var MD_Constraints_PropertyType: { new(): MD_Constraints_PropertyType };

/** Restrictions on the access and use of a dataset or metadata */
interface _MD_Constraints_Type extends gco._AbstractObject_Type {
	useLimitation?: gco.CharacterString_PropertyType[];
}
export interface MD_Constraints_Type extends _MD_Constraints_Type { constructor: { new(): MD_Constraints_Type }; }
export var MD_Constraints_Type: { new(): MD_Constraints_Type };

interface _MD_ConstraintsProxyType extends BaseType {
	MD_Constraints?: MD_Constraints_Type;
	MD_LegalConstraints?: MD_LegalConstraints_Type;
	MD_SecurityConstraints?: MD_SecurityConstraints_Type;
}
interface MD_ConstraintsProxyType extends _MD_ConstraintsProxyType { constructor: { new(): MD_ConstraintsProxyType }; }

interface _MD_ContentInformation_PropertyType extends _AbstractMD_ContentInformationProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_ContentInformation_PropertyType extends _MD_ContentInformation_PropertyType { constructor: { new(): MD_ContentInformation_PropertyType }; }
export var MD_ContentInformation_PropertyType: { new(): MD_ContentInformation_PropertyType };

interface _MD_CoverageContentTypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_CoverageContentTypeCode?: gco.CodeListValue_Type;
}
export interface MD_CoverageContentTypeCode_PropertyType extends _MD_CoverageContentTypeCode_PropertyType { constructor: { new(): MD_CoverageContentTypeCode_PropertyType }; }
export var MD_CoverageContentTypeCode_PropertyType: { new(): MD_CoverageContentTypeCode_PropertyType };

interface _MD_CoverageDescription_PropertyType extends _MD_CoverageDescriptionProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_CoverageDescription_PropertyType extends _MD_CoverageDescription_PropertyType { constructor: { new(): MD_CoverageDescription_PropertyType }; }
export var MD_CoverageDescription_PropertyType: { new(): MD_CoverageDescription_PropertyType };

/** Information about the domain of the raster cell */
interface _MD_CoverageDescription_Type extends _AbstractMD_ContentInformation_Type {
	attributeDescription: gco.RecordType_PropertyType;
	contentType: MD_CoverageContentTypeCode_PropertyType;
	dimension?: MD_RangeDimension_PropertyType[];
}
export interface MD_CoverageDescription_Type extends _MD_CoverageDescription_Type { constructor: { new(): MD_CoverageDescription_Type }; }
export var MD_CoverageDescription_Type: { new(): MD_CoverageDescription_Type };

interface _MD_CoverageDescriptionProxyType extends BaseType {
	MD_CoverageDescription?: MD_CoverageDescription_Type;
	MD_ImageDescription?: MD_ImageDescription_Type;
}
interface MD_CoverageDescriptionProxyType extends _MD_CoverageDescriptionProxyType { constructor: { new(): MD_CoverageDescriptionProxyType }; }

interface _MD_DataIdentification_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_DataIdentification?: MD_DataIdentification_Type;
}
export interface MD_DataIdentification_PropertyType extends _MD_DataIdentification_PropertyType { constructor: { new(): MD_DataIdentification_PropertyType }; }
export var MD_DataIdentification_PropertyType: { new(): MD_DataIdentification_PropertyType };

interface _MD_DataIdentification_Type extends _AbstractMD_Identification_Type {
	characterSet?: MD_CharacterSetCode_PropertyType[];
	environmentDescription?: gco.CharacterString_PropertyType;
	extent?: EX_Extent_PropertyType[];
	language: gco.CharacterString_PropertyType[];
	spatialRepresentationType?: MD_SpatialRepresentationTypeCode_PropertyType[];
	spatialResolution?: MD_Resolution_PropertyType[];
	supplementalInformation?: gco.CharacterString_PropertyType;
	topicCategory?: MD_TopicCategoryCode_PropertyType[];
}
export interface MD_DataIdentification_Type extends _MD_DataIdentification_Type { constructor: { new(): MD_DataIdentification_Type }; }
export var MD_DataIdentification_Type: { new(): MD_DataIdentification_Type };

interface _MD_DatatypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_DatatypeCode?: gco.CodeListValue_Type;
}
export interface MD_DatatypeCode_PropertyType extends _MD_DatatypeCode_PropertyType { constructor: { new(): MD_DatatypeCode_PropertyType }; }
export var MD_DatatypeCode_PropertyType: { new(): MD_DatatypeCode_PropertyType };

interface _MD_DigitalTransferOptions_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_DigitalTransferOptions?: MD_DigitalTransferOptions_Type;
}
export interface MD_DigitalTransferOptions_PropertyType extends _MD_DigitalTransferOptions_PropertyType { constructor: { new(): MD_DigitalTransferOptions_PropertyType }; }
export var MD_DigitalTransferOptions_PropertyType: { new(): MD_DigitalTransferOptions_PropertyType };

/** Technical means and media by which a dataset is obtained from the distributor */
interface _MD_DigitalTransferOptions_Type extends gco._AbstractObject_Type {
	offLine?: MD_Medium_PropertyType;
	onLine?: CI_OnlineResource_PropertyType[];
	transferSize?: gco.Real_PropertyType;
	unitsOfDistribution?: gco.CharacterString_PropertyType;
}
export interface MD_DigitalTransferOptions_Type extends _MD_DigitalTransferOptions_Type { constructor: { new(): MD_DigitalTransferOptions_Type }; }
export var MD_DigitalTransferOptions_Type: { new(): MD_DigitalTransferOptions_Type };

interface _MD_Dimension_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Dimension?: MD_Dimension_Type;
}
export interface MD_Dimension_PropertyType extends _MD_Dimension_PropertyType { constructor: { new(): MD_Dimension_PropertyType }; }
export var MD_Dimension_PropertyType: { new(): MD_Dimension_PropertyType };

interface _MD_Dimension_Type extends gco._AbstractObject_Type {
	dimensionName: MD_DimensionNameTypeCode_PropertyType;
	dimensionSize: gco.Integer_PropertyType;
	resolution?: gco.Measure_PropertyType;
}
export interface MD_Dimension_Type extends _MD_Dimension_Type { constructor: { new(): MD_Dimension_Type }; }
export var MD_Dimension_Type: { new(): MD_Dimension_Type };

interface _MD_DimensionNameTypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_DimensionNameTypeCode?: gco.CodeListValue_Type;
}
export interface MD_DimensionNameTypeCode_PropertyType extends _MD_DimensionNameTypeCode_PropertyType { constructor: { new(): MD_DimensionNameTypeCode_PropertyType }; }
export var MD_DimensionNameTypeCode_PropertyType: { new(): MD_DimensionNameTypeCode_PropertyType };

interface _MD_Distribution_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Distribution?: MD_Distribution_Type;
}
export interface MD_Distribution_PropertyType extends _MD_Distribution_PropertyType { constructor: { new(): MD_Distribution_PropertyType }; }
export var MD_Distribution_PropertyType: { new(): MD_Distribution_PropertyType };

/** Information about the distributor of and options for obtaining the dataset */
interface _MD_Distribution_Type extends gco._AbstractObject_Type {
	distributionFormat?: MD_Format_PropertyType[];
	distributor?: MD_Distributor_PropertyType[];
	transferOptions?: MD_DigitalTransferOptions_PropertyType[];
}
export interface MD_Distribution_Type extends _MD_Distribution_Type { constructor: { new(): MD_Distribution_Type }; }
export var MD_Distribution_Type: { new(): MD_Distribution_Type };

interface _MD_DistributionUnits_PropertyType extends BaseType {
	nilReason: string;
	MD_DistributionUnits?: gco.CodeListValue_Type;
}
export interface MD_DistributionUnits_PropertyType extends _MD_DistributionUnits_PropertyType { constructor: { new(): MD_DistributionUnits_PropertyType }; }
export var MD_DistributionUnits_PropertyType: { new(): MD_DistributionUnits_PropertyType };

interface _MD_Distributor_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Distributor?: MD_Distributor_Type;
}
export interface MD_Distributor_PropertyType extends _MD_Distributor_PropertyType { constructor: { new(): MD_Distributor_PropertyType }; }
export var MD_Distributor_PropertyType: { new(): MD_Distributor_PropertyType };

/** Information about the distributor */
interface _MD_Distributor_Type extends gco._AbstractObject_Type {
	distributionOrderProcess?: MD_StandardOrderProcess_PropertyType[];
	distributorContact: CI_ResponsibleParty_PropertyType;
	distributorFormat?: MD_Format_PropertyType[];
	distributorTransferOptions?: MD_DigitalTransferOptions_PropertyType[];
}
export interface MD_Distributor_Type extends _MD_Distributor_Type { constructor: { new(): MD_Distributor_Type }; }
export var MD_Distributor_Type: { new(): MD_Distributor_Type };

interface _MD_ExtendedElementInformation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_ExtendedElementInformation?: MD_ExtendedElementInformation_Type;
}
export interface MD_ExtendedElementInformation_PropertyType extends _MD_ExtendedElementInformation_PropertyType { constructor: { new(): MD_ExtendedElementInformation_PropertyType }; }
export var MD_ExtendedElementInformation_PropertyType: { new(): MD_ExtendedElementInformation_PropertyType };

/** New metadata element, not found in ISO 19115, which is required to describe geographic data */
interface _MD_ExtendedElementInformation_Type extends gco._AbstractObject_Type {
	condition?: gco.CharacterString_PropertyType;
	dataType: MD_DatatypeCode_PropertyType;
	definition: gco.CharacterString_PropertyType;
	domainCode?: gco.Integer_PropertyType;
	domainValue?: gco.CharacterString_PropertyType;
	maximumOccurrence?: gco.CharacterString_PropertyType;
	name: gco.CharacterString_PropertyType;
	obligation?: MD_ObligationCode_PropertyType;
	parentEntity: gco.CharacterString_PropertyType[];
	rationale?: gco.CharacterString_PropertyType[];
	rule: gco.CharacterString_PropertyType;
	shortName?: gco.CharacterString_PropertyType;
	source: CI_ResponsibleParty_PropertyType[];
}
export interface MD_ExtendedElementInformation_Type extends _MD_ExtendedElementInformation_Type { constructor: { new(): MD_ExtendedElementInformation_Type }; }
export var MD_ExtendedElementInformation_Type: { new(): MD_ExtendedElementInformation_Type };

interface _MD_FeatureCatalogueDescription_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_FeatureCatalogueDescription?: MD_FeatureCatalogueDescription_Type;
}
export interface MD_FeatureCatalogueDescription_PropertyType extends _MD_FeatureCatalogueDescription_PropertyType { constructor: { new(): MD_FeatureCatalogueDescription_PropertyType }; }
export var MD_FeatureCatalogueDescription_PropertyType: { new(): MD_FeatureCatalogueDescription_PropertyType };

/** Information identifing the feature catalogue */
interface _MD_FeatureCatalogueDescription_Type extends _AbstractMD_ContentInformation_Type {
	complianceCode?: gco.Boolean_PropertyType;
	featureCatalogueCitation: CI_Citation_PropertyType[];
	featureTypes?: gco.GenericName_PropertyType[];
	includedWithDataset: gco.Boolean_PropertyType;
	language?: gco.CharacterString_PropertyType[];
}
export interface MD_FeatureCatalogueDescription_Type extends _MD_FeatureCatalogueDescription_Type { constructor: { new(): MD_FeatureCatalogueDescription_Type }; }
export var MD_FeatureCatalogueDescription_Type: { new(): MD_FeatureCatalogueDescription_Type };

interface _MD_Format_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Format?: MD_Format_Type;
}
export interface MD_Format_PropertyType extends _MD_Format_PropertyType { constructor: { new(): MD_Format_PropertyType }; }
export var MD_Format_PropertyType: { new(): MD_Format_PropertyType };

/** Description of the form of the data to be distributed */
interface _MD_Format_Type extends gco._AbstractObject_Type {
	amendmentNumber?: gco.CharacterString_PropertyType;
	fileDecompressionTechnique?: gco.CharacterString_PropertyType;
	formatDistributor?: MD_Distributor_PropertyType[];
	name: gco.CharacterString_PropertyType;
	specification?: gco.CharacterString_PropertyType;
	version: gco.CharacterString_PropertyType;
}
export interface MD_Format_Type extends _MD_Format_Type { constructor: { new(): MD_Format_Type }; }
export var MD_Format_Type: { new(): MD_Format_Type };

interface _MD_GeometricObjects_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_GeometricObjects?: MD_GeometricObjects_Type;
}
export interface MD_GeometricObjects_PropertyType extends _MD_GeometricObjects_PropertyType { constructor: { new(): MD_GeometricObjects_PropertyType }; }
export var MD_GeometricObjects_PropertyType: { new(): MD_GeometricObjects_PropertyType };

interface _MD_GeometricObjects_Type extends gco._AbstractObject_Type {
	geometricObjectCount?: gco.Integer_PropertyType;
	geometricObjectType: MD_GeometricObjectTypeCode_PropertyType;
}
export interface MD_GeometricObjects_Type extends _MD_GeometricObjects_Type { constructor: { new(): MD_GeometricObjects_Type }; }
export var MD_GeometricObjects_Type: { new(): MD_GeometricObjects_Type };

interface _MD_GeometricObjectTypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_GeometricObjectTypeCode?: gco.CodeListValue_Type;
}
export interface MD_GeometricObjectTypeCode_PropertyType extends _MD_GeometricObjectTypeCode_PropertyType { constructor: { new(): MD_GeometricObjectTypeCode_PropertyType }; }
export var MD_GeometricObjectTypeCode_PropertyType: { new(): MD_GeometricObjectTypeCode_PropertyType };

interface _MD_Georectified_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Georectified?: MD_Georectified_Type;
}
export interface MD_Georectified_PropertyType extends _MD_Georectified_PropertyType { constructor: { new(): MD_Georectified_PropertyType }; }
export var MD_Georectified_PropertyType: { new(): MD_Georectified_PropertyType };

interface _MD_Georectified_Type extends _MD_GridSpatialRepresentation_Type {
	centerPoint?: gss.GM_Point_PropertyType;
	checkPointAvailability: gco.Boolean_PropertyType;
	checkPointDescription?: gco.CharacterString_PropertyType;
	cornerPoints?: gss.GM_Point_PropertyType[];
	pointInPixel: MD_PixelOrientationCode_PropertyType;
	transformationDimensionDescription?: gco.CharacterString_PropertyType;
	transformationDimensionMapping?: gco.CharacterString_PropertyType[];
}
export interface MD_Georectified_Type extends _MD_Georectified_Type { constructor: { new(): MD_Georectified_Type }; }
export var MD_Georectified_Type: { new(): MD_Georectified_Type };

interface _MD_Georeferenceable_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Georeferenceable?: MD_Georeferenceable_Type;
}
export interface MD_Georeferenceable_PropertyType extends _MD_Georeferenceable_PropertyType { constructor: { new(): MD_Georeferenceable_PropertyType }; }
export var MD_Georeferenceable_PropertyType: { new(): MD_Georeferenceable_PropertyType };

interface _MD_Georeferenceable_Type extends _MD_GridSpatialRepresentation_Type {
	controlPointAvailability: gco.Boolean_PropertyType;
	georeferencedParameters: gco.Record_PropertyType;
	orientationParameterAvailability: gco.Boolean_PropertyType;
	orientationParameterDescription?: gco.CharacterString_PropertyType;
	parameterCitation?: CI_Citation_PropertyType[];
}
export interface MD_Georeferenceable_Type extends _MD_Georeferenceable_Type { constructor: { new(): MD_Georeferenceable_Type }; }
export var MD_Georeferenceable_Type: { new(): MD_Georeferenceable_Type };

interface _MD_GridSpatialRepresentation_PropertyType extends _MD_GridSpatialRepresentationProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_GridSpatialRepresentation_PropertyType extends _MD_GridSpatialRepresentation_PropertyType { constructor: { new(): MD_GridSpatialRepresentation_PropertyType }; }
export var MD_GridSpatialRepresentation_PropertyType: { new(): MD_GridSpatialRepresentation_PropertyType };

/** Types and numbers of raster spatial objects in the dataset */
interface _MD_GridSpatialRepresentation_Type extends _AbstractMD_SpatialRepresentation_Type {
	axisDimensionProperties?: MD_Dimension_PropertyType[];
	cellGeometry: MD_CellGeometryCode_PropertyType;
	numberOfDimensions: gco.Integer_PropertyType;
	transformationParameterAvailability: gco.Boolean_PropertyType;
}
export interface MD_GridSpatialRepresentation_Type extends _MD_GridSpatialRepresentation_Type { constructor: { new(): MD_GridSpatialRepresentation_Type }; }
export var MD_GridSpatialRepresentation_Type: { new(): MD_GridSpatialRepresentation_Type };

interface _MD_GridSpatialRepresentationProxyType extends BaseType {
	MD_GridSpatialRepresentation?: MD_GridSpatialRepresentation_Type;
	MD_Georeferenceable?: MD_Georeferenceable_Type;
	MD_Georectified?: MD_Georectified_Type;
}
interface MD_GridSpatialRepresentationProxyType extends _MD_GridSpatialRepresentationProxyType { constructor: { new(): MD_GridSpatialRepresentationProxyType }; }

interface _MD_Identification_PropertyType extends _AbstractMD_IdentificationProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_Identification_PropertyType extends _MD_Identification_PropertyType { constructor: { new(): MD_Identification_PropertyType }; }
export var MD_Identification_PropertyType: { new(): MD_Identification_PropertyType };

interface _MD_Identifier_PropertyType extends _MD_IdentifierProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_Identifier_PropertyType extends _MD_Identifier_PropertyType { constructor: { new(): MD_Identifier_PropertyType }; }
export var MD_Identifier_PropertyType: { new(): MD_Identifier_PropertyType };

interface _MD_Identifier_Type extends gco._AbstractObject_Type {
	authority?: CI_Citation_PropertyType;
	code: gco.CharacterString_PropertyType;
}
export interface MD_Identifier_Type extends _MD_Identifier_Type { constructor: { new(): MD_Identifier_Type }; }
export var MD_Identifier_Type: { new(): MD_Identifier_Type };

interface _MD_IdentifierProxyType extends BaseType {
	MD_Identifier?: MD_Identifier_Type;
	RS_Identifier?: RS_Identifier_Type;
}
interface MD_IdentifierProxyType extends _MD_IdentifierProxyType { constructor: { new(): MD_IdentifierProxyType }; }

interface _MD_ImageDescription_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_ImageDescription?: MD_ImageDescription_Type;
}
export interface MD_ImageDescription_PropertyType extends _MD_ImageDescription_PropertyType { constructor: { new(): MD_ImageDescription_PropertyType }; }
export var MD_ImageDescription_PropertyType: { new(): MD_ImageDescription_PropertyType };

/** Information about an image's suitability for use */
interface _MD_ImageDescription_Type extends _MD_CoverageDescription_Type {
	cameraCalibrationInformationAvailability?: gco.Boolean_PropertyType;
	cloudCoverPercentage?: gco.Real_PropertyType;
	compressionGenerationQuantity?: gco.Integer_PropertyType;
	filmDistortionInformationAvailability?: gco.Boolean_PropertyType;
	illuminationAzimuthAngle?: gco.Real_PropertyType;
	illuminationElevationAngle?: gco.Real_PropertyType;
	imageQualityCode?: MD_Identifier_PropertyType;
	imagingCondition?: MD_ImagingConditionCode_PropertyType;
	lensDistortionInformationAvailability?: gco.Boolean_PropertyType;
	processingLevelCode?: MD_Identifier_PropertyType;
	radiometricCalibrationDataAvailability?: gco.Boolean_PropertyType;
	triangulationIndicator?: gco.Boolean_PropertyType;
}
export interface MD_ImageDescription_Type extends _MD_ImageDescription_Type { constructor: { new(): MD_ImageDescription_Type }; }
export var MD_ImageDescription_Type: { new(): MD_ImageDescription_Type };

interface _MD_ImagingConditionCode_PropertyType extends BaseType {
	nilReason: string;
	MD_ImagingConditionCode?: gco.CodeListValue_Type;
}
export interface MD_ImagingConditionCode_PropertyType extends _MD_ImagingConditionCode_PropertyType { constructor: { new(): MD_ImagingConditionCode_PropertyType }; }
export var MD_ImagingConditionCode_PropertyType: { new(): MD_ImagingConditionCode_PropertyType };

interface _MD_Keywords_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Keywords?: MD_Keywords_Type;
}
export interface MD_Keywords_PropertyType extends _MD_Keywords_PropertyType { constructor: { new(): MD_Keywords_PropertyType }; }
export var MD_Keywords_PropertyType: { new(): MD_Keywords_PropertyType };

/** Keywords, their type and reference source */
interface _MD_Keywords_Type extends gco._AbstractObject_Type {
	keyword: gco.CharacterString_PropertyType[];
	thesaurusName?: CI_Citation_PropertyType;
	type?: MD_KeywordTypeCode_PropertyType;
}
export interface MD_Keywords_Type extends _MD_Keywords_Type { constructor: { new(): MD_Keywords_Type }; }
export var MD_Keywords_Type: { new(): MD_Keywords_Type };

interface _MD_KeywordTypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_KeywordTypeCode?: gco.CodeListValue_Type;
}
export interface MD_KeywordTypeCode_PropertyType extends _MD_KeywordTypeCode_PropertyType { constructor: { new(): MD_KeywordTypeCode_PropertyType }; }
export var MD_KeywordTypeCode_PropertyType: { new(): MD_KeywordTypeCode_PropertyType };

interface _MD_LegalConstraints_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_LegalConstraints?: MD_LegalConstraints_Type;
}
export interface MD_LegalConstraints_PropertyType extends _MD_LegalConstraints_PropertyType { constructor: { new(): MD_LegalConstraints_PropertyType }; }
export var MD_LegalConstraints_PropertyType: { new(): MD_LegalConstraints_PropertyType };

/** Restrictions and legal prerequisites for accessing and using the dataset. */
interface _MD_LegalConstraints_Type extends _MD_Constraints_Type {
	accessConstraints?: MD_RestrictionCode_PropertyType[];
	otherConstraints?: gco.CharacterString_PropertyType[];
	useConstraints?: MD_RestrictionCode_PropertyType[];
}
export interface MD_LegalConstraints_Type extends _MD_LegalConstraints_Type { constructor: { new(): MD_LegalConstraints_Type }; }
export var MD_LegalConstraints_Type: { new(): MD_LegalConstraints_Type };

interface _MD_MaintenanceFrequencyCode_PropertyType extends BaseType {
	nilReason: string;
	MD_MaintenanceFrequencyCode?: gco.CodeListValue_Type;
}
export interface MD_MaintenanceFrequencyCode_PropertyType extends _MD_MaintenanceFrequencyCode_PropertyType { constructor: { new(): MD_MaintenanceFrequencyCode_PropertyType }; }
export var MD_MaintenanceFrequencyCode_PropertyType: { new(): MD_MaintenanceFrequencyCode_PropertyType };

interface _MD_MaintenanceInformation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_MaintenanceInformation?: MD_MaintenanceInformation_Type;
}
export interface MD_MaintenanceInformation_PropertyType extends _MD_MaintenanceInformation_PropertyType { constructor: { new(): MD_MaintenanceInformation_PropertyType }; }
export var MD_MaintenanceInformation_PropertyType: { new(): MD_MaintenanceInformation_PropertyType };

/** Information about the scope and frequency of updating */
interface _MD_MaintenanceInformation_Type extends gco._AbstractObject_Type {
	contact?: CI_ResponsibleParty_PropertyType[];
	dateOfNextUpdate?: gco.Date_PropertyType;
	maintenanceAndUpdateFrequency: MD_MaintenanceFrequencyCode_PropertyType;
	maintenanceNote?: gco.CharacterString_PropertyType[];
	updateScope?: MD_ScopeCode_PropertyType[];
	updateScopeDescription?: MD_ScopeDescription_PropertyType[];
	userDefinedMaintenanceFrequency?: gts.TM_PeriodDuration_PropertyType;
}
export interface MD_MaintenanceInformation_Type extends _MD_MaintenanceInformation_Type { constructor: { new(): MD_MaintenanceInformation_Type }; }
export var MD_MaintenanceInformation_Type: { new(): MD_MaintenanceInformation_Type };

interface _MD_Medium_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Medium?: MD_Medium_Type;
}
export interface MD_Medium_PropertyType extends _MD_Medium_PropertyType { constructor: { new(): MD_Medium_PropertyType }; }
export var MD_Medium_PropertyType: { new(): MD_Medium_PropertyType };

/** Information about the media on which the data can be distributed */
interface _MD_Medium_Type extends gco._AbstractObject_Type {
	density?: gco.Real_PropertyType[];
	densityUnits?: gco.CharacterString_PropertyType;
	mediumFormat?: MD_MediumFormatCode_PropertyType[];
	mediumNote?: gco.CharacterString_PropertyType;
	name?: MD_MediumNameCode_PropertyType;
	volumes?: gco.Integer_PropertyType;
}
export interface MD_Medium_Type extends _MD_Medium_Type { constructor: { new(): MD_Medium_Type }; }
export var MD_Medium_Type: { new(): MD_Medium_Type };

interface _MD_MediumFormatCode_PropertyType extends BaseType {
	nilReason: string;
	MD_MediumFormatCode?: gco.CodeListValue_Type;
}
export interface MD_MediumFormatCode_PropertyType extends _MD_MediumFormatCode_PropertyType { constructor: { new(): MD_MediumFormatCode_PropertyType }; }
export var MD_MediumFormatCode_PropertyType: { new(): MD_MediumFormatCode_PropertyType };

interface _MD_MediumNameCode_PropertyType extends BaseType {
	nilReason: string;
	MD_MediumNameCode?: gco.CodeListValue_Type;
}
export interface MD_MediumNameCode_PropertyType extends _MD_MediumNameCode_PropertyType { constructor: { new(): MD_MediumNameCode_PropertyType }; }
export var MD_MediumNameCode_PropertyType: { new(): MD_MediumNameCode_PropertyType };

interface _MD_Metadata_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Metadata?: MD_Metadata_Type;
}
export interface MD_Metadata_PropertyType extends _MD_Metadata_PropertyType { constructor: { new(): MD_Metadata_PropertyType }; }
export var MD_Metadata_PropertyType: { new(): MD_Metadata_PropertyType };

/** Information about the metadata */
interface _MD_Metadata_Type extends gco._AbstractObject_Type {
	applicationSchemaInfo?: MD_ApplicationSchemaInformation_PropertyType[];
	characterSet?: MD_CharacterSetCode_PropertyType;
	contact: CI_ResponsibleParty_PropertyType[];
	contentInfo?: MD_ContentInformation_PropertyType[];
	dataQualityInfo?: DQ_DataQuality_PropertyType[];
	dataSetURI?: gco.CharacterString_PropertyType;
	dateStamp: gco.Date_PropertyType;
	describes?: DS_DataSet_PropertyType[];
	distributionInfo?: MD_Distribution_PropertyType;
	featureAttribute?: gco.ObjectReference_PropertyType[];
	featureType?: gco.ObjectReference_PropertyType[];
	fileIdentifier?: gco.CharacterString_PropertyType;
	hierarchyLevel?: MD_ScopeCode_PropertyType[];
	hierarchyLevelName?: gco.CharacterString_PropertyType[];
	identificationInfo: MD_Identification_PropertyType[];
	language?: gco.CharacterString_PropertyType;
	locale?: PT_Locale_PropertyType[];
	metadataConstraints?: MD_Constraints_PropertyType[];
	metadataExtensionInfo?: MD_MetadataExtensionInformation_PropertyType[];
	metadataMaintenance?: MD_MaintenanceInformation_PropertyType;
	metadataStandardName?: gco.CharacterString_PropertyType;
	metadataStandardVersion?: gco.CharacterString_PropertyType;
	parentIdentifier?: gco.CharacterString_PropertyType;
	portrayalCatalogueInfo?: MD_PortrayalCatalogueReference_PropertyType[];
	propertyType?: gco.ObjectReference_PropertyType[];
	referenceSystemInfo?: MD_ReferenceSystem_PropertyType[];
	series?: DS_Aggregate_PropertyType[];
	spatialRepresentationInfo?: MD_SpatialRepresentation_PropertyType[];
}
export interface MD_Metadata_Type extends _MD_Metadata_Type { constructor: { new(): MD_Metadata_Type }; }
export var MD_Metadata_Type: { new(): MD_Metadata_Type };

interface _MD_MetadataExtensionInformation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_MetadataExtensionInformation?: MD_MetadataExtensionInformation_Type;
}
export interface MD_MetadataExtensionInformation_PropertyType extends _MD_MetadataExtensionInformation_PropertyType { constructor: { new(): MD_MetadataExtensionInformation_PropertyType }; }
export var MD_MetadataExtensionInformation_PropertyType: { new(): MD_MetadataExtensionInformation_PropertyType };

/** Information describing metadata extensions. */
interface _MD_MetadataExtensionInformation_Type extends gco._AbstractObject_Type {
	extendedElementInformation?: MD_ExtendedElementInformation_PropertyType[];
	extensionOnLineResource?: CI_OnlineResource_PropertyType;
}
export interface MD_MetadataExtensionInformation_Type extends _MD_MetadataExtensionInformation_Type { constructor: { new(): MD_MetadataExtensionInformation_Type }; }
export var MD_MetadataExtensionInformation_Type: { new(): MD_MetadataExtensionInformation_Type };

interface _MD_ObligationCode_PropertyType extends BaseType {
	nilReason: string;
	MD_ObligationCode?: MD_ObligationCode_Type;
}
export interface MD_ObligationCode_PropertyType extends _MD_ObligationCode_PropertyType { constructor: { new(): MD_ObligationCode_PropertyType }; }
export var MD_ObligationCode_PropertyType: { new(): MD_ObligationCode_PropertyType };

export type MD_ObligationCode_Type = ("mandatory" | "optional" | "conditional");
interface _MD_ObligationCode_Type extends Primitive._string { content: MD_ObligationCode_Type; }

interface _MD_PixelOrientationCode_PropertyType extends BaseType {
	nilReason: string;
	MD_PixelOrientationCode?: MD_PixelOrientationCode_Type;
}
export interface MD_PixelOrientationCode_PropertyType extends _MD_PixelOrientationCode_PropertyType { constructor: { new(): MD_PixelOrientationCode_PropertyType }; }
export var MD_PixelOrientationCode_PropertyType: { new(): MD_PixelOrientationCode_PropertyType };

export type MD_PixelOrientationCode_Type = ("center" | "lowerLeft" | "lowerRight" | "upperRight" | "upperLeft");
interface _MD_PixelOrientationCode_Type extends Primitive._string { content: MD_PixelOrientationCode_Type; }

interface _MD_PortrayalCatalogueReference_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_PortrayalCatalogueReference?: MD_PortrayalCatalogueReference_Type;
}
export interface MD_PortrayalCatalogueReference_PropertyType extends _MD_PortrayalCatalogueReference_PropertyType { constructor: { new(): MD_PortrayalCatalogueReference_PropertyType }; }
export var MD_PortrayalCatalogueReference_PropertyType: { new(): MD_PortrayalCatalogueReference_PropertyType };

/** Information identifing the portrayal catalogue used */
interface _MD_PortrayalCatalogueReference_Type extends gco._AbstractObject_Type {
	portrayalCatalogueCitation: CI_Citation_PropertyType[];
}
export interface MD_PortrayalCatalogueReference_Type extends _MD_PortrayalCatalogueReference_Type { constructor: { new(): MD_PortrayalCatalogueReference_Type }; }
export var MD_PortrayalCatalogueReference_Type: { new(): MD_PortrayalCatalogueReference_Type };

interface _MD_ProgressCode_PropertyType extends BaseType {
	nilReason: string;
	MD_ProgressCode?: gco.CodeListValue_Type;
}
export interface MD_ProgressCode_PropertyType extends _MD_ProgressCode_PropertyType { constructor: { new(): MD_ProgressCode_PropertyType }; }
export var MD_ProgressCode_PropertyType: { new(): MD_ProgressCode_PropertyType };

interface _MD_RangeDimension_PropertyType extends _MD_RangeDimensionProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_RangeDimension_PropertyType extends _MD_RangeDimension_PropertyType { constructor: { new(): MD_RangeDimension_PropertyType }; }
export var MD_RangeDimension_PropertyType: { new(): MD_RangeDimension_PropertyType };

/** Set of adjacent wavelengths in the electro-magnetic spectrum with a common characteristic, such as the visible band */
interface _MD_RangeDimension_Type extends gco._AbstractObject_Type {
	descriptor?: gco.CharacterString_PropertyType;
	sequenceIdentifier?: gco.MemberName_PropertyType;
}
export interface MD_RangeDimension_Type extends _MD_RangeDimension_Type { constructor: { new(): MD_RangeDimension_Type }; }
export var MD_RangeDimension_Type: { new(): MD_RangeDimension_Type };

interface _MD_RangeDimensionProxyType extends BaseType {
	MD_RangeDimension?: MD_RangeDimension_Type;
	MD_Band?: MD_Band_Type;
}
interface MD_RangeDimensionProxyType extends _MD_RangeDimensionProxyType { constructor: { new(): MD_RangeDimensionProxyType }; }

interface _MD_ReferenceSystem_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_ReferenceSystem?: MD_ReferenceSystem_Type;
}
export interface MD_ReferenceSystem_PropertyType extends _MD_ReferenceSystem_PropertyType { constructor: { new(): MD_ReferenceSystem_PropertyType }; }
export var MD_ReferenceSystem_PropertyType: { new(): MD_ReferenceSystem_PropertyType };

interface _MD_ReferenceSystem_Type extends gco._AbstractObject_Type {
	referenceSystemIdentifier?: RS_Identifier_PropertyType;
}
export interface MD_ReferenceSystem_Type extends _MD_ReferenceSystem_Type { constructor: { new(): MD_ReferenceSystem_Type }; }
export var MD_ReferenceSystem_Type: { new(): MD_ReferenceSystem_Type };

interface _MD_RepresentativeFraction_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_RepresentativeFraction?: MD_RepresentativeFraction_Type;
}
export interface MD_RepresentativeFraction_PropertyType extends _MD_RepresentativeFraction_PropertyType { constructor: { new(): MD_RepresentativeFraction_PropertyType }; }
export var MD_RepresentativeFraction_PropertyType: { new(): MD_RepresentativeFraction_PropertyType };

interface _MD_RepresentativeFraction_Type extends gco._AbstractObject_Type {
	denominator: gco.Integer_PropertyType;
}
export interface MD_RepresentativeFraction_Type extends _MD_RepresentativeFraction_Type { constructor: { new(): MD_RepresentativeFraction_Type }; }
export var MD_RepresentativeFraction_Type: { new(): MD_RepresentativeFraction_Type };

interface _MD_Resolution_PropertyType extends BaseType {
	nilReason: string;
	MD_Resolution?: MD_Resolution_Type;
}
export interface MD_Resolution_PropertyType extends _MD_Resolution_PropertyType { constructor: { new(): MD_Resolution_PropertyType }; }
export var MD_Resolution_PropertyType: { new(): MD_Resolution_PropertyType };

interface _MD_Resolution_Type extends BaseType {
	distance: gco.Distance_PropertyType;
	equivalentScale: MD_RepresentativeFraction_PropertyType;
}
export interface MD_Resolution_Type extends _MD_Resolution_Type { constructor: { new(): MD_Resolution_Type }; }
export var MD_Resolution_Type: { new(): MD_Resolution_Type };

interface _MD_RestrictionCode_PropertyType extends BaseType {
	nilReason: string;
	MD_RestrictionCode?: gco.CodeListValue_Type;
}
export interface MD_RestrictionCode_PropertyType extends _MD_RestrictionCode_PropertyType { constructor: { new(): MD_RestrictionCode_PropertyType }; }
export var MD_RestrictionCode_PropertyType: { new(): MD_RestrictionCode_PropertyType };

interface _MD_ScopeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_ScopeCode?: gco.CodeListValue_Type;
}
export interface MD_ScopeCode_PropertyType extends _MD_ScopeCode_PropertyType { constructor: { new(): MD_ScopeCode_PropertyType }; }
export var MD_ScopeCode_PropertyType: { new(): MD_ScopeCode_PropertyType };

interface _MD_ScopeDescription_PropertyType extends BaseType {
	nilReason: string;
	MD_ScopeDescription?: MD_ScopeDescription_Type;
}
export interface MD_ScopeDescription_PropertyType extends _MD_ScopeDescription_PropertyType { constructor: { new(): MD_ScopeDescription_PropertyType }; }
export var MD_ScopeDescription_PropertyType: { new(): MD_ScopeDescription_PropertyType };

/** Description of the class of information covered by the information */
interface _MD_ScopeDescription_Type extends BaseType {
	attributeInstances: gco.ObjectReference_PropertyType[];
	attributes: gco.ObjectReference_PropertyType[];
	dataset: gco.CharacterString_PropertyType;
	featureInstances: gco.ObjectReference_PropertyType[];
	features: gco.ObjectReference_PropertyType[];
	other: gco.CharacterString_PropertyType;
}
export interface MD_ScopeDescription_Type extends _MD_ScopeDescription_Type { constructor: { new(): MD_ScopeDescription_Type }; }
export var MD_ScopeDescription_Type: { new(): MD_ScopeDescription_Type };

interface _MD_SecurityConstraints_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_SecurityConstraints?: MD_SecurityConstraints_Type;
}
export interface MD_SecurityConstraints_PropertyType extends _MD_SecurityConstraints_PropertyType { constructor: { new(): MD_SecurityConstraints_PropertyType }; }
export var MD_SecurityConstraints_PropertyType: { new(): MD_SecurityConstraints_PropertyType };

/** Handling restrictions imposed on the dataset because of national security, privacy, or other concerns */
interface _MD_SecurityConstraints_Type extends _MD_Constraints_Type {
	classification: MD_ClassificationCode_PropertyType;
	classificationSystem?: gco.CharacterString_PropertyType;
	handlingDescription?: gco.CharacterString_PropertyType;
	userNote?: gco.CharacterString_PropertyType;
}
export interface MD_SecurityConstraints_Type extends _MD_SecurityConstraints_Type { constructor: { new(): MD_SecurityConstraints_Type }; }
export var MD_SecurityConstraints_Type: { new(): MD_SecurityConstraints_Type };

interface _MD_ServiceIdentification_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_ServiceIdentification?: MD_ServiceIdentification_Type;
}
export interface MD_ServiceIdentification_PropertyType extends _MD_ServiceIdentification_PropertyType { constructor: { new(): MD_ServiceIdentification_PropertyType }; }
export var MD_ServiceIdentification_PropertyType: { new(): MD_ServiceIdentification_PropertyType };

/** See 19119 for further info */
interface _MD_ServiceIdentification_Type extends _AbstractMD_Identification_Type {}
export interface MD_ServiceIdentification_Type extends _MD_ServiceIdentification_Type { constructor: { new(): MD_ServiceIdentification_Type }; }
export var MD_ServiceIdentification_Type: { new(): MD_ServiceIdentification_Type };

interface _MD_SpatialRepresentation_PropertyType extends _AbstractMD_SpatialRepresentationProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface MD_SpatialRepresentation_PropertyType extends _MD_SpatialRepresentation_PropertyType { constructor: { new(): MD_SpatialRepresentation_PropertyType }; }
export var MD_SpatialRepresentation_PropertyType: { new(): MD_SpatialRepresentation_PropertyType };

interface _MD_SpatialRepresentationTypeCode_PropertyType extends BaseType {
	nilReason: string;
	MD_SpatialRepresentationTypeCode?: gco.CodeListValue_Type;
}
export interface MD_SpatialRepresentationTypeCode_PropertyType extends _MD_SpatialRepresentationTypeCode_PropertyType { constructor: { new(): MD_SpatialRepresentationTypeCode_PropertyType }; }
export var MD_SpatialRepresentationTypeCode_PropertyType: { new(): MD_SpatialRepresentationTypeCode_PropertyType };

interface _MD_StandardOrderProcess_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_StandardOrderProcess?: MD_StandardOrderProcess_Type;
}
export interface MD_StandardOrderProcess_PropertyType extends _MD_StandardOrderProcess_PropertyType { constructor: { new(): MD_StandardOrderProcess_PropertyType }; }
export var MD_StandardOrderProcess_PropertyType: { new(): MD_StandardOrderProcess_PropertyType };

/** Common ways in which the dataset may be obtained or received, and related instructions and fee information */
interface _MD_StandardOrderProcess_Type extends gco._AbstractObject_Type {
	fees?: gco.CharacterString_PropertyType;
	orderingInstructions?: gco.CharacterString_PropertyType;
	plannedAvailableDateTime?: gco.DateTime_PropertyType;
	turnaround?: gco.CharacterString_PropertyType;
}
export interface MD_StandardOrderProcess_Type extends _MD_StandardOrderProcess_Type { constructor: { new(): MD_StandardOrderProcess_Type }; }
export var MD_StandardOrderProcess_Type: { new(): MD_StandardOrderProcess_Type };

interface _MD_TopicCategoryCode_PropertyType extends BaseType {
	nilReason: string;
	MD_TopicCategoryCode?: MD_TopicCategoryCode_Type;
}
export interface MD_TopicCategoryCode_PropertyType extends _MD_TopicCategoryCode_PropertyType { constructor: { new(): MD_TopicCategoryCode_PropertyType }; }
export var MD_TopicCategoryCode_PropertyType: { new(): MD_TopicCategoryCode_PropertyType };

/** High-level geospatial data thematic classification to assist in the grouping and search of available geospatial datasets */
export type MD_TopicCategoryCode_Type = ("farming" | "biota" | "boundaries" | "climatologyMeteorologyAtmosphere" | "economy" | "elevation" | "environment" | "geoscientificInformation" | "health" | "imageryBaseMapsEarthCover" | "intelligenceMilitary" | "inlandWaters" | "location" | "oceans" | "planningCadastre" | "society" | "structure" | "transportation" | "utilitiesCommunication");
interface _MD_TopicCategoryCode_Type extends Primitive._string { content: MD_TopicCategoryCode_Type; }

interface _MD_TopologyLevelCode_PropertyType extends BaseType {
	nilReason: string;
	MD_TopologyLevelCode?: gco.CodeListValue_Type;
}
export interface MD_TopologyLevelCode_PropertyType extends _MD_TopologyLevelCode_PropertyType { constructor: { new(): MD_TopologyLevelCode_PropertyType }; }
export var MD_TopologyLevelCode_PropertyType: { new(): MD_TopologyLevelCode_PropertyType };

interface _MD_Usage_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_Usage?: MD_Usage_Type;
}
export interface MD_Usage_PropertyType extends _MD_Usage_PropertyType { constructor: { new(): MD_Usage_PropertyType }; }
export var MD_Usage_PropertyType: { new(): MD_Usage_PropertyType };

/** Brief description of ways in which the dataset is currently used. */
interface _MD_Usage_Type extends gco._AbstractObject_Type {
	specificUsage: gco.CharacterString_PropertyType;
	usageDateTime?: gco.DateTime_PropertyType;
	userContactInfo: CI_ResponsibleParty_PropertyType[];
	userDeterminedLimitations?: gco.CharacterString_PropertyType;
}
export interface MD_Usage_Type extends _MD_Usage_Type { constructor: { new(): MD_Usage_Type }; }
export var MD_Usage_Type: { new(): MD_Usage_Type };

interface _MD_VectorSpatialRepresentation_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	MD_VectorSpatialRepresentation?: MD_VectorSpatialRepresentation_Type;
}
export interface MD_VectorSpatialRepresentation_PropertyType extends _MD_VectorSpatialRepresentation_PropertyType { constructor: { new(): MD_VectorSpatialRepresentation_PropertyType }; }
export var MD_VectorSpatialRepresentation_PropertyType: { new(): MD_VectorSpatialRepresentation_PropertyType };

/** Information about the vector spatial objects in the dataset */
interface _MD_VectorSpatialRepresentation_Type extends _AbstractMD_SpatialRepresentation_Type {
	geometricObjects?: MD_GeometricObjects_PropertyType[];
	topologyLevel?: MD_TopologyLevelCode_PropertyType;
}
export interface MD_VectorSpatialRepresentation_Type extends _MD_VectorSpatialRepresentation_Type { constructor: { new(): MD_VectorSpatialRepresentation_Type }; }
export var MD_VectorSpatialRepresentation_Type: { new(): MD_VectorSpatialRepresentation_Type };

interface _PT_FreeText_PropertyType extends gco._CharacterString_PropertyType {
	PT_FreeText?: PT_FreeText_Type;
}
export interface PT_FreeText_PropertyType extends _PT_FreeText_PropertyType { constructor: { new(): PT_FreeText_PropertyType }; }
export var PT_FreeText_PropertyType: { new(): PT_FreeText_PropertyType };

interface _PT_FreeText_Type extends gco._AbstractObject_Type {
	textGroup: LocalisedCharacterString_PropertyType[];
}
export interface PT_FreeText_Type extends _PT_FreeText_Type { constructor: { new(): PT_FreeText_Type }; }
export var PT_FreeText_Type: { new(): PT_FreeText_Type };

interface _PT_Locale_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	PT_Locale?: PT_Locale_Type;
}
export interface PT_Locale_PropertyType extends _PT_Locale_PropertyType { constructor: { new(): PT_Locale_PropertyType }; }
export var PT_Locale_PropertyType: { new(): PT_Locale_PropertyType };

interface _PT_Locale_Type extends gco._AbstractObject_Type {
	characterEncoding: MD_CharacterSetCode_PropertyType;
	country?: Country_PropertyType;
	languageCode: LanguageCode_PropertyType;
}
export interface PT_Locale_Type extends _PT_Locale_Type { constructor: { new(): PT_Locale_Type }; }
export var PT_Locale_Type: { new(): PT_Locale_Type };

interface _PT_LocaleContainer_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	PT_LocaleContainer?: PT_LocaleContainer_Type;
}
export interface PT_LocaleContainer_PropertyType extends _PT_LocaleContainer_PropertyType { constructor: { new(): PT_LocaleContainer_PropertyType }; }
export var PT_LocaleContainer_PropertyType: { new(): PT_LocaleContainer_PropertyType };

interface _PT_LocaleContainer_Type extends BaseType {
	date: CI_Date_PropertyType[];
	description: gco.CharacterString_PropertyType;
	locale: PT_Locale_PropertyType;
	localisedString: LocalisedCharacterString_PropertyType[];
	responsibleParty: CI_ResponsibleParty_PropertyType[];
}
export interface PT_LocaleContainer_Type extends _PT_LocaleContainer_Type { constructor: { new(): PT_LocaleContainer_Type }; }
export var PT_LocaleContainer_Type: { new(): PT_LocaleContainer_Type };

interface _RS_Identifier_PropertyType extends BaseType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
	RS_Identifier?: RS_Identifier_Type;
}
export interface RS_Identifier_PropertyType extends _RS_Identifier_PropertyType { constructor: { new(): RS_Identifier_PropertyType }; }
export var RS_Identifier_PropertyType: { new(): RS_Identifier_PropertyType };

interface _RS_Identifier_Type extends _MD_Identifier_Type {
	codeSpace?: gco.CharacterString_PropertyType;
	version?: gco.CharacterString_PropertyType;
}
export interface RS_Identifier_Type extends _RS_Identifier_Type { constructor: { new(): RS_Identifier_Type }; }
export var RS_Identifier_Type: { new(): RS_Identifier_Type };

interface _RS_ReferenceSystem_PropertyType extends _AbstractRS_ReferenceSystemProxyType {
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	nilReason: string;
}
export interface RS_ReferenceSystem_PropertyType extends _RS_ReferenceSystem_PropertyType { constructor: { new(): RS_ReferenceSystem_PropertyType }; }
export var RS_ReferenceSystem_PropertyType: { new(): RS_ReferenceSystem_PropertyType };

interface _URL_PropertyType extends BaseType {
	nilReason: string;
	URL?: string;
}
export interface URL_PropertyType extends _URL_PropertyType { constructor: { new(): URL_PropertyType }; }
export var URL_PropertyType: { new(): URL_PropertyType };

export interface document extends BaseType {
	CI_Address: CI_Address_Type;
	CI_Citation: CI_Citation_Type;
	CI_Contact: CI_Contact_Type;
	CI_Date: CI_Date_Type;
	CI_DateTypeCode: gco.CodeListValue_Type;
	CI_OnLineFunctionCode: gco.CodeListValue_Type;
	CI_OnlineResource: CI_OnlineResource_Type;
	CI_PresentationFormCode: gco.CodeListValue_Type;
	CI_ResponsibleParty: CI_ResponsibleParty_Type;
	CI_RoleCode: gco.CodeListValue_Type;
	CI_Series: CI_Series_Type;
	CI_Telephone: CI_Telephone_Type;
	Country: gco.CodeListValue_Type;
	DQ_AbsoluteExternalPositionalAccuracy: DQ_AbsoluteExternalPositionalAccuracy_Type;
	DQ_AccuracyOfATimeMeasurement: DQ_AccuracyOfATimeMeasurement_Type;
	DQ_CompletenessCommission: DQ_CompletenessCommission_Type;
	DQ_CompletenessOmission: DQ_CompletenessOmission_Type;
	DQ_ConceptualConsistency: DQ_ConceptualConsistency_Type;
	DQ_ConformanceResult: DQ_ConformanceResult_Type;
	DQ_DataQuality: DQ_DataQuality_Type;
	DQ_DomainConsistency: DQ_DomainConsistency_Type;
	DQ_EvaluationMethodTypeCode: gco.CodeListValue_Type;
	DQ_FormatConsistency: DQ_FormatConsistency_Type;
	DQ_GriddedDataPositionalAccuracy: DQ_GriddedDataPositionalAccuracy_Type;
	DQ_NonQuantitativeAttributeAccuracy: DQ_NonQuantitativeAttributeAccuracy_Type;
	DQ_QuantitativeAttributeAccuracy: DQ_QuantitativeAttributeAccuracy_Type;
	DQ_QuantitativeResult: DQ_QuantitativeResult_Type;
	DQ_RelativeInternalPositionalAccuracy: DQ_RelativeInternalPositionalAccuracy_Type;
	DQ_Scope: DQ_Scope_Type;
	DQ_TemporalConsistency: DQ_TemporalConsistency_Type;
	DQ_TemporalValidity: DQ_TemporalValidity_Type;
	DQ_ThematicClassificationCorrectness: DQ_ThematicClassificationCorrectness_Type;
	DQ_TopologicalConsistency: DQ_TopologicalConsistency_Type;
	DS_Association: DS_Association_Type;
	DS_AssociationTypeCode: gco.CodeListValue_Type;
	DS_DataSet: DS_DataSet_Type;
	DS_Initiative: DS_Initiative_Type;
	DS_InitiativeTypeCode: gco.CodeListValue_Type;
	DS_Platform: DS_Platform_Type;
	DS_ProductionSeries: DS_ProductionSeries_Type;
	DS_Sensor: DS_Sensor_Type;
	DS_StereoMate: DS_StereoMate_Type;
	EX_BoundingPolygon: EX_BoundingPolygon_Type;
	EX_Extent: EX_Extent_Type;
	EX_GeographicBoundingBox: EX_GeographicBoundingBox_Type;
	EX_GeographicDescription: EX_GeographicDescription_Type;
	EX_SpatialTemporalExtent: EX_SpatialTemporalExtent_Type;
	EX_VerticalExtent: EX_VerticalExtent_Type;
	LanguageCode: gco.CodeListValue_Type;
	LI_Lineage: LI_Lineage_Type;
	LI_ProcessStep: LI_ProcessStep_Type;
	LI_Source: LI_Source_Type;
	LocalisedCharacterString: LocalisedCharacterString_Type;
	MD_AggregateInformation: MD_AggregateInformation_Type;
	MD_ApplicationSchemaInformation: MD_ApplicationSchemaInformation_Type;
	MD_Band: MD_Band_Type;
	MD_BrowseGraphic: MD_BrowseGraphic_Type;
	MD_CellGeometryCode: gco.CodeListValue_Type;
	MD_CharacterSetCode: gco.CodeListValue_Type;
	MD_ClassificationCode: gco.CodeListValue_Type;
	MD_CoverageContentTypeCode: gco.CodeListValue_Type;
	MD_DataIdentification: MD_DataIdentification_Type;
	MD_DatatypeCode: gco.CodeListValue_Type;
	MD_DigitalTransferOptions: MD_DigitalTransferOptions_Type;
	MD_Dimension: MD_Dimension_Type;
	MD_DimensionNameTypeCode: gco.CodeListValue_Type;
	MD_Distribution: MD_Distribution_Type;
	MD_DistributionUnits: gco.CodeListValue_Type;
	MD_Distributor: MD_Distributor_Type;
	MD_ExtendedElementInformation: MD_ExtendedElementInformation_Type;
	MD_FeatureCatalogueDescription: MD_FeatureCatalogueDescription_Type;
	MD_Format: MD_Format_Type;
	MD_GeometricObjects: MD_GeometricObjects_Type;
	MD_GeometricObjectTypeCode: gco.CodeListValue_Type;
	MD_Georectified: MD_Georectified_Type;
	MD_Georeferenceable: MD_Georeferenceable_Type;
	MD_ImageDescription: MD_ImageDescription_Type;
	MD_ImagingConditionCode: gco.CodeListValue_Type;
	MD_Keywords: MD_Keywords_Type;
	MD_KeywordTypeCode: gco.CodeListValue_Type;
	MD_LegalConstraints: MD_LegalConstraints_Type;
	MD_MaintenanceFrequencyCode: gco.CodeListValue_Type;
	MD_MaintenanceInformation: MD_MaintenanceInformation_Type;
	MD_Medium: MD_Medium_Type;
	MD_MediumFormatCode: gco.CodeListValue_Type;
	MD_MediumNameCode: gco.CodeListValue_Type;
	MD_Metadata: MD_Metadata_Type;
	MD_MetadataExtensionInformation: MD_MetadataExtensionInformation_Type;
	MD_ObligationCode: MD_ObligationCode_Type;
	MD_PixelOrientationCode: MD_PixelOrientationCode_Type;
	MD_PortrayalCatalogueReference: MD_PortrayalCatalogueReference_Type;
	MD_ProgressCode: gco.CodeListValue_Type;
	MD_ReferenceSystem: MD_ReferenceSystem_Type;
	MD_RepresentativeFraction: MD_RepresentativeFraction_Type;
	MD_Resolution: MD_Resolution_Type;
	MD_RestrictionCode: gco.CodeListValue_Type;
	MD_ScopeCode: gco.CodeListValue_Type;
	MD_ScopeDescription: MD_ScopeDescription_Type;
	MD_SecurityConstraints: MD_SecurityConstraints_Type;
	MD_ServiceIdentification: MD_ServiceIdentification_Type;
	MD_SpatialRepresentationTypeCode: gco.CodeListValue_Type;
	MD_StandardOrderProcess: MD_StandardOrderProcess_Type;
	MD_TopicCategoryCode: MD_TopicCategoryCode_Type;
	MD_TopologyLevelCode: gco.CodeListValue_Type;
	MD_Usage: MD_Usage_Type;
	MD_VectorSpatialRepresentation: MD_VectorSpatialRepresentation_Type;
	PT_FreeText: PT_FreeText_Type;
	PT_Locale: PT_Locale_Type;
	PT_LocaleContainer: PT_LocaleContainer_Type;
	RS_Identifier: RS_Identifier_Type;
	URL: string;
}
export var document: document;
