import { Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import createHistory from 'history/createBrowserHistory'
import Header from '../components/Header'
import NotFoundPage from '../components/NotFoundPage'
import ComicListPage from '../components/ComicListPage'

export const history = createHistory()

export const SwitchRoutes = () => (
  <Switch>
    <Route path='/' component={() =>
      ([<Header key='Header' />, <ComicListPage key='ComicListPage' />])
    } exact />
    <Route component={NotFoundPage} />
  </Switch>
)

const AppRouter = () => (
  <Router history={history}>
    <div>
      <SwitchRoutes />
    </div>
  </Router>
)

export default AppRouter
