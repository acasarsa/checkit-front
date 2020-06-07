import React, {useContext} from 'react'
import LoginForm from './LoginForm'
import { UserContext } from '../UserContext'
import {url} from '../requests'

const LoginPage = (props) => {

    console.log("login page props",props)
    const [setCurrentUser] = useContext(UserContext)


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
        
        fetch(`${url}/users`, options)
            .then(r => r.json())
            .then(userObj => {
                setCurrentUser(userObj)
                props.history.push('/home') 

            } )
    }

    
    return (
        <div>
            <LoginForm
                findOrCreateUser={findOrCreateUser}
                
                />
        </div>
    )
}

export default LoginPage
