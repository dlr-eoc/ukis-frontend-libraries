import { ParticleRenderer } from './particle-renderer';
import VectorLayer from 'ol/layer/Vector';

describe('ParticleRenderer', () => {
  it('should create an instance', () => {
    expect(new ParticleRenderer(new VectorLayer())).toBeTruthy();
  });
});
