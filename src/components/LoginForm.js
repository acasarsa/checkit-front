import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { BsCheckAll } from 'react-icons/bs';
import { FaCheckDouble, FaBlackTie } from 'react-icons/fa';
import { FiCheckSquare } from 'react-icons/fi';
import title from '../CSS/title.css'




const StyledContainer = styled.div` 
    ${'' /* background-color: cornsilk; */}
    ${'' /* max-width: fit-content;
    margin-top: 50%;
    margin: auto; */}
    ${'' /* display: inline-block; */}
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
        backgroundColor: 'transparent',
        // backgroundColor: 'rgb(250, 101, 126)',
        alignItems: 'center',
        fontSize: '30px',
        // fontSize: '100px',
        color: 'rgb(250, 101, 126)',
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'lightgreen',
        // backgroundColor: 'rgb(250, 101, 126)'
        fontFamily: 'Comfortaa',
        color: 'black',
        '&:hover': {
            backgroundColor: '#FA7E65',
            boxShadow: '0px 15px 20px rgba(46, 229, 157, 0.4)',
            transform: 'translateY(-4px)',
        },
        transition: 'all 0.3s ease 0s',
        boxShadow: '0px 8px 15px rgba(0, 0.2, 0, 0.2)',
    },

}))

const LoginForm = ({ findOrCreateUser }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('')

    const handleLogin = (event) => {
        setUsername(event.target.value)
    }
    
    // circularText(" C h e c k  I t                    ", 100, 0);

    // function circularText(txt, radius, classIndex) {
    //     txt = txt.split(""),
    //         classIndex = document.getElementsByClassName("circTxt")[classIndex];

    //     var deg = 360 / txt.length,
    //         origin = 0;

    //     txt.forEach((ea) => {
    //         ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
    //         classIndex.innerHTML += ea;
    //         origin += deg;
    //     });
    // }
    
    return (
        <>
            {/* <center> */}
        
            <StyledContainer>
                <div >
                    <h1 >
                        <span className="1">C</span>
                        <span className="2">h</span>
                        <span className="3">e</span>
                        <span className="4">c</span>
                        <span className="5">k</span>
                        {/* <span class="space">&nbsp;</span> */}
                        <span className="6">I</span>
                        <span className="7">t</span>
                        <span className="7">!</span>
                        
                    </h1>
                </div>
                <div className={classes.paper}>
                    {/* <div style={{ textAlign: 'center'}}>
                        <div className="circTxt" id="test">
                        </div>
                    </div> */}
                
                <Avatar className={classes.avatar}>
                        <FiCheckSquare />
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
