const { add } = require('../dist/index.js');

test('add', () => {
  expect(add(1, 2)).toBe(3)
})
