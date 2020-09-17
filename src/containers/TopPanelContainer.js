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
    console.log('note',currentUser.note)
    const [noteText, setNotes] = useState(currentUser.note.text)

    const editNotes = (event, noteText, id) => {
        event.preventDefault()

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
                    </Grid>
                
                }
        </>
    )
}

export default TopPanelContainer
