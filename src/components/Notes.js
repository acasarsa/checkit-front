import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";
import {url} from '../requests'
import FormControlLabel from '@material-ui/core/FormControlLabel';


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




const Notes = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    console.log("note", currentUser.note)
    
    const [note, setNotes] = useState('')
    console.log("notes from state", note)
    
    const fetchNotes = () => {

        fetch(`${url}/users/${currentUser.id}/notes`)
            .then(r => r.json())
            .then(setNotes)
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchNotes()
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // useEffect(() => {
    //     fetchNotes()
    // }, [])
    
    const editNotes = () => {

        fetch(`${url}/users/${currentUser.id}/notes/${note.id}`)
            .then(r => r.json())
            .then(setNotes )
        
        
    }
    const handleChange = (event) => {
        setNotes( event.target.value)
    }
    // const editNotes = () => {

    //     fetch(`${url}/users/${currentUser.id}/notes/1`)
    //         .then(r => r.json())
    //         .then(updatedNote => setCurrentUser({...currentUser, note: updatedNote}) )
        
        
    // }
    
    // const handleChange = (event) => {
    //     setCurrentUser({...currentUser, note: event.target.value})
    // }
    
    // const delay = (function () {
    //     let timer = 5000;
    //     return function (callback, ms) {
    //         clearTimeout(timer);
    //         timer = setTimeout(callback, ms);
    //     };
    // })();
    
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         editNotes()
    //     }, 10000);
    //     return () => clearTimeout(timer);
    // }, []);


    
    
    return (
        <styledDiv>
            <form >
                <h4 >Notes:</h4>
                <StyledTextArea
                        // onChange={handleChange}
                    onChange={handleChange}
                    value={note.text}
                    placeholder="Add Notes..."
                    onBlur={editNotes}
                >{note.text}
                    
                
                </StyledTextArea>

            
            </form>
        </styledDiv>
                
    )
}

const styledDiv = styled.div`  
    margin-left: 10px;
    

`

export default Notes
