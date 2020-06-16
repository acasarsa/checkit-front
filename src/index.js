import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserProvider } from './UserContext'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import thunk from 'redux-thunk'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import css from './CSS/main.css'

const store = createStore(reducer, applyMiddleware(thunk))
// const store = createStore(rootReducer)
const GlobalStyle = createGlobalStyle`
    body {
        color: green;
        background-image: background;
        
    }
`

ReactDOM.render(

  <UserProvider>
    <Provider store={store} >
      <Router>
        <GlobalStyle/>
          <App />
      
      </Router>
    </Provider>
  </UserProvider>

  , document.getElementById('root'));