import React, {useState, createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState('') // [this.state.currentUser, this.setState({currentUser: ...})]

    return (

        <UserContext.Provider
            value={[currentUser, setCurrentUser]}>
            {props.children}
        </UserContext.Provider>
    )
}

