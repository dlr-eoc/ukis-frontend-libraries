# @dlr-eoc/map-three

This module exposes a component `ukis-map-three` analogous to `ukis-map-ol`.

## Motivation and approach
There are a few objects that are very big, but still irregularly shaped.
Because they are big, it makes sense to serve their image-material per WMTS instead of a single, humongous file.
Because they are irregularly shaped, it makes sense to display them in 3d.

Here we use threejs to address those requirements. A threejs scene is being created with orbit-control circling around a singular Mesh.
This mesh makes use of a custom shader, that uses a canvas of a map in EPSG:4326 as a texture. This way, any map in EPSG:4326 can be wrapped around any shape.
The texture-canvas is being kept in sync with the map. As such, when new tiles are loaded on the map, they are immediately visible on the mesh.

## Design
We have attempted to create a design as similar as possible to the existing `ukis-map-ol`.
There is a component `MapThreeComponent` that accepts all relevant parameters as `@Input`.
There is a service `MapThreeService` that handles the actual setup of a threejs-scene and all other interaction with the threejs-API.
We also sync the scene with `MapStateService` so that all maps in the app show the same information.

Contrary to `ukis-map-ol`, however, no `LayerService` or `controls` are expected. Instead, the component expects an `MapOlService` as inputs.
The reason for this difference is that this component does in fact depend on openlayers: the map that is wrapped around our mesh must have been generated somewhere.

### What if I only want to show the 3d-scene?
Create a `ukis-map-ol` anyway, but hide it *behind* `ukis-map-three`. This way, openlayers can still handle all the WMTS loading logic and other complicated map-functionality, while this component continues to focus on 3d-specific problems.

## TODOs
 - avoid those gray areas where no texture is present. Either:
   - make ol-map larger (but make that new padding invisible to the user), 
   - or store a full map extent (in small resolution) in a framebuffer and fall back to it when no texture is available.
 - extend the shader to handle lighting
 - implement a raycaster to handle click-events on the mesh (also returning geographic coordinate of click)
 - handle multi-center objects like 67P/Churyumov–Gerasimenko