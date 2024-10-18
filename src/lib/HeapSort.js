export default class HeapSort {
  #comparator;

  constructor(comparator = (a, b) => a - b) {
    this.#comparator = comparator
  }

  sort(arr) {
    if (arr.length < 2) return arr;

    for (let i = (arr.length - 2) >>> 1; i > -1; i--) {
      this.#sink(arr, i, arr.length);
    }

    for (let i = arr.length - 1; i; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.#sink(arr, 0, i);
    }

    return arr;
  }

  #sink(arr, i, length) {
    let left, right, target;
    while (true) {
      left = i * 2 + 1,
      right = i * 2 + 2,
      target = i;
      if (left < length && this.#comparator(arr[left], arr[target]) > 0) target = left;
      if (right < length && this.#comparator(arr[right], arr[target]) > 0) target = right;
      if (target === i) break;
      [arr[i], arr[target], i] = [arr[target], arr[i], target];
    }
  }
}