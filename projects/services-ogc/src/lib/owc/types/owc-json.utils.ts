/** This file contains functions (Type Guards) to test for types in owc-json.ts */

import { IOwsAuthor, IOwsCategory, IOwsContent, IOwsContext, IOwsCreator, IOwsCreatorDisplay, IOwsLinks, IOwsOffering, IOwsOperation, IOwsResource, IOwsResourceProperties, IOwsStyleSet } from './owc-json';

function trueForAll(list: any[], predicate: (o: any) => boolean): boolean {
  for (const entry of list) {
    if (!predicate(entry)) {
      return false;
    }
  }
  return true;
}

export function isIOwsContext(object: any): object is IOwsContext {
  return 'id' in object
    && 'properties' in object
    && 'links' in object.properties // && trueForAll(object.properties.links, isIOwsLinks)
    && 'lang' in object.properties
    && 'title' in object.properties
    && 'updated' in object.properties
    && (object.properties.authors ? trueForAll(object.properties.authors, isIOwsAuthor) : true)
    && (object.properties.creator ? isIOwsCreator(object.properties.creator) : true)
    && (object.properties.display ? trueForAll(object.properties.display, isIOwsCreatorDisplay) : true)
    && (object.properties.categories ? trueForAll(object.properties.categories, isIOwsCategory) : true)
    && 'features' in object && trueForAll(object.features, isIOwsResource);
}

export function isIOwsResource(object: any): object is IOwsResource {
  return 'id' in object
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

export function isIOwsCreator(object: any): object is IOwsCreator {
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
