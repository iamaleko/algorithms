export default class Heap<Type> {
  private _comparator: (a: Type, b: Type) => number;
  private _heap: Type[];

  constructor(comparator: (a: Type, b: Type) => number) {
    this._comparator = comparator;
    this._heap = [];
  }

  // O(1)
  get length() {
    return this._heap.length;
  }

  // O(Log n)
  pop(): Type | undefined {
    if (this.length > 1) {
      [this._heap[0], this._heap[this.length - 1]] = [this._heap[this.length - 1], this._heap[0]];
      this._sink(0, this.length - 1);
    }
    return this._heap.pop();
  }

  // O(n Log n)
  push(...args: Type[]): Heap<Type> {
    this._heap.push(...args);
    for (let i = this.length - args.length; i < this.length; i++) this._bubble(i);
    return this;
  }

  // O(Log n)
  poppush(newNode: Type): Type | undefined {
    const oldNode = this._heap[0];
    this._heap[0] = newNode;
    if (this.length > 1) this._sink();
    return oldNode;
  }

  // O(1)
  peak(): Type | undefined {
    return this._heap[0];
  }

  // O(1)
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