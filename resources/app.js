import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './js/routers/AppRouter'
import configureStore from './js/store/configureStore'
import 'normalize.css/normalize.css'
import './styl/app.styl'

const store = configureStore()
const appNode = document.getElementById('app')
ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, appNode)
