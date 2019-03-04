import { Component, OnInit, QueryList, AfterViewInit, ContentChildren, Input } from '@angular/core';
import { StepperElementComponent } from '../stepper-element/stepper-element.component';
import { IStepperClickHandler } from './stepper-click-handler';


/**
 * This is the container of stepper-elements. 
 * Its purpose is to be aware of all stepper-elements and notify a user-defined clickHandler of click-events to any of its children.
 */


@Component({
  selector: 'ukis-stepper-menu',
  templateUrl: './stepper-menu.component.html',
  styleUrls: ['./stepper-menu.component.css']
})
export class StepperMenuComponent implements OnInit, AfterViewInit {

  @Input()
  clickHandler: IStepperClickHandler;
  @ContentChildren(StepperElementComponent)
  private children: QueryList<StepperElementComponent>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {

    // subscribe to clicks
    this.children.forEach((child: StepperElementComponent) => {
      child.observeClick().subscribe((clicked: boolean) => {
        this.handleClick(child);
      });
    });

    // set initial state
    this.clickHandler.setInitialState(this.children.toArray());
  }

  private handleClick(clickedElement: StepperElementComponent) {
    this.clickHandler.handleStepperClick(clickedElement, this.children.toArray());
  }

}
