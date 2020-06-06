import React, { useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'
import { UserProvider, UserContext } from './UserContext'


const url = 'http://localhost:3000/api/v1'

const App = ({history}) => {

    // get the value of the username from the login form 
    // do a post with that value 

    const [currentUser, setCurrentUser] = useContext(UserContext)

    


    
    return (
        <UserProvider>
            <div>
                <h1>App</h1>
                {!currentUser 

                ? <LoginPage 
                    // findOrCreateUser={findOrCreateUser} 
                    // handleLogin={handleLogin}
                    // username={username}
                />
                :
                <Switch>
                    <Route path='/home' 
                        render={(routerProps) => <ListContainer 
                            {...routerProps}
                            // lists={lists}
                            // currentUser={currentUser}
                        /> }
                    />

                    <Route exact path='/login'
                    render={(routerProps) =>
                        <LoginPage
                            {...routerProps}
                            // findOrCreateUser={findOrCreateUser} 
                            // handleLogin={handleLogin}
                            // username={username}
                            />} />
                </Switch>
                }
            </div>
        </UserProvider>
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