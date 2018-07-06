import React from 'react'
import { shallow } from 'enzyme'
import { ComicListLoadButton } from '../../components/ComicListLoadButton'
import { fetchingReducerDefaultState } from '../../reducers/fetching'
import { filterReducerDefaultState } from '../../reducers/filter'

let componentProps
let wrapper
let propsToLoadMore
const fakeEv = { preventDefault: jest.fn() }
const promiseResolvedData = { offset: 20, count: 20, total: 888 }
const fakeContainer = document.createElement('div')
fakeContainer.innerHTML = `<input value="avengers" type="text" id="title-input" />`

beforeEach(() => {
  componentProps = {
    setSearchParams: jest.fn(),
    startAddComics: jest.fn(() => Promise.resolve(promiseResolvedData)),
    toggleFetchingParcial: jest.fn(),
    fetching: fetchingReducerDefaultState,
    filter: filterReducerDefaultState
  }
  propsToLoadMore = {
    filter: {
      ...componentProps.filter,
      searchParams: {
        ...componentProps.filter.searchParams,
        total: 20
      }
    }
  }

  wrapper = shallow(<ComicListLoadButton {...componentProps} />)
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should render button to load more if has not reached total', () => {
  wrapper.setProps(propsToLoadMore)
  const button = wrapper.find('#load-more-button')
  const Loading = wrapper.find('Loading')

  expect(button).toHaveLength(1)
  expect(Loading).toHaveLength(0)
})

test('Should have loading component if is fetching parcial', () => {
  wrapper.setProps({ fetching: { ...componentProps.fetching, parcial: true } })
  const Loading = wrapper.find('Loading')

  expect(Loading).toHaveLength(1)
})

test('Should call functions when button was clicked', (done) => {
  wrapper.setProps(propsToLoadMore)
  wrapper.find('#load-more-button').simulate('click', fakeEv)
  const { minimal, searchParams } = componentProps.filter

  expect(componentProps.toggleFetchingParcial).toHaveBeenCalled()
  expect(componentProps.startAddComics).toHaveBeenCalledWith({
    ...minimal,
    offset: searchParams.offset + searchParams.limit
  })
  setImmediate(() => {
    expect(componentProps.setSearchParams).toHaveBeenCalledWith({ offset: searchParams.offset + searchParams.limit })
    expect(componentProps.toggleFetchingParcial).toHaveBeenCalled()
    done()
  })
})

test('Should call functions when button was clicked with filter text', (done) => {
  const text = 'avengers'
  wrapper.setProps({ filter: { ...propsToLoadMore.filter, text } })
  wrapper.find('#load-more-button').simulate('click', fakeEv)
  const { searchParams } = componentProps.filter

  expect(componentProps.toggleFetchingParcial).toHaveBeenCalled()
  expect(componentProps.startAddComics).toHaveBeenCalledWith({
    title: text,
    offset: searchParams.offset + searchParams.limit
  })
  setImmediate(() => {
    expect(componentProps.setSearchParams).toHaveBeenCalledWith({ offset: searchParams.offset + searchParams.limit })
    expect(componentProps.toggleFetchingParcial).toHaveBeenCalled()
    done()
  })
})
