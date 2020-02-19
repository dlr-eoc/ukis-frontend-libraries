/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectorRef, Directive, DoCheck, EmbeddedViewRef, Input, IterableChangeRecord, IterableChanges, IterableDiffer, IterableDiffers, NgIterable, TemplateRef, TrackByFunction, ViewContainerRef, forwardRef, isDevMode } from '@angular/core';

/**
 * @publicApi
 */
export class reverseForOfContext<T> {
  constructor(
    public $implicit: T, public revForOf: NgIterable<T>, public index: number,
    public count: number) { }

  get first(): boolean { return this.index === 0; }

  get last(): boolean { return this.index === this.count - 1; }

  get even(): boolean { return this.index % 2 === 0; }

  get odd(): boolean { return !this.even; }
}

/**
 * The `reverseForOf` directive instantiates a template once per item from an iterable. The context
 * for each instantiated template inherits from the outer context with the given loop variable
 * set to the current item from the iterable.
 *
 * @usageNotes
 *
 * ### Local Variables
 *
 * `reverseForOf` provides several exported values that can be aliased to local variables:
 *
 * - `$implicit: T`: The value of the individual items in the iterable (`revForOf`).
 * - `revForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression is
 * more complex then a property access, for example when using the async pipe (`userStreams |
 * async`).
 * - `index: number`: The index of the current item in the iterable.
 * - `first: boolean`: True when the item is the first item in the iterable.
 * - `last: boolean`: True when the item is the last item in the iterable.
 * - `even: boolean`: True when the item has an even index in the iterable.
 * - `odd: boolean`: True when the item has an odd index in the iterable.
 *
 * ```
 * <li *revFor="let user of userObservable | async as users; index as i; first as isFirst">
 *    {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
 * </li>
 * ```
 *
 * ### Change Propagation
 *
 * When the contents of the iterator changes, `reverseForOf` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 * * Otherwise, the DOM element for that item will remain the same.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls (such as `<input>` elements which accept user input) that are present. Inserted rows can
 * be animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state
 * such as user input.
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * To customize the default tracking algorithm, `reverseForOf` supports `trackBy` option.
 * `trackBy` takes a function which has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * ### Syntax
 *
 * - `<li *revFor="let item of items; index as i; trackBy: trackByFn">...</li>`
 *
 * With `<ng-template>` element:
 *
 * ```
 * <ng-template revFor let-item [revForOf]="items" let-i="index" [revForTrackBy]="trackByFn">
 *   <li>...</li>
 * </ng-template>
 * ```
 *
 * ### Example
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 *
 * @ngModule CommonModule
 * @publicApi
 */
@Directive({ selector: '[revFor][revForOf]' })
export class reverseForOf<T> implements DoCheck {
  @Input()
  set revForOf(revForOf: NgIterable<T>) {
    this._revForOf = revForOf;
    this._revForOfDirty = true;

  }
  @Input()
  set revForTrackBy(fn: TrackByFunction<T>) {
    if (isDevMode() && fn != null && typeof fn !== 'function') {
      // TODO(vicb): use a log service once there is a public one available
      if (<any>console && <any>console.warn) {
        console.warn(
          `trackBy must be a function, but received ${JSON.stringify(fn)}. ` +
          `See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.`);
      }
    }
    this._trackByFn = fn;
  }

  get revForTrackBy(): TrackByFunction<T> { return this._trackByFn; }

  // TODO(issue/24571): remove '!'.
  private _revForOf !: NgIterable<T>;
  private _revForOfDirty: boolean = true;
  private _differ: IterableDiffer<T> | null = null;
  // TODO(issue/24571): remove '!'.
  private _trackByFn !: TrackByFunction<T>;

  constructor(
    private _viewContainer: ViewContainerRef, private _template: TemplateRef<reverseForOfContext<T>>,
    private _differs: IterableDiffers) { }

  @Input()
  set revForTemplate(value: TemplateRef<reverseForOfContext<T>>) {
    // TODO(TS2.1): make TemplateRef<Partial<NgForRowOf<T>>> once we move to TS v2.1
    // The current type is too restrictive; a template that just uses index, for example,
    // should be acceptable.
    if (value) {
      this._template = value;
    }
  }

  ngDoCheck(): void {
    if (this._revForOfDirty) {
      this._revForOfDirty = false;
      // React on revForOf changes only once all inputs have been initialized
      const value = this._revForOf;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this.revForTrackBy);
        } catch (e) {
          throw new Error(
            `Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._revForOf);
      if (changes) this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const insertTuples: RecordViewTuple<T>[] = [];
    changes.forEachOperation(
      (item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
        if (item.previousIndex == null) {
          const view = this._viewContainer.createEmbeddedView(
            this._template, new reverseForOfContext<T>(null!, (this._revForOf as any).reverse(), -1, -1), currentIndex);
          const tuple = new RecordViewTuple<T>(item, view);
          //console.log(tuple)
          insertTuples.push(tuple);
        } else if (currentIndex == null) {
          this._viewContainer.remove(adjustedPreviousIndex);
        } else {
          const view = this._viewContainer.get(adjustedPreviousIndex)!;
          this._viewContainer.move(view, currentIndex);
          const tuple = new RecordViewTuple(item, <EmbeddedViewRef<reverseForOfContext<T>>>view);
          insertTuples.push(tuple);
        }
      });

    /*
for (let i = insertTuples.length; i--;) {
    this._perViewChange(insertTuples[i].view, insertTuples[i].record);
}

for (let i = this._viewContainer.length, ilen = this._viewContainer.length; i--;) {
    const viewRef = <EmbeddedViewRef<reverseForOfContext<T>>>this._viewContainer.get(i);
    viewRef.context.index = i;
    viewRef.context.count = ilen;
    viewRef.context.revForOf = this._revForOf;
}
*/



    /*
            let revinsertTuples = insertTuples.reverse();
            for (let i = 0; i < revinsertTuples.length; i++) {
                this._perViewChange(revinsertTuples[i].view, revinsertTuples[i].record);
            }

            for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
                const viewRef = <EmbeddedViewRef<reverseForOfContext<T>>>this._viewContainer.get(i);
                viewRef.context.index = i;
                viewRef.context.count = ilen;
                viewRef.context.revForOf = this._revForOf;
            }
            */




    for (let i = 0; i < insertTuples.length; i++) {
      this._perViewChange(insertTuples[i].view, insertTuples[i].record);
    }

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<reverseForOfContext<T>>>this._viewContainer.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
      viewRef.context.revForOf = this._revForOf;
    }



    changes.forEachIdentityChange((record: any) => {
      const viewRef =
        <EmbeddedViewRef<reverseForOfContext<T>>>this._viewContainer.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });
  }

  private _perViewChange(
    view: EmbeddedViewRef<reverseForOfContext<T>>, record: IterableChangeRecord<any>) {
    view.context.$implicit = record.item;
  }

  /**
   * Assert the correct type of the context for the template that `revForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type check compiler that the
   * `reverseForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: reverseForOf<T>, ctx: any): ctx is reverseForOfContext<T> {
    return true;
  }
}

class RecordViewTuple<T> {
  constructor(public record: any, public view: EmbeddedViewRef<reverseForOfContext<T>>) { }
}

export function getTypeNameForDebugging(type: any): string {
  return type['name'] || typeof type;
}
