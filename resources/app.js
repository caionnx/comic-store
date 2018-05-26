import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './js/routers/AppRouter'
import 'normalize.css/normalize.css'
import './styl/app.styl'

const appNode = document.getElementById('app')
ReactDOM.render(<AppRouter />, appNode)
