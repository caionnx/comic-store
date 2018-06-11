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
    welcomeMessage: 'Comics from this week'
  }

  componentDidUpdate () {
    console.log('fsfafsa')
  }

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

        {
          this.props.filter.text
            ? <h3>Showing results for '{this.props.filter.text}'.</h3>
            : <h3>{this.state.welcomeMessage}</h3>
        }

        { !this.props.comics.length &&
          !this.props.fetching.full &&
          this.props.filter.text &&
          <p>No results for '{this.props.filter.text}'</p>
        }

        { this.props.fetching.full
          ? <Loading />
          : <ComicList comics={this.props.comics} />
        }

        <ComicListLoadButton />
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
