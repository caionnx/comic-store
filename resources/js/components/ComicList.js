import React from 'react'
import Comic from './Comic'

class ComicList extends React.Component {
  render () {
    return (
      <div className='c-comic-list'>
        { this.props.comics.map((comic, idx) => <Comic comic={comic} key={idx} />) }
      </div>
    )
  }
}

export default ComicList
