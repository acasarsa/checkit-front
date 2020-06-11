import React, { useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'
import { UserContext } from './UserContext'
import { ListProvider } from './ListContext'
import { ListOrderProvider } from './ListOrderContext'
import TopPanelContainer from './containers/TopPanelContainer'
import styled from 'styled-components'

const MainDiv = styled.div`
    

`


const App = () => {

    // get the value of the username from the login form 
    // do a post with that value 

    const [currentUser] = useContext(UserContext)

    
    return (
        
        <MainDiv>

                {!currentUser 

                ?
                <Switch>
                    <Route component={LoginPage} />
                </Switch>

                :
                
                <>
                <TopPanelContainer />
                <Switch>
                    
                    <ListProvider>
                            <Route path='/home' component={ListContainer}  />    
                    </ListProvider>

                    <Route exact path='/login' component={LoginPage} />
                    </Switch>
                </>
                }
        </MainDiv>
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