import React from 'react'
import round from '../utils/round'

const PriceWithDiscountComponent = (props) => {
  const lineThrough = {
    textDecoration: 'line-through',
    marginRight: '.5em',
    marginLeft: '.5em'
  }
  return (
    <span>$
      <span style={lineThrough}>{round(props.oldValue)}</span>
      {round(props.newValue)}
    </span>
  )
}

export default PriceWithDiscountComponent
