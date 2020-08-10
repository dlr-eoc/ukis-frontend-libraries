import { Control } from 'ol/control';
import { listen } from 'ol/events';

/**
 * .zoom-number {
        top: 65px;
        left: .5em;
        pointer-events: auto;
      }
 */
export class ZommNumberControl extends Control {
  [x: string]: any;
  toggle: 'zoom' | 'resolution';
  constructor(opt_options: any = {}) {
    const options = opt_options;

    super({
      element: document.createElement('div'),
      target: options.target
    });

    this.toggle = 'zoom';

    const className =
      options.className !== undefined
        ? options.className
        : 'zoom-number ol-unselectable ol-control';

    const button = document.createElement('button');
    button.className = className + '-reset';
    button.setAttribute('type', 'button');
    button.innerHTML = 'Z';

    button.addEventListener('click', this.toggleZoomResolution.bind(this), false);

    const cssClasses = className + ' ';
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(button);
  }

  setMap(map) {
    super.setMap(map);
    if (map) {
      this.listenerKeys.push(
        listen(map, 'moveend', this.handleMapMoveend_, this)
      );
    }
  }

  getMapZoom() {
    return this.getMap().getView().getZoom();
  }

  getMapResolution() {
    return this.getMap().getView().getResolution();
  }

  toggleZoomResolution() {
    if (this.toggle === 'zoom') {
      this.toggle = 'resolution';
    } else {
      this.toggle = 'zoom';
    }
    this.handleMapMoveend_();
  }

  handleMapMoveend_() {
    if (this.element instanceof HTMLElement && this.element.firstElementChild instanceof HTMLElement) {
      if (this.toggle === 'zoom') {
        const zoom = this.getMapZoom();
        this.element.firstElementChild.innerHTML = `${Math.round(zoom * 1) / 1}`;
        this.element.firstElementChild.title = `z: ${zoom}`;
      } else {
        const resolution = this.getMapResolution();
        this.element.firstElementChild.innerHTML = `${Math.round(resolution * 1) / 1}`;
        this.element.firstElementChild.title = `r: ${resolution}`;
      }
    }
  }
}
