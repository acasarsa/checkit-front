import React, { useState, useEffect, useContext } from 'react'
import TextArea from 'react-textarea-autosize'
import { Card, Button } from '@material-ui/core';
import styled from "styled-components";
import { TaskTextContext } from '../TaskTextContext'

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

const CreateTaskForm = ({ handleAddTask, listID, setTaskText, taskText }) => {
    
    // const [taskText, setTaskText] = useContext(TaskTextContext)
    // const [text, setText] = useState('')

    /// if this fucks up switch it all to title instead of text // i think it shouldn't matter though. 
    const [formOpen, setFormOpen] = useState(false)

    const handleChange = (event) => {
        setTaskText(event.target.value)
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
                Add Task
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
                        value={taskText}
                        placeholder="Add Task..."
                        onBlur={closeForm}
                    />
                    </form>
                </StyledCard>
                    <Button
                    onMouseDown={(e) => {
                        handleAddTask(e, taskText, listID) 
                        setTaskText('')
                        closeForm()
                    }}
                        type='submit'
                        style={{backgroundColor: 'lightGreen'}}
                    >Add Task
                    </Button>
            </Container>
        )
    }

    return !formOpen ? (
        <div>
            {renderOpenFormButton()}
        </div>
    ) : (
        
                
            renderForm()
        
        )
    

        
}

export default CreateTaskForm
