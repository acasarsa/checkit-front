import React, {useContext} from 'react'
import LoginForm from './LoginForm'
import { UserContext } from '../UserContext'
import {url} from '../requests'

const LoginPage = (props) => {

    const [currentUser, setCurrentUser] = useContext(UserContext)


    const findOrCreateUser = (event, username) => {
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
        if (username === "") {
            alert("Username must not be blank")
        } else {

            fetch(`${url}/users`, options)
                .then(r => r.json())
                .then(userObj => {
                    setCurrentUser(userObj)
                    props.history.push('/home') 
    
                } )
        }
    }

    
    return (
        <center>
        <div>
            <LoginForm
                findOrCreateUser={findOrCreateUser}
                
                />
        </div>
        </center>
    )
}

export default LoginPage
