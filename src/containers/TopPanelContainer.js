import React, { useContext, useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import { UserContext } from '../UserContext'
import TopPanel from '../components/TopPanel'
import { url } from '../requests'
import styled from 'styled-components'

const Grid = styled.div` 


`

const TopPanelContainer = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [noteText, setNotes] = useState(currentUser.note.text)
    console.log("noteText", noteText)
    // const fetchNotes = () => {

    //     fetch(`${url}/users/${currentUser.id}/notes`)
    //         .then(r => r.json())
    //         .then(setNotes)
    // }

    // useEffect(() => {

    //     if (currentUser) {
    //         fetchNotes()
    //     }

    // }, [])
    const editNotes = (event, noteText, id) => {
        event.preventDefault()
        console.log("note in edit", noteText)
        console.log("currentUser.note", currentUser.note)
        console.log("currentUser", currentUser)

        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ text: noteText, user_id: currentUser.id })
        }
        fetch(`${url}/users/${currentUser.id}/notes/${id}`, options)
            .then(r => r.json())
            .then(updatedNote => {
                console.log('updatedNote', updatedNote)
                setCurrentUser({ ...currentUser, note: updatedNote })
            })


    }
    

    return (
        <>
            {!currentUser ? <LoginPage /> :
                
                    <Grid>
                        <TopPanel
                            noteText={noteText}
                            setNotes={setNotes}
                            editNotes={editNotes} /> 
                        {console.log('note in render', noteText)}
                    </Grid>
                
                }
        </>
    )
}

export default TopPanelContainer
