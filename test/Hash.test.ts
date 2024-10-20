import assert from 'assert';
import { Hash } from '@src/index.js';

describe('Hash', () => {
  const str = 'Hello world!';

  it(`#.DJB() should return 'c11f34e2' for '${str}'`, () => {
    assert.strictEqual(Hash.DJB(str), 'c11f34e2');
  });

  it(`#.BKDR() should return '1de4758d' for '${str}'`, () => {
    assert.strictEqual(Hash.BKDR(str), '1de4758d');
  });

  it(`#.JSHC() should return 'fcd7c9fd' for '${str}'`, () => {
    assert.strictEqual(Hash.JSHC(str), 'fcd7c9fd');
  });

  it(`#.FNV1() should return 'e4a426fc' for '${str}'`, () => {
    assert.strictEqual(Hash.FNV1(str), 'e4a426fc');
  });

  it(`#.SDBM() should return '3344547d' for '${str}'`, () => {
    assert.strictEqual(Hash.SDBM(str), '3344547d');
  });

  it(`#.DEK() should return 'ccaeac2e' for '${str}'`, () => {
    assert.strictEqual(Hash.DEK(str), 'ccaeac2e');
  });

  it(`#.ELF() should return '3ba5171' for '${str}'`, () => {
    assert.strictEqual(Hash.ELF(str), '3ba5171');
  });
})