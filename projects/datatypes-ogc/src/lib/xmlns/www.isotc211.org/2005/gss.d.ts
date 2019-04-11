import * as Primitive from '../../xml-primitives';
import * as gco from './gco';
import * as gml from '../../www.opengis.net/gml/3.2';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/iso/19139/20070417/gss/geometry.xsd
// http://schemas.opengis.net/iso/19139/20070417/gss/gss.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _GM_Object_PropertyType extends gml._AbstractGeometryProxyType {
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
export interface GM_Object_PropertyType extends _GM_Object_PropertyType { constructor: { new(): GM_Object_PropertyType }; }
export var GM_Object_PropertyType: { new(): GM_Object_PropertyType };

interface _GM_Point_PropertyType extends BaseType {
	uuidref: string;
	nilReason: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A Point is defined by a single coordinate tuple. The direct position of a point is specified by the pos element which is of type DirectPositionType. */
	Point?: gml.PointType;
}
export interface GM_Point_PropertyType extends _GM_Point_PropertyType { constructor: { new(): GM_Point_PropertyType }; }
export var GM_Point_PropertyType: { new(): GM_Point_PropertyType };

export interface document extends BaseType {
}
export var document: document;
