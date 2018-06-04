import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import { setSearchParams } from '../actions/filter'
import { startSetComics } from '../actions/comics'
import { toggleFull } from '../actions/fetching'

class ComicListPage extends React.Component {
  componentDidMount () {
    this.props.toggleFetchingFull()

    this.props.startSetComics(this.props.filter.minimal).then(data => {
      const { offset, count, total } = data
      this.props.setSearchParams({ offset, count, total })

      this.props.toggleFetchingFull()
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
