import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import expensesReducer from '../reducers/expenses'
import filterReducer from '../reducers/filter'
import comicsReducer from '../reducers/comics'

const includeReduxDevtools = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : undefined
const composeEnhancers = includeReduxDevtools || compose

export default () =>
  createStore(
    combineReducers({
      // expenses: expensesReducer,
      filter: filterReducer,
      comics: comicsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
