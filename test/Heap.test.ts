import assert from 'assert';
import { Heap } from '@src/index.js';

describe('Heap', () => {
  describe('new Heap()', () => {
    it('#.length should return 0 when heap is empty', () => {
      const minHeap = new Heap();
      assert.strictEqual(minHeap.length, 0);
    });

    it('#.length should return 3 when heap contains 3, 1, 2', () => {
      const minHeap = new Heap();
      minHeap.push(3, 1, 2);
      assert.strictEqual(minHeap.length, 3);
    });

    it('#.peak() should return undefined when heap is empty', () => {
      const minHeap = new Heap();
      assert.strictEqual(minHeap.peak(), undefined);
    });

    it('#.peak() should return 1 when heap contains 3, 1, 2', () => {
      const minHeap = new Heap();
      minHeap.push(3, 1, 2);
      assert.strictEqual(minHeap.peak(), 1);
    });

    it('#.pop() should return undefined when heap is empty', () => {
      const minHeap = new Heap();
      assert.strictEqual(minHeap.pop(), undefined);
    });

    it('#.pop() should return 1 on first invocation when heap contains 3, 1, 2', () => {
      const minHeap = new Heap();
      minHeap.push(3, 1, 2);
      assert.strictEqual(minHeap.pop(), 1);
    });

    it('#.pop() should return 2 on second invocation when heap contains 3, 1, 2', () => {
      const minHeap = new Heap();
      minHeap.push(3, 1, 2).pop();
      assert.strictEqual(minHeap.pop(), 2);
    });

  });
  describe('new Heap((a: number, b: number) => b - a)', () => {
    it('#.length should return 0 when heap is empty', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      assert.strictEqual(maxHeap.length, 0);
    });

    it('#.length should return 3 when heap contains 3, 1, 2', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      maxHeap.push(3, 1, 2);
      assert.strictEqual(maxHeap.length, 3);
    });

    it('#.peak() should return undefined when heap is empty', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      assert.strictEqual(maxHeap.peak(), undefined);
    });

    it('#.peak() should return 3 when heap contains 3, 1, 2', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      maxHeap.push(3, 1, 2);
      assert.strictEqual(maxHeap.peak(), 3);
    });

    it('#.pop() should return undefined when heap is empty', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      assert.strictEqual(maxHeap.pop(), undefined);
    });

    it('#.pop() should return 3 on first invocation when heap contains 3, 1, 2', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      maxHeap.push(3, 1, 2);
      assert.strictEqual(maxHeap.pop(), 3);
    });

    it('#.pop() should return 2 on second invocation when heap contains 3, 1, 2', () => {
      const maxHeap = new Heap((a: number, b: number) => b - a);
      maxHeap.push(3, 1, 2).pop();
      assert.strictEqual(maxHeap.pop(), 2);
    });

  });
})