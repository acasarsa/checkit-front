import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';





const StyledContainer = styled.div` 
    background-color: cornsilk;
    ${'' /* max-width: fit-content;
    margin-top: 50%;
    display: inline-block;
    margin: auto; */}
    width: 400px;
    padding: 70px 0;
    ${'' /* border: 3px solid green; */}
    text-align: center;
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

const LoginForm = ({ findOrCreateUser }) => {

    const [username, setUsername] = useState('')

    const handleLogin = (event) => {
        setUsername(event.target.value)
    }
    
    return (
        <>
            {/* <center> */}
        
        <StyledContainer>
            <h1>Login</h1>
                <form  onSubmit={(event) => findOrCreateUser(event, username)} >
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
            
        </StyledContainer>
            {/* </center> */}
        </>
    )
}

export default LoginForm
