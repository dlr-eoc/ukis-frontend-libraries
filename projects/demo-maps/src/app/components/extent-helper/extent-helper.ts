import { Component, input, signal, effect, inject, DestroyRef } from '@angular/core';
import { MapStateService, MapState } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-extent-helper',
  styleUrl: './extent-helper.scss',
  templateUrl: './extent-helper.html',
})
export class ExtentHelper {
  mapStateSvc = input.required<MapStateService>();
  subs: Subscription[] = [];
  public currentMapState = signal<MapState | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  constructor() {

    // old ngOnInit()
    const effectRef = effect(() => {
      const mapStateSvc = this.mapStateSvc();
      if (mapStateSvc) {
        const mapStateSub = mapStateSvc.getMapState().subscribe(state => {
          this.currentMapState.set(state);
        });
        this.subs.push(mapStateSub);
      }
      effectRef.destroy();
    }, { manualCleanup: true });


    /**
    * old ngOnDestroy
    */
    this.destroyRef.onDestroy(() => {
      this.subs.forEach(s => s.unsubscribe());
    });
  }
}
