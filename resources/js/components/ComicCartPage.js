import React from 'react'
import { connect } from 'react-redux'
import ComicList from './ComicList'

class ComicCartPage extends React.Component {
  render () {
    return (
      <div className='l-content-container'>
        <ComicList comics={this.props.cart} toCartListView />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps)(ComicCartPage)
