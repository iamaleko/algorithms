class DequeNode<Type> {
  prev?: DequeNode<Type>;
  next?: DequeNode<Type>;
  val: Type;

  constructor(val: Type, prev?: DequeNode<Type>, next?: DequeNode<Type>) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

export default class Deque<Type = number> {
  private _head?: DequeNode<Type>;
  private _tail?: DequeNode<Type>;
  private _length: number;

  constructor() {
    this._length = 0;
  }

  *[Symbol.iterator] () {
    let node = this._head;
    while (node) {
      yield node.val;
      node = node.next;
    }
  }

  // O(1)
  get length() {
    return this._length;
  }

  // O(1)
  get head(): Type | undefined {
    return this._head?.val;
  }

  // O(1)
  get tail(): Type | undefined {
    return this._tail?.val;
  }

  // O(1)
  shift(): Type | undefined {
    let node = this._head;
    if (node) {
      this._length--;
      if (node.next) node.next.prev = undefined;
      if (node === this._tail) this._tail = undefined;
      this._head = node.next;
      return node.val;
    }
  }

  // O(args.length)
  unshift(...args: [Type, ...Type[]]): this {
    for (const val of args.reverse()) {
      this._length++;
      this._head = new DequeNode<Type>(val, undefined, this._head);
      if (this._head.next) this._head.next.prev = this._head;
      if (!this._tail) this._tail = this._head;
    }
    return this;
  }

  // O(1)
  pop(): Type | undefined {
    let node = this._tail;
    if (node) {
      this._length--;
      if (node.prev) node.prev.next = undefined;
      if (node === this._head) this._head = undefined;
      this._tail = node.prev;
      return node.val;
    }
  }

  // O(args.length)
  push(...args: [Type, ...Type[]]): this {
    for (const val of args) {
      this._length++;
      this._tail = new DequeNode<Type>(val, this._tail);
      if (this._tail.prev) this._tail.prev.next = this._tail;
      if (!this._head) this._head = this._tail;
    }
    return this;
  }

  // O(1)
  clear(): this {
    this._head = undefined;
    this._tail = undefined;
    this._length = 0;
    return this;
  }

  // O(deque.length)
  reverse(): this {
    let node = this._head;
    while (node) [node.next, node.prev, node] = [node.prev, node.next, node.next];
    [this._head, this._tail] = [this._tail, this._head];
    return this;
  }

  // O(deque.length)
  remove(val: Type): boolean {
    let node = this._head;
    while (node) {
      if (node.val === val) {
        if (node === this._head) this._head = node.next;
        if (node === this._tail) this._tail = node.prev;
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        this._length--;
        return true;
      }
      node = node.next;
    }
    return false;
  }

  // O(deque.length)
  insert(val: Type, ancestorVal: Type): boolean {
    let ancestorNode = this._head;
    while (ancestorNode) {
      if (ancestorNode.val === ancestorVal) {
        const successorNode = new DequeNode<Type>(val, ancestorNode, ancestorNode.next);
        ancestorNode.next = successorNode;
        if (successorNode.next) successorNode.next.prev = successorNode;
        if (ancestorNode === this._tail) this._tail = successorNode;
        this._length++;
        return true;
      }
      ancestorNode = ancestorNode.next;
    }
    return false;
  }

  // O(deque.length)
  index(val: Type, start: number = 0, end: number = this.length): number {
    let node = this._head,
        index = 0;
    while (node) {
      if (index >= end) break;
      if (index >= start && node.val === val) return index;
      index++;
      node = node.next;
    }
    return -1;
  }

  // O(steps)
  rotate(steps: number = 1): this {
    if (this.length > 1) {
      steps %= this.length;
      if (steps < 0) {
        while (steps++) this.push(this.shift() as Type);
      } else {
        while (steps--) this.unshift(this.pop() as Type);
      }
    }
    return this;
  }
}