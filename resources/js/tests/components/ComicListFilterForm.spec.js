import React from 'react'
import { shallow, mount } from 'enzyme'
import { ComicListFilterForm } from '../../components/ComicListFilterForm'
import { fetchingReducerDefaultState } from '../../reducers/fetching'
import { filterReducerDefaultState } from '../../reducers/filter'

let componentProps
let wrapper
const fakeEv = { preventDefault: jest.fn() }
const promiseResolvedData = { offset: 20, count: 20, total: 888 }
const fakeContainer = document.createElement('div')
fakeContainer.innerHTML = `<input value="avengers" type="text" id="title-input" />`

beforeEach(() => {
  componentProps = {
    setFilterText: jest.fn(),
    setSearchParams: jest.fn(),
    startSetComics: jest.fn(() => Promise.resolve(promiseResolvedData)),
    toggleFetchingFull: jest.fn(),
    fetching: fetchingReducerDefaultState,
    filter: filterReducerDefaultState
  }

  wrapper = shallow(<ComicListFilterForm {...componentProps} />)
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should have disable button on initial state', () => {
  const button = wrapper.find('button')

  expect(button.prop('disabled')).toBeTruthy()
})

test('Should have two buttons when has filter text', () => {
  wrapper.setProps({ filter: {
    ...filterReducerDefaultState,
    text: 'Avengers'
  } })

  const buttons = wrapper.find('button')

  expect(buttons).toHaveLength(2)
})

test('Should call setFilterText when unmount', () => {
  const otherWrapper = mount(<ComicListFilterForm {...componentProps} />)
  otherWrapper.unmount()

  expect(componentProps.setFilterText).toHaveBeenCalledWith(null)
})

test('Should call functions on submit', (done) => {
  const form = wrapper.find('form')
  form.simulate('submit', {
    ...fakeEv,
    target: fakeContainer
  })

  expect(componentProps.toggleFetchingFull).toHaveBeenCalled()
  expect(componentProps.setFilterText).toHaveBeenCalledWith('avengers')
  expect(componentProps.startSetComics).toHaveBeenCalledWith({ title: 'avengers' })

  setImmediate(() => {
    expect(componentProps.setSearchParams).toHaveBeenCalledWith(promiseResolvedData)
    expect(componentProps.toggleFetchingFull).toHaveBeenCalled()
    done()
  })
})

test('Should call functions on clearFilter click', (done) => {
  wrapper.setProps({ filter: {
    ...filterReducerDefaultState,
    text: 'Avengers'
  } })
  const button = wrapper.find('button#clear-filter')
  button.simulate('click', {
    ...fakeEv,
    target: {
      closest: () => ({ querySelector: () => fakeContainer })
    }
  })

  expect(componentProps.setFilterText).toHaveBeenCalledWith(null)
  expect(componentProps.startSetComics).toHaveBeenCalledWith(filterReducerDefaultState.minimal)

  setImmediate(() => {
    expect(componentProps.setSearchParams).toHaveBeenCalledWith(promiseResolvedData)
    done()
  })
})
