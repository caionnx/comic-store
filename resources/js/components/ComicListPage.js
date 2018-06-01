import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import Loading from './Loading'
import { setCount, setTotal, setText, setOffset } from '../actions/filter'
import { startSetComics, startAddComics } from '../actions/comics'

class ComicListPage extends React.Component {
  state = {
    isFetching: true,
    isFetchingMoreOf: false
  }

  componentDidMount () {
    this.props.startSetComics(this.props.filter.minimal).then(data => {
      const { offset, count, total } = data
      this.props.setFilterCount(count)
      this.props.setFilterTotal(total)
      this.props.setFilterOffset(offset)

      this.setState(prevState => ({
        ...prevState,
        isFetching: false
      }))
    })
  }
  onSubmitFilterForm = (e) => {
    e.preventDefault()
    const title = e.target.querySelector('#title-input').value
    const validParam = title.length > 0 ? { title } : this.props.filter.minimal

    this.setState(prevState => ({
      ...prevState,
      isFetching: true
    }))

    this.props.setFilterText(title)

    this.props.startSetComics(validParam).then(data => {
      const { offset, count, total } = data
      this.props.setFilterCount(count)
      this.props.setFilterTotal(total)
      this.props.setFilterOffset(offset)

      this.setState(prevState => ({
        ...prevState,
        isFetching: false
      }))
    })
  }
  onClearFilterForm = (e) => {
    e.preventDefault()
    const titleElem = e.target.closest('form').querySelector('#title-input')
    titleElem.value = ''

    this.props.setFilterText(null)
    this.props.startSetComics(this.props.filter.minimal).then(data => {
      const { offset, count, total } = data

      this.props.setFilterCount(count)
      this.props.setFilterTotal(total)
      this.props.setFilterOffset(offset)
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

    this.setState(prevState => ({
      ...prevState,
      isFetchingMoreOf: true
    }))

    this.props.startAddComics(requestParams).then(data => {
      const { offset } = data
      this.props.setFilterOffset(offset)

      this.setState(prevState => ({
        ...prevState,
        isFetchingMoreOf: false
      }))
    })
  }
  render () {
    return (
      <div className='l-content-container'>
        <ComicListFilterForm
          isFetching={this.state.isFetching}
          hasFilterText={this.props.filter.text}
          onSubmit={(e) => this.onSubmitFilterForm(e)}
          onClear={(e) => this.onClearFilterForm(e)} />

        { this.state.isFetching && <Loading /> }

        { !this.props.comics.length &&
          !this.state.isFetching &&
          this.props.filter.text &&
          <p>No results for '{this.props.filter.text}'</p>
        }

        { !this.state.isFetching &&
          <ComicList comics={this.props.comics} hasFilter={this.props.filter.text} />
        }

        { this.props.filter.count + this.props.filter.offset < this.props.filter.total &&
          !this.state.isFetchingMoreOf &&
          !this.state.isFetching &&
          <button className='c-button c-button--primary c-button--full-width' onClick={this.onLoadMore}>Load more</button>
        }

        { this.state.isFetchingMoreOf &&
          !this.props.filter.isFetching &&
          <Loading />
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  comics: state.comics
})

const mapDispatchToProps = (dispatch) => ({
  setFilterCount: (count) => dispatch(setCount(count)),
  setFilterTotal: (total) => dispatch(setTotal(total)),
  setFilterText: (text) => dispatch(setText(text)),
  setFilterOffset: (offset) => dispatch(setOffset(offset)),
  startSetComics: (params) => dispatch(startSetComics(params)),
  startAddComics: (params) => dispatch(startAddComics(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicListPage)
