import React from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';


const ListContainer = ({currentUser, lists}) => {

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
