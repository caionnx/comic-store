import React from 'react'
import { connect } from 'react-redux'
import { editComicOfCart, addDiscountObjectToCart } from '../actions/cart'

class ComicCartDiscounts extends React.Component {
  discountsTester = [
    {
      test: /[0-9]\w+([A-Z]{2})/,
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

  handleDiscount = (discount, comicsToApply) => {
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
    let comicsToApply
    const { cart, discountsList, addObjToDiscountsList } = this.props
    const code = ev.target.querySelector('#discount-input').value
    const typeOfDiscount = this.getTypeOfDiscount(code)
    if (typeOfDiscount && !discountsList.find(d => d.type === typeOfDiscount.type)) {
      comicsToApply = cart.filter(typeOfDiscount.rule)
      this.handleDiscount(typeOfDiscount, comicsToApply)
      addObjToDiscountsList({...typeOfDiscount, code})
    }
  }

  render () {
    return (
      <form onSubmit={this.onApplyDiscount} className='l-input-group'>
        <div className='l-input-group__item'>
          <input id='discount-input' className='c-input' type='text' placeholder='Insert code' />
        </div>
        <div className='l-input-group__item'>
          <button className='c-button c-button--full-width'>Apply discount</button>
        </div>
      </form>
    )
  }
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
