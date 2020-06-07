import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import {url} from '../requests'

const ListContainer = () => {

    const [lists, setLists] = useState([])
    
    const [currentUser] = useContext(UserContext)

    const fetchCurrentUserLists = () => {
    fetch(`${url}/users/${currentUser.id}/lists`)
        .then(r => r.json())
        .then(lists => setLists(lists))
    }

    // do i need this? do i need to pass something into it like i did in the fetch?
    useEffect(() => {
        fetchCurrentUserLists()
    }, [])

    const GridContainer = styled.div ` 
    display: flex;
    flex-direction: row;
`

    return (
        <>
        <div>
            {!currentUser ? <LoginPage /> :
            <>
                <h1>WELCOME {currentUser.username.toUpperCase()}</h1>
                <GridContainer>
                    {lists.map(list =>
                        <ListCard
                            key={list.id}
                            {...list}
                            currentUser={currentUser}
                            />)}
                </GridContainer>

            </>
            }
            
        </div>
        </>
    )
}

export default ListContainer
