import {
  Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, OnDestroy, Input, SimpleChanges, OnChanges,
  EventEmitter, Directive, ViewContainerRef, Type, Output
} from '@angular/core';
import { Subscription } from 'rxjs';


export interface IDynamicComponent {
  component: Type<any>;
  inputs?: { [input: string]: any };
  outputs?: { [inputChange: string]: (value) => void };
}

@Directive({
  selector: '[ukisAddHost]',
})
export class ViewRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'ukis-dynamic-component',
  template: `<ng-template ukisAddHost></ng-template>`
})
export class DynamicComponentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dynamicComponent: IDynamicComponent;
  @Output() dynamicComponentChange = new EventEmitter<IDynamicComponent>();
  @ViewChild(ViewRefDirective, { static: true }) ukisAddHost: ViewRefDirective;

  componentRef: ComponentRef<any>;
  subs: Subscription[];
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent() {
    if (this.dynamicComponent) {
      this.subs = [];
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponent.component);
      const viewContainerRef = this.ukisAddHost.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(componentFactory);
      this.setInputOutputs();
    }
  }

  /**
   * Set's the inputs defined in IDynamicComponent
   *
   * To subscribe to the outputs of the IDynamicComponent.component use '<name>Change' as output name in your component.
   * e.g.
   * @Input() set value()...
   *          get value()...
   * @Output() valueChange = new EventEmitter<number>();
   *
   *
   * To reset the Inputs after ngOnInit, change to Object binding for the input 'dynamicComponent' in the parent which creates the dynamic component.
   * e.g.
   * this.Comp.inputs.test = 'value';
   * CustomLayer.action = this.Comp = Object.assign({}, this.Comp);
   */
  setInputOutputs() {
    if (this.componentRef && this.dynamicComponent.inputs) {
      const inputs = Object.keys(this.dynamicComponent.inputs);
      inputs.map(i => {
        const inputname = i;
        this.componentRef.instance[inputname] = this.dynamicComponent.inputs[inputname];
        const outupName = `${inputname}Change`;
        /** subscribe to output for same name as input */
        if (this.componentRef.instance[outupName] && this.componentRef.instance[outupName] instanceof EventEmitter) {
          const sub = this.componentRef.instance[outupName].subscribe(val => {
            // console.log('sub to dynamic component output', val)
            this.dynamicComponent.inputs[inputname] = val;
            /** if outputs are defined on IDynamicComponent pass the value to there functions */
            if (this.dynamicComponent.outputs[outupName]) {
              this.dynamicComponent.outputs[outupName](val);
            }
            this.dynamicComponentChange.emit(this.dynamicComponent);
          });
          this.subs.push(sub);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dynamicComponent) {
      console.log('ngOnChanges', changes.dynamicComponent);
      if (Array.isArray(this.subs)) {
        this.subs.map(s => s.unsubscribe());
      }
      this.setInputOutputs();
    }
  }


  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.subs.map(s => s.unsubscribe());
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
