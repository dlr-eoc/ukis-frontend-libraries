import { triangleA, triangleE, rectangleA, rectangleE  } from './engine.shapes';

describe('EngineShapes', () => {
  it('should have triangleA', () => {
    expect(typeof triangleA === 'function').toBeTruthy();
  });

  it('should have triangleE', () => {
    expect(typeof triangleE === 'function').toBeTruthy();
  });

  it('should have rectangleA', () => {
    expect(typeof rectangleA === 'function').toBeTruthy();
  });

  it('should have rectangleE', () => {
    expect(typeof rectangleE === 'function').toBeTruthy();
  });
});
