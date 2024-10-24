export class BinarySearchTreeNode<Type> {
  left?: BinarySearchTreeNode<Type>;
  right?: BinarySearchTreeNode<Type>;
  val: Type;

  constructor(val: Type, left?: BinarySearchTreeNode<Type>, right?: BinarySearchTreeNode<Type>) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree<Type = number> {
  private _root?: BinarySearchTreeNode<Type>;
  private _length: number;
  private _comparator;

  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    this._length = 0;
    this._comparator = comparator;
  }

  *[Symbol.iterator](): Generator {
    yield* this.inorder();
  }

  private *_preorder(node: BinarySearchTreeNode<Type>): Generator {
    yield node.val;
    if (node.left) yield* this._preorder(node.left);
    if (node.right) yield* this._preorder(node.right);
  }

  *preorder(): Generator {
    if (this._root) yield *this._preorder(this._root);
  }

  private *_inorder(node: BinarySearchTreeNode<Type>): Generator {
    if (node.left) yield* this._inorder(node.left);
    yield node.val as Type;
    if (node.right) yield* this._inorder(node.right);
  }

  *inorder(): Generator {
    if (this._root) yield *this._inorder(this._root);
  }

  private *_postorder(node: BinarySearchTreeNode<Type>): Generator {
    if (node.left) yield* this._postorder(node.left);
    if (node.right) yield* this._postorder(node.right);
    yield node.val;
  }

  *postorder(): Generator {
    if (this._root) yield *this._postorder(this._root);
  }

  get length() {
    return this._length;
  }

  successor(val: Type): Type | undefined {
    let curr = this._root,
        successor = undefined;
    while (curr) {
      if (this._comparator(curr.val, val) <= 0) {
        curr = curr.right;
      } else {
        successor = curr;
        curr = curr.left;
      }
    } 
    return successor?.val;
  }

  predecessor(val: Type): Type | undefined {
    let curr = this._root,
        predecessor = undefined;
    while (curr) {
      if (this._comparator(curr.val, val) >= 0) {
        curr = curr.left;
      } else {
        predecessor = curr;
        curr = curr.right;
      }
    } 
    return predecessor?.val;
  }

  has(val: Type): boolean {
    return !!this._find(val);
  }

  clear(): this {
    this._root = undefined;
    this._length = 0;
    return this;
  }

  private _find(val: Type): [BinarySearchTreeNode<Type> | undefined, BinarySearchTreeNode<Type> | undefined] {
    let curr = this._root,
        parent: BinarySearchTreeNode<Type> | undefined = undefined,
        compare: number;
    while (curr) {
      compare = this._comparator(curr.val, val);
      if (compare === 0) return [curr, parent];
      parent = curr;
      curr = compare > 0 ? curr.left : curr.right;
    }
    return [undefined, undefined];
  }

  private _add(node: BinarySearchTreeNode<Type>): void {
    this._length++;
    if (this._root) {
      let curr = this._root;
      while (true) {
        if (this._comparator(curr.val, node.val) >= 0) {
          if (!curr.left) {
            curr.left = node;
            break;
          }
          curr = curr.left;
        } else {
          if (!curr.right) {
            curr.right = node;
            break;
          }
          curr = curr.right;
        }
      }
    } else {
      this._root = node;
    }
  }

  private _delete(node: BinarySearchTreeNode<Type>, parent: BinarySearchTreeNode<Type> | undefined): void {
    if (!node.left && !node.right) {
      // no children, simply remove
      if (!parent) {
        this._root = undefined;
      } else if (parent.left === node) {
        parent.left = undefined;
      } else {
        parent.right = undefined;
      }
    } else if (!node.right) {
      // no right child, replace with left child
      node.val = node.left!.val;
      node.right = node.left!.right;
      node.left = node.left!.left;
    } else if (!node.left) {
      // no left child, replace with right child
      node.val = node.right.val;
      node.left = node.right.left;
      node.right = node.right.right;
    } else {
      // both children, replace with successor and remove it
      let successor = node.right, parent = node;
      while (successor?.left) {
        parent = successor;
        successor = successor.left;
      }
      node.val = successor.val;
      return this._delete(successor, parent);
    }
    this._length--;
  }

  add(...vals: [Type, ...Type[]]): this {
    for (const val of vals) this._add(new BinarySearchTreeNode<Type>(val));
    return this;
  }

  delete(...vals: [Type, ...Type[]]): this {
    for (const val of vals) {
      const [node, parent] = this._find(val);
      if (node) this._delete(node, parent);
    }
    return this;
  }
}