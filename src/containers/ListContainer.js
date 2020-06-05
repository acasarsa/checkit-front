import React from 'react'
import LoginPage from '../components/LoginPage'

const ListContainer = (props) => {
    return (
        
        <div>
            {!props.loggedIn ? <LoginPage /> :
            
                <h1>WELCOME {props.currentUser.username.toUpperCase()}</h1>
            
            }
            
        </div>
    )
}

export default ListContainer
