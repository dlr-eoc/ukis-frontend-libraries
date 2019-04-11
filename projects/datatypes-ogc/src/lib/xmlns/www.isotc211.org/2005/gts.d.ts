import * as Primitive from '../../xml-primitives';
import * as gco from './gco';
import * as gml from '../../www.opengis.net/gml/3.2';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/iso/19139/20070417/gts/gts.xsd
// http://schemas.opengis.net/iso/19139/20070417/gts/temporalObjects.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _TM_PeriodDuration_PropertyType extends BaseType {
	nilReason: string;
	TM_PeriodDuration?: string;
}
export interface TM_PeriodDuration_PropertyType extends _TM_PeriodDuration_PropertyType { constructor: { new(): TM_PeriodDuration_PropertyType }; }
export var TM_PeriodDuration_PropertyType: { new(): TM_PeriodDuration_PropertyType };

interface _TM_Primitive_PropertyType extends gml._AbstractTimePrimitiveProxyType {
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
export interface TM_Primitive_PropertyType extends _TM_Primitive_PropertyType { constructor: { new(): TM_Primitive_PropertyType }; }
export var TM_Primitive_PropertyType: { new(): TM_Primitive_PropertyType };

export interface document extends BaseType {
	TM_PeriodDuration: string;
}
export var document: document;
