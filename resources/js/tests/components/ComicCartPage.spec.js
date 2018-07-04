import React from 'react'
import { shallow } from 'enzyme'
import { ComicCartPage } from '../../components/ComicCartPage'
import { comics } from '../fixtures/comics'
jest.mock('react-toastify/dist/ReactToastify.css', () => '')

const fakeComic = comics[0]
let componentProps
let wrapper

beforeEach(() => {
  componentProps = {
    cart: [fakeComic],
    discounts: []
  }
  wrapper = shallow(<ComicCartPage {...componentProps} />)
})

test('Should ComicCartPage match with snapshot', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should not render ComicList if cart is empty', () => {
  const props = { ...componentProps, cart: [] }
  const otherWrapper = shallow(<ComicCartPage {...props} />)
  expect(otherWrapper.find('ComicList')).toHaveLength(0)
})

test('Should render with discounts', () => {
  const spy = jest.spyOn(ComicCartPage.prototype, 'discountsAppliedComponent')
  const props = {
    cart: [{ ...fakeComic, priceWithDiscount: 3.75 }],
    discounts: [
      { type: 'normal', rule: (comic) => !comic.rareIssue }
    ]
  }
  const otherWrapper = shallow(<ComicCartPage {...props} />)

  expect(spy).toHaveBeenCalled()
  expect(otherWrapper).toMatchSnapshot()
})
