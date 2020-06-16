import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";
import {url} from '../requests'
import FormControlLabel from '@material-ui/core/FormControlLabel';


const StyledTextArea = styled(TextArea)`


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
`;

const StyledDiv = styled.div`  
    margin-left: 10px;
    

`
const NotesTitle = styled.h4`  
    margin-bottom: 10px;
    color: rgb(250, 101, 126);
`



const Notes = ({note, setNotes}) => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    // console.log("note", currentUser.note.id)
    
    
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         fetchNotes()
    //     }, 100);
    //     return () => clearTimeout(timer);
    // }, []);

    // useEffect(() => {
    //     fetchNotes()
    // }, [])
    
    // const editNotes = () => {

    //     let options = {
    //         method: 'PATCH', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify({text: note.text, user_id: currentUser.id})
    //     }
    //     fetch(`${url}/users/${currentUser.id}/notes/${note.id}`, options)
    //         .then(r => r.json())
    //         .then(setNotes )
        
        
    // }
    const editNotes = () => {
        console.log("currentUser.note.text", currentUser.note.text)
        let options = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({text: currentUser.note.text, user_id: currentUser.id})
        }
        fetch(`${url}/users/${currentUser.id}/notes/${currentUser.note.id}`, options)
            .then(r => r.json())
            .then(updatedNote => {
                console.log('updatedNote', updatedNote)
                setCurrentUser({ ...currentUser, note: updatedNote })
            })
        
        
    }

    
    const handleChange = (event) => {
        setCurrentUser({ ...currentUser, note: event.target.value })
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
        <StyledDiv>
            <form >
                <NotesTitle >Notes:</NotesTitle>
                <StyledTextArea
                        // onChange={handleChange}
                    onChange={handleChange}
                    value={currentUser.note.text}
                    placeholder="Add Notes..."
                    onBlur={editNotes}
                >{currentUser.note.text}
                    
                
                </StyledTextArea>

            
            </form>
        </StyledDiv>
                
    )
}



export default Notes
