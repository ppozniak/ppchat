import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/reducer';

import ChatApp from './ChatApp';
import Login from './Login';

const store = createStore(reducer);

console.log(store);

store.subscribe(() => {
  console.log(store.getState());
})

const App = (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route exactly path="/chat" component={ ChatApp } />
        <Route exactly path="/" component={ Login } />
      </Switch>
    </Router>
  </Provider>
);

render(App, document.getElementById('chat'));
