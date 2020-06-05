import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import ListContainer from './containers/ListContainer'


const url = 'http://localhost:3000/api/v1'

class App extends Component {
    
    state = {
        currentUser: '',
        loggedIn: false,
        username: '',
        lists: [],
        tasks: [],
    }
    // get the value of the username from the login form 
    // do a post with that value 

    componentDidMount() {
        this.fetchLists()
        this.fetchTasks()
    }

    fetchLists = () => {
        fetch(`${url}/lists`)
            .then(r => r.json())
            .then(lists => this.setState({
                lists
            }))
    }

    fetchTasks = () => {
        fetch(`${url}/tasks`)
            .then(r => r.json())
            .then(tasks => this.setState({
                tasks
            }))
    }


    handleLogin = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    findOrCreateUser = (event) => {
        event.preventDefault()
        const {username} = this.state
        let newUser = {username}

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
                console.log('hit')
                this.props.history.push('/home')
            }))
    }

    render() {
        const {currentUser} = this.state
        console.log('props', this.props)
        console.log('state', this.state)
        return (
            <div>
                <h1>App</h1>
                {!currentUser 

                ? <LoginPage 
                    findOrCreateUser={this.findOrCreateUser} 
                    handleLogin={this.handleLogin}
                    username={this.state.username}
                />
                :
                <Switch>
                    <Route path='/home' 
                        render={(routerProps) => <ListContainer 
                            {...routerProps}
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
