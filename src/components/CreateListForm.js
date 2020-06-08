import React, { useState, useEffect } from 'react'
import TextArea from 'react-textarea-autosize'
import { Card, Button } from '@material-ui/core';
import styled from "styled-components";

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

const CreateListForm = ({handleAddTask, listID}) => {

    const [title, setTitle] = useState('')
    /// if this fucks up switch it all to title instead of text // i think it shouldn't matter though. 
    const [formOpen, setFormOpen] = useState(false)

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const openForm = () => {
        setFormOpen(!formOpen)
        // want it to just set it to false really but this seemed to work better for now

    }

    const closeForm = () => {
        setFormOpen(false)
    }

    const renderOpenFormButton = () => {
// onClick should open the form and a textArea will appear. 
        /// inside the form itself you will have an onBlur that uses handleCloseForm
        return <button onClick={openForm} >
                Add List
            </button>


    }

    // useEffect(() => {
    //     renderForm()
    // }, [])

    const renderForm = () => {
        return (
            <Container>
                <StyledCard>
                    <form  >
                    <StyledTextArea
                        onChange={handleChange}
                        autoFocus
                        value={text}
                        placeholder="Add List..."
                        onBlur={closeForm}
                    />
                    </form>
                </StyledCard>
                    <Button
                    onMouseDown={(e) => {
                        handleAddList(e, text) 
                        setTitle('')
                        closeForm()
                    }}
                        type='submit'
                        style={{backgroundColor: 'white'}}
                    >Add List
                    </Button>
            </Container>
        )
    }

    return !formOpen ? (
        <div>
            {renderOpenFormButton()}
            {console.log(formOpen)}
        </div>
    ) : (
        <div>
                
            {renderForm()}
        </div>
    )
        
}

export default CreateListForm
