import assert from 'assert';
import Heap from '../../lib/heap.js';

describe('Heap', () => {
  describe('new Heap()', () => {
    it('#.length should return 0 when heap is empty', () => {
      const min_heap = new Heap();
      assert.equal(min_heap.length, 0);
    });

    it('#.length should return 3 when heap contains 3, 1, 2', () => {
      const min_heap = new Heap();
      min_heap.push(3);
      min_heap.push(1);
      min_heap.push(2);
      assert.equal(min_heap.length, 3);
    });

    it('#.peek() should return undefined when heap is empty', () => {
      const min_heap = new Heap();
      assert.equal(min_heap.peek(), undefined);
    });

    it('#.peek() should return 1 when heap contains 3, 1, 2', () => {
      const min_heap = new Heap();
      min_heap.push(3);
      min_heap.push(1);
      min_heap.push(2);
      assert.equal(min_heap.peek(), 1);
    });

    it('#.pop() should return undefined when heap is empty', () => {
      const min_heap = new Heap();
      assert.equal(min_heap.pop(), undefined);
    });

    it('#.pop() should return 1 on first invocation when heap contains 3, 1, 2', () => {
      const min_heap = new Heap();
      min_heap.push(3);
      min_heap.push(1);
      min_heap.push(2);
      assert.equal(min_heap.pop(), 1);
    });

    it('#.pop() should return 2 on second invocation when heap contains 3, 1, 2', () => {
      const min_heap = new Heap();
      min_heap.push(3);
      min_heap.push(1);
      min_heap.push(2);
      min_heap.pop();
      assert.equal(min_heap.pop(), 2);
    });

  });
  describe('new Heap((a, b) => a - b)', () => {
    it('#.length should return 0 when heap is empty', () => {
      const max_heap = new Heap((a, b) => a - b);
      assert.equal(max_heap.length, 0);
    });

    it('#.length should return 3 when heap contains 3, 1, 2', () => {
      const max_heap = new Heap((a, b) => a - b);
      max_heap.push(3);
      max_heap.push(1);
      max_heap.push(2);
      assert.equal(max_heap.length, 3);
    });

    it('#.peek() should return undefined when heap is empty', () => {
      const max_heap = new Heap();
      assert.equal(max_heap.peek(), undefined);
    });

    it('#.peek() should return 3 when heap contains 3, 1, 2', () => {
      const max_heap = new Heap((a, b) => a - b);
      max_heap.push(3);
      max_heap.push(1);
      max_heap.push(2);
      assert.equal(max_heap.peek(), 3);
    });

    it('#.pop() should return undefined when heap is empty', () => {
      const max_heap = new Heap();
      assert.equal(max_heap.pop(), undefined);
    });

    it('#.pop() should return 3 on first invocation when heap contains 3, 1, 2', () => {
      const max_heap = new Heap((a, b) => a - b);
      max_heap.push(3);
      max_heap.push(1);
      max_heap.push(2);
      assert.equal(max_heap.pop(), 3);
    });

    it('#.pop() should return 2 on second invocation when heap contains 3, 1, 2', () => {
      const max_heap = new Heap((a, b) => a - b);
      max_heap.push(3);
      max_heap.push(1);
      max_heap.push(2);
      max_heap.pop();
      assert.equal(max_heap.pop(), 2);
    });

  });
})