import assert from 'node:assert';
import HeapSort from '../../lib/heap_sort.js';

describe('HeapSort', () => {
  describe('new HeapSort()', () => {
    const asc_sorter = new HeapSort();

    it('#.sort() should return 1,2 for 2,1', () => {
      assert.deepStrictEqual(asc_sorter.sort([2,1]), [1,2]);
    });

    it('#.sort() should return 1,2,3,4,5,6,7,8 for 3,1,2,4,7,5,6,8', () => {
      assert.deepStrictEqual(asc_sorter.sort([3,1,2,4,7,5,6,8]), [1,2,3,4,5,6,7,8]);
    });

    it('#.sort() should return 1,2,3,4,5,6,7,8,9 for 3,1,2,4,7,5,6,9,8', () => {
      assert.deepStrictEqual(asc_sorter.sort([3,1,2,4,7,5,6,9,8]), [1,2,3,4,5,6,7,8,9]);
    });

    it('#.sort() should be empty if input is empty', () => {
      assert.deepStrictEqual(asc_sorter.sort([]), []);
    });

    it('#.sort() should sort in-place and return same array', () => {
      const input = [3,1,2,4,7,5,6,9,8],
            output = asc_sorter.sort(input);
      assert.strictEqual(output, input);
      assert.deepStrictEqual(output, [1,2,3,4,5,6,7,8,9]);
    });
  });
  describe('new HeapSort((a, b) => b - a)', () => {
    const desc_sorter = new HeapSort((a, b) => b - a);

    it('#.sort() should return 2,1 for 1,2', () => {
      assert.deepStrictEqual(desc_sorter.sort([1,2]), [2,1]);
    });

    it('#.sort() should return 8,7,6,5,4,3,2,1 for 3,1,2,4,7,5,6,8', () => {
      assert.deepStrictEqual(desc_sorter.sort([3,1,2,4,7,5,6,8]), [8,7,6,5,4,3,2,1]);
    });

    it('#.sort() should return 9,8,7,6,5,4,3,2,1 for 3,1,2,4,7,5,6,9,8', () => {
      assert.deepStrictEqual(desc_sorter.sort([3,1,2,4,7,5,6,9,8]), [9,8,7,6,5,4,3,2,1]);
    });

    it('#.sort() should be empty if input is empty', () => {
      assert.deepStrictEqual(desc_sorter.sort([]), []);
    });

    it('#.sort() should sort in-place and return same array', () => {
      const input = [3,1,2,4,7,5,6,9,8],
            output = desc_sorter.sort(input);
      assert.strictEqual(output, input);
      assert.deepStrictEqual(output, [9,8,7,6,5,4,3,2,1]);
    });
  });
})