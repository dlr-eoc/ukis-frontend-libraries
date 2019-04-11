import * as Primitive from '../../xml-primitives';
import * as gco from './gco';
import * as gml from '../../www.opengis.net/gml/3.2';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/iso/19139/20070417/gsr/gsr.xsd
// http://schemas.opengis.net/iso/19139/20070417/gsr/spatialReferencing.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _SC_CRS_PropertyType extends gml._AbstractCRSProxyType {
	uuidref: string;
	nilReason: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SC_CRS_PropertyType extends _SC_CRS_PropertyType { constructor: { new(): SC_CRS_PropertyType }; }
export var SC_CRS_PropertyType: { new(): SC_CRS_PropertyType };

export interface document extends BaseType {
}
export var document: document;
