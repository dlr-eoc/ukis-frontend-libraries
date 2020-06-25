import * as Primitive from '../../../xml-primitives';

// Source files:
// http://schemas.opengis.net/csw/2.0.2/rec-dcmes.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _CoverageProxyType extends BaseType {
	/** The extent or scope of the content of the resource. Typically,
	  * Coverage will include spatial location (a place name or geographic
	  * coordinates), temporal period (a period label, date, or date range),
	  * or jurisdiction (such as a named administrative entity). Recommended
	  * best practice is to select a value from a controlled vocabulary
	  * (for example, the Thesaurus of Geographic Names [TGN]) and to use,
	  * where appropriate, named places or time periods in preference to
	  * numeric identifiers such as sets of coordinates or date ranges. */
	coverage?: SimpleLiteral;
}
interface CoverageProxyType extends _CoverageProxyType { constructor: { new(): CoverageProxyType }; }

interface _DateProxyType extends BaseType {
	/** A date of an event in the lifecycle of the resource. Typically, Date
	  * will be associated with the creation or availability of the resource.
	  * Recommended best practice for encoding the date value is defined in a
	  * profile of ISO 8601 and includes (among others) dates of the
	  * form YYYY-MM-DD. */
	date?: SimpleLiteral;
}
interface DateProxyType extends _DateProxyType { constructor: { new(): DateProxyType }; }

interface _DCElementProxyType extends _IdentifierProxyType, _TitleProxyType, _FormatProxyType, _RelationProxyType, _CoverageProxyType, _DateProxyType, _DescriptionProxyType, _RightsProxyType {
	/** The nature or genre of the content of the resource. Type includes
	  * terms describing general categories, functions, genres, or aggregation
	  * levels for content. Recommended best practice is to select a value
	  * from a controlled vocabulary (for example, the DCMI Type Vocabulary).
	  * To describe the physical or digital manifestation of the resource,
	  * use the Format element. */
	type?: SimpleLiteral;
	/** A topic of the content of the resource. Typically, Subject will be
	  * expressed as keywords, key phrases, or classification codes that
	  * describe a topic of the resource. Recommended best practice is to
	  * select a value from a controlled vocabulary or formal classification
	  * scheme. */
	subject?: SimpleLiteral;
	/** An entity responsible for making contributions to the content of
	  * the resource. Examples of Contributor include a person, an organization,
	  * or a service. Typically, the name of a Contributor should be used to
	  * indicate the entity. */
	contributor?: SimpleLiteral;
	/** An entity primarily responsible for making the content of the resource.
	  * Examples of Creator include a person, an organization, or a service.
	  * Typically, the name of a Creator should be used to indicate the entity. */
	creator?: SimpleLiteral;
	/** A language of the intellectual content of the resource. Recommended
	  * best practice is to use RFC 3066, which, in conjunction with ISO 639,
	  * defines two- and three-letter primary language tags with optional
	  * subtags. Examples include "en" or "eng" for English, "akk" for
	  * Akkadian, and "en-GB" for English used in the United Kingdom. */
	language?: SimpleLiteral;
	/** An entity responsible for making the resource available. Examples of
	  * Publisher include a person, an organization, or a service. Typically,
	  * the name of a Publisher should be used to indicate the entity. */
	publisher?: SimpleLiteral;
	/** A Reference to a resource from which the present resource is derived.
	  * The present resource may be derived from the Source resource in whole
	  * or in part. Recommended best practice is to identify the referenced
	  * resource by means of a string or number conforming to a formal
	  * identification system. */
	source?: SimpleLiteral;
}
interface DCElementProxyType extends _DCElementProxyType { constructor: { new(): DCElementProxyType }; }

interface _DescriptionProxyType extends BaseType {
	/** An account of the content of the resource. Examples of Description
	  * include, but are not limited to, an abstract, table of contents,
	  * reference to a graphical representation of content, or free-text
	  * account of the content. */
	description?: SimpleLiteral;
}
interface DescriptionProxyType extends _DescriptionProxyType { constructor: { new(): DescriptionProxyType }; }

/** This type definition is included as a convenience for schema authors
  * who need a container element for all of the DC elements. */
interface _elementContainer extends BaseType {
	DCElement?: DCElementProxyType[];
}
export interface elementContainer extends _elementContainer { constructor: { new(): elementContainer }; }
export var elementContainer: { new(): elementContainer };

interface _FormatProxyType extends BaseType {
	/** The physical or digital manifestation of the resource. Typically,
	  * Format will include the media-type or dimensions of the resource.
	  * Format may be used to identify the software, hardware, or other
	  * equipment needed to display or operate the resource. Examples of
	  * dimensions include size and duration. Recommended best practice is to
	  * select a value from a controlled vocabulary (for example, the list
	  * of Internet Media Types defining computer media formats). */
	format?: SimpleLiteral;
}
interface FormatProxyType extends _FormatProxyType { constructor: { new(): FormatProxyType }; }

interface _IdentifierProxyType extends BaseType {
	/** An unambiguous reference to the resource within a given context.
	  * Recommended best practice is to identify the resource by means of a
	  * string or number conforming to a formal identification system. Formal
	  * identification systems include but are not limited to the Uniform
	  * Resource Identifier (URI) (including the Uniform Resource Locator
	  * (URL)), the Digital Object Identifier (DOI), and the International
	  * Standard Book Number (ISBN). */
	identifier?: SimpleLiteral;
}
interface IdentifierProxyType extends _IdentifierProxyType { constructor: { new(): IdentifierProxyType }; }

interface _RelationProxyType extends BaseType {
	/** A reference to a related resource. Recommended best practice is to
	  * identify the referenced resource by means of a string or number
	  * conforming to a formal identification system. */
	relation?: SimpleLiteral;
}
interface RelationProxyType extends _RelationProxyType { constructor: { new(): RelationProxyType }; }

interface _RightsProxyType extends BaseType {
	/** Information about rights held in and over the resource. Typically,
	  * Rights will contain a rights management statement for the resource,
	  * or reference a service providing such information. Rights information
	  * often encompasses Intellectual Property Rights (IPR), Copyright, and
	  * various Property Rights. If the Rights element is absent, no
	  * assumptions may be made about any rights held in or over the resource. */
	rights?: SimpleLiteral;
}
interface RightsProxyType extends _RightsProxyType { constructor: { new(): RightsProxyType }; }

/** This is the default type for all of the DC elements. It defines a
  * complexType SimpleLiteral which permits mixed content but disallows
  * child elements by use of minOcccurs/maxOccurs. However, this complexType
  * does permit the derivation of other types which would permit child
  * elements. The scheme attribute may be used as a qualifier to reference
  * an encoding scheme that describes the value domain for a given property. */
interface _SimpleLiteral extends Primitive._any {
	scheme?: string;
}
export interface SimpleLiteral extends _SimpleLiteral { constructor: { new(): SimpleLiteral }; }
export var SimpleLiteral: { new(): SimpleLiteral };

interface _TitleProxyType extends BaseType {
	/** A name given to the resource. Typically, Title will be a name by
	  * which the resource is formally known. */
	title?: SimpleLiteral;
}
interface TitleProxyType extends _TitleProxyType { constructor: { new(): TitleProxyType }; }

export interface document extends BaseType {
	/** An entity responsible for making contributions to the content of
	  * the resource. Examples of Contributor include a person, an organization,
	  * or a service. Typically, the name of a Contributor should be used to
	  * indicate the entity. */
	contributor: SimpleLiteral;
	/** An entity primarily responsible for making the content of the resource.
	  * Examples of Creator include a person, an organization, or a service.
	  * Typically, the name of a Creator should be used to indicate the entity. */
	creator: SimpleLiteral;
	/** A language of the intellectual content of the resource. Recommended
	  * best practice is to use RFC 3066, which, in conjunction with ISO 639,
	  * defines two- and three-letter primary language tags with optional
	  * subtags. Examples include "en" or "eng" for English, "akk" for
	  * Akkadian, and "en-GB" for English used in the United Kingdom. */
	language: SimpleLiteral;
	/** An entity responsible for making the resource available. Examples of
	  * Publisher include a person, an organization, or a service. Typically,
	  * the name of a Publisher should be used to indicate the entity. */
	publisher: SimpleLiteral;
	/** A Reference to a resource from which the present resource is derived.
	  * The present resource may be derived from the Source resource in whole
	  * or in part. Recommended best practice is to identify the referenced
	  * resource by means of a string or number conforming to a formal
	  * identification system. */
	source: SimpleLiteral;
	/** A topic of the content of the resource. Typically, Subject will be
	  * expressed as keywords, key phrases, or classification codes that
	  * describe a topic of the resource. Recommended best practice is to
	  * select a value from a controlled vocabulary or formal classification
	  * scheme. */
	subject: SimpleLiteral;
	/** The nature or genre of the content of the resource. Type includes
	  * terms describing general categories, functions, genres, or aggregation
	  * levels for content. Recommended best practice is to select a value
	  * from a controlled vocabulary (for example, the DCMI Type Vocabulary).
	  * To describe the physical or digital manifestation of the resource,
	  * use the Format element. */
	type: SimpleLiteral;
}
export var document: document;
