export class BinarySearchTreeNode<Type = number> {
  left: BinarySearchTreeNode<Type> | null;
  right: BinarySearchTreeNode<Type> | null;
  val: Type;

  constructor(
    val: Type,
    left: BinarySearchTreeNode<Type> | null = null,
    right: BinarySearchTreeNode<Type> | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree<Type = number> {
  protected _root: BinarySearchTreeNode<Type> | null = null;
  protected _length: number = 0;
  private _comparator;

  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    this._comparator = comparator;
  }

  get length(): number {
    return this._length;
  }

  /**
   * Traverse the tree in-order.
   * O(n) complexity.
   */
  *[Symbol.iterator](): Generator {
    yield* this._inorder(this._root);
  }

  /**
   * Traverse the tree pre-order.
   * O(n) complexity.
   */
  *preorder(): Generator {
    yield* this._preorder(this._root);
  }

  /**
   * Traverse the tree in-order.
   * O(n) complexity.
   */
  *inorder(): Generator {
    yield* this._inorder(this._root);
  }

  /**
   * Traverse the tree post-order.
   * O(n) complexity.
   */
  *postorder(): Generator {
    yield* this._postorder(this._root);
  }

  /**
   * Add new nodes in the tree.
   * O(n) complexity for each added node, O(log n) if balanced.
   */
  add(...vals: [Type, ...Type[]]): this {
    for (const val of vals) this._add(val);
    return this;
  }

  /**
   * Delete nodes from the tree.
   * O(n) complexity for each deleted node, O(log n) if balanced.
   */
  delete(...vals: [Type, ...Type[]]): this {
    for (const val of vals) this._delete(val);
    return this;
  }

  /**
   * Retrieve next greater value for specified value.
   * O(n) complexity, O(log n) if balanced.
   */
  successor(val: Type): Type | null {
    return this._successor(val)?.val ?? null;
  }

  /**
   * Retrieve next smaller value for specified value.
   * O(n) complexity, O(log n) if balanced.
   */
  predecessor(val: Type): Type | null {
    return this._predecessor(val)?.val ?? null;
  }

  /**
   * Check existance of specified val in the tree.
   * O(n) complexity, O(log n) if balanced.
   */
  has(val: Type): boolean {
    return this._find(val)[0] !== null;
  }

  /**
   * Reset the tree.
   * O(1) complexity.
   */
  clear(): this {
    this._root = null;
    this._length = 0;
    return this;
  }

  private *_preorder(node: BinarySearchTreeNode<Type> | null): Generator {
    if (node) {
      yield node.val;
      if (node.left) yield* this._preorder(node.left);
      if (node.right) yield* this._preorder(node.right);
    }
  }

  private *_inorder(node: BinarySearchTreeNode<Type> | null): Generator {
    if (node) {
      if (node.left) yield* this._inorder(node.left);
      yield node.val as Type;
      if (node.right) yield* this._inorder(node.right);
    }
  }

  private *_postorder(node: BinarySearchTreeNode<Type> | null): Generator {
    if (node) {
      if (node.left) yield* this._postorder(node.left);
      if (node.right) yield* this._postorder(node.right);
      yield node.val;
    }
  }

  protected _add(val: Type): [BinarySearchTreeNode<Type>, BinarySearchTreeNode<Type> | null] {
    this._length++;
    if (!this._root) {
      return [this._root = new BinarySearchTreeNode<Type>(val), null];
    } else {
      let node = this._root;
      while (true) {
        if (this._comparator(node.val, val) >= 0) {
          if (!node.left) return [node.left = new BinarySearchTreeNode<Type>(val), node];
          node = node.left;
        } else {
          if (!node.right) return [node.right = new BinarySearchTreeNode<Type>(val), node];
          node = node.right;
        }
      }
    }
  }

  protected _delete(val: Type): void {
    let [node, parent] = this._find(val);
    while (node) {
      if (node.left && node.right) {
        let successor = node.right;
        parent = node;
        while (successor?.left) {
          parent = successor;
          successor = successor.left;
        }
        node.val = successor.val;
        node = successor;
        continue;
      } else if (!node.left && !node.right) {
        if (!parent) {
          this._root = null;
        } else if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (node.left) {
        node.val = node.left.val;
        node.right = node.left.right;
        node.left = node.left.left;
      } else if (node.right) {
        node.val = node.right.val;
        node.left = node.right.left;
        node.right = node.right.right;
      }

      this._length--;
      break;
    }
  }

  protected _successor(val: Type): BinarySearchTreeNode<Type> | null {
    let node = this._root,
        successor: BinarySearchTreeNode<Type> | null = null;
    while (node) {
      if (this._comparator(node.val, val) <= 0) {
        node = node.right;
      } else {
        successor = node;
        node = node.left;
      }
    } 
    return successor;
  }

  protected _predecessor(val: Type): BinarySearchTreeNode<Type> | null {
    let node = this._root,
        predecessor: BinarySearchTreeNode<Type> | null = null;
    while (node) {
      if (this._comparator(node.val, val) >= 0) {
        node = node.left;
      } else {
        predecessor = node;
        node = node.right;
      }
    } 
    return predecessor;
  }

  protected _find(val: Type): [BinarySearchTreeNode<Type> | null, BinarySearchTreeNode<Type> | null] {
    let node = this._root,
        parent: BinarySearchTreeNode<Type> | null = null,
        compare: number;
    while (node) {
      compare = this._comparator(node.val, val);
      if (!compare) break;
      parent = node;
      node = compare > 0 ? node.left : node.right;
    }
    return [node, parent];
  }
}