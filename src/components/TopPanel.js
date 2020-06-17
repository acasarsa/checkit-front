import React, { useContext } from 'react'
import styled from 'styled-components'
import Notes from './Notes'
import ThisWeek from './ThisWeek'
import { UserContext } from '../UserContext'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const titleize = require('titleize');

const StyledTopPanel = styled.div`
    overflow: hidden;
    background-image: linear-gradient(to top right, paleturquoise, palegreen);
    border-radius: 10px;
    background-color: paleturquoise;
    background-size: cover;
    opacity: 0.9;
    height: auto;
    size: cover;
    margin-bottom: 10px;
    padding-inline-start: 20px; 
    border: none;
    position: relative;
    width: 100%;


    
`
const FlexContainer = styled.div` 
    display: flex;
    flex-direction: row;

`

const StyledLogoText = styled.div` 
    font-family: 'Comfortaa';
    font-size: 30px;
    color: 'green';
    position:absolute;
    top:40%;
    right:50px;
`
const useStyles = makeStyles((theme) => ({
    welcome: {
        marginBottom: '4px',
        marginTop: '4px'
    }
}));


const TopPanel = ({ note, setNotes }) => {
    const classes = useStyles();

    const [currentUser] = useContext(UserContext)
    console.log("note id in top panel", note.id)


    return (
        <StyledTopPanel>
            <Typography className={classes.welcome} component='h3' variant="h5"
            >Welcome {titleize(currentUser.username)}</Typography>
            
            <Notes note={note} setNotes={setNotes}/>
                <ThisWeek />
            <StyledLogoText>
                CheckIt
            </StyledLogoText>
        </StyledTopPanel>
    )
}

export default TopPanel
