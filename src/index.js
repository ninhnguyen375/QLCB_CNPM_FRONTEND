import React from 'react'
// import 'antd/dist/antd.less'
import './index.less'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Root from './common/hocs/Root'
import store, { history } from './common/store'
import './assets/css/bootstrap-grid.css'
import './assets/css/styles.less'

ReactDOM.render(
  <Root {...store} history={history} />,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
