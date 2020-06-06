import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import {url} from '../requests'

const ListContainer = () => {

    // const [userID, setUserID] = useContext(UserContext)
    const [currentUser, setCurrentUser] = useContext(UserContext)

    const [lists, setLists] = useState([])


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
    ${'' /* align-items: center; */}
    ${'' /* box-sizing: border-box; */}
    ${'' /* display: grid;
    grid-template-columns: auto auto auto;
    align-content: flex-start;
    justify-content: center;
    min-height: 1150px;
    min-width: auto;
    margin-top: 50px; */}
`
// const GridItem = styled.div ` 
//     padding: 5px;
//     width: auto;
//     max-height: auto;
//     max-width: auto;
//     min-width: 500px;
//     margin: 10px;
//     line-height: auto;
//     font-weight: bold;
// `
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
