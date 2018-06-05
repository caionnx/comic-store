import marvelApi from '../api/marvelApi'

export const parseResults = (data) => ({
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

const higherOrderAPIDispatch = (dispatch, params, fn) =>
  marvelApi.getComics(params).then((data) => {
    const { comics, offset, count, total } = parseResults(data)
    dispatch(fn(comics))

    return { offset, count, total }
  })

export const startSetComics = (params) => (dispatch) =>
  higherOrderAPIDispatch(dispatch, params, setComics)

export const startAddComics = (params) => (dispatch) =>
  higherOrderAPIDispatch(dispatch, params, addComics)
