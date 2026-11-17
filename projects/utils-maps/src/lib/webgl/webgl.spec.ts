import { compileShader } from './webgl';

describe('Webgl', () => {
  it('should have compileShader', () => {
    expect(typeof compileShader === 'function').toBeTruthy();
  });
});
