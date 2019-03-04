import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StepperElementState } from './stepper-element-state';

@Component({
  selector: 'ukis-stepper-element',
  templateUrl: './stepper-element.component.html',
  styleUrls: ['./stepper-element.component.css']
})
export class StepperElementComponent implements OnInit {

  private state: StepperElementState;
  private clickSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {}

  clicked() {
    this.clickSubject.next(true);
  }

  observeClick(): Observable<boolean> {
    return this.clickSubject.asObservable();
  }

  getState(): StepperElementState {
    return this.state;
  }

  setState(state: StepperElementState) {
    this.state = state;
  }
}
