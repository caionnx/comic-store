import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

const Notification = ({ link, message }) => (
  <Choose>
    <When condition={link}>
      <Link to={link}>
        {message}
      </Link>
    </When>
    <Otherwise>{message}</Otherwise>
  </Choose>
)

Notification.propTypes = {
  link: PropTypes.string,
  message: PropTypes.string
}

export default ({ type, message, link }) =>
  toast[type](<Notification message={message} link={link} />)
