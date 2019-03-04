import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { StepperElementState } from './stepper-element-state';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'ukis-stepper-element',
  templateUrl: './stepper-element.component.html',
  styleUrls: ['./stepper-element.component.css']
})
export class StepperElementComponent implements OnInit {

  @Input() public id;
  private stateService: BehaviorSubject<StepperElementState> = new BehaviorSubject<StepperElementState>("available"); // Using stateService internally to avoid ExpressionChangedAfterItHasBeenCheckedError
  private state: StepperElementState;
  private clickSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {}

  clicked() {
    this.clickSubject.next(true);
  }

  exposeClickEvent(): Observable<boolean> {
    return this.clickSubject.asObservable();
  }

  getState(): StepperElementState {
    return this.state;
  }

  setState(state: StepperElementState) {
    // this.state = state;
    this.stateService.next(state);
  }
}
