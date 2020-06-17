import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';





const StyledContainer = styled.div` 
    ${'' /* background-color: cornsilk; */}
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

const useStyles = makeStyles((theme) => ({
    paper: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        alignItems: 'center',
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}))

const LoginForm = ({ findOrCreateUser }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('')

    const handleLogin = (event) => {
        setUsername(event.target.value)
    }
    
    return (
        <>
            {/* <center> */}
        
            <StyledContainer>
                <div className={classes.paper}>
                
                
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <h1>Login</h1>
                
                <form className={classes.form} onSubmit={(event) => findOrCreateUser(event, username)} >
                    {/* <label>Username:</label> */}
                    
                        <TextField
                            onChange={handleLogin}
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter Username"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Login
                    </Button>
                </form>
            </div>
        </StyledContainer>
            {/* </center> */}
        </>
    )
}

export default LoginForm
