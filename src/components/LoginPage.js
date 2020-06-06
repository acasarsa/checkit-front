import React, {useContext} from 'react'
import LoginForm from './LoginForm'
import { UserContext } from '../UserContext'
import {url} from '../requests'

const LoginPage = (props) => {

    const [userID, setUserID] = useContext(UserContext)
    const [username, setUsername] = useContext(UserContext)
    const [currentUser, setCurrentUser] = useContext(UserContext)

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
                setUserID(userObj.id)
                history.push('/home') 
            } )
    }

    
    return (
        <div>
            <LoginForm {...props} />
        </div>
    )
}

export default LoginPage
