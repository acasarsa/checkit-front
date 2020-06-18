import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";
import {url} from '../requests'
import FormControlLabel from '@material-ui/core/FormControlLabel';


const StyledTextArea = styled(TextArea)`

    box-sizing: border-box;
    resize: none;
    width: 300px;
    min-height: 90px;
    max-height: 90px;
    overflow: hidden;
    outline: none;
    border: none;
    margin-left:0px;
    margin-bottom: 10px;
    margin-top: 2px;
    color: inherit;
    font-family: inherit;
    border-radius: 10px;
    line-height: 1.6;
    padding-inline-start: 10px; 
`;

const StyledDiv = styled.div`  
    margin-left: 10px;
    

`
const NotesTitle = styled.h4` 
    margin-top: 10px;
    margin-bottom: 10px;
    color: rgb(250, 101, 126);
`



const Notes = ({ noteText, setNotes, editNotes}) => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    console.log('note text', noteText)

    
    const handleChange = (event) => {
        // setCurrentUser( ...currentUser, {...note, text: event.target.value} )
        setNotes( event.target.value )
    }


    
    
    return (
        <StyledDiv>
            <form >
                <NotesTitle >Notes:</NotesTitle>
                <StyledTextArea
                    onChange={handleChange}
                    value={noteText}
                    placeholder="Add Notes..."
                    onMouseOut={(event) => editNotes(event, noteText, currentUser.note.id )}
                >{noteText}
                    
                
                </StyledTextArea>
                {console.log("note id: ", currentUser.note.id)}
            
            
            </form>
        </StyledDiv>
                
    )
}



export default Notes
