import React from 'react'
import { shallow } from 'enzyme'
import { Comic } from '../../components/Comic'
import { comics } from '../fixtures/comics'
jest.mock('react-toastify/dist/ReactToastify.css', () => '')

const fakeComic = comics[0]
const fakeEv = { stopPropagation: jest.fn() }
let componentProps
let wrapper

beforeEach(() => {
  componentProps = {
    cart: [],
    addComicToCart: jest.fn(),
    removeComicFromCart: jest.fn()
  }

  wrapper = shallow(<Comic {...componentProps} comic={fakeComic} />)
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should comic match with snapshot', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should have rare className', () => {
  wrapper.setProps({ comic: { ...fakeComic, rareIssue: true } })
  const element = wrapper.find('.c-comic-list__item')

  expect(element.hasClass('is-rare')).toBeTruthy()
})

test('Should add comic to cart', () => {
  const buttonSelector = `#container-${fakeComic.id} > button`
  wrapper.find(buttonSelector).simulate('click', fakeEv)
  wrapper.setProps({ cart: [fakeComic] })
  const button = wrapper.find(buttonSelector)

  expect(componentProps.addComicToCart).toHaveBeenCalled()
  expect(button.text()).toBe('Remove')
})

test('Should remove comic from cart', () => {
  const buttonSelector = `#container-${fakeComic.id} > button`
  wrapper.find(buttonSelector).simulate('click', fakeEv) // Add
  wrapper.setProps({ cart: [fakeComic] }) // Add
  wrapper.find(buttonSelector).simulate('click', { // Remove
    ...fakeEv, target: { getAttribute: () => fakeComic.id }
  })
  wrapper.setProps({ cart: [] }) // Remove
  const button = wrapper.find(buttonSelector)

  expect(componentProps.removeComicFromCart).toHaveBeenCalled()
  expect(button.text()).toBe('Add to cart')
})

test('Should open modal on click', () => {
  const spy = jest.spyOn(wrapper.instance(), 'handleOpenModal')
  const element = wrapper.find('.c-comic-list__item')
  element.simulate('click', fakeEv)

  expect(spy).toHaveBeenCalled()
  expect(wrapper.state('showModal')).toBeTruthy()
})

test('Should open modal on keypress', () => {
  const spy = jest.spyOn(wrapper.instance(), 'handleOpenModal')
  const element = wrapper.find('.c-comic-list__item')
  element.simulate('keypress', fakeEv)

  expect(spy).toHaveBeenCalled()
  expect(wrapper.state('showModal')).toBeTruthy()
})

test('Should close modal', () => {
  const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal')
  const element = wrapper.find('.c-comic-list__item')
  element.simulate('click', fakeEv)
  const modalCloseBtn = wrapper.find('.c-modal #close-modal')
  modalCloseBtn.simulate('click', fakeEv)

  expect(spy).toHaveBeenCalled()
  expect(wrapper.state('showModal')).toBeFalsy()
})
