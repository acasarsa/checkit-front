import React, {useState, createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState('') // [this.state.currentUser, this.setState({currentUser: ...})]
    const [username, setUsername] = useState('')
    
    const [userID, setUserID] = useState('')

    return (

        <UserContext.Provider
            value={
                [currentUser, setCurrentUser],
                [username, setUsername],
                [userID, setUserID],
                currentUser,
                userID
            }>
            {props.children}
        </UserContext.Provider>
    )
}

