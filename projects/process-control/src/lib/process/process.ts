import { Observable } from 'rxjs';
import { Parameter } from '@ukis/dynforms';
import { Process } from "workflowcontrol";




/**
 * This file contains the datastructues the ProcessWizard is working with. 
 * Note that, while the WorkflowControl module focuses on process-interdependencies and *product* state, 
 * the structures in this file handle the *process* state. 
 * Interfaces are provided to work seamlessly with both WorkflowControl (process-interdependencies) and ProcessWizard (user-configuration).
 */


export interface Product {
    id: string;
    value: any;
}

export type ConfigurationProduct = Product & Parameter;


export type ProcessState = "unavailable" | "available" | "running"  | "completedSuccessfully";

/**
 * Basic process interface.
 */
export interface ImmutableProcess extends Process {
    getName(): string;
    getDescription(): string;
    getState(): ProcessState;
}

/**
 * MutableProcess: allows change of state and execution.
 */
export interface MutableProcess extends ImmutableProcess {
    setState(state: ProcessState): void;
    execute(inputs: Product[]): Observable<Product[]>;
}

