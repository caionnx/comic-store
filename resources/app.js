import React from 'react'
import ReactDOM from 'react-dom'
import FrontPage from './js/FrontPage'
import 'normalize.css/normalize.css'
import './styl/app.styl'

const appNode = document.getElementById('app')
ReactDOM.render(<FrontPage />, appNode)
