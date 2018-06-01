import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import filterReducer from '../reducers/filter'
import comicsReducer from '../reducers/comics'
import fetchingReducer from '../reducers/fetching'

const includeReduxDevtools = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : undefined
const composeEnhancers = includeReduxDevtools || compose

export default () =>
  createStore(
    combineReducers({
      filter: filterReducer,
      comics: comicsReducer,
      fetching: fetchingReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
