import { default as BinarySearchTree, BinarySearchTreeNode } from "@lib/BinarySearchTree";

export class SplayTreeNode<Type = number> extends BinarySearchTreeNode<Type> {
  parent: SplayTreeNode<Type> | null;

  constructor(
    val: Type,
    left: SplayTreeNode<Type> | null = null,
    right: SplayTreeNode<Type> | null = null,
    parent: SplayTreeNode<Type> | null = null,
  ) {
    super(val, left, right);
    this.parent = parent;
  }
}

export default class SplayTree<Type = number> extends BinarySearchTree<Type> {
  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    super(comparator);
  }

  /**
   * Add new nodes in the tree.
   * O(log n) complexity for each added node.
   */
  add(...vals: [Type, ...Type[]]): this {
    for (const val of vals) {
      const [node, parent] = this._add(val) as [SplayTreeNode<Type>,  SplayTreeNode<Type> | null];
      node.parent = parent;
      this._splay(node);
    }
    return this;
  }

  /**
   * Retrieve next greater value for specified value.
   * O(log n) complexity.
   */
  successor(val: Type): Type | null {
    const node = this._successor(val) as SplayTreeNode<Type>;
    if (node) this._splay(node);
    return node?.val ?? null;
  }

  /**
   * Retrieve next smaller value for specified value.
   * O(log n) complexity.
   */
  predecessor(val: Type): Type | null {
    const node = this._predecessor(val) as SplayTreeNode<Type>;
    if (node) this._splay(node);
    return node?.val ?? null;
  }

  /**
   * Check existance of specified val in the tree.
   * O(log n) complexity.
   */
  has(val: Type): boolean {
    const [node] = this._find(val) as [SplayTreeNode<Type> | null, SplayTreeNode<Type> | null];
    if (node) this._splay(node);
    return node !== null;
  }

  protected _delete(val: Type): void {
    let [node] = this._find(val) as [SplayTreeNode<Type> | null, SplayTreeNode<Type> | null];
    while (node) {
      if (node.left && node.right) {
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.val = successor.val;
        node = successor as SplayTreeNode<Type>;
        continue;
      } else if (!node.left && !node.right) {
        if (!node.parent) {
          this._root = null;
        } else if (node.parent.left === node) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      } else if (node.left) {
        node.val = node.left.val;
        node.right = node.left.right;
        node.left = node.left.left;
        if (node.right) (node.right as SplayTreeNode<Type>).parent = node;
        if (node.left) (node.left as SplayTreeNode<Type>).parent = node;
      } else if (node.right) {
        node.val = node.right.val;
        node.left = node.right.left;
        node.right = node.right.right;
        if (node.left) (node.left as SplayTreeNode<Type>).parent = node;
        if (node.right) (node.right as SplayTreeNode<Type>).parent = node;
      }

      this._length--;
      break;
    }
  }

  private _transplant(node: SplayTreeNode<Type>, child: SplayTreeNode<Type>): void {
    if (!node.parent) {
      this._root = child;
    } else if (node === node.parent.left) { 
      node.parent.left = child;
    } else if (node === node.parent.right) {
      node.parent.right = child;
    }
    child.parent = node.parent;
  }

  private _rotateRight(node: SplayTreeNode<Type>): void {
    const left = node.left as SplayTreeNode<Type>;
    node.left = left.right ?? null;
    if (left.right) (left.right as SplayTreeNode<Type>).parent = node;
    this._transplant(node, left);
    left.right = node;
    node.parent = left;
  }

  private _rotateLeft(node: SplayTreeNode<Type>): void {
    const right = node.right as SplayTreeNode<Type>;
    node.right = right.left ?? null;
    if (right.left) (right.left as SplayTreeNode<Type>).parent = node;
    this._transplant(node, right);
    right.left = node;
    node.parent = right;
  }

  private _splay(node: SplayTreeNode<Type>): void {
    while (node.parent) {
      if (node.parent.right === node) {
        if (!node.parent.parent) {
          // Zig left
          this._rotateLeft(node.parent)
        } else if (node.parent.parent.right === node.parent) {
          // Zig-Zig left
          this._rotateLeft(node.parent.parent);
          this._rotateLeft(node.parent);
        } else {
          // Zig-Zag left
          this._rotateLeft(node.parent);
          this._rotateRight(node.parent);
        }
      } else {
        if (!node.parent.parent) {
          // Zig right
          this._rotateRight(node.parent)
        } else if (node.parent.parent.left === node.parent) {
          // Zig-Zig right
          this._rotateRight(node.parent.parent);
          this._rotateRight(node.parent);
        } else {
          // Zig-Zag right
          this._rotateRight(node.parent);
          this._rotateLeft(node.parent);
        }
      }
    }
  }
}