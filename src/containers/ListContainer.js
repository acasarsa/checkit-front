import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import { url } from '../requests'
import { connect } from 'react-redux'
    
const GridContainer = styled.div ` 
    display: flex;
    flex-direction: row;
`
const ListContainer = () => {

    const [lists, setLists] = useState([])
    // u can delete this once you know how to do the fetch. you will need to do a dispatch
    
    const [currentUser] = useContext(UserContext)

    const fetchCurrentUserLists = () => {
    fetch(`${url}/users/${currentUser.id}/lists`)
        .then(r => r.json())
        .then(lists => setLists(lists))
    }

    useEffect(() => {
        fetchCurrentUserLists()
    }, [])

//////////////////////////////////////////////////////////////////
////// this crud can go into createCard once redux is working ////
//////////////////////////////////////////////////////////////////

    




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

const msp = state => {
    return {
        lists: state.sushis
    }
}

export default connect(msp)(ListContainer)
