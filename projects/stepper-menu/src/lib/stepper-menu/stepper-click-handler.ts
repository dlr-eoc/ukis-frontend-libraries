import { StepperElementComponent } from "../stepper-element/stepper-element.component";

export interface IStepperClickHandler {
    setInitialState(children: StepperElementComponent[]);
    handleStepperClick(clickedChild: StepperElementComponent, children: StepperElementComponent[]);
}