import { Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import createHistory from 'history/createBrowserHistory'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFoundPage from '../components/NotFoundPage'
import ComicListPage from '../components/ComicListPage'
import ComicCartPage from '../components/ComicCartPage'
import { NotificationContainer } from '../components/NotificationContainer'

export const history = createHistory()

const defaultView = (renderedComponent) => ([
  <Header key='Header' />,
  renderedComponent,
  <Footer />,
  <NotificationContainer key='NotificationContainer' />
])

export const SwitchRoutes = () => (
  <Switch>
    <Route path='/' component={() =>
      defaultView(<ComicListPage key='ComicListPage' />)
    } exact />
    <Route path='/cart' component={() =>
      defaultView(<ComicCartPage key='ComicCartPage' />)
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
