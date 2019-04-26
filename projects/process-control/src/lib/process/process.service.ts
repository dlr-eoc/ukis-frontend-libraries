import { ImmutableProcess, Product, MutableProcess } from './process';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Parameter } from '@ukis/dynforms';


// class ConfigContext {

//   private config: Map<string, Parameter[]>;

//   constructor(processes: ImmutableProcess[]) {
//     this.config = new Map<string, Parameter[]>();
//     for(let process of processes) {
//       this.config.set(process.processId(), process.requiresParameters());
//     }
//   }

//   setConfig(processId: string, input: {[key: string]: any}): void {
//     let processConfiguration = this.getConfig(processId);
//     processConfiguration.map(para => para.value = input[para.id]);
//     this.config.set(processId, processConfiguration);
//   }

//   getConfig(processId: string): Parameter[] {
//     return this.config.get(processId);
//   }

// }


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
  getActiveProcess(): ImmutableProcess,
  
  configure(process: ImmutableProcess, values), 
  run(process: ImmutableProcess),
  restartFrom(process: ImmutableProcess),

  // getInputs(processId: string): Product[],
  // getConfig(processId: string): Parameter[],
  // getProducts(processId: string): Product[],

  observeActiveProcess(): Observable<ImmutableProcess>,
  observeProcessOutput(processId: string): Observable<Product[]>
}

export abstract class ProcessService<Proc extends MutableProcess> {
  
  protected activeProcessIndex: number;
  protected activeProcess: BehaviorSubject<Proc>;
  protected processes: Proc[] = []; 
  
  constructor(processes: Proc[]) {
    this.processes = processes;
    this.activeProcessIndex = 0;
    let nextProc = this.processes[0];
    if(nextProc) nextProc.setState("available");
    this.activeProcess = new BehaviorSubject<Proc>(nextProc);
  }
  
  getProcesses(): ImmutableProcess[] {
    return this.processes;
  }

  getActiveProcess(): ImmutableProcess {
    return this.processes[this.activeProcessIndex];
  }

  /**
   * @TODO: rewrite this to provideConfig(para: Parameter)
   */
  configure(process: ImmutableProcess, values: {[k: string]: any}): void {
    let mutableProcess = this.getProcessById(process.getId());
    let configs = mutableProcess.getParameters();
    configs.map(para => para.value = values[para.id]);
    configs.forEach(config => {
      mutableProcess.setConfig(config);
    })
  }

  provideProduct(product: Product): void {
    this.processes.forEach(process => {
      let requiredProdIds = process.getInputs().map(prod => prod.id);
      if (requiredProdIds.includes(product.id)) {
        process.setInput(product);
      }
    })
  }
  
  run(process: ImmutableProcess) {
    let mutableProcess = this.getProcessById(process.getId());

    /**
     * Note that we do not call proc.setConfig and proc.setInput.
     * The reason is that we have already done that eagerly once inputs and configs were available. 
     * This eagerness is neccessary so that processes can mutate inputs and configs as soon as they become available.
     */

    mutableProcess.setState("running");

    mutableProcess.execute().subscribe(outputs => {
      outputs.forEach(output => this.provideProduct(output) );

      mutableProcess.setState("completedSuccessfully");

      this.activeProcessIndex += 1;
      let nextProc = this.processes[this.activeProcessIndex];
      if(nextProc) nextProc.setState("available");
      this.activeProcess.next(nextProc);
    });

    // @TODO: proc.execute: on error, pass error to some error-handler. 
  }

  restartFrom(process: ImmutableProcess) {
    throw new Error("Method not implemented.");
  }

  observeActiveProcess(): Observable<ImmutableProcess> {
    return this.activeProcess;
  }
  
  protected getProcessById(procId: string): Proc {
    for(let p of this.processes) {
      if (p.getId() == procId) {
        return p;
      }
    }
  }

}

