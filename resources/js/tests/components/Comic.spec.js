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

test('Should comic match with snapshot', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should add comic to cart', () => {
  const buttonSelector = `#container-${fakeComic.id} > button`
  wrapper.find(buttonSelector).simulate('click', fakeEv)
  const button = wrapper.find(buttonSelector)

  expect(componentProps.addComicToCart).toHaveBeenCalled()
  expect(button.text()).toBe('Remove')
  expect(wrapper.state('isInCart')).toBeTruthy()
})

test('Should remove comic from cart', () => {
  const buttonSelector = `#container-${fakeComic.id} > button`
  wrapper.find(buttonSelector).simulate('click', fakeEv) // Add
  wrapper.find(buttonSelector).simulate('click', { ...fakeEv, target: { getAttribute: () => fakeComic.id } }) // Remove
  const button = wrapper.find(buttonSelector)

  expect(componentProps.removeComicFromCart).toHaveBeenCalled()
  expect(button.text()).toBe('Add to cart')
  expect(wrapper.state('isInCart')).toBeFalsy()
})
