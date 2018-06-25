import React from 'react'
import PropTypes from 'prop-types'
import round from '../utils/round'

const PriceWithDiscountComponent = (props) => {
  const lineThrough = {
    textDecoration: 'line-through',
    marginRight: '.5em'
  }
  return (
    <span>
      <span style={lineThrough}>$ {round(props.oldValue)}</span>
      $ {round(props.newValue)}
    </span>
  )
}

PriceWithDiscountComponent.propTypes = {
  newValue: PropTypes.number.isRequired,
  oldValue: PropTypes.number.isRequired
}

export default PriceWithDiscountComponent
