import React from 'react'
import ComicList from './ComicList'
import MarvelAPI from '../api/marvelApi'

class ComicListPage extends React.Component {
  state = {
    comics: []
  }
  componentDidMount () {
    const marvelApi = new MarvelAPI()

    marvelApi.getResults().then(comics =>
      this.setState(prevState => ({ ...prevState, comics }))
    )
  }
  render () {
    return (
      <ComicList comics={this.state.comics} />
    )
  }
}

export default ComicListPage
