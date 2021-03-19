# Custom renderers

Since openlayers 6, maps have been broken into multiple canvases (one per layer).
The programmer has complete control over how image-data is placed in a layer's canvas.
To facilitate this new-won freedom, openlayers allows us to create our own custom renderers.

A renderer is in principle very simple. It needs to do four things:
 1. provide a canvas
 2. implement the method `prepareFrame(frameState: FrameState): boolean` <-- does preliminary work to set up map for rendering
 3. implement the method `renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement` <-- actual changes to the output-element
 4. (only if your layer's class, like `VectorLayer`, does have a `getDeclutter` field:) implement the method `renderDeclutter(frameState: FrameState): void` <-- Decluttering is the trimming of some of the rendered features when too many of them overlap. Done for the sake of clarity.

The renderers in this directory serve as an illustration of the wide range of things we can 
do with this very general model. 

 1. `minimal_renderer` contains an absolute minimal example of what is required to create a custom renderer
 2. `dtm_renderer` illustrates how WebGL can make use of normal-maps 
 3. `particle_renderer` procedurally generates little white particles that move along a force-field (that the user may change at any point)
 4. `interpolation_renderer` does an inverse distance interpolation between a set of data-points on a per-pixel basis.