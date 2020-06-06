import React, {useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'


const url = 'http://localhost:3000/api/v1'

const App = ({history}) => {
    
    const [currentUser, setCurrentUser] = useState('') // [this.state.currentUser, this.setState({currentUser: ...})]
    const [username, setUsername] = useState('')
    const [lists, setLists] = useState([])
    // get the value of the username from the login form 
    // do a post with that value 


    const handleLogin = (event) => {
        setUsername(event.target.value)
    }


    const findOrCreateUser = (event) => {
        event.preventDefault()
        // const {username} = this.state

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ username })
        }
        
        fetch(`${url}/users`, options)
            .then(r => r.json())
            .then(userObj => {
                setCurrentUser(userObj)
                setUsername('')

                history.push('/home') 
                fetchCurrentUserLists(userObj.id)
            } )
    }

    const fetchCurrentUserLists = (userID) => {
        fetch(`${url}/users/${userID}/lists`)
            .then(r => r.json())
            .then(lists => setLists(lists))
    }
    
    return (
        <div>
            <h1>App</h1>
            {!currentUser 

            ? <LoginPage 
                findOrCreateUser={findOrCreateUser} 
                handleLogin={handleLogin}
                username={username}
            />
            :
            <Switch>
                <Route path='/home' 
                    render={(routerProps) => <ListContainer 
                        {...routerProps}
                        lists={lists}
                        currentUser={currentUser}
                    /> }
                />

                <Route exact path='/login'
                render={(routerProps) =>
                    <LoginPage
                        {...routerProps}
                        findOrCreateUser={findOrCreateUser} 
                        handleLogin={handleLogin}
                        username={username}
                        />} />
            </Switch>
            }
        </div>
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