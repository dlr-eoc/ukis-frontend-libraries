import * as Primitive from '../../../xml-primitives';

// Source files:
// http://www.w3.org/2001/xml.xsd


interface BaseType {
	
	
}
export type LangType = string;
type _LangType = Primitive._string;

type SpaceType = ("default" | "preserve");
interface _SpaceType extends Primitive._string { content: SpaceType; }

export interface document extends BaseType {
}
export var document: document;
