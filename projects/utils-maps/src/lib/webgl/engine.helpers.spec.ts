import { displayImageOn, createTextCanvas, canvasToImage, arrayToCanvas } from './engine.helpers';

describe('EngineHelpers', () => {
  it('should have displayImageOn', () => {
    expect(typeof displayImageOn === 'function').toBeTruthy()
  });

  it('should have createTextCanvas', () => {
    expect(typeof createTextCanvas === 'function').toBeTruthy()
  });

  it('should have canvasToImage', () => {
    expect(typeof canvasToImage === 'function').toBeTruthy()
  });

  it('should have arrayToCanvas', () => {
    expect(typeof arrayToCanvas === 'function').toBeTruthy()
  });
});
