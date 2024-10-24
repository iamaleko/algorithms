class DequeNode<Type> {
  prev: DequeNode<Type> | null;
  next: DequeNode<Type> | null;
  val: Type;

  constructor(
    val: Type,
    prev: DequeNode<Type> | null = null,
    next: DequeNode<Type> | null = null,
  ) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

export default class Deque<Type = number> {
  private _head: DequeNode<Type> | null = null;
  private _tail: DequeNode<Type> | null = null;
  private _length: number = 0;

  *[Symbol.iterator] () {
    let node = this._head;
    while (node) {
      yield node.val;
      node = node.next;
    }
  }

  get length(): number {
    return this._length;
  }

  get head(): Type | null {
    return this._head ? this._head.val : null;
  }

  get tail(): Type | null {
    return this._tail ? this._tail.val : null;
  }

  /**
   * Remove first node and return it's value.
   * O(1) complexity.
   */
  shift(): Type | null {
    let node = this._head;
    if (!node) return null;
    this._length--;
    if (node.next) node.next.prev = null;
    if (node === this._tail) this._tail = null;
    this._head = node.next;
    return node.val;
  }

  /**
   * Add new nodes at the beginning of the queue.
   * O(1) complexity for each added node.
   */
  unshift(...vals: [Type, ...Type[]]): this {
    for (const val of vals.reverse()) {
      this._length++;
      this._head = new DequeNode<Type>(val, null, this._head);
      if (this._head.next) this._head.next.prev = this._head;
      if (!this._tail) this._tail = this._head;
    }
    return this;
  }

  /**
   * Remove last node and return it's value.
   * O(1) complexity.
   */
  pop(): Type | null {
    let node = this._tail;
    if (!node) return null;
    this._length--;
    if (node.prev) node.prev.next = null;
    if (node === this._head) this._head = null;
    this._tail = node.prev;
    return node.val;
  }

  /**
   * Add new nodes at the end of the queue.
   * O(1) complexity for each added node.
   */
  push(...vals: [Type, ...Type[]]): this {
    for (const val of vals) {
      this._length++;
      this._tail = new DequeNode<Type>(val, this._tail);
      if (this._tail.prev) this._tail.prev.next = this._tail;
      if (!this._head) this._head = this._tail;
    }
    return this;
  }

  /**
   * Reset the queue.
   * O(1) complexity.
   */
  clear(): this {
    this._head = null;
    this._tail = null;
    this._length = 0;
    return this;
  }

  /**
   * Reverse the queue.
   * O(n) complexity.
   */
  reverse(): this {
    let node = this._head;
    while (node) [node.next, node.prev, node] = [node.prev, node.next, node.next];
    [this._head, this._tail] = [this._tail, this._head];
    return this;
  }

  /**
   * Delete node from the queue.
   * O(n) complexity.
   */
  delete(val: Type): boolean {
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

  /**
   * Insert new node in the queue after node with specified value.
   * O(n) complexity.
   */
  insert(val: Type, predecessor: Type): boolean {
    let node = this._head;
    while (node) {node
      if (node.val === predecessor) {
        node.next = new DequeNode<Type>(val, node, node.next);
        if (node.next.next) node.next.next.prev = node.next;
        if (node === this._tail) this._tail = node.next;
        this._length++;
        return true;
      }
      node = node.next;
    }
    return false;
  }

  /**
   * Return queue index of node with specified value.
   * O(n) complexity.
   */
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

  /**
   * Rotate queue by n steps forward, or -n backward.
   * O(n) complexity.
   */
  rotate(n: number = 1): this {
    if (this.length > 1) {
      n %= this.length;
      if (n < 0) {
        while (n++) this.push(this.shift() as Type);
      } else {
        while (n--) this.unshift(this.pop() as Type);
      }
    }
    return this;
  }
}