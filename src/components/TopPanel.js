import React, { useContext } from 'react'
import styled from 'styled-components'
import Notes from './Notes'
import ThisWeek from './ThisWeek'
import { UserContext } from '../UserContext'
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core/';
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

const Grid = styled.div` 


`
const Row = styled.div` 


`
const NotesColumn = styled.div` 


`
const TaskCountCol = styled.div` 


`
const LogoColumn = styled.div` 


`
const useStyles = makeStyles((theme) => ({
    welcome: {
        marginBottom: '4px',
        marginTop: '4px'
    }
}));


const TopPanel = ({ noteText, setNotes, editNotes }) => {
    const classes = useStyles();

    const [currentUser] = useContext(UserContext)



    return (
        <StyledTopPanel>
            <Typography className={classes.welcome} component='h3' variant="h5"
            >Welcome {titleize(currentUser.username)}</Typography>
            
            <Notes noteText={noteText} setNotes={setNotes} editNotes={editNotes} />
                <ThisWeek />
            <StyledLogoText>
                CheckIt
            </StyledLogoText>
        </StyledTopPanel>
    )
    
    return (
        <Grid>
            <Row>
                <NotesColumn>
                    <Typography className={classes.welcome} component='h3' variant="h5"
                    >Welcome {titleize(currentUser.username)}</Typography>

                    <Notes note={noteText} setNotes={setNotes} editNotes={editNotes} />
                </NotesColumn>
                
                <TaskCountCol>
                
                </TaskCountCol>
                
                
                <LogoColumn>
                    <StyledLogoText>
                        CheckIt
                    </StyledLogoText>
                
                </LogoColumn>

                
            
            </Row>
        </Grid>


    )
}

export default TopPanel

// may want to make topPanel

