import { HyphenatePipe } from './hyphenate.pipe';

describe('HyphenatePipe', () => {
  it('create an instance', () => {
    const pipe = new HyphenatePipe();
    expect(pipe).toBeTruthy();
  });
});
