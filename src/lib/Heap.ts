export default class Heap<Type = number> {
  private _comparator;
  private _heap: Type[];

  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    this._comparator = comparator;
    this._heap = [];
  }

  get length(): number {
    return this._heap.length;
  }

  /**
   * Remove first value and return it.
   * O(log n) complexity.
   */
  pop(): Type | null {
    if (this.length > 1) {
      [this._heap[0], this._heap[this.length - 1]] = [this._heap[this.length - 1], this._heap[0]];
      this._sink(0, this.length - 1);
      return this._heap.pop()!;
    }
    return null;
  }

  /**
   * Add new values in the heap.
   * O(log n) complexity for each added value.
   */
  push(...vals: Type[]): Heap<Type> {
    this._heap.push(...vals);
    for (let i = this.length - vals.length; i < this.length; i++) this._bubble(i);
    return this;
  }

  /**
   * Remove first value, return it, and add new value. Faster than #.pop().push() chain.
   * O(log n) complexity.
   */
  poppush(val: Type): Type | null {
    this._heap.push(val);
    if (this.length > 1) {
      [this._heap[0], this._heap[this.length - 1]] = [this._heap[this.length - 1], this._heap[0]];
      this._sink(0, this.length - 1);
      return this._heap.pop()!;
    }
    return null;
  }

  /**
   * Return first value.
   * O(1) complexity.
   */
  peak(): Type | null {
    return this.length ? this._heap[0] : null;
  }

  /**
   * Reset the heap.
   * O(1) complexity.
   */
  clear(): Heap<Type> {
    this._heap = [];
    return this;
  }

  private _bubble(i: number): void {
    let t;
    while (i) {
      t = i - 1 >>> 1;
      if (i === t || this._comparator(this._heap[i], this._heap[t]) >= 0) break;
      [this._heap[i], this._heap[t], i] = [this._heap[t], this._heap[i], t];
    }
  }

  private _sink(i: number = 0, depth: number = this.length): void {
    let l, r, t;
    while (true) {
      l = i * 2 + 1;
      r = i * 2 + 2;
      t = i;
      if (l < depth && this._comparator(this._heap[l], this._heap[t]) < 0) t = l;
      if (r < depth && this._comparator(this._heap[r], this._heap[t]) < 0) t = r;
      if (i === t) break;
      [this._heap[i], this._heap[t], i] = [this._heap[t], this._heap[i], t];
    }
  }
}