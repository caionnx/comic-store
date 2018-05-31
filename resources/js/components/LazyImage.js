import React from 'react'
import LazyLoad from 'react-lazyload'

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

export default LazyImage
