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
    const validImage = images.find(i => i.path !== '' && i.extension !== '')
    const validPrice = prices.find(p => p.price !== 0)
    const validUrl = urls.find(u => u.url !== '')

    return (
      <div
        tabIndex='0'
        onKeyPress={() => !this.props.toCartListView && this.handleOpenModal()}
        onClick={() => !this.props.toCartListView && this.handleOpenModal()}
        className={`c-comic-list__item ${rareIssue ? 'is-rare' : ''}`}>
        { validImage && validImage.path && validImage.extension &&
          <img
            title={title}
            src={`${validImage.path}/${this.state.imageFormat}.${validImage.extension}`} />
        }
        <div className='c-comic-list__item-container'>
          { this.props.toCartListView && <h3 className='c-comic-list__item-title'>{title}</h3> }
          { !!validPrice && `$ ${validPrice.price}` }
        </div>

        { !this.props.toCartListView &&
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
                <a href={validUrl.url} target='_blank' className='c-button'>More info</a>
                <button className='c-button' onClick={this.handleCloseModal}>Close</button>
              </div>
            </div>
          </ReactModal>
        }
      </div>
    )
  }
}

Comic.defaultProps = {
  images: [{ path: 'http://via.placeholder.com/100x150', extension: 'jpg' }],
  prices: [],
  urls: []
}
export default Comic
