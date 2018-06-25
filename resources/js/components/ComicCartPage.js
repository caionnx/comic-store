import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

  discountsAppliedComponent = () => {
    const { discounts } = this.props
    return (
      <p key='discounts-applied'>
        <span>Discounts applied: </span>
        { discounts.map((discount, idx) =>
          <span key={discount.type}>
            {discount.code}
            {idx < discounts.length - 1 ? ', ' : ''}
          </span>
        ) }
      </p>
    )
  }

  render () {
    const amount = this.getTotalAmount()
    const amountIncludingDiscount = this.getTotalAmountIncludingDiscount()
    const { discounts, cart } = this.props

    return (
      <div className='l-content-container'>
        <If condition={cart.length}>
          <ComicList comics={cart} toCartListView />

          <p>
            <span>Total: </span>
            <Choose>
              <When condition={this.someHasDiscount()}>
                <PriceWithDiscountComponent oldValue={amount} newValue={amountIncludingDiscount} />
              </When>
              <Otherwise>
                $ {round(amountIncludingDiscount)}
              </Otherwise>
            </Choose>
          </p>

          <If condition={this.someHasDiscount() && discounts.length}>
            { this.discountsAppliedComponent() }
          </If>

          <ComicCartDiscounts />
        </If>
        <If condition={!cart.length}>
          <h3>Your cart it's empty!</h3>
        </If>
      </div>
    )
  }
}

ComicCartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  discounts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  discounts: state.cart.discounts
})

export default connect(mapStateToProps)(ComicCartPage)
