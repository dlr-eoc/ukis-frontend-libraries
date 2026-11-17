import { ReversePipe } from './array-reverse-pipe';

describe('ArrayReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });
});
