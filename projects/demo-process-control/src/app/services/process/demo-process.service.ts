import { Injectable } from '@angular/core';
import { IProcessService, ImmutableProcess, MutableProcess, Product } from '@ukis/process-control';
import { DemoProcess } from './demo-process';
import { Parameter } from '@ukis/dynforms/src/public_api';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemoProcessService implements IProcessService {

  protected activeProcess: BehaviorSubject<MutableProcess>;

  constructor(protected processes: MutableProcess[]) {
    this.activeProcess = new BehaviorSubject<MutableProcess>(processes[0]);
  }
  
  getProcesses(): ImmutableProcess[] {
    return this.processes;
  }  
  
  getActiveProcess(): Observable<ImmutableProcess> {
    return this.activeProcess;
  }
  
  getConfig(processId: string): Parameter[] {
    return this.getProcessById(processId).getConfig();
  }

  configure(processId: string, values: { [key: string]: any; }) {
    
  }
  
  run(processId: string): Observable<boolean> {
    console.log(`running ${processId}`);
    let process = this.getProcessById(processId);
    let paras = this.getConfig(processId);
    process.setState("running");
    return process.execute([]).pipe(
      map((prods: Product[]) => {
        process.setState("completedSuccessfully")
        return true;
      })
    );
  }
  
  restartFrom(processId: string) {
    throw new Error("Method not implemented.");
  }

  private getProcessById(processId: string): MutableProcess {
    let process;
    this.processes.forEach(proc => {
      if(proc.getId() == processId) process = proc;
    });
    return process;
  }
}
