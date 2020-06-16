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

    // get the value of the username from the login form 
    // do a post with that value 
    const [currentUser] = useContext(UserContext)
    console.log(currentUser)
    // const [note, setNotes] = useState('')

    
    // const fetchNotes = () => {

    //     fetch(`${url}/users/${currentUser.id}/notes`)
    //         .then(r => r.json())
    //         .then(setNotes)
    // }

    // useEffect(() => {
        
    //     if (currentUser) {
    //         fetchNotes()
    //     }
        
    // }, [])


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

// note = { note } setNotes = { setNotes }

// index route for lists 
// just want users lists 
// 1. pass in user id as a param to get 
// 2. use nested routes set that up /users/12/lists
// nested routes users do lists
// may only need nested routes 
// local storage 

        // fetch(`${url}/users`, options)
        //     .then(r => r.json())
        //     .then(userObj => this.setState({
        //         currentUser: userObj,
        //         username: ''
        //     }, () => {
        //             let userID = userObj.id

        //             history.push('/home') 
        //             fetchCurrentUserLists(userID)

        //             // console.log('lists state', this.state.lists)
                    
        //     }))