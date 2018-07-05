import limitCharacters from '../../utils/limitCharacters'

test('Should limit long sentence', () => {
  const sentence = 'Lorem Ipsum, ipsum, lorem'
  expect(limitCharacters(sentence, 5)).toBe('Lorem...')
})

test('Should not limit long sentence if not has necessary length', () => {
  const sentence = 'Lorem Ipsum, ipsum, lorem'
  expect(limitCharacters(sentence, 105)).toBe(sentence)
})
