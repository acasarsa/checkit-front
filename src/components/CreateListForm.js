import React, { useState, useContext } from 'react'
import TextArea from 'react-textarea-autosize'
import { Card, Button } from '@material-ui/core';
import styled from "styled-components";
import { UserContext } from '../UserContext'
import { ListContext } from '../ListContext'

const Container = styled.div`
    width: 284px;
    margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
    min-height: 85px;
    padding: 6px 8px 2px;
`;

const StyledTextArea = styled(TextArea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
`;

const CreateListForm = ({ handleAddList }) => {
    const [currentUser] = useContext(UserContext)
    const [lists, setLists] = useContext(ListContext)

    const [title, setTitle] = useState('')
    /// if this fucks up switch it all to title instead of text // i think it shouldn't matter though. 
    const [listFormOpen, setListFormOpen] = useState(false)

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const openForm = () => {
        setListFormOpen(!listFormOpen)
        // want it to just set it to false really but this seemed to work better for now
    }

    const closeForm = () => {
        setListFormOpen(false)
    }

    const renderOpenListButton = () => {
// onClick should open the form and a textArea will appear. 
        /// inside the form itself you will have an onBlur that uses handleCloseForm
        return <button onClick={openForm} >
                Add List
            </button>

    }

    const newOrder = lists.length
    
    const renderListForm = () => {
        return (
            <Container>
                <StyledCard>
                    <form  >
                    <StyledTextArea
                        onChange={handleChange}
                        autoFocus
                        value={title}
                        placeholder="Add List..."
                        onBlur={closeForm}
                    />
                    </form>
                </StyledCard>
                    <Button
                    onMouseDown={(e) => {
                        handleAddList(e, title, newOrder ) 
                        setTitle('')
                        closeForm()
                    }}
                        type='submit'
                        style={{backgroundColor: 'lightgreen'}}
                    >Add List
                    </Button>

            </Container>
        )
    }

    return !listFormOpen ? (
        <div>
            {renderOpenListButton()}
        </div>
    ) : (
                
        renderListForm()
    )
        
}

export default CreateListForm
