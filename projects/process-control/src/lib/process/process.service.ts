import { BasicProcess, Process, Product } from './process';
import { WorkflowControl } from 'workflowcontrol';
import { Observable, of } from 'rxjs';



/**
 * The task of the IProcessService is 
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
 * Use this interface if you do not want to rely on the WorkflowControl module to order processes.  
 * 
 */
export interface IProcessService {
  getProcesses(): Process[], 
  getNext(): Process, 
  observeActiveProcess(): Observable<Process>,
  getProducts(processId?: string): Observable<Product[]>,
  configureAndRun(process: Process, values),
  restartFrom(process: Process)
}

/**
 *  This implementation of IProcessService makes use of the WorkflowControl-module to achieve its requirements. 
 * @TODO: maybe make it abstract class ProcessService<T extends BasicProcess> ?
 */

export abstract class ProcessService implements IProcessService {
  
  protected workflowControl: WorkflowControl<BasicProcess>;
  protected processes: BasicProcess[] = [];
  
  constructor(processes: BasicProcess[]) {
    this.processes = processes;
    this.workflowControl = new WorkflowControl<BasicProcess>(processes);
    let nextProc = this.workflowControl.nextProcess();
    if(nextProc) nextProc.available();
  }
  
  getProcesses(): Process[] {
    return this.processes;
  }

  getNext(): Process {
    return this.workflowControl.nextProcess();
  }

  observeActiveProcess(): Observable<Process> {
    return of(this.getNext());
  }
  
  configureAndRun(process: Process, values) {

    let proc = this.getProcessById(process.getId());

    proc.configure(values);
  
    let inputs = proc.fetchInputsFromContext(this.workflowControl);
    let configs = proc.getParameters();

    proc.execute(inputs, configs).subscribe(outputs => {
      outputs.forEach(output => {
        this.workflowControl.setProduct(output.id, output.value);
      });
      let nextProc = this.workflowControl.nextProcess();
      if(nextProc) nextProc.available();
    });

    // @TODO: proc.execute: on error, pass error to some error-handler. 
  }

  restartFrom(process: Process) {
    throw new Error("Method not implemented.");
  }

  getProducts(processId?: string): Observable<Product[]> {
    if(processId) return this.getProductsByProcessId(processId);
    return this.getAllProducts();
  }

  protected getAllProducts(): Observable<Product[]> {
    return of(this.processes
      .map(proc => proc.getProductsFromContext(this.workflowControl))
      .reduce((carry, currprod) => {return carry.concat(currprod)}, []));
  }

  protected getProductsByProcessId(processId: string): Observable<Product[]> {
    let process = this.getProcessById(processId);
    return of(process.getProductsFromContext(this.workflowControl));
  }

  protected getProcessById(procId: string): BasicProcess {
    for(let p of this.processes) {
      if (p.getId() == procId) {
        return p;
      }
    }
  }

}

