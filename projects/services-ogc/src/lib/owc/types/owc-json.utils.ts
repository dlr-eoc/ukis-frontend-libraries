/** This file contains functions (Type Guards) to test for types in owc-json.ts */

import { Xyz_Offering, GeoJson_Offering, TMS_Offering, GeoJsonOffering, tmsOffering, xyzOffering } from './eoc-owc-json';
import { cswOffering, CSW_Offering, GeoTIFFOffering, GeoTIFF_Offering, GMLCOVOffering, GMLCOV_Offering, GMLJP2Offering, GMLJP2_Offering, gmlOffering, GML_Offering, IOwsAuthor, IOwsCategory, IOwsContent, IOwsContext, IOwsGenerator, IOwsCreatorDisplay, IOwsLinks, IOwsOffering, IOwsOperation, IOwsResource, IOwsResourceProperties, IOwsStyleSet, kmlOffering, KML_Offering, wcsOffering, WCS_Offering, wfsOffering, WFS_Offering, wmsOffering, WMS_Offering, wmtsOffering, WMTS_Offering } from './owc-json';

function trueForAll(list: any[], predicate: (o: any) => boolean): boolean {
  for (const entry of list) {
    if (!predicate(entry)) {
      return false;
    }
  }
  return true;
}

export function isIOwsContext(object: IOwsContext): object is IOwsContext {
  let ISCONTEXT_1_0;
  if (object?.properties?.links) {
    ISCONTEXT_1_0 = object.properties.links.profiles.find(item => item.href === 'http://www.opengis.net/spec/owc-geojson/1.0/req/core');
  }

  if (!ISCONTEXT_1_0) {
    console.error('this is not a valid OWS Context v1.0!');
    return false;
  } else {
    return true;
  }
}

export function isIOwsResource(object: any): object is IOwsResource {
  return 'id' in object && 'type' in object
    && 'properties' in object && isIOwsResourceProperties(object.properties);
}

export function isIOwsResourceProperties(object: any): object is IOwsResourceProperties {
  return 'title' in object
    && 'updated' in object
    && (object.authors ? trueForAll(object.authors, isIOwsAuthor) : true)
    && (object.offerings ? trueForAll(object.offerings, isIOwsOffering) : true)
    && (object.categories ? trueForAll(object.categories, isIOwsCategory) : true);
}

export function isIOwsOffering(object: any): object is IOwsOffering {
  return 'code' in object
    && (object.operations ? trueForAll(object.operations, isIOwsOperation) : true)
    && (object.contents ? trueForAll(object.contents, isIOwsContent) : true)
    && (object.styles ? trueForAll(object.styles, isIOwsStyleSet) : true)
}

export function isIOwsGenerator(object: any): object is IOwsGenerator {
  return 'title' in object
    || 'uri' in object
    || 'version' in object;
}

export function isIOwsAuthor(object: any): object is IOwsAuthor {
  return 'name' in object
    || 'email' in object
    || 'uri' in object;
}

export function isIOwsCategory(object: any): object is IOwsCategory {
  return 'scheme' in object
    || 'term' in object
    || 'label' in object;
}

export function isIOwsLinks(object: any): object is IOwsLinks {
  return 'rel' in object;
}

export function isIOwsCreatorDisplay(object: any): object is IOwsCreatorDisplay {
  return 'pixelWidth' in object
    || 'pixelHeight' in object
    || 'mmPerPixel' in object;
}

export function isIOwsOperation(object: any): object is IOwsOperation {
  return 'code' in object
    && 'method' in object
    && (object.request ? isIOwsContent(object.request) : true)
    && (object.result ? isIOwsContent(object.result) : true);
}

export function isIOwsContent(object: any): object is IOwsContent {
  return 'type' in object;
}

export function isIOwsStyleSet(object: any): object is IOwsStyleSet {
  return 'name' in object
    && 'title' in object;
}

export function isWmsOffering(str: string): str is WMS_Offering {
  return str === wmsOffering;
}
export function isWfsOffering(str: string): str is WFS_Offering {
  return str === wfsOffering;
}
export function isWpsOffering(str: string): str is WCS_Offering {
  return str === wcsOffering;
}
export function isCswOffering(str: string): str is CSW_Offering {
  return str === cswOffering;
}
export function isWmtsOffering(str: string): str is WMTS_Offering {
  return str === wmtsOffering;
}
export function isGmlOffering(str: string): str is GML_Offering {
  return str === gmlOffering;
}
export function isKmlOffering(str: string): str is KML_Offering {
  return str === kmlOffering;
}
export function isGeoTIFFOffering(str: string): str is GeoTIFF_Offering {
  return str === GeoTIFFOffering;
}
export function isGMLJP2Offering(str: string): str is GMLJP2_Offering {
  return str === GMLJP2Offering;
}
export function isGMLCOVOffering(str: string): str is GMLCOV_Offering {
  return str === GMLCOVOffering;
}
export function isXyzOffering(str: string): str is Xyz_Offering {
  return str === xyzOffering;
}
export function isGeoJsonOffering(str: string): str is GeoJson_Offering {
  return str === GeoJsonOffering;
}
export function isTMSOffering(str: string): str is TMS_Offering {
  return str === tmsOffering;
}
