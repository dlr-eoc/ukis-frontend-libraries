
export interface BasicParameter {
    id: string;
    name: string;
    description: string;
    defaultValue: any;
    value: any;
}

export interface StringParameter extends BasicParameter {
    parametertype: "string";
    defaultValue: string;
    value: string;
    datatype: "double" | "string"
}

export interface BboxParameter extends BasicParameter {
    parametertype: "bbox";
}

export interface SelectParameter extends BasicParameter {
    parametertype: "select"; 
    options: string[];
    defaultValue: string;
    value: string;
}

export type Parameter = StringParameter | BboxParameter | SelectParameter;