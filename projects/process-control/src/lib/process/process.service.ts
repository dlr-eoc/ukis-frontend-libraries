import { ImmutableProcess, Product, ConfigurableProcess } from './process';
import { WorkflowControl } from 'workflowcontrol';
import { Observable, of } from 'rxjs';



/**
 * The task of the ProcessService is 
 *  - to expose (immutable) processes (in the correct order),
 *  - to decide which process is to be handled next;
 *  - Only this service is allowed to mutate (configure, execute, change state) processes.
 *  - to expose the products of the processes.
 *
 * We assume that the amount of processes is fixed, which is why they are returned directly,
 * whereas the products are obtained gradually over time, whis is why they are returned as observable.
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
  getProducts(processId: string): Product[],
  observeActiveProcess(): Observable<ImmutableProcess>,
  observeProcessOutput(processId: string): Observable<Product[]>
}

export abstract class ProcessService<T extends ConfigurableProcess> {
  
  protected workflowControl: WorkflowControl<T>;
  protected processes: T[] = []; // @TODO: it might be better to just retrieve the processes from workflowcontrol instead of storing them here.
  
  constructor(processes: T[]) {
    this.processes = processes;
    this.workflowControl = new WorkflowControl<T>(processes);
    let nextProc = this.workflowControl.nextProcess();
    if(nextProc) nextProc.setState("available");
  }
  
  getProcesses(): ImmutableProcess[] {
    return this.processes;
  }

  getNext(): ImmutableProcess {
    return this.workflowControl.nextProcess();
  }

  configure(process: ImmutableProcess, values) {
    let proc = this.getProcessById(process.processId());
    proc.configure(values);
  }
  
  run(process: ImmutableProcess) {
    let proc = this.getProcessById(process.processId());
    let inputs = this.getInputs(process.processId());
    let configs = proc.getParameters();

    proc.setState("running");

    proc.execute(inputs, configs).subscribe(outputs => {
      outputs.forEach(output => {
        this.workflowControl.setProduct(output.id, output.value);
      });
      proc.setState("completedSuccessfully");
      let nextProc = this.workflowControl.nextProcess();
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
      let val = this.workflowControl.getProduct(prodId);
      let prod: Product = { id: prodId,  value: val };
      return prod;
    })
  }

  getProducts(processId: string): Product[] {
    let proc = this.getProcessById(processId);
    return proc.providesProducts().map(prodId => {
      let val = this.workflowControl.getProduct(prodId);
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
  
  protected getProcessById(procId: string): T {
    for(let p of this.processes) {
      if (p.processId() == procId) {
        return p;
      }
    }
  }

}

