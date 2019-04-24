import { Observable, of } from 'rxjs';
import { Process as WfProcess, ProductId, WorkflowControl } from 'workflowcontrol';
import { tap, map } from 'rxjs/operators';
import { Parameter } from '@ukis/dynforms';




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
export interface ImmutableProcess extends WfProcess {
    getName(): string;
    getDescription(): string;
    getState(): ProcessState;
    observeState(): Observable<ProcessState>;
    getParameters(): Parameter[];
}

/**
 * Configurable Process: a *mutable* process that can be configured and executed.
 */
export interface ConfigurableProcess extends ImmutableProcess {
    configure(values: any);
    setState(state: ProcessState): void;
    execute(inputProducts: Product[], configParas: Parameter[]): Observable<Product[]>;
}

