import React from 'react'

class Comic extends React.Component {
  state = {
    imageFormat: 'portrait_medium'
  }
  render () {
    const image = this.props.comic.images[0]
    const imagePath = image ? image.path : false
    const imageExtension = image ? image.extension : false
    const price = this.props.comic.prices[0]
    const priceValue = price ? price.price : false

    return (
      <div className={`c-comic-list__item ${this.props.comic.rareIssue ? 'is-rare' : ''}`}>
        { imagePath && imageExtension &&
          <img
            title={this.props.comic.title}
            src={`${imagePath}/${this.state.imageFormat}.${imageExtension}`} />
        }
        { priceValue && <div>${priceValue}</div> }
      </div>
    )
  }
}

export default Comic
