import React from 'react'

const LoginForm = ({ findOrCreateUser, handleLogin, username }) => {
    
    return (
        <>
        <h1>Login</h1>
        <form  onSubmit={findOrCreateUser}>
            <label>Username:</label>
                <input
                    onChange={handleLogin}
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter Username"
                />
                <button  >Login</button>
        </form>
        </>
    )
}

export default LoginForm
