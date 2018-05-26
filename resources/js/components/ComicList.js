import React from 'react'
import Comic from './Comic'

class ComicList extends React.Component {
  render () {
    return (
      <div>
        { this.props.comics.length
          ? this.props.comics.map((comic, idx) => <Comic comic={comic} key={idx} />)
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default ComicList
