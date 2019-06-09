import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { addUser } from './actions';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import handleNewMessage from './sagas';
import setupSocket from './sockets';
import username from './utils/name'; // this generates random name


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

const socket = setupSocket(store.dispatch, username);

sagaMiddleware.run(handleNewMessage, { socket, username });

store.dispatch(addUser(username));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
