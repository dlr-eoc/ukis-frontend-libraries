import { ImmutableProcess, Product, MutableProcess } from './process';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Parameter } from '@ukis/dynforms';



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
  getActiveProcess(): Observable<ImmutableProcess>,
  
  getConfig(processId: string): Parameter[],
  configure(processId: string, values: {[key: string]: any}), 

  run(processId: string): Observable<Success>,
  restartFrom(processId: string)

}

export type Success = boolean;

