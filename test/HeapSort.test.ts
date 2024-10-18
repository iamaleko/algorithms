import assert from 'assert';
import { HeapSort } from '@src/index.js';

describe('HeapSort', () => {
  describe('new HeapSort((a, b) => a - b)', () => {
    const ascSorter = new HeapSort((a: number, b: number) => a - b);

    it('#.sort() should return 1,2 for 2,1', () => {
      assert.deepStrictEqual(ascSorter.sort([2,1]), [1,2]);
    });

    it('#.sort() should return 1,2,3,4,5,6,7,8 for 3,1,2,4,7,5,6,8', () => {
      assert.deepStrictEqual(ascSorter.sort([3,1,2,4,7,5,6,8]), [1,2,3,4,5,6,7,8]);
    });

    it('#.sort() should return 1,2,3,4,5,6,7,8,9 for 3,1,2,4,7,5,6,9,8', () => {
      assert.deepStrictEqual(ascSorter.sort([3,1,2,4,7,5,6,9,8]), [1,2,3,4,5,6,7,8,9]);
    });

    it('#.sort() should be empty if input is empty', () => {
      assert.deepStrictEqual(ascSorter.sort([]), []);
    });

    it('#.sort() should sort in-place and return same array', () => {
      const input = [3,1,2,4,7,5,6,9,8],
            output = ascSorter.sort(input);
      assert.strictEqual(output, input);
      assert.deepStrictEqual(output, [1,2,3,4,5,6,7,8,9]);
    });
  });
  describe('new HeapSort((a, b) => b - a)', () => {
    const descSorter = new HeapSort((a: number, b: number) => b - a);

    it('#.sort() should return 2,1 for 1,2', () => {
      assert.deepStrictEqual(descSorter.sort([1,2]), [2,1]);
    });

    it('#.sort() should return 8,7,6,5,4,3,2,1 for 3,1,2,4,7,5,6,8', () => {
      assert.deepStrictEqual(descSorter.sort([3,1,2,4,7,5,6,8]), [8,7,6,5,4,3,2,1]);
    });

    it('#.sort() should return 9,8,7,6,5,4,3,2,1 for 3,1,2,4,7,5,6,9,8', () => {
      assert.deepStrictEqual(descSorter.sort([3,1,2,4,7,5,6,9,8]), [9,8,7,6,5,4,3,2,1]);
    });

    it('#.sort() should be empty if input is empty', () => {
      assert.deepStrictEqual(descSorter.sort([]), []);
    });

    it('#.sort() should sort in-place and return same array', () => {
      const input = [3,1,2,4,7,5,6,9,8],
            output = descSorter.sort(input);
      assert.strictEqual(output, input);
      assert.deepStrictEqual(output, [9,8,7,6,5,4,3,2,1]);
    });
  });
})