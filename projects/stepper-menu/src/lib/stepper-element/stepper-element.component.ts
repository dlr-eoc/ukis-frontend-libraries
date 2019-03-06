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
  private state: BehaviorSubject<StepperElementState> = new BehaviorSubject<StepperElementState>("forbidden");
  private clickSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {}

  clicked() {
    this.clickSubject.next(true);
  }

  exposeClickEvent(): Observable<boolean> {
    return this.clickSubject.asObservable();
  }

  getState(): Observable<StepperElementState> {
    return this.state;
  }

  setState(state: StepperElementState) {
    this.state.next(state);
  }
}
