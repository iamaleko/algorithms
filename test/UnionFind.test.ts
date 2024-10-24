import assert from 'assert';
import { UnionFind } from '@src/index.js';

describe('UnionFind', () => {
  const ds = new UnionFind(1, 2, 3, 4, 11, 22, 33, 44);
  ds.union(1, 2);
  ds.union(2, 3);
  ds.union(3, 4);
  ds.union(11, 22);
  ds.union(22, 33);
  ds.union(33, 44);

  describe('new UnionFind()', () => {
    it('#.length should return 2 when disjoint sets contain (1, 2, 3, 4), (11, 22, 33, 44)', () => {
      assert.strictEqual(ds.length, 2);
    });

    it('#.find(5) should return null when disjoint sets contain (1, 2, 3, 4), (11, 22, 33, 44)', () => {
      assert.strictEqual(ds.find(5), null);
    });

    it('#.add(5, 55) should return this', () => {
      assert.strictEqual(ds.add(5, 55), ds);
    });

    it('#.length should return 4 when disjoint sets contain (1, 2, 3, 4), (11, 22, 33, 44), (5), (55)', () => {
      assert.strictEqual(ds.length, 4);
    });

    it('#.find(5) should return 5 when disjoint sets contain (1, 2, 3, 4), (11, 22, 33, 44), (5), (55)', () => {
      assert.strictEqual(ds.find(5), 5);
    });

    it('#.union(4, 5) should return 1', () => {
      assert.strictEqual(ds.union(4, 5), 1);
    });

    it('#.union(55, 44) should return 11', () => {
      assert.strictEqual(ds.union(55, 44), 11);
    });

    it('#.find(5) should return 1 when disjoint sets contain (1, 2, 3, 4, 5), (11, 22, 33, 44, 55)', () => {
      assert.strictEqual(ds.find(5), 1);
    });

    it('[...#] should return [[1, 5], [11, 5]] when disjoint sets contain (1, 2, 3, 4, 5), (11, 22, 33, 44, 55)', () => {
      assert.deepStrictEqual([...ds], [[1, 5], [11, 5]]);
    });

    it('Array.from(#) should return [[1, 5], [11, 5]] when disjoint sets contain (1, 2, 3, 4, 5), (11, 22, 33, 44, 55)', () => {
      assert.deepStrictEqual(Array.from(ds), [[1, 5], [11, 5]]);
    });

    it('#.clear() should return this', () => {
      assert.strictEqual(ds.clear(), ds);
    });

    it('#.length should return 0 when disjoint sets are empty', () => {
      assert.strictEqual(ds.length, 0);
    });
  });
})