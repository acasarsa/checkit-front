import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Notes from './Notes'
import ThisWeek from './ThisWeek'
import { UserContext } from '../UserContext'
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { ListContext } from '../ListContext'


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
    font-size: 35px;
    color: 'green';
    position:absolute;
    top:40%;
    right:60px;
`


const Row = styled.div` 
    display: flex;
    overflow: hidden;
    background-image: linear-gradient(to top right, paleturquoise, palegreen);
    border-radius: 10px;
    height: auto;
    margin-bottom: 10px;
    border: none;
    position: relative;
    width: 100%;
    ${'' /* padding: 30px, 50px; */}
    padding-inline-start: 20px; 
    background-size: cover;
    opacity: 0.9;

`
const Col = styled.div` 
    flex: ${(props) => props.size};
    background-color: ${(props) => props.backgroundColor};
    text-align: ${(props) => props.textAlign};
    align-items: ${(props) => props.itemAlign};

`
const StyledText = styled.li` 
    color: rgb(250, 101, 126);
    font-size: 25px;
    margin: 10px;



`

const Span = styled.span`  
    color: 'red'
`
// const TaskCountCol = styled.div` 


// `
// const LogoColumn = styled.div` 


// `
const useStyles = makeStyles((theme) => ({
    welcome: {
        marginBottom: '4px',
        marginTop: '4px'
    }
}));


const TopPanel = ({ noteText, setNotes, editNotes }) => {
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useContext(UserContext)
    
    
    return (
        <Row>
            <Col size={1}>
                <Typography className={classes.welcome} component='h3' variant="h5"
                >Welcome {titleize(currentUser.username)}
                </Typography>

                <Notes noteText={noteText} setNotes={setNotes} editNotes={editNotes} />
            </Col>
            
            <Col size={2} textAlign={'right'} >
        
            </Col>
            
            
            <Col size={1}>
                <StyledLogoText>
                    CheckIt 
                </StyledLogoText>
            
            </Col>
        </Row>
    


    )
}

export default TopPanel


