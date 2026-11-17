import { ItemsFilterPipe, ObjTypePipe } from './obj-type-pipe';

describe('ObjTypePipe', () => {
  it('create an instance', () => {
    const pipe = new ObjTypePipe();
    expect(pipe).toBeTruthy();

    const items = [{ type: 1, name: 'name1' }, { type: 2, name: 'name2' }];
    const types = pipe.transform(items, 1);
    expect(types).toEqual([{ type: 1, name: 'name1' }]);

    const names = pipe.transform(items, 2);
     expect(names).toEqual([{ type: 2, name: 'name2' }]);
  });
});


describe('ItemsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ItemsFilterPipe<{ type: number, name: string }>();
    expect(pipe).toBeTruthy();

    const items = [{ type: 1, name: 'name1' }, { type: 2, name: 'name2' }];
    const types = pipe.transform(items, (v) => {
      return v['type'] === 1;
    });
    expect(types).toEqual([{ type: 1, name: 'name1' }]);
  });
});
