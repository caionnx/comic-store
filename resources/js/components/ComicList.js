import React from 'react'
import Comic from './Comic'

class ComicList extends React.Component {
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

export default ComicList
