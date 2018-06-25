import { connect } from 'react-redux'
import React from 'react'
import Loading from './Loading'
import { setSearchParams } from '../actions/filter'
import { startAddComics } from '../actions/comics'
import { toggleParcial } from '../actions/fetching'

class ComicListLoadButton extends React.Component {
  onLoadMore = (e) => {
    e.preventDefault()
    const {
      filter,
      toggleFetchingParcial,
      startAddComics,
      setSearchParams
    } = this.props

    const offset = filter.searchParams.offset + filter.searchParams.limit
    const title = filter.text
    const requestParams = { offset }
    if (title && title.length > 0) {
      requestParams.title = title
    } else {
      Object.entries(filter.minimal).forEach(([key, val]) => {
        requestParams[key] = val
      })
    }

    toggleFetchingParcial()

    startAddComics(requestParams).then(data => {
      const { offset } = data

      setSearchParams({ offset })
      toggleFetchingParcial()
    })
  }

  render () {
    const {
      filter,
      fetching,
    } = this.props
    const { count, offset, total } = filter.searchParams

    return (
      <div>
        <Choose>
          <When condition={fetching.parcial}>
            <Loading />
          </When>
          <When condition={count + offset < total}>
            <button
              className='c-button c-button--primary c-button--full-width'
              onClick={this.onLoadMore}>
              Load more
            </button>
          </When>
        </Choose>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  fetching: state.fetching
})

const mapDispatchToProps = (dispatch) => ({
  setSearchParams: (params) => dispatch(setSearchParams(params)),
  startAddComics: (params) => dispatch(startAddComics(params)),
  toggleFetchingParcial: () => dispatch(toggleParcial())
})
export default connect(mapStateToProps, mapDispatchToProps)(ComicListLoadButton)
