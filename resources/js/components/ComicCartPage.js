import React from 'react'
import { connect } from 'react-redux'
import round from '../utils/round'
import PriceWithDiscountComponent from './PriceWithDiscount'
import ComicList from './ComicList'
import ComicCartDiscounts from './ComicCartDiscounts'

class ComicCartPage extends React.Component {
  getPrice = (comic) => {
    const { price } = comic.prices.find(p => p.price !== 0) || { price: 0 }
    return price
  }

  getTotalAmount = () =>
    this.props.cart.reduce((total, item) => {
      total += this.getPrice(item)
      return total
    }, 0)

  getTotalAmountIncludingDiscount = () =>
    this.props.cart.reduce((total, item) => {
      const withDiscount = item.priceWithDiscount
      total += withDiscount || this.getPrice(item)
      return total
    }, 0)

  someHasDiscount = () =>
    !!this.props.cart.find(c => !!c.priceWithDiscount)

  render () {
    const amount = this.getTotalAmount()
    const amountIncludingDiscount = this.getTotalAmountIncludingDiscount()

    return (
      <div className='l-content-container'>
        <ComicList comics={this.props.cart} toCartListView />
        <p>Total:
          { this.someHasDiscount()
            ? <PriceWithDiscountComponent oldValue={amount} newValue={amountIncludingDiscount} />
            : ` $ ${round(amountIncludingDiscount)}`
          }
        </p>
        <ComicCartDiscounts />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps)(ComicCartPage)
