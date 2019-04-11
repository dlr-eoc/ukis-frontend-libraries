import { Observable, of } from 'rxjs';
import { Process as WfProcess, ProductId } from 'workflowcontrol';
import { tap, map } from 'rxjs/operators';
import { Parameter } from 'projects/dynamic-forms/src/public-api';




/**
 * This file contains the datastructues the ProcessWizard is working with. 
 * Note that, while the WorkflowControl module focuses on process-interdependencies and *product* state, 
 * the structures in this file handle the *process* state. 
 * Interfaces are provided to work seamlessly with both WorkflowControl (process-interdependencies) and ProcessWizard (user-configuration).
 */





export interface Product {
    id: ProductId;
    value: any;
}


export type ProcessState = "unavailable" | "available" | "running"  | "completedSuccessfully";

/**
 * Basic process interface.
 */
export interface Process {
    getId(): string;
    getName(): string;
    getDescription(): string;
    getState(): ProcessState;
    observeState(): Observable<ProcessState>;
    getParameters(): Parameter[];
}

/**
 * Configurable Process: parameters can be set, but process cannot be executed
 * This interface ensures compatability with the process-wizard.
 */
export interface ConfigurableProcess extends Process {
    configure(values: any);
}

/**
 * Process can be executed.
 */
interface MutableProcess extends ConfigurableProcess {
    available(): void;
    unavailable(): void;
    execute(inputs: Product[]): Observable<Product[]>;
}

/**
 * A place to store products and retrieve them from.
 * Our interface to the Workflow-Control module. 
 */
interface ProductContext {
    setProduct(productId: ProductId, data: any): void;
    getProduct(productId: ProductId): any;
    getProductOrThrow(productId: ProductId): any;
}

/**
 * this interface ensures compatability with the "workflowcontrol" module.
 */
export interface SortableProcess extends WfProcess {
    fetchInputsFromContext(context: ProductContext): Product[];
}


export abstract class BasicProcess implements MutableProcess, SortableProcess {

    protected id: string;
    protected name: string;
    protected description: string;
    protected state: ProcessState;
    protected inputs: ProductId[];   // the data required from previous processes 
    protected parameters: Parameter[];  // the required user-configuration
    protected outputs: ProductId[];  // the data provided to later processes

    constructor(id: string, name: string, description: string, inputs: ProductId[], parameters: Parameter[], outputs: ProductId[]) {
        this.id = id; 
        this.name = name;
        this.description = description;
        this.inputs = inputs; 
        this.parameters = parameters; 
        this.outputs = outputs;
        this.state = "unavailable";
    }

    processId(): string {
        return this.getId();
    }

    providesProducts(): string[] {
        return this.outputs;
    }

    requiresProducts(): string[] {
        return this.inputs;
    }

    available() {
        this.state = "available";
    }

    unavailable() {
        this.state = "unavailable";
    }

    fetchInputsFromContext(context: ProductContext): Product[] {
        let output: Product[] = [];
        for(let pId of this.requiresProducts()) {
            let val = context.getProduct(pId);
            output.push({
                id: pId,
                value: val
            });
        }
        return output;
    }

    execute(inputs: Product[]): Observable<Product[]> {
        this.state = "running";
        return this.process(inputs).pipe(
            map(results => {
                let outputs: Product[] = [];
                for(let productId of this.outputs) {
                    let val = results[productId];
                    outputs.push({
                        id: productId, 
                        value: val
                    });
                }
                // @TODO: if one output is not present, throw error. 
                return outputs;
            }),
            tap(results => {
                this.state = "completedSuccessfully";
            }),
        );
    }

    protected abstract process(inputs: Product[]): Observable<Product[]> 

    configure(values): void {
        for(let key of values) {
            let val = values[key];
            this.setParameterValue(key, val);
        }
    }

    protected setParameterValue(id: string, value: any): void {
        let para = this.getParameterById(id);
        if(para) {
            para.value = value;
        }
    }
    
    getName(): string {
        return this.name;
    }
    
    getId(): string {
        return this.name;
    }
    
    getDescription(): string {
        return this.description;
    }
    
    getState(): ProcessState {
        return this.state;
    }
    
    observeState(): Observable<ProcessState> {
        return of(this.state);
    }

    getParameters(): Parameter[] {
        return this.parameters;
    }

    getParameterById(id: string): Parameter {
        for(let para of this.parameters) {
            if (para.id == id) return para;
        }
    }

}