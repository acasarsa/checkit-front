import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";
import {url} from '../requests'


const StyledTextArea = styled(TextArea)`


    resize: none;
    width: 300px;
    min-height: 50px;
    max-height: 90px;
    overflow: hidden;
    outline: none;
    border: none;
    margin-left: 10px;
    margin-bottom: 10px;
`;



const Notes = ({notes}) => {
    
    const [currentUser] = useContext(UserContext)
    // const [notes, setNotes] = useState('')
    
    // const fetchNotes = () => {
    
    //     fetch(`${url}/users/${currentUser.id}/notes`)
    //         .then(r => r.json())
    //         .then( setNotes )
    // }
    
    // useEffect(() => {
    //     fetchNotes()
    // }, [])
    
    const editNotes = () => {

        fetch(`${url}/users/${currentUser.id}/notes/${notes.id}`)
            
        
        
    }
    console.log("notes", notes)
    console.log("notes", notes.text)
    return (
            <form >
            <h4>Notes:</h4>
                <StyledTextArea
                    // onChange={handleChange}
                    
                value={notes.text}
                placeholder="Add Notes...">{notes.text}
            
            </StyledTextArea>

        
            </form>
                
    )
}

export default Notes
