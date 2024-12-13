export default class MergeSort<Type = number> {
  private _comparator;

  constructor(comparator: (a: Type, b: Type) => number = (a: Type, b: Type) => Number(a) - Number(b)) {
    this._comparator = comparator;
  }

  /**
   * O(n log n) complexity.
   */
  sort(arr: Type[]): Type[] {
    this._sort(arr, 0, arr.length);
    return arr;
  }

  _sort(arr: Type[], l: number, r: number): void {
    if (r - l === 2) {
      if (this._comparator(arr[l], arr[r - 1]) > 0) [arr[r - 1], arr[l]] = [arr[l], arr[r - 1]];
    } else if (r - l > 2) {
      let i = l + r >> 1, j = 0;
      this._sort(arr, l, i);
      this._sort(arr, i, r);
      const tmp = arr.slice(l, i);
      while (j < tmp.length) {
        while (i < r && this._comparator(tmp[j], arr[i]) > 0) arr[l++] = arr[i++];
        arr[l++] = tmp[j++];
      }
    }
  }
}