import { ImmutableProcess, Product, MutableProcess } from './process';
import { WorkflowControl } from 'workflowcontrol';
import { Observable, of } from 'rxjs';
import { Parameter } from '@ukis/dynforms';


class ConfigContext {

  private config: Map<string, Parameter[]>;

  constructor(processes: ImmutableProcess[]) {
    this.config = new Map<string, Parameter[]>();
    for(let process of processes) {
      this.config.set(process.processId(), process.requiresParameters());
    }
  }

  setConfig(processId: string, input: {[key: string]: any}): void {
    let processConfiguration = this.getConfig(processId);
    processConfiguration.map(para => para.value = input[para.id]);
    this.config.set(processId, processConfiguration);
  }

  getConfig(processId: string): Parameter[] {
    return this.config.get(processId);
  }

}


/**
 * The task of the ProcessService is 
 *  - to expose immutable processes in the correct order,
 *  - to decide which process is to be handled next;
 *  - Only this service is allowed to mutate (configure, execute, change state) processes.
 *  - to expose the products of the processes.
 * 
 * Note that this service does *not* decide what process currently has focus in the UI; 
 * this is a UI-decission and handled by the ProcessWizardComponent.
 * However this service *does* decide which process is the next that needs completion.
 * 
 */

export interface IProcessService {
  getProcesses(): ImmutableProcess[],
  getNext(): ImmutableProcess,
  
  configure(process: ImmutableProcess, values), 
  run(process: ImmutableProcess),
  restartFrom(process: ImmutableProcess),

  getInputs(processId: string): Product[],
  getConfig(processId: string): Parameter[],
  getProducts(processId: string): Product[],

  observeActiveProcess(): Observable<ImmutableProcess>,
  observeProcessOutput(processId: string): Observable<Product[]>
}

export abstract class ProcessService<Proc extends MutableProcess> {
  
  protected processContext: WorkflowControl<Proc>;
  protected configContext: ConfigContext;
  protected processes: Proc[] = []; 
  
  constructor(processes: Proc[]) {
    this.processes = processes;
    this.processContext = new WorkflowControl<Proc>(processes);
    this.configContext = new ConfigContext(processes);
    let nextProc = this.processContext.nextProcess();
    if(nextProc) nextProc.setState("available");
  }
  
  getProcesses(): ImmutableProcess[] {
    return this.processes;
  }

  getNext(): ImmutableProcess {
    return this.processContext.nextProcess();
  }

  configure(process: ImmutableProcess, values: {[k: string]: any}): void {
    this.configContext.setConfig(process.processId(), values);
  }
  
  run(process: ImmutableProcess) {
    let proc = this.getProcessById(process.processId());
    let inputs = this.getInputs(process.processId());
    let configs = this.getConfig(process.processId());

    proc.setState("running");

    proc.execute(inputs, configs).subscribe(outputs => {
      outputs.forEach(output => {
        this.processContext.setProduct(output.id, output.value);
      });

      proc.setState("completedSuccessfully");
      let nextProc = this.processContext.nextProcess();

      if(nextProc) nextProc.setState("available");
    });

    // @TODO: proc.execute: on error, pass error to some error-handler. 
  }

  restartFrom(process: ImmutableProcess) {
    throw new Error("Method not implemented.");
  }

  getInputs(processId: string): Product[] {
    let proc = this.getProcessById(processId);
    return proc.requiresProducts().map(prodId => {
      let val = this.processContext.getProduct(prodId);
      let prod: Product = { id: prodId,  value: val };
      return prod;
    })
  }

  getConfig(processId: string): Parameter[] {
    return this.configContext.getConfig(processId);
  }

  getProducts(processId: string): Product[] {
    let proc = this.getProcessById(processId);
    return proc.providesProducts().map(prodId => {
      let val = this.processContext.getProduct(prodId);
      let prod: Product = { id: prodId,  value: val };
      return prod;
    })
  }

  observeActiveProcess(): Observable<ImmutableProcess> {
    return of(this.getNext());
  }

  observeProcessOutput(processId: string): Observable<Product[]> {
    return of(this.getProducts(processId));
  }
  
  protected getProcessById(procId: string): Proc {
    for(let p of this.processes) {
      if (p.processId() == procId) {
        return p;
      }
    }
  }

}

