import { connect } from 'react-redux'
import React from 'react'
import Comic from './Comic'
import ComicListLoadButton from './ComicListLoadButton'
import Loading from './Loading'

class ComicList extends React.Component {
  render () {
    const ComicListContainer = (
      <div className={`c-comic-list ${this.props.toCartListView ? 'c-comic-list--rows' : ''}`}>
        { this.props.comics.map((comic, idx) =>
          <Comic comic={comic} toCartListView={this.props.toCartListView} key={idx} />)
        }
      </div>
    )

    return (
      <div>
        { !this.props.comics.length &&
          !this.props.fetching.full &&
          this.props.filter.text &&
          <p>No results for '{this.props.filter.text}'</p>
        }

        { this.props.fetching.full
          ? <Loading />
          : ComicListContainer
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

export default connect(mapStateToProps)(ComicList)
