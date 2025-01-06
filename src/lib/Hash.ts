export default class Hash {
  private static _UINT32 = 0xFFFFFFFFn;
  
  private static _toString(hash: bigint): string {
    return (hash & this._UINT32).toString(16).padStart(8, '0');
  }

  // By Professor Daniel J. Bernstein
  static DJB(str: string): string {
    let hash = 5381n;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 5n) + hash + BigInt(byte) & this._UINT32; // Faster version of hash * 33 + byte & 0xFFFFFFFF
    }
    return this._toString(hash);
  }

  // By Brian Kernighan and Dennis Ritchie
  static BKDR(str: string): string {
    let hash = 0n;
    for (const byte of new TextEncoder().encode(str)) {
      hash = hash * 131n + BigInt(byte) & this._UINT32;
    }
    return this._toString(hash);
  }

  // Java String.hashCode()
  static JSHC(str: string): string {
    let hash = 0n;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 5n) - hash + BigInt(byte) & this._UINT32; // Faster version of hash * 31 + byte & 0xFFFFFFFF
    }
    return this._toString(hash);
  }

  // By Glenn Fowler, Landon Curt Noll and Kiem-Phong Vo
  static FNV1(str: string): string {
    let hash = 0x811c9dc5n;
    for (const byte of new TextEncoder().encode(str)) {
      hash += (hash << 1n) + (hash << 4n) + (hash << 7n) + (hash << 8n) + (hash << 24n); // Safe version of hash *= 16777619
      hash ^= BigInt(byte);
      hash &= this._UINT32;
    }
    return this._toString(hash);
  }

  // By Donald E. Knuth
  static DEK(str: string): string {
    let hash = BigInt(str.length);
    for (const byte of new TextEncoder().encode(str)) {
      hash = ((hash << 5n) ^ (hash >> 27n) ^ BigInt(byte)) & this._UINT32;
    }
    return this._toString(hash);
  }

  static SDBM(str: string): string {
    let hash = 0n;
    for (const byte of new TextEncoder().encode(str)) {
      hash = BigInt(byte) + (hash << 6n) + (hash << 16n) - hash & this._UINT32;
    }
    return this._toString(hash);
  }

  static ELF(str: string): string {
    let hash = 0, x = 0;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 4) + byte;
      if (x = hash & 0xF0000000) {
        hash ^= x >> 24;
        hash &= ~x;
      }
    }
    return this._toString(BigInt(hash));
  }
}
