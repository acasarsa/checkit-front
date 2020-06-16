import React, { useContext, useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import { UserContext } from '../UserContext'
import TopPanel from '../components/TopPanel'
import { url } from '../requests'

const TopPanelContainer = () => {
    const [currentUser] = useContext(UserContext)
    const [note, setNotes] = useState('')
    const fetchNotes = () => {

        fetch(`${url}/users/${currentUser.id}/notes`)
            .then(r => r.json())
            .then(setNotes)
    }

    useEffect(() => {

        if (currentUser) {
            fetchNotes()
        }

    }, [])

    return (
        <>
            {!currentUser ? <LoginPage /> :
                
                    <div>
                    <TopPanel note={note} setNotes={setNotes} /> 
                    {console.log('note in render', note, "id:", note.id)}
                    </div>
                
                }
        </>
    )
}

export default TopPanelContainer
