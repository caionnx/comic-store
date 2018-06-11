import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import LazyImage from './LazyImage'
import { addComicToCart, removeComicFromCart } from '../actions/cart'

class Comic extends React.Component {
  state = {
    imageFormat: 'portrait_medium',
    showModal: false,
    isInCart: false
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = (ev) => {
    ev.stopPropagation()
    this.setState({ showModal: false })
  }

  handleAddToCart = (ev) => {
    ev.stopPropagation()

    this.props.addComicToCart(this.props.comic)
    this.setState({ isInCart: true })
  }

  handleRemoveFromCart = (ev) => {
    ev.stopPropagation()
    const id = ev.target.getAttribute('id')

    this.props.removeComicFromCart(parseInt(id, 10))
    this.setState({ isInCart: false })
  }

  limitCharacters = (str) => {
    if (str && str.length > 280) return `${str.substring(0, 280)}...`
    return str
  }

  buttonAction = (classNameModifier = '') => {
    const {
      comic,
      cart
    } = this.props
    const isInCart = cart.filter(c => c.id === comic.id).length

    return (
      <button
        id={comic.id}
        onClick={isInCart ? this.handleRemoveFromCart : this.handleAddToCart}
        className={`c-button ${classNameModifier} ${isInCart ? 'is-red' : 'is-yellow'}`}>
        {isInCart ? 'Remove' : 'Add to cart'}
      </button>
    )
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
          <LazyImage
            title={title}
            src={`${validImage.path}/${this.state.imageFormat}.${validImage.extension}`}
            height={150}
            offset={50}
            once />
        }
        <div className='c-comic-list__item-container'>
          { this.props.toCartListView && <h3 className='c-comic-list__item-title'>{title}</h3> }
          { !!validPrice && `$ ${validPrice.price}` }
          { this.buttonAction('c-button--full-width') }
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
                { this.buttonAction() }
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

const mapStateToProps = (state) => ({
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  addComicToCart: (comic) => dispatch(addComicToCart(comic)),
  removeComicFromCart: (id) => dispatch(removeComicFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comic)
