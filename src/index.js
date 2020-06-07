import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserProvider } from './UserContext'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))
// const store = createStore(rootReducer)


ReactDOM.render(

  <UserProvider>
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>
  </UserProvider>

  , document.getElementById('root'));