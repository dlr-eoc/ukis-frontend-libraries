import * as Primitive from '../../xml-primitives';
import * as smil20lang from './SMIL20/Language';

// Source files:
// http://schemas.opengis.net/gml/3.1.1/smil/smil20.xsd


interface BaseType {
	
	
}
type AccumulateType = ("none" | "sum");
interface _AccumulateType extends Primitive._string { content: AccumulateType; }

type AdditiveType = ("replace" | "sum");
interface _AdditiveType extends Primitive._string { content: AdditiveType; }

interface _animateColorPrototype extends BaseType {
	accumulate?: AccumulateType;
	additive?: AdditiveType;
	attributeName: string;
	attributeType?: AttributeTypeType;
	by?: string;
	from?: string;
	to?: string;
	values?: string;
}
export interface animateColorPrototype extends _animateColorPrototype {  }


interface _animateMotionPrototype extends BaseType {
	accumulate?: AccumulateType;
	additive?: AdditiveType;
	by?: string;
	from?: string;
	origin?: string;
	to?: string;
	values?: string;
}
export interface animateMotionPrototype extends _animateMotionPrototype {  }


interface _animatePrototype extends BaseType {
	accumulate?: AccumulateType;
	additive?: AdditiveType;
	attributeName: string;
	attributeType?: AttributeTypeType;
	by?: string;
	from?: string;
	to?: string;
	values?: string;
}
export interface animatePrototype extends _animatePrototype {  }


type AttributeTypeType = ("XML" | "CSS" | "auto");
interface _AttributeTypeType extends Primitive._string { content: AttributeTypeType; }

export type fillDefaultType = ("remove" | "freeze" | "hold" | "auto" | "inherit" | "transition");
interface _fillDefaultType extends Primitive._string { content: fillDefaultType; }

export type fillTimingAttrsType = ("remove" | "freeze" | "hold" | "auto" | "default" | "transition");
interface _fillTimingAttrsType extends Primitive._string { content: fillTimingAttrsType; }

export type nonNegativeDecimalType = number;
type _nonNegativeDecimalType = Primitive._number;

export type restartDefaultType = ("never" | "always" | "whenNotActive" | "inherit");
interface _restartDefaultType extends Primitive._string { content: restartDefaultType; }

export type restartTimingType = ("never" | "always" | "whenNotActive" | "default");
interface _restartTimingType extends Primitive._string { content: restartTimingType; }

interface _setPrototype extends BaseType {
	attributeName: string;
	attributeType?: AttributeTypeType;
	to?: string;
}
export interface setPrototype extends _setPrototype {  }


export type syncBehaviorDefaultType = ("canSlip" | "locked" | "independent" | "inherit");
interface _syncBehaviorDefaultType extends Primitive._string { content: syncBehaviorDefaultType; }

export type syncBehaviorType = ("canSlip" | "locked" | "independent" | "default");
interface _syncBehaviorType extends Primitive._string { content: syncBehaviorType; }

export type Type = ("discrete" | "linear" | "paced");
interface _Type extends Primitive._string { content: Type; }

export interface document extends BaseType {
	animate: smil20lang.animateType;
	animateColor: smil20lang.animateColorType;
	animateMotion: smil20lang.animateMotionType;
	set: smil20lang.setType;
}
export var document: document;
