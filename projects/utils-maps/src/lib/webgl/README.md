## Webgl Helpers

In some cases, we want to make use of webgl without the overhead of a wrapper-library like threejs.

Examples of use-cases where a webgl-pipeline is useful without a full-fledged 3d-engine:
 - calculating shade based on dtm
 - particle-effects (like e.g. displaying wind by little dots moving along lines)
 - interpolation: doing per-pixel calculations is really only feasible on a gpu.

This directory contains helpers that may be useful in such cases.