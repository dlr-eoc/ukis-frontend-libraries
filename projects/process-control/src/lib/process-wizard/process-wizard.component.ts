import { Component, OnInit, Input } from '@angular/core';
import { IProcessService } from '../process/process.service';
import { ImmutableProcess } from '../process/process';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';



/**
 * ProcessWizard
 *  - controls what element has focus
 *  - interface between elements and ProcessService
 */

@Component({
  selector: 'ukis-process-wizard',
  templateUrl: './process-wizard.component.html',
  styleUrls: ['./process-wizard.component.css']
})
export class ProcessWizardComponent implements OnInit {

  @Input() processService: IProcessService;
  private focussedProcessId: BehaviorSubject<string>;
  

  constructor() { }

  ngOnInit() {
    let firstProcessId = "";
    this.processService.getProcesses().forEach(process => {
      if(process.getState() == "available") firstProcessId = process.getId();
    })
    this.focussedProcessId = new BehaviorSubject<string>(firstProcessId);
  }

  focusOn(process: ImmutableProcess) {
    this.focussedProcessId.next(process.getId());
  }

  hasFocus(process: ImmutableProcess): Observable<boolean> {
    return this.getFocussedProcessId().pipe(
      map((procId: string) => {
        return (procId == process.getId())
      })
    );
  }

  getFocussedProcessId(): Observable<string> {
    return this.focussedProcessId;
  }

  onConfigSubmitted(data) {
    this.processService.configure(data.process, data.values);
    this.processService.run(data.process);
  }

  focusOnNext(evt) {
    let next = this.processService.getActiveProcess()
    if(next) this.focusOn(next);
  }

  onReconfigureClicked(process) {
    this.processService.restartFrom(process)
  }
}
