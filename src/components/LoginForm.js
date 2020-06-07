import React, { useState } from 'react'

const LoginForm = ({ findOrCreateUser }) => {

    const [username, setUsername] = useState('')

    const handleLogin = (event) => {
        setUsername(event.target.value)
    }
    
    return (
        <>
        <h1>Login</h1>
        <form  onSubmit={(event) => findOrCreateUser(event, username)}>
            <label>Username:</label>
                <input
                    onChange={handleLogin}
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter Username"
                />
                <button >Login</button>
        </form>
        </>
    )
}

export default LoginForm
