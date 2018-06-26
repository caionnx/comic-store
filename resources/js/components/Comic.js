import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import PriceWithDiscountComponent from './PriceWithDiscount'
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
      priceWithDiscount,
      urls,
      description,
      title,
      rareIssue
    } = this.props.comic
    const { toCartListView } = this.props
    const validImage = images.find(i => i.path !== '' && i.extension !== '')
    const validPrice = prices.find(p => p.price !== 0)
    const validUrl = urls.find(u => u.url !== '')

    return (
      <div
        tabIndex='0'
        onKeyPress={() => !toCartListView && this.handleOpenModal()}
        onClick={() => !toCartListView && this.handleOpenModal()}
        className={`c-comic-list__item ${rareIssue ? 'is-rare' : ''}`}>
        <If condition={validImage && validImage.path && validImage.extension}>
          <LazyImage
            title={title}
            src={`${validImage.path}/${this.state.imageFormat}.${validImage.extension}`}
            height={150}
            offset={50}
            once />
        </If>
        <div className='c-comic-list__item-container'>
          <If condition={toCartListView}><h3 className='c-comic-list__item-title'>{title}</h3></If>
          <Choose>
            <When condition={priceWithDiscount}>
              <span className='c-comic-list__item-price'>
                <PriceWithDiscountComponent oldValue={validPrice.price} newValue={priceWithDiscount} />
              </span>
            </When>
            <When condition={!!validPrice}>
              <span className='c-comic-list__item-price'>
                $ {validPrice.price}
              </span>
            </When>
          </Choose>
          { this.buttonAction('c-button--full-width') }
        </div>

        <If condition={!toCartListView}>
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
        </If>
      </div>
    )
  }
}

Comic.defaultProps = {
  images: [{ path: 'http://via.placeholder.com/100x150', extension: 'jpg' }],
  prices: [],
  urls: []
}

Comic.propTypes = {
  cart: PropTypes.array.isRequired,
  toCartListView: PropTypes.any,
  addComicToCart: PropTypes.func.isRequired,
  removeComicFromCart: PropTypes.func.isRequired,
  comic: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  cart: state.cart.items
})

const mapDispatchToProps = (dispatch) => ({
  addComicToCart: (comic) => dispatch(addComicToCart(comic)),
  removeComicFromCart: (id) => dispatch(removeComicFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comic)
