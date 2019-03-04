import { StepperElementComponent } from "../stepper-element/stepper-element.component";

export interface IStepperClickHandler {
    setInitialStepperState(children: StepperElementComponent[]);
    handleStepperClick(clickedChild: StepperElementComponent, children: StepperElementComponent[]);
}