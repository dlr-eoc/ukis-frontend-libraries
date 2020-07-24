# @dlr-eoc/utils

This library contains a collection of utilities that do not themselves depend on angular.

## Download

A few utilities that save us some boilerplate for downloading data to a file.
 - downloadJson
 - downloadBlob
 - downloadUrl

## Layout

 - Page: A utility class intended to help with getting the dimensions of a paper

## Ol

Utilities that help in the management of openlayers. 

 - flattenLayers: layers can be arbitrarily nested. This function flattens such a nested collection.

Utilities for copying the images of openlayers' multiple canvases into one, ready to download.
 - mapToSingleCanvas
 - scaledMapToSingleCanvas
 - simpleMapToCanvas

Example usage:
```js
  previewButton.addEventListener('click', () => {
    simpleMapToCanvas(map, previewCanvas, paper.widthPx, paper.heightPx, (updated) => {
        console.log('done');
    });
  });
  downloadButton.addEventListener('click', () => {
     downloadUrl(previewCanvas.toDataURL('image/png'), 'full');
  });
```