import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Router, MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchingReducerDefaultState } from '../../reducers/fetching'
import { filterReducerDefaultState } from '../../reducers/filter'
import AppRouter, { SwitchRoutes } from '../../routers/AppRouter'
import NotFoundPage from '../../components/NotFoundPage'
import ComicListPage from '../../components/ComicListPage'

let SimulateApp
const createMockStore = configureMockStore([thunk])
beforeAll(() => {
  const store = createMockStore({
    comics: [],
    fetching: fetchingReducerDefaultState,
    filter: filterReducerDefaultState
  })

  SimulateApp = () => (
    <Provider store={store}>
      <SwitchRoutes />
    </Provider>
  )
})

test('should AppRouter contains a router', () => {
  const wrapper = mount(<AppRouter />)

  expect(wrapper.find(Router)).toHaveLength(1)
})

test('should render 404 to invalid path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/anything' ]}>
      <SimulateApp />
    </MemoryRouter>
  )

  expect(wrapper.find(NotFoundPage)).toHaveLength(1)
})

test('should render ComicListPage to home path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <SimulateApp />
    </MemoryRouter>
  )

  expect(wrapper.find(ComicListPage)).toHaveLength(1)
})