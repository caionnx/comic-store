import React from 'react'
import { shallow } from 'enzyme'
import ComicList from '../../components/ComicList'
import { comics } from '../fixtures/comics'
jest.mock('react-toastify/dist/ReactToastify.css', () => '')

const fakeComic = comics[0]
let wrapper

test('Should match ComicList with snapshot', () => {
  wrapper = shallow(<ComicList comics={[fakeComic]} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('Connect(Comic)')).toHaveLength(1)
})
