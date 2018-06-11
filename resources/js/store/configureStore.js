import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import cartReducer from '../reducers/cart'
import comicsReducer from '../reducers/comics'
import fetchingReducer from '../reducers/fetching'
import filterReducer from '../reducers/filter'

const includeReduxDevtools = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : undefined
const composeEnhancers = includeReduxDevtools || compose

export default () =>
  createStore(
    combineReducers({
      cart: cartReducer,
      comics: comicsReducer,
      fetching: fetchingReducer,
      filter: filterReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
