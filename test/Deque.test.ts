import assert from 'assert';
import { Deque } from '@src/index.js';

describe('Deque', () => {
  const deque = new Deque();
  describe('new Deque()', () => {
    it('#.shift() should return undefined when deque is empty', () => {
      assert.strictEqual(deque.shift(), undefined);
    });

    it('#.pop() should return undefined when deque is empty', () => {
      assert.strictEqual(deque.pop(), undefined);
    });

    it('#.length should return 0 when deque is empty', () => {
      assert.strictEqual(deque.length, 0);
    });

    it('#.push(3, 4, 5) should return this', () => {
      assert.strictEqual(deque.push(3, 4, 5), deque);
    });

    it('#.unshift(0, 1, 2) should return this', () => {
      assert.strictEqual(deque.unshift(0, 1, 2), deque);
    });

    it('#.length should return 6 when deque contains 0, 1, 2, 3, 4, 5', () => {
      assert.strictEqual(deque.length, 6);
    });

    it('#.head should return 0 when deque contains 0, 1, 2, 3, 4, 5', () => {
      assert.strictEqual(deque.head, 0);
    });

    it('#.tail should return 5 when deque contains 0, 1, 2, 3, 4, 5', () => {
      assert.strictEqual(deque.tail, 5);
    });

    it('#.shift() should return 0 when deque contains 0, 1, 2, 3, 4, 5', () => {
      assert.strictEqual(deque.shift(), 0);
    });

    it('#.pop() should return 5 when deque contains 1, 2, 3, 4, 5', () => {
      assert.strictEqual(deque.pop(), 5);
    });

    it('#.length should return 4 when deque contains 1, 2, 3, 4', () => {
      assert.strictEqual(deque.length, 4);
    });

    it('#.remove(2) should return true when deque contains 1, 2, 3, 4', () => {
      assert.strictEqual(deque.remove(2), true);
    });

    it('#.remove(2) should return false when deque contains 1, 3, 4', () => {
      assert.strictEqual(deque.remove(2), false);
    });

    it('#.insert(22, 1) should return true when deque contains 1, 3, 4', () => {
      assert.strictEqual(deque.insert(22, 1), true);
    });

    it('#.insert(11, 0) should return false when deque contains 1, 22, 3, 4', () => {
      assert.strictEqual(deque.insert(11, 0), false);
    });

    it('#.rotate() should return this', () => {
      assert.strictEqual(deque.rotate(), deque);
    });

    it('#.head should return 4 when deque contains 4, 1, 22, 3', () => {
      assert.strictEqual(deque.head, 4);
    });

    it('#.rotate(-2) should return this', () => {
      assert.strictEqual(deque.rotate(-2), deque);
    });

    it('#.head should return 4 when deque contains 22, 3, 4, 1', () => {
      assert.strictEqual(deque.head, 22);
    });

    it('#.index(4) should return 2 when deque contains 22, 3, 4, 1', () => {
      assert.strictEqual(deque.index(4), 2);
    });

    it('#.index(4, 0, 2) should return -1 when deque contains 22, 3, 4, 1', () => {
      assert.strictEqual(deque.index(4, 0, 2), -1);
    });

    it('#.index(0) should return -1 when deque contains 22, 3, 4, 1', () => {
      assert.strictEqual(deque.index(0), -1);
    });

    it('#.clear() should return this', () => {
      assert.strictEqual(deque.clear(), deque);
    });

    it('#.length should return 0 when deque is empty', () => {
      assert.strictEqual(deque.length, 0);
    });
  });
})