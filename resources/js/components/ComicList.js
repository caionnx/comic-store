import React from 'react'
import Comic from './Comic'

class ComicList extends React.Component {
  render () {
    return this.props.comics.map((comic, idx) => <Comic comic={comic} key={idx} />)
  }
}

export default ComicList
