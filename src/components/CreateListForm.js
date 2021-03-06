import React, { useState, useContext } from 'react'
import TextArea from 'react-textarea-autosize'
import { Card, Button, makeStyles } from '@material-ui/core';
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
    color: inherit;
    font-family: inherit;
`;

const useStyles = makeStyles((theme) => ({
    addList: {
        backgroundColor: 'lightgreen',
        marginBottom: '20px',
        marginTop: '10px',
        shadow: '20px',
        fontFamily: 'Comfortaa',
        '&:hover': {
            backgroundColor: '#FA7E65',
            boxShadow: '0px 15px 20px rgba(46, 229, 157, 0.4)',
            transform: 'translateY(-4px)',
        },
        transition: 'all 0.3s ease 0s',
        boxShadow: '0px 8px 15px rgba(0, 0.2, 0, 0.2)',
        
    }

}))

const titleize = require('titleize');

const CreateListForm = ({ handleAddList }) => {
    const classes = useStyles();
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
        return <Button
                    className={classes.addList}
                    onClick={openForm} >
                Add List
            </Button>

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
                        value={titleize(title)}
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
                    style={{
                        backgroundColor: 'lightgreen',
                        marginTop: '5px',
                    }}
                    >Save List
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
