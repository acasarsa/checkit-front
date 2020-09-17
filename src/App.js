import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'
import { UserContext } from './UserContext'
import { ListProvider } from './ListContext'
import TopPanelContainer from './containers/TopPanelContainer'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { url } from './requests'
import { keyframes } from "styled-components";
import running from './images/running.gif'
import SignIn from './components/SignInForm';

// const GlobalStyle = createGlobalStyle`
//     body {
//         background-image: ${props => (props.background ? url('./images/background.jpg') : null)};
//     }
// `




const MainDiv = styled.div`
    color: green;

`

const leftWalk = keyframes`
    from {
        right: -50%;
    }
    to {
        right: 105%;
    }
    
`;

// on click pause button will set opacity to 0 

const BackgroundAnimation = styled.div`
    position: absolute;
    bottom: 2px;
    animation: ${leftWalk} 16s linear infinite;
    opacity: ${props => props.currentUser ? 1 : 0}
`

const App = () => {


    const [currentUser] = useContext(UserContext)
    console.log('currentUser',currentUser)
    // console.log('notes', currentUser.note.text)


    return (
        <>
            {/* <GlobalStyle /> */}
            <MainDiv currentUser={currentUser} >
                {/* <Route path='/signin' component={SignIn} /> */}
                {!currentUser

                    ?
                    <Switch>
                        <Route component={LoginPage} />
                        {/* <Route component={SignIn} /> */}
                        
                    </Switch>

                    :

                    <>
                        <TopPanelContainer  />
                        <Switch>

                            <ListProvider>
                                <Route path='/home' component={ListContainer} />
                            </ListProvider>

                            <Route exact path='/login' component={LoginPage} />
                        </Switch>
                    </>

                }
                <BackgroundAnimation currentUser={currentUser} >
                    <img src={running} alt="" />
                </BackgroundAnimation>
            </MainDiv>
        </>
    )

}


export default withRouter(App);

