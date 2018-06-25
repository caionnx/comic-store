import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'
import ComicListFilterForm from './ComicListFilterForm'
import ComicListLoadButton from './ComicListLoadButton'
import Loading from './Loading'
import { setSearchParams } from '../actions/filter'
import { startSetComics } from '../actions/comics'
import { toggleFull } from '../actions/fetching'

class ComicListPage extends React.Component {
  state = {
    welcomeMessage: 'Comics from this week',
    forceWelcomeMessage: true
  }

  componentDidMount () {
    const {
      filter,
      fetching,
      startSetComics,
      setSearchParams,
      toggleFetchingFull
    } = this.props

    startSetComics(filter.minimal).then(data => {
      const { offset, count, total } = data
      setSearchParams({ offset, count, total })

      this.setState(() => ({ forceWelcomeMessage: false }))
      return fetching.full && toggleFetchingFull()
    })
  }

  render () {
    const { filter, fetching, comics } = this.props
    return (
      <div className='l-content-container'>
        <ComicListFilterForm />

        <Choose>
          <When condition={(!filter.text && !fetching.full) || this.state.forceWelcomeMessage}>
            <h3>{this.state.welcomeMessage}</h3>
          </When>
          <When condition={filter.text && fetching.full}>
            <h3>Searching for '{filter.text}'</h3>
          </When>
          <When condition={filter.text && !fetching.full && comics.length}>
            <h3>Showing results for '{filter.text}'.</h3>
          </When>
          <When condition={filter.text && !comics.length}>
            <h3>No results for '{filter.text}'</h3>
          </When>
        </Choose>

        <Choose>
          <When condition={fetching.full}>
            <Loading />
          </When>
          <Otherwise>
            <ComicList comics={comics} />
            <ComicListLoadButton />
          </Otherwise>
        </Choose>
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
