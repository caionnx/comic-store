import marvelApi from '../api/marvelApi'

const parseResults = (data) => ({
  comics: data.results,
  offset: parseInt(data.offset, 10),
  count: parseInt(data.count, 10),
  total: parseInt(data.total, 10)
})

export const setComics = (comics) => ({
  type: 'SET_COMICS',
  comics
})

export const addComics = (comics) => ({
  type: 'ADD_COMICS',
  comics
})

export const startSetComics = (params) => (dispatch) => {
  return marvelApi.getComics(params).then((data) => {
    const { comics, offset, count, total } = parseResults(data)
    dispatch(setComics(comics))

    return { offset, count, total }
  })
}

export const startAddComics = (params) => (dispatch) => {
  return marvelApi.getComics(params).then((data) => {
    const { comics, offset, count, total } = parseResults(data)
    dispatch(addComics(comics))

    return { offset, count, total }
  })
}
