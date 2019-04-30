import { MutableProcess, ProcessState, Product } from "@ukis/process-control";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Parameter, StringParameter, BboxParameter, SelectParameter } from "@ukis/dynforms/src/public_api";


export class DemoProcess implements MutableProcess {

    private state: BehaviorSubject<ProcessState>;

    constructor(
        private id: string, 
        private name: string, 
        private description: string, 
                initialState: ProcessState,
    ) {
        this.state = new BehaviorSubject<ProcessState>(initialState);
    }
    
    setState(state: ProcessState): void {
        this.state.next(state);
    }

    getConfig(): Parameter[] {
        let conf: SelectParameter = {
            id: `${this.id}_config`, 
            description: "description", 
            name: `${this.id}_config`,
            defaultValue: "a", 
            options: ["a", "b", "c"],
            parametertype: "select",
            value: null
        };
        return [conf];
    }

    setConig(paras: Parameter[]): void {

    }
    
    execute(inputs: Product[]): Observable<Product[]> {
        let prod: Product = {
            id: `${this.id}_product`,
            value: Math.random()
        };
        return of([prod]);
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getState(): Observable<ProcessState> {
        return this.state;
    }




}