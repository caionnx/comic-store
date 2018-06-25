import React from 'react'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'

const LazyImage = ({
  className,
  src,
  title,
  alt,
  ...rest
}) => (
  <LazyLoad {...rest} >
    <img className={className} src={src} title={title} alt={!alt ? title : alt} />
  </LazyLoad>
)

LazyImage.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default LazyImage
