import { Map } from 'ol';
import { Layer } from 'ol/layer';
import { DragBox } from 'ol/interaction';
import { Options as DragBoxOptions } from 'ol/interaction/DragBox';
import { getUid } from 'ol/util';
import Overlay from 'ol/Overlay';
import { Options as OverlayOptions } from 'ol/Overlay';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import RenderFeature from 'ol/render/Feature';
import Feature from 'ol/Feature';


export interface IPopupOptions {
  modelName: string;
  properties: any;
  layer: Layer<any>;
  feature?: Feature<any> | RenderFeature;
  event: MapBrowserEvent<PointerEvent>;
  popupFn?: (popupobj: { [key: string]: any }) => string;
}

/**
 * Add a box-selection interaction to the map
 * https://openlayers.org/en/latest/examples/box-selection.html
 */
export function addBboxSelection(map: Map, onBoxStart: () => void, onBoxEnd: (ext) => void, dragBoxOptions: DragBoxOptions) {
  const options = {
    className: 'ol-drag-select'
  };
  Object.assign(options, dragBoxOptions);
  const dragBox = new DragBox(dragBoxOptions);

  dragBox.on('boxstart', () => {
    onBoxStart();
  });

  dragBox.on('boxend', () => {
    const extent = dragBox.getGeometry().getExtent();
    onBoxEnd(extent);
  });

  map.addInteraction(dragBox);
}



/*modelName: string;
  properties: any;
  layer: olLayer<any>;
  feature?: olFeature<any> | olRenderFeature;
  event: olMapBrowserEvent<PointerEvent>;
  popupFn?: popup['pupupFunktion']; */

/** ------------------------------------------------------------------- */
const OverlayKey = 'type';
const OverlayValue = 'popup';
/**
 * Add an Overlay (Popup) to the map by specifying either
 * This function could be used in map.on('click', ...); or map.on('pointermove', ...);
 */
export function addPopup(map: Map, args: IPopupOptions, popupObj?: { [key: string]: any }, html?: string, event?: 'click' | 'move', removePopups?: boolean) {
  /** @dlr-eoc/services-layers - Layer['popup'] */
  const layerpopup = args.layer.get(OverlayValue);
  const content = document.createElement('div');
  content.className = 'ol-popup-content';
  // console.log(args, popupObj, html)
  let popupHtml = '';
  if (args.popupFn) {
    popupHtml = args.popupFn(popupObj);
  }
  else if (html && (!popupObj || Object.keys(popupObj).length === 0)) {
    popupHtml = html;
  } else {
    popupHtml = this.createPopupHtml(popupObj);
  }
  content.innerHTML = popupHtml;

  const container = document.createElement('div');
  container.className = 'ol-popup';
  container.id = `popup_${new Date().getTime()}`;
  container.style.display = 'block';

  if (!event || event !== 'move') {
    const closer = document.createElement('a');
    closer.className = 'ol-popup-closer';
    container.appendChild(closer);

    const closeFunction = () => {
      closer.removeEventListener('click', closeFunction, false);
      map.removeOverlay(overlay);
    };
    closer.addEventListener('click', closeFunction, false);
  }


  container.appendChild(content);
  let popupID = null;
  if (args.feature) {
    popupID = getUid(args.feature);
  } else if (args.layer) {
    popupID = getUid(args.layer);
  } else {
    popupID = `popup_${new Date().getTime()}`;
  }

  const defaultOptions: OverlayOptions = {
    element: container,
    autoPan: true,
    id: popupID,
    autoPanAnimation: {
      duration: 250
    },
    positioning: 'bottom-center',
    stopEvent: true,
    insertFirst: false,
  };

  let overlayoptions = defaultOptions;

  if (layerpopup && typeof layerpopup === 'object' && !Array.isArray(layerpopup) && layerpopup.options) {
    overlayoptions = Object.assign(defaultOptions, layerpopup.options);
  }

  const overlay = new Overlay(overlayoptions);
  overlay.set('addEvent', args.event.type);
  overlay.set('type', 'popup');

  let coordinate;
  if (args.properties && args.properties.geometry && args.properties.geometry.getType() === 'Point') {
    coordinate = args.properties.geometry.getCoordinates();
  } else {
    coordinate = args.event.coordinate;
  }

  overlay.setPosition(coordinate);

  if (removePopups) {
    removeAllPopups(map);
  } else if (event === 'move' && removePopups !== false) {
    removeAllPopups(map, (item) => {
      return item.get('addEvent') === 'pointermove';
    });
  }

  const hasPopup = getPopups(map,).find(item => item.getId() === overlay.getId());
  if (hasPopup) {
    map.removeOverlay(hasPopup);
  }

  map.addOverlay(overlay);
}


export function getPopups(map: Map): Overlay[] {
  const popups = [];
  map.getOverlays().getArray().slice(0).forEach((overlay) => {
    if (overlay.get(OverlayKey) === OverlayValue) {
      popups.push(overlay);
    }
  });
  return popups;
}

export function removeAllPopups(map: Map, filter?: (item: Overlay) => boolean) {
  let popups = getPopups(map);
  if (filter) {
    popups = getPopups(map).filter(filter);
  }
  popups.forEach((overlay) => {
    if (overlay.get(OverlayKey) === OverlayValue) {
      this.map.removeOverlay(overlay);
    }
  });
}
