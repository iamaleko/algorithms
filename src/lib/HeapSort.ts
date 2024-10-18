export default class HeapSort<Type = number> {
  private _comparator;

  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    this._comparator = comparator;
  }

  // O(n Log n)
  sort(arr: Type[]): Type[] {
    if (arr.length > 1) {
      for (let i = arr.length - 2 >>> 1; i >= 0; i--) {
        this._sink(arr, i, arr.length);
      }

      for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        this._sink(arr, 0, i);
      }
    }

    return arr;
  }

  private _sink(arr: Type[], i: number, depth: number): void {
    let l, r, t;
    while (true) {
      l = i * 2 + 1;
      r = i * 2 + 2;
      t = i;
      if (l < depth && this._comparator(arr[l], arr[t]) > 0) t = l;
      if (r < depth && this._comparator(arr[r], arr[t]) > 0) t = r;
      if (t === i) break;
      [arr[i], arr[t], i] = [arr[t], arr[i], t];
    }
  }
}