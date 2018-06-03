export const setText = (text = '') => ({
  type: 'SET_TEXT',
  text
})

export const setSearchParams = (params) => ({
  type: 'SET_SEARCH_PARAMS',
  params
})
