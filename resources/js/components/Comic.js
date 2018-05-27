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
      <div>
        <h3>{this.props.comic.title}{this.props.comic.rareIssue && ' RARE!'}</h3>
        { imagePath && imageExtension &&
          <img src={`${imagePath}/${this.state.imageFormat}.${imageExtension}`} />
        }
        { priceValue && <span>${priceValue}</span> }
      </div>
    )
  }
}

export default Comic
