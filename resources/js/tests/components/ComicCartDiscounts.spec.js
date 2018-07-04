import React from 'react'
import { shallow } from 'enzyme'
import { ComicCartDiscounts } from '../../components/ComicCartDiscounts'
import { comics } from '../fixtures/comics'

const fakeComic = comics[0]
const fakeEv = { preventDefault: jest.fn() }
let componentProps
let wrapper

beforeEach(() => {
  componentProps = {
    cart: [],
    discountsList: [],
    addObjToDiscountsList: jest.fn(),
    updateComic: jest.fn()
  }
  wrapper = shallow(<ComicCartDiscounts {...componentProps} />)
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should discount component match with snapshot', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should re-apply discounts when mount', () => {
  const props = { ...componentProps, discountsList: [{ rule: () => null }] }
  const handleDiscount = jest.spyOn(ComicCartDiscounts.prototype, 'handleDiscount')
  shallow(<ComicCartDiscounts {...props} />)

  expect(handleDiscount).toHaveBeenCalled()
})

test('Should not apply discount', (done) => {
  const fakeContainer = document.createElement('div')
  fakeContainer.innerHTML = '<input id="discount-input" type="text" value="xpto" />'
  wrapper.find('form').simulate('submit', { ...fakeEv, target: fakeContainer })
  const resultInput = fakeContainer.querySelector('input')

  expect(resultInput.value).toBe('')
  expect(resultInput.classList.contains('has-error')).toBeTruthy()
  setTimeout(() => {
    expect(resultInput.classList.contains('has-error')).toBeFalsy()
    done()
  }, 3000)
})

test('Should apply discount', () => {
  const fakeContainer = document.createElement('div')
  fakeContainer.innerHTML = '<input id="discount-input" type="text" value="ahe01BA><" />'
  const props = { ...componentProps, cart: [fakeComic] }
  const handleDiscount = jest.spyOn(ComicCartDiscounts.prototype, 'handleDiscount')
  const secondWrapper = shallow(<ComicCartDiscounts {...props} />)
  secondWrapper.find('form').simulate('submit', { ...fakeEv, target: fakeContainer })
  const resultInput = fakeContainer.querySelector('input')

  expect(props.updateComic).toHaveBeenCalled()
  expect(handleDiscount).toHaveBeenCalled()
  expect(resultInput.value).toBe('')
  expect(resultInput.classList.contains('has-error')).toBeFalsy()
})
