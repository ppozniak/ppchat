import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/reducer';

import ChatApp from './ChatApp';
import Login from './Login';

const store = createStore(reducer);

// store.subscribe(() => {
//   console.log(store.getState());
// })

const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={ Login } />
        <Match pattern="/chat" component={ ChatApp } />
      </div>
    </BrowserRouter>
  </Provider>
)

render(<App />, document.getElementById('chat'));
