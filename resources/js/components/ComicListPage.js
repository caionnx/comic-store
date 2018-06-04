import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import { setSearchParams } from '../actions/filter'
import { startSetComics } from '../actions/comics'
import { toggleFull } from '../actions/fetching'

class ComicListPage extends React.Component {
  componentDidMount () {
    const {
      filter,
      startSetComics,
      setSearchParams,
      toggleFetchingFull
    } = this.props

    startSetComics(filter.minimal).then(data => {
      const { offset, count, total } = data
      setSearchParams({ offset, count, total })

      toggleFetchingFull()
    })
  }

  render () {
    return (
      <div className='l-content-container'>
        <ComicListFilterForm />
        <ComicList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  comics: state.comics,
  fetching: state.fetching
})

const mapDispatchToProps = (dispatch) => ({
  setSearchParams: (params) => dispatch(setSearchParams(params)),
  startSetComics: (params) => dispatch(startSetComics(params)),
  toggleFetchingFull: () => dispatch(toggleFull())
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicListPage)
