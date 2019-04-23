import { Component, OnInit, Input } from '@angular/core';
import { ProcessService } from '../process/process.service';
import { Process } from '../process/process';
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

  @Input() processService: ProcessService;
  private focussedProcessId: BehaviorSubject<string>;
  

  constructor() { }

  ngOnInit() {
    let firstProcessId = "";
    this.processService.getProcesses().forEach(process => {
      if(process.getState() == "available") firstProcessId = process.getId();
    })
    this.focussedProcessId = new BehaviorSubject<string>(firstProcessId);
  }

  focusOn(process: Process) {
    this.focussedProcessId.next(process.getId());
  }

  hasFocus(process: Process): Observable<boolean> {
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
    this.processService.configureAndRun(data.process, data.values);
  }

  focusOnNext(evt) {
    let next = this.processService.getNext()
    if(next) this.focusOn(next);
  }

  onReconfigureClicked(process) {
    this.processService.restartFrom(process)
  }
}
