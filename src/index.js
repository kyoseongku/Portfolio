import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'

import './index.css'
import Main from './Main'
import AR from './AR'

const history = History.createBrowserHistory()
const store = createStore(
  connectRouter(history)(combineReducers({ x: ((s = {}) => s) })),
  {},
  compose(applyMiddleware(thunk, routerMiddleware(history)))
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/ar' component={AR}/>
        <Route component={Main}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)

