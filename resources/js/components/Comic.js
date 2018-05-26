import React from 'react'

class Comic extends React.Component {
  state = {
    imageFormat: 'portrait_medium'
  }
  render () {
    const image = this.props.comic.images[0]
    const imagePath = image.path
    const imageExtension = image.extension

    return (
      <div>
        <h3>{this.props.comic.title}</h3>
        <img src={`${imagePath}/${this.state.imageFormat}.${imageExtension}`} />
      </div>
    )
  }
}

export default Comic
