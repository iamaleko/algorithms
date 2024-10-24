export default class UnionFind<Type = number> {
  private _parent: Map<Type, Type>;
  private _size: Map<Type, number>;

  constructor(...nodes: Type[]) {
    this._parent = new Map();
    this._size = new Map();
    if (nodes.length) this.add(...nodes as [Type, ...Type[]]);
  }

  get length(): number {
    return this._size.size;
  }

  *[Symbol.iterator]() {
    yield* this._size[Symbol.iterator]();
  }

  /**
   * Add new nodes in the disjoint sets collection.
   * O(log n) complexity for each added node.
   */
  add(...nodes: [Type, ...Type[]]): this {
    for (const node of nodes) {
      if (!this._parent.has(node)) {
        this._parent.set(node, node);
        this._size.set(node, 1);
      }
    }
    return this;
  }

  /**
   * Connect two nodes in the disjoint sets collection.
   * O(log n) complexity.
   */
  union(nodeA: Type, nodeB: Type): Type {
    this.add(nodeA, nodeB);
    nodeA = this._compress(nodeA);
    nodeB = this._compress(nodeB);
    const sizeA = this._size.get(nodeA) as number,
          sizeB = this._size.get(nodeB) as number;
    if (sizeA < sizeB) [nodeA, nodeB] = [nodeB, nodeA];
    this._parent.set(nodeB, nodeA);
    this._size.set(nodeA, sizeA + sizeB);
    this._size.delete(nodeB);
    return nodeA;
  }

  /**
   * Return root node from disjoint set, containing specified node.
   * O(log n) complexity.
   */
  find(node: Type): Type | null {
    return this._parent.has(node) ? this._compress(node) : null;
  }

  /**
   * Reset the disjoint sets collection.
   * O(1) complexity.
   */
  clear(): this {
    this._parent.clear();
    this._size.clear();
    return this;
  }

  private _compress(node: Type): Type {
    let parent: Type;
    while (node !== (parent = this._parent.get(node)!)) {
      // path splitting, every parent pointer updated
      this._parent.set(node, this._parent.get(parent)!);
      node = parent;
    }
    return node;
  }
}