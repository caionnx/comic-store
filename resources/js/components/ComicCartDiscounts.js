import React from 'react'
import { connect } from 'react-redux'
import { editComicOfCart } from '../actions/cart'

class ComicCartDiscounts extends React.Component {
  discounts = {
    applied: [],
    list: [
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
  }

  getTypeOfDiscount = (code) => {
    let toReturn = null
    for (const discount of this.discounts.list) {
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

  handleDiscount = (discount) => {
    const comicsToApply = this.props.cart.filter(discount.rule)

    comicsToApply.forEach(comic => {
      const price = this.getPrice(comic)
      const priceWithDiscount = price - ((price * discount.value) / 100)

      this.props.updateComic(comic.id, { priceWithDiscount })
    })
  }

  onApplyDiscount = (ev) => {
    ev.preventDefault()
    const { applied: appliedDiscounts } = this.discounts
    const code = ev.target.querySelector('#discount-input').value
    const typeOfDiscount = this.getTypeOfDiscount(code)
    if (!appliedDiscounts.includes(code) && typeOfDiscount) {
      this.handleDiscount(typeOfDiscount)
      appliedDiscounts.push(code)
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
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  updateComic: (id, updates) => dispatch(editComicOfCart(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicCartDiscounts)
