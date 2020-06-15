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
import background from './images/background.jpg'


import running from './images/running.gif'

// const GlobalStyle = createGlobalStyle`
//     body {
//         background-image: ${props => (props.background ? url('./images/background.jpg') : null)};
//     }
// `

const GlobalStyle = createGlobalStyle`
    body {
        color: green;
        background-color: 'paleredviolet';
        ${'' /* background-image: background */}
    }
`


const MainDiv = styled.div`


`


const BackgroundAnimation = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    opacity: ${props => props.currentUser ? 1 : 0 }

`

const App = () => {

    // get the value of the username from the login form 
    // do a post with that value 

    const [currentUser] = useContext(UserContext)
    const [notes, setNotes] = useState('')

    const fetchNotes = () => {

        fetch(`${url}/users/${currentUser.id}/notes`)
            .then(r => r.json())
            .then(setNotes)
    }

    useEffect(() => {
        fetchNotes()
    }, [])
    
    return (
        <>
        <GlobalStyle  />
        <MainDiv currentUser={currentUser} >
                {!currentUser 
                
                ?
                <Switch>
                    <Route component={LoginPage} />
                </Switch>

                :
                
                <>
                    <TopPanelContainer notes={notes[0]} />
                <Switch>
                    
                    <ListProvider>
                        <Route path='/home' component={ListContainer}  />    
                    </ListProvider>

                    <Route exact path='/login' component={LoginPage} />
                    </Switch>
                </>
            
            }
                    <BackgroundAnimation currentUser={currentUser} >
                        <img src={running} alt=""/>
                    </BackgroundAnimation>
            </MainDiv>
        </>
    )
    
}


export default withRouter(App);


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