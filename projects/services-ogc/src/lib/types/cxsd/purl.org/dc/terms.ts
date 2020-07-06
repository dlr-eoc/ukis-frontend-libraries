import * as dc from './elements/1.1';

// Source files:
// http://schemas.opengis.net/csw/2.0.2/rec-dcterms.xsd


declare module './elements/1.1' {
export interface _DCElementProxyType {
	audience?: dc.SimpleLiteral;
	educationLevel?: dc.SimpleLiteral;
	mediator?: dc.SimpleLiteral;
	provenance?: dc.SimpleLiteral;
	rightsHolder?: dc.SimpleLiteral;
	/** An unambiguous reference to the resource within a given context.
	  * Recommended best practice is to identify the resource by means of a
	  * string or number conforming to a formal identification system. Formal
	  * identification systems include but are not limited to the Uniform
	  * Resource Identifier (URI) (including the Uniform Resource Locator
	  * (URL)), the Digital Object Identifier (DOI), and the International
	  * Standard Book Number (ISBN). */
	identifier?: dc.SimpleLiteral;
	/** A name given to the resource. Typically, Title will be a name by
	  * which the resource is formally known. */
	title?: dc.SimpleLiteral;
	/** The physical or digital manifestation of the resource. Typically,
	  * Format will include the media-type or dimensions of the resource.
	  * Format may be used to identify the software, hardware, or other
	  * equipment needed to display or operate the resource. Examples of
	  * dimensions include size and duration. Recommended best practice is to
	  * select a value from a controlled vocabulary (for example, the list
	  * of Internet Media Types defining computer media formats). */
	format?: dc.SimpleLiteral;
	/** A reference to a related resource. Recommended best practice is to
	  * identify the referenced resource by means of a string or number
	  * conforming to a formal identification system. */
	relation?: dc.SimpleLiteral;
	/** The extent or scope of the content of the resource. Typically,
	  * Coverage will include spatial location (a place name or geographic
	  * coordinates), temporal period (a period label, date, or date range),
	  * or jurisdiction (such as a named administrative entity). Recommended
	  * best practice is to select a value from a controlled vocabulary
	  * (for example, the Thesaurus of Geographic Names [TGN]) and to use,
	  * where appropriate, named places or time periods in preference to
	  * numeric identifiers such as sets of coordinates or date ranges. */
	coverage?: dc.SimpleLiteral;
	/** A date of an event in the lifecycle of the resource. Typically, Date
	  * will be associated with the creation or availability of the resource.
	  * Recommended best practice for encoding the date value is defined in a
	  * profile of ISO 8601 and includes (among others) dates of the
	  * form YYYY-MM-DD. */
	date?: dc.SimpleLiteral;
	/** An account of the content of the resource. Examples of Description
	  * include, but are not limited to, an abstract, table of contents,
	  * reference to a graphical representation of content, or free-text
	  * account of the content. */
	description?: dc.SimpleLiteral;
	/** Information about rights held in and over the resource. Typically,
	  * Rights will contain a rights management statement for the resource,
	  * or reference a service providing such information. Rights information
	  * often encompasses Intellectual Property Rights (IPR), Copyright, and
	  * various Property Rights. If the Rights element is absent, no
	  * assumptions may be made about any rights held in or over the resource. */
	rights?: dc.SimpleLiteral;
}
export interface _IdentifierProxyType {
	bibliographicCitation?: dc.SimpleLiteral;
}
export interface _TitleProxyType {
	alternative?: dc.SimpleLiteral;
}
export interface _FormatProxyType {
	extent?: dc.SimpleLiteral;
	medium?: dc.SimpleLiteral;
}
export interface _RelationProxyType {
	conformsTo?: dc.SimpleLiteral;
	hasFormat?: dc.SimpleLiteral;
	hasPart?: dc.SimpleLiteral;
	hasVersion?: dc.SimpleLiteral;
	isFormatOf?: dc.SimpleLiteral;
	isPartOf?: dc.SimpleLiteral;
	isReferencedBy?: dc.SimpleLiteral;
	isReplacedBy?: dc.SimpleLiteral;
	isRequiredBy?: dc.SimpleLiteral;
	isVersionOf?: dc.SimpleLiteral;
	references?: dc.SimpleLiteral;
	replaces?: dc.SimpleLiteral;
	requires?: dc.SimpleLiteral;
}
export interface _CoverageProxyType {
	spatial?: dc.SimpleLiteral;
	temporal?: dc.SimpleLiteral;
}
export interface _DateProxyType {
	modified?: dc.SimpleLiteral;
	available?: dc.SimpleLiteral;
	created?: dc.SimpleLiteral;
	dateAccepted?: dc.SimpleLiteral;
	dateCopyrighted?: dc.SimpleLiteral;
	dateSubmitted?: dc.SimpleLiteral;
	issued?: dc.SimpleLiteral;
	valid?: dc.SimpleLiteral;
}
export interface _DescriptionProxyType {
	abstract?: dc.SimpleLiteral;
	tableOfContents?: dc.SimpleLiteral;
}
export interface _RightsProxyType {
	accessRights?: dc.SimpleLiteral;
	license?: dc.SimpleLiteral;
}
}
interface BaseType {
	
	
}
interface _AudienceProxyType extends BaseType {
	audience?: dc.SimpleLiteral;
	educationLevel?: dc.SimpleLiteral;
	mediator?: dc.SimpleLiteral;
}
interface AudienceProxyType extends _AudienceProxyType {  }

export interface document extends BaseType {
	abstract: dc.SimpleLiteral;
	accessRights: dc.SimpleLiteral;
	alternative: dc.SimpleLiteral;
	available: dc.SimpleLiteral;
	bibliographicCitation: dc.SimpleLiteral;
	conformsTo: dc.SimpleLiteral;
	created: dc.SimpleLiteral;
	dateAccepted: dc.SimpleLiteral;
	dateCopyrighted: dc.SimpleLiteral;
	dateSubmitted: dc.SimpleLiteral;
	educationLevel: dc.SimpleLiteral;
	extent: dc.SimpleLiteral;
	hasFormat: dc.SimpleLiteral;
	hasPart: dc.SimpleLiteral;
	hasVersion: dc.SimpleLiteral;
	isFormatOf: dc.SimpleLiteral;
	isPartOf: dc.SimpleLiteral;
	isReferencedBy: dc.SimpleLiteral;
	isReplacedBy: dc.SimpleLiteral;
	isRequiredBy: dc.SimpleLiteral;
	issued: dc.SimpleLiteral;
	isVersionOf: dc.SimpleLiteral;
	license: dc.SimpleLiteral;
	mediator: dc.SimpleLiteral;
	medium: dc.SimpleLiteral;
	modified: dc.SimpleLiteral;
	provenance: dc.SimpleLiteral;
	references: dc.SimpleLiteral;
	replaces: dc.SimpleLiteral;
	requires: dc.SimpleLiteral;
	rightsHolder: dc.SimpleLiteral;
	spatial: dc.SimpleLiteral;
	tableOfContents: dc.SimpleLiteral;
	temporal: dc.SimpleLiteral;
	valid: dc.SimpleLiteral;
}
export var document: document;
