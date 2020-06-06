import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk'
import { UserProvider } from './UserContext'
// import { reducer } from './reducer';

// let store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  // <Provider store={store}>
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
  // </Provider >
  , document.getElementById('root'));