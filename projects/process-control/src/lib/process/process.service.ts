import { BasicProcess, Process } from './process';
import { WorkflowControl } from 'workflowcontrol';



/**
 * The task of the IProcessService is 
 *  - to expose (immutable) processes (in the correct order),
 *  - to decide which process is to be handled next;
 *  - Only this service is allowed to mutate (configure, execute, change state) processes.
 *
 * Note that this service does *not* decide what process has currently focus; this is a UI-decission and handled by the ProcessWizardComponent.
 * Use this interface if you do not want to rely on the WorkflowControl module to order processes.  
 */
export interface IProcessService {
  getProcesses(): Process[], 
  getNext(): Process, 
  configure(process: Process, values),
  restartFrom(process: Process)
}

/**
 *  This implementation of IProcessService makes use of the WorkflowControl-module to achieve its requirements. 
 */

export abstract class ProcessService implements IProcessService {
  
  protected workflowControl: WorkflowControl<BasicProcess>;
  protected processes: BasicProcess[] = [];
  
  constructor(processes: BasicProcess[]) {
    this.processes = processes;
    this.workflowControl = new WorkflowControl<BasicProcess>(processes);
    let nextProc = this.workflowControl.nextProcess();
    nextProc.available();
  }
  
  getProcesses(): Process[] {
    return this.processes;
  }

  getNext(): Process {
    return this.workflowControl.nextProcess();
  }
  
  configure(process: Process, values) {

    let proc = this.getProcessById(process.getId());

    proc.configure(values);
  
    let inputs = proc.fetchInputsFromContext(this.workflowControl);

    proc.execute(inputs).subscribe(outputs => {
      outputs.forEach(output => {
        this.workflowControl.setProduct(output.id, output.value);
      });
      let nextProc = this.workflowControl.nextProcess();
      nextProc.available();
    });

    // @TODO: proc.execute: on error, pass error to some error-handler. 
  }

  restartFrom(process: Process) {
    throw new Error("Method not implemented.");
  }

  protected getProcessById(procId: string): BasicProcess {
    for(let p of this.processes) {
      if (p.getId() == procId) {
        return p;
      }
    }
  }

}

