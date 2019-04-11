
export interface Parameter {
    id: string;
    name: string;
    description: string;
    type: "string" | "bbox" | "select";
    defaultValue: any;
    value: any;
}

export interface StringParameter extends Parameter {
    type: "string";
    defaultValue: string;
    value: string;
}

export interface BboxParameter extends Parameter {
    type: "bbox";
}

export interface SelectParameter extends Parameter {
    type: "select"; 
    options: string[];
    defaultValue: string;
    value: string;
}