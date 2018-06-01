export const setText = (text = '') => ({
  type: 'SET_TEXT',
  text
})

export const setCount = (count) => ({
  type: 'SET_COUNT',
  count
})

export const setTotal = (total) => ({
  type: 'SET_TOTAL',
  total
})

export const setOffset = (offset) => ({
  type: 'SET_OFFSET',
  offset
})
