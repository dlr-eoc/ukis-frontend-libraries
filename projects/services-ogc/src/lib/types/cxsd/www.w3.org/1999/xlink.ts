import * as Primitive from '../../xml-primitives';
import * as xml from '../XML/1998/namespace';

// Source files:
// http://www.w3.org/1999/xlink.xsd


interface BaseType {
	
	
}
export type actuateType = ("onLoad" | "onRequest" | "other" | "none");
interface _actuateType extends Primitive._string { content: actuateType; }

interface _ArcProxyType extends BaseType {}
interface ArcProxyType extends _ArcProxyType {  }

export type arcroleType = string;
type _arcroleType = Primitive._string;

interface _arcType extends BaseType {
	actuate: actuateType;
	arcrole: string;
	from: string;
	show: showType;
	$title: string;
	to: string;
	type: typeType;
	title?: TitleProxyType[];
}
export interface arcType extends _arcType {  }


/** Intended for use as the type of user-declared elements to make them
  * extended links.
  * Note that the elements referenced in the content model are all abstract.
  * The intention is that by simply declaring elements with these as their
  * substitutionGroup, all the right things will happen. */
interface _extended extends BaseType {
	role: string;
	$title: string;
	type: typeType;
	arc?: ArcProxyType[];
	locator?: LocatorProxyType[];
	resource?: ResourceProxyType[];
	title?: TitleProxyType[];
}
export interface extended extends _extended {  }


export type fromType = string;
type _fromType = Primitive._string;

export type hrefType = string;
type _hrefType = Primitive._string;

export type labelType = string;
type _labelType = Primitive._string;

interface _LocatorProxyType extends BaseType {}
interface LocatorProxyType extends _LocatorProxyType {  }

interface _locatorType extends BaseType {
	href: string;
	label: string;
	role: string;
	$title: string;
	type: typeType;
	title?: TitleProxyType[];
}
export interface locatorType extends _locatorType {  }


interface _ResourceProxyType extends BaseType {}
interface ResourceProxyType extends _ResourceProxyType {  }

interface _resourceType extends BaseType {
	label: string;
	role: string;
	title: string;
	type: typeType;
}
export interface resourceType extends _resourceType {  }


export type roleType = string;
type _roleType = Primitive._string;

export type showType = ("new" | "replace" | "embed" | "other" | "none");
interface _showType extends Primitive._string { content: showType; }

/** Intended for use as the type of user-declared elements to make them
  * simple links. */
interface _simple extends BaseType {
	actuate: actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: showType;
	title: string;
	type: typeType;
}
export interface simple extends _simple {  }


export type titleAttrType = string;
type _titleAttrType = Primitive._string;

interface _titleEltType extends BaseType {
	/** lang (as an attribute name)
	  *
	  * denotes an attribute whose value
	  * is a language code for the natural language of the content of
	  * any element; its value is inherited.  This name is reserved
	  * by virtue of its definition in the XML specification.
	  *
	  * Notes
	  *
	  * Attempting to install the relevant ISO 2- and 3-letter
	  * codes as the enumerated possible values is probably never
	  * going to be a realistic possibility.
	  *
	  * See BCP 47 at
	  * http://www.rfc-editor.org/rfc/bcp/bcp47.txt
	  * and the IANA language subtag registry at
	  *
	  * http://www.iana.org/assignments/language-subtag-registry
	  * for further information.
	  *
	  * The union allows for the 'un-declaration' of xml:lang with
	  * the empty string. */
	lang: string;
	type: typeType;
}
export interface titleEltType extends _titleEltType {  }


interface _TitleProxyType extends BaseType {}
interface TitleProxyType extends _TitleProxyType {  }

export type toType = string;
type _toType = Primitive._string;

export type typeType = ("simple" | "extended" | "title" | "resource" | "locator" | "arc");
interface _typeType extends Primitive._string { content: typeType; }

export interface document extends BaseType {
}
export var document: document;
