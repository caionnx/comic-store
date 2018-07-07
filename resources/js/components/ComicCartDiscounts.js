import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editComicOfCart, addDiscountObjectToCart } from '../actions/cart'

export class ComicCartDiscounts extends React.Component {
  constants = {
    inputClassError: 'has-error',
    inputId: 'discount-input'
  }
  discountsTester = [
    {
      test: /[0-9]\w{3,5}([A-Z]{2})/,
      value: 10,
      type: 'normal',
      rule: (comic) => !comic.rareIssue
    },
    {
      test: /([A-Z]{2})[0-9]{4}[a-z]/,
      value: 5,
      type: 'rare',
      rule: (comic) => comic.rareIssue
    }
  ]

  getTypeOfDiscount = (code) => {
    let toReturn = null
    for (const discount of this.discountsTester) {
      const { test, type, value, rule } = discount
      const match = code.match(test)
      if (match) {
        toReturn = { type, value, rule }
        break
      }
    }

    return toReturn
  }

  getPrice = (comic) => {
    const { price } = comic.prices.find(p => p.price !== 0) || { price: 0 }
    return price || 0
  }

  handleDiscount (discount, comicsToApply) {
    comicsToApply.forEach(comic => {
      const price = this.getPrice(comic)
      const priceWithDiscount = price - ((price * discount.value) / 100)

      this.props.updateComic(comic.id, { priceWithDiscount })
    })
  }

  componentDidMount () {
    const { cart, discountsList } = this.props

    discountsList.forEach(discount => {
      const comicsToApply = cart.filter(item => !item.priceWithDiscount).filter(discount.rule)
      this.handleDiscount(discount, comicsToApply)
    })
  }

  onApplyDiscount = (ev) => {
    ev.preventDefault()
    const { inputId, inputClassError } = this.constants
    const { cart, discountsList, addObjToDiscountsList } = this.props
    const input = ev.target.querySelector(`#${inputId}`)
    const code = input.value
    const typeOfDiscount = this.getTypeOfDiscount(code)
    const comicsToApply = typeOfDiscount && cart.filter(typeOfDiscount.rule)
    input.value = ''

    if (!discountsList.find(d => d.type === typeOfDiscount.type) && comicsToApply && comicsToApply.length) {
      this.handleDiscount(typeOfDiscount, comicsToApply)
      addObjToDiscountsList({...typeOfDiscount, code})
    } else {
      input.classList.add(inputClassError)
      setTimeout(() => {
        input.classList.remove(inputClassError)
      }, 3000)
    }
  }

  render () {
    return (
      <form onSubmit={this.onApplyDiscount} className='l-input-group'>
        <div className='l-input-group__item'>
          <input autoComplete='off' id={this.constants.inputId} className='c-input' type='text' placeholder='Insert code' />
        </div>
        <div className='l-input-group__item'>
          <button className='c-button c-button--full-width'>Apply discount</button>
        </div>
      </form>
    )
  }
}

ComicCartDiscounts.propTypes = {
  cart: PropTypes.array.isRequired,
  discountsList: PropTypes.array.isRequired,
  addObjToDiscountsList: PropTypes.func.isRequired,
  updateComic: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  discountsList: state.cart.discounts
})

const mapDispatchToProps = (dispatch) => ({
  updateComic: (id, updates) => dispatch(editComicOfCart(id, updates)),
  addObjToDiscountsList: (discount) => dispatch(addDiscountObjectToCart(discount))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicCartDiscounts)
