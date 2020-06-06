import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'


const url = 'http://localhost:3000/api/v1'

class App extends Component {
    
    state = {
        currentUser: '',
        loggedIn: false, //may not need this actually 
        username: '',
        lists: [],
        // tasks: [],
        // user_id: '',
        // list_id: '',

    }
    // get the value of the username from the login form 
    // do a post with that value 

    // componentDidMount() {

    // }

    fetchCurrentUserLists = (user_id) => {
        fetch(`${url}/users/${user_id}/lists`)
            .then(r => r.json())
            .then(lists => this.setState({
                lists
            }))
    }

    // fetchCurrentUserTasks = () => {
    //     fetch(`${url}/tasks`)
    //         .then(r => r.json())
    //         .then(tasks => this.setState({
    //             tasks
    //         }))
    // }


    handleLogin = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    findOrCreateUser = (event) => {
        event.preventDefault()
        const {username} = this.state
        let newUser = { username }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newUser)
        }

        fetch(`${url}/users`, options)
            .then(r => r.json())
            .then(userObj => this.setState({
                currentUser: userObj,
                loggedIn: true,
                username: ''
            }, () => {
                    let userID = userObj.id

                    this.props.history.push('/home')
                    this.fetchCurrentUserLists(userID)

                    console.log('lists state', this.state.lists)
                    
            }))

    }

    render() {
        const {currentUser, lists, loggedIn, username} = this.state
        console.log('props', this.props)
        console.log('state', this.state)
        return (
            <div>
                <h1>App</h1>
                {!loggedIn 

                ? <LoginPage 
                    findOrCreateUser={this.findOrCreateUser} 
                    handleLogin={this.handleLogin}
                    username={username}
                />
                :
                <Switch>
                    <Route path='/home' 
                        render={(routerProps) => <ListContainer 
                            {...routerProps}
                            lists={lists}
                            currentUser={currentUser}
                            loggedIn={loggedIn}
                            {...this.state}
                        /> }
                    />

                    <Route exact path='/login'
                    render={(routerProps) =>
                        <LoginPage
                            {...routerProps}
                            findOrCreateUser={this.findOrCreateUser} 
                            handleLogin={this.handleLogin}
                            username={this.state.username}
                            />} />
                </Switch>
                }
            </div>
        )
    }
}


export default withRouter(App);


// index route for lists 
// just want users lists 
// 1. pass in user id as a param to get 
// 2. use nested routes set that up /users/12/lists
// nested routes users do lists
// may only need nested routes 
// local storage 