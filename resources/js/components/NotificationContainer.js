import React from 'react'
import { ToastContainer } from 'react-toastify'

const NotificationContainer = () => (
  <ToastContainer
    position='bottom-right'
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick={false}
    rtl={false}
    pauseOnVisibilityChange
    draggable
    pauseOnHover={false} />
)

export { NotificationContainer }
