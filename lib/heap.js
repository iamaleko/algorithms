export default class Heap {
  #comparator;
  #heap;

  constructor(comparator = (a, b) => b - a) {
    this.#comparator = comparator;
    this.#heap = [];
  }

  get length() {
    return this.#heap.length;
  }

  push(node) {
    this.#heap.push(node);
    if (this.length > 1) this.#bubble(this.length - 1);
  }

  pop() {
    if (this.length < 2) return this.#heap.pop();
    const node = this.#heap[0];
    this.#heap[0] = this.#heap.pop();
    this.#sink(0);
    return node;
  }

  peek() {
    return this.#heap[0];
  }

  #bubble(i) {
    let parent;
    while (true) {
      parent = i >>> 1;
      if (i === parent || this.#comparator(this.#heap[i], this.#heap[parent]) <= 0) return;
      [this.#heap[i], this.#heap[parent]] = [this.#heap[parent], this.#heap[i]];
      i = parent;
    }
  }

  #sink(i) {
    let left, right, target;
    while (true) {
      left = (i << 1) + 1,
      right = (i << 1) + 2;
      target = i;
      if (left < this.length && this.#comparator(this.#heap[left], this.#heap[target]) > 0) target = left;
      if (right < this.length && this.#comparator(this.#heap[right], this.#heap[target]) > 0) target = right;
      if (i === target) return;
      [this.#heap[i], this.#heap[target]] = [this.#heap[target], this.#heap[i]];
      i = target;
    }
  }
}