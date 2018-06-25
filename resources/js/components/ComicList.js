import React from 'react'
import PropTypes from 'prop-types'
import Comic from './Comic'

export default class ComicList extends React.Component {
  render () {
    return (
      <div className={`c-comic-list ${this.props.toCartListView ? 'c-comic-list--rows' : ''}`}>
        { this.props.comics.map((comic, idx) =>
          <Comic comic={comic} toCartListView={this.props.toCartListView} key={idx} />)
        }
      </div>
    )
  }
}

ComicList.propTypes = {
  comics: PropTypes.array.isRequired,
  toCartListView: PropTypes.any
}
