import assert from 'assert';
import { SplayTree } from '@src/index.js';

describe('SplayTree', () => {
  const tree = new SplayTree();
  describe('new SplayTree()', () => {
    it('#.length should return 0 when tree is empty', () => {
      assert.strictEqual(tree.length, 0);
    });

    it('#.delete(0) should return this', () => {
      assert.strictEqual(tree.delete(0), tree);
    });

    it('#.get(2) should return null when tree is empty', () => {
      assert.strictEqual(tree.get(2), null);
    });

    it('#.add(5,6,4,3,8,2,1,7,0,9) should return this', () => {
      assert.strictEqual(tree.add(5,6,4,3,8,2,1,7,0,9), tree);
    });

    it('#.length should return 10 when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.strictEqual(tree.length, 10);
    });

    it('[...#] should return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.deepStrictEqual([...tree], [0,1,2,3,4,5,6,7,8,9]);
    });

    it('[...#.inorder()] should return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.deepStrictEqual([...tree.inorder()], [0,1,2,3,4,5,6,7,8,9]);
    });

    it('[...#.preorder()] should return [9, 0, 8, 7, 1, 2, 3, 6, 4, 5] when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.deepStrictEqual([...tree.preorder()], [9,0,8,7,1,2,3,6,4,5]);
    });

    it('[...#.postorder()] should return [5, 4, 6, 3, 2, 1, 7, 8, 0, 9] when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.deepStrictEqual([...tree.postorder()], [5,4,6,3,2,1,7,8,0,9]);
    });

    it('#.get(2) should return 2 when tree contains 5, 6, 4, 3, 8, 2, 1, 7, 0, 9', () => {
      assert.strictEqual(tree.get(2), 2);
    });

    it('#.delete(0,2,4,6,8) should return this', () => {
      assert.strictEqual(tree.delete(0,2,4,6,8), tree);
    });

    it('[...#] should return [1, 3, 5, 7, 9] when tree contains 5, 3, 1, 7, 9', () => {
      assert.deepStrictEqual([...tree], [1,3,5,7,9]);
    });

    it('#.get(2) should return null when tree contains 5, 3, 1, 7, 9', () => {
      assert.strictEqual(tree.get(2), null);
    });

    it('#.add(5,5,5) should return this', () => {
      assert.strictEqual(tree.add(5,5,5), tree);
    });

    it('[...#] should return [1, 3, 5, 5, 5, 7, 9] when tree contains 5, 3, 1, 7, 9, 5, 5, 5', () => {
      assert.deepStrictEqual([...tree], [1,3,5,5,5,5,7,9]);
    });

    it('#.successor(5) should return 7 when tree contains 5, 3, 1, 7, 9, 5, 5, 5', () => {
      assert.strictEqual(tree.successor(5), 7);
    });

    it('#.predecessor(5) should return 3 when tree contains 5, 3, 1, 7, 9, 5, 5, 5', () => {
      assert.strictEqual(tree.predecessor(5), 3);
    });

    it('#.successor(9) should return null when tree contains 5, 3, 1, 7, 9, 5, 5, 5', () => {
      assert.strictEqual(tree.successor(9), null);
    });

    it('#.predecessor(1) should return null when tree contains 5, 3, 1, 7, 9, 5, 5, 5', () => {
      assert.strictEqual(tree.predecessor(1), null);
    });
  });
})