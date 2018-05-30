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
    const {
      images,
      prices,
      urls,
      description,
      title,
      rareIssue
    } = this.props.comic
    const imagePath = images && images[0] ? images[0].path : false
    const imageExtension = images[0] && images[0] ? images[0].extension : false
    const priceValue = prices && prices[0] ? prices[0].price : false
    const url = urls && urls[0] ? urls[0].url : 'http://marvel.com/comics/'

    return (
      <div tabIndex='0' onKeyPress={this.handleOpenModal} onClick={this.handleOpenModal} className={`c-comic-list__item ${rareIssue ? 'is-rare' : ''}`}>
        { imagePath && imageExtension &&
          <img
            title={title}
            src={`${imagePath}/${this.state.imageFormat}.${imageExtension}`} />
        }
        { priceValue && <div>${priceValue}</div> }

        <ReactModal
          className='c-modal'
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          appElement={document.getElementById('app')}
          closeTimeoutMS={200}
          contentLabel={`Info about ${title}`}>

          <div className='c-modal__body'>
            <h2 className='c-modal__title'>{title}</h2>
            <p>{this.limitCharacters(description)}</p>
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
