import React from 'react'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import MarvelAPI from '../api/marvelApi'

const marvelApi = new MarvelAPI()

class ComicListPage extends React.Component {
  state = {
    comics: [],
    isFetching: true,
    isFetchingMoreOf: false,
    filter: {
      text: null,
      count: 0,
      offset: 0,
      total: 0,
      limit: 20,
      minimal: {
        dateDescriptor: 'lastWeek'
      }
    }
  }

  parseResults = (data) => ({
    comics: data.results,
    offset: parseInt(data.offset, 10),
    count: parseInt(data.count, 10),
    total: parseInt(data.total, 10)
  })

  componentDidMount () {
    marvelApi.getComics(this.state.filter.minimal).then(search => {
      const { comics, offset, count, total } = this.parseResults(search)
      const filters = { offset, count, total }

      this.setState(prevState => ({
        ...prevState,
        comics,
        filter: {...prevState.filter, ...filters},
        isFetching: false
      }))
    })
  }
  onSubmitFilterForm = (e) => {
    e.preventDefault()
    const title = e.target.querySelector('#title-input').value
    const validParam = title.length > 0 ? { title } : undefined

    this.setState(prevState => ({
      ...prevState,
      filter: { ...prevState.filter, text: title },
      isFetching: true
    }))

    marvelApi.getComics(validParam).then(search => {
      const { comics, offset, count, total } = this.parseResults(search)
      const filters = { offset, count, total }
      if (this.state.isFetching) {
        this.setState(prevState => ({
          ...prevState,
          comics,
          filter: {...prevState.filter, ...filters},
          isFetching: false
        }))
      }
    })
  }
  onClearFilterForm = (e) => {
    e.preventDefault()
    const titleElem = e.target.parentNode.querySelector('#title-input')
    titleElem.value = ''

    marvelApi.getComics(this.state.filter.minimal).then(search => {
      const { comics, offset, count, total } = this.parseResults(search)
      const filters = { offset, count, total }

      this.setState(prevState => ({
        ...prevState,
        comics,
        filter: {...prevState.filter, ...filters, text: null},
        isFetching: false
      }))
    })
  }

  onLoadMore = (e) => {
    e.preventDefault()
    const offset = this.state.filter.offset + this.state.filter.limit
    const title = this.state.filter.text
    const requestParams = { offset }
    if (title && title.length > 0) {
      requestParams.title = title
    } else {
      Object.entries(this.state.filter.minimal).forEach(([key, val]) => {
        requestParams[key] = val
      })
    }

    this.setState(prevState => ({
      ...prevState,
      filter: { ...prevState.filter, offset },
      isFetchingMoreOf: true
    }))

    marvelApi.getComics(requestParams).then(search => {
      const { comics, offset, count, total } = this.parseResults(search)
      const filters = { offset, count, total }
      if (this.state.isFetchingMoreOf) {
        this.setState(prevState => ({
          ...prevState,
          comics: [...prevState.comics, ...comics],
          filter: {...prevState.filter, ...filters},
          isFetchingMoreOf: false
        }))
      }
    })
  }
  render () {
    return (
      <div>
        <ComicListFilterForm
          isFetching={this.state.isFetching}
          hasFilterText={this.state.filter.text}
          onSubmit={(e) => this.onSubmitFilterForm(e)}
          onClear={(e) => this.onClearFilterForm(e)} />

        { this.state.isFetching && <p>Loading...</p> }

        { !this.state.comics.length &&
          !this.state.isFetching &&
          this.state.filter.text &&
          <p>No results for '{this.state.filter.text}'</p>
        }

        { !!this.state.comics.length && !this.state.isFetching &&
          <ComicList comics={this.state.comics} hasFilter={this.state.filter.text} />
        }

        { this.state.filter.count + this.state.filter.offset < this.state.filter.total &&
          !this.state.isFetchingMoreOf &&
          !this.state.isFetching &&
          <p onClick={this.onLoadMore}>Load more</p>
        }

        { this.state.isFetchingMoreOf && !this.state.filter.isFetching && <p>Loading more results...</p>}

      </div>
    )
  }
}

export default ComicListPage
