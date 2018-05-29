import React from 'react'
import ReactModal from 'react-modal'

class Comic extends React.Component {
  state = {
    imageFormat: 'portrait_medium',
    showModal: false
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = (ev) => {
    ev.stopPropagation()
    this.setState({ showModal: false })
  }

  limitCharacters = (str) => {
    if (str && str.length > 280) return `${str.substring(0, 280)}...`
    return str
  }

  render () {
    const image = this.props.comic.images[0]
    const imagePath = image ? image.path : false
    const imageExtension = image ? image.extension : false
    const price = this.props.comic.prices[0]
    const priceValue = price ? price.price : false
    const url = this.props.comic.urls[0] ? this.props.comic.urls[0].url : 'http://marvel.com/comics/'

    return (
      <div tabIndex='0' onKeyPress={this.handleOpenModal} onClick={this.handleOpenModal} className={`c-comic-list__item ${this.props.comic.rareIssue ? 'is-rare' : ''}`}>
        { imagePath && imageExtension &&
          <img
            title={this.props.comic.title}
            src={`${imagePath}/${this.state.imageFormat}.${imageExtension}`} />
        }
        { priceValue && <div>${priceValue}</div> }

        <ReactModal
          className='c-modal'
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          appElement={document.getElementById('app')}
          closeTimeoutMS={200}
          contentLabel={`Info about ${this.props.comic.title}`}>

          <div className='c-modal__body'>
            <h2 className='c-modal__title'>{this.props.comic.title}</h2>
            <p>{this.limitCharacters(this.props.comic.description)}</p>
            <div className='c-modal__options'>
              <a href={url} target='_blank' className='c-button'>More info</a>
              <button className='c-button' onClick={this.handleCloseModal}>Close</button>
            </div>
          </div>
        </ReactModal>
      </div>
    )
  }
}

export default Comic
