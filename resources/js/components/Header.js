import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = (props) => (
  <header className='c-header'>
    <div className='l-content-container'>
      <div className='c-header__content'>
        <Link to='/' className='is-unstyled'>
          <h1 className='c-header__title'>Marvel <span className='u-visible-desktop'>Comic</span> Store</h1>
        </Link>
        <div className='l-icon-container'>
          <Link title='About' to='/about' className='l-icon-container__content'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' width='24' height='24' viewBox='0 0 1000 1000'>
              <path d='M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10L500,10z M500,928.8C263.6,928.8,71.2,736.4,71.2,500C71.2,263.6,263.6,71.2,500,71.2c236.4,0,428.7,192.3,428.7,428.8C928.8,736.4,736.4,928.8,500,928.8L500,928.8z M500,377.5c-33.8,0-61.3,27.4-61.3,61.2V745c0,33.8,27.4,61.3,61.3,61.3c33.8,0,61.2-27.4,61.2-61.3V438.7C561.3,404.9,533.8,377.5,500,377.5L500,377.5z M438.7,256c0-16,6.6-32,17.9-43.3c11.3-11.3,27.3-17.9,43.3-17.9c16,0,32,6.6,43.3,17.9c11.3,11.3,17.9,27.3,17.9,43.3c0,16-6.6,32-17.9,43.3C532,310.6,516,317.2,500,317.2c-16,0-32-6.6-43.3-17.9C445.4,287.9,438.7,272,438.7,256L438.7,256z' />
            </svg>
          </Link>
          <Link title='My Cart' to='/cart' className='l-icon-container__content'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z' />
            </svg>
            <If condition={props.cartTotal}>
              <span className='l-icon-container__right-text'>{props.cartTotal}</span>
            </If>
          </Link>
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  cartTotal: PropTypes.number
}

const mapStateToProps = (state) => ({
  cartTotal: state.cart.items && state.cart.items.length
})

export default connect(mapStateToProps)(Header)
