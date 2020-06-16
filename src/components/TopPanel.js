import React, { useContext } from 'react'
import styled from 'styled-components'
import Notes from './Notes'
import ThisWeek from './ThisWeek'
import { UserContext } from '../UserContext'

const StyledTopPanel = styled.div`
    overflow: hidden;
    background-color: paleturquoise;
    opacity: 0.9;
    width: 100%;
    height: auto;
    size: cover;
    margin-bottom: 10px;
    padding-inline-start: 20px;
    border: none;
    
    
`
const FlexContainer = styled.div` 
    display: flex;
    flex-direction: row;

`

const TopPanel = () => {
    const [currentUser] = useContext(UserContext)
    


    return (
        <StyledTopPanel>
            <h5>WELCOME {currentUser.username.toUpperCase()}</h5>
            
                <Notes />
                <ThisWeek />
            
        </StyledTopPanel>
    )
}

export default TopPanel
