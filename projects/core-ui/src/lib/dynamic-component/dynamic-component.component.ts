import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, OnDestroy, Input } from '@angular/core';
import { Directive, ViewContainerRef, Type } from '@angular/core';


export interface IDynamicComponent {
  component: Type<any>;
  inputs?: { [input: string]: any };
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
export class DynamicComponentComponent implements OnInit, OnDestroy {
  @Input('dynamicComponent') dynamicComponent: IDynamicComponent;
  @ViewChild(ViewRefDirective, { static: true }) ukisAddHost: ViewRefDirective;

  componentRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent() {
    if (this.dynamicComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponent.component);
      const viewContainerRef = this.ukisAddHost.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(componentFactory);
      if (this.dynamicComponent.inputs) {
        const inputs = Object.keys(this.dynamicComponent.inputs);
        inputs.map(i => {
          this.componentRef.instance[i] = this.dynamicComponent.inputs[i];
        });
      }
    }
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
