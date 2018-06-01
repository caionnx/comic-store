import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import Loading from './Loading'
import { setCount, setTotal, setOffset } from '../actions/filter'
import { startSetComics, startAddComics } from '../actions/comics'
import { toggleFull, toggleParcial } from '../actions/fetching'

class ComicListPage extends React.Component {
  componentDidMount () {
    this.props.toggleFetchingFull()

    this.props.startSetComics(this.props.filter.minimal).then(data => {
      const { offset, count, total } = data
      this.props.setFilterCount(count)
      this.props.setFilterTotal(total)
      this.props.setFilterOffset(offset)

      this.props.toggleFetchingFull()
    })
  }

  onLoadMore = (e) => {
    e.preventDefault()
    const offset = this.props.filter.offset + this.props.filter.limit
    const title = this.props.filter.text
    const requestParams = { offset }
    if (title && title.length > 0) {
      requestParams.title = title
    } else {
      Object.entries(this.props.filter.minimal).forEach(([key, val]) => {
        requestParams[key] = val
      })
    }

    this.props.toggleFetchingParcial()

    this.props.startAddComics(requestParams).then(data => {
      const { offset } = data

      this.props.setFilterOffset(offset)
      this.props.toggleFetchingParcial()
    })
  }

  render () {
    return (
      <div className='l-content-container'>
        <ComicListFilterForm />

        { this.props.fetching.full && <Loading /> }

        { !this.props.comics.length &&
          !this.props.fetching.full &&
          this.props.filter.text &&
          <p>No results for '{this.props.filter.text}'</p>
        }

        { !this.props.fetching.full &&
          <ComicList comics={this.props.comics} hasFilter={this.props.filter.text} />
        }

        { this.props.filter.count + this.props.filter.offset < this.props.filter.total &&
          !this.props.fetching.parcial &&
          !this.props.fetching.full &&
          <button className='c-button c-button--primary c-button--full-width' onClick={this.onLoadMore}>Load more</button>
        }

        { this.props.fetching.parcial &&
          !this.props.filter.isFetching &&
          <Loading />
        }

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
  setFilterCount: (count) => dispatch(setCount(count)),
  setFilterTotal: (total) => dispatch(setTotal(total)),
  setFilterOffset: (offset) => dispatch(setOffset(offset)),
  startSetComics: (params) => dispatch(startSetComics(params)),
  startAddComics: (params) => dispatch(startAddComics(params)),
  toggleFetchingFull: () => dispatch(toggleFull()),
  toggleFetchingParcial: () => dispatch(toggleParcial())
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicListPage)
