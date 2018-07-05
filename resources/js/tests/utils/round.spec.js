import round from '../../utils/round'

test('Should return number', () => {
  const number = 3
  expect(round(number)).toBe(number)
})

test('Should round number', () => {
  expect(round(3.14444)).toBe(3.14)
})

test('Should round number with decimals', () => {
  expect(round(3.147448456, 3)).toBe(3.147)
})
