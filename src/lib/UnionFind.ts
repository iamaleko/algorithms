export default class UnionFind<Type = number> {
  private _parent: Map<Type, Type>;
  private _size: Map<Type, number>;

  constructor(...nodes: Type[]) {
    this._parent = new Map();
    this._size = new Map();
    this.add(...nodes);
  }

  get length(): number {
    return this._size.size;
  }

  *[Symbol.iterator]() {
    for (const entry of this._size.entries()) {
      yield entry;
    }
  }

  add(...nodes: Type[]): this {
    for (const node of nodes) {
      if (!this._parent.has(node)) {
        this._parent.set(node, node);
        this._size.set(node, 1);
      }
    }
    return this;
  }

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

  find(node: Type): Type | undefined {
    return this._parent.has(node) ? this._compress(node) : undefined;
  }

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