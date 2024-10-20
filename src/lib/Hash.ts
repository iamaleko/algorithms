export default class Hash {
  // By Professor Daniel J. Bernstein
  static DJB(str: string): string {
    let hash = 5381;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 5) + hash + byte & 0xFFFFFFFF; // Faster version of hash * 33 + byte & 0xFFFFFFFF
    }
    return (hash >>> 0).toString(16);
  }

  // By Brian Kernighan and Dennis Ritchie
  static BKDR(str: string): string {
    let hash = 0;
    for (const byte of new TextEncoder().encode(str)) {
      hash = hash * 131 + byte & 0xFFFFFFFF;
    }
    return (hash >>> 0).toString(16);
  }

  // Java String.hashCode()
  static JSHC(str: string): string {
    let hash = 0;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 5) - hash + byte & 0xFFFFFFFF; // Faster version of hash * 31 + byte & 0xFFFFFFFF
    }
    return (hash >>> 0).toString(16);
  }

  // By Glenn Fowler, Landon Curt Noll and Kiem-Phong Vo
  static FNV1(str: string): string {
    let hash = 0x811c9dc5;
    for (const byte of new TextEncoder().encode(str)) {
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24); // Safe version of hash *= 16777619
      hash ^= byte;
    }
    return (hash >>> 0).toString(16);
  }

  // By Donald E. Knuth
  static DEK(str: string): string {
    let hash = str.length;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 5) ^ (hash >> 27) ^ byte; // TODO: Probably theare is a problem here
    }
    return (hash >>> 0).toString(16);
  }

  static SDBM(str: string): string {
    let hash = 0;
    for (const byte of new TextEncoder().encode(str)) {
      hash = byte + (hash << 6) + (hash << 16) - hash & 0xFFFFFFFF;
    }
    return (hash >>> 0).toString(16);
  }

  static ELF(str: string): string {
    let hash = 0, x = 0;
    for (const byte of new TextEncoder().encode(str)) {
      hash = (hash << 4) + byte;
      if (x = hash & 0xF0000000) hash ^= x >> 24;
      hash &= ~x;
    }
    return (hash >>> 0).toString(16);
  }
}