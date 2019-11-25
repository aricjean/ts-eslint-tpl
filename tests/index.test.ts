import add from '../src/index';

describe('test add ', () => {
  test('1 + 2 = 3', () => {
    expect(add(1,2)).toBe(3)
  });
  test('2 + 1 = 3', () => {
    expect(add(2,1)).toBe(3)
  });
})