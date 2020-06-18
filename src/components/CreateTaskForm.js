import React, { useState } from 'react'
import TextArea from 'react-textarea-autosize'
import { Card, Button, makeStyles } from '@material-ui/core';
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
    color: inherit;
    font-family: inherit;
    
`;

const useStyles = makeStyles((theme) => ({
    addTask: {
        backgroundColor: 'lightgreen',
        marginBottom: '20px',
        marginTop: '10px',
        shadow: '20px',
        fontFamily: 'Comfortaa',
        '&:hover': {
            backgroundColor: '#FA7E65',
            transform: 'translateY(-4px)',
        },
        transition: 'all 0.3s ease 0s',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
    },
}))

const titleize = require('titleize');



const CreateTaskForm = ({ listID, taskText, tasks, handleAddTask, setTaskText }) => {
    
    const classes = useStyles();
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
        setTaskText('')
    }

    const renderOpenFormButton = () => {
// onClick should open the form and a textArea will appear. 
        /// inside the form itself you will have an onBlur that uses handleCloseForm
    

        return <Button
                    className={classes.addTask}
                    onClick={openForm} >
                    Add Task
            </Button>
    


    }

    // useEffect(() => {
    //     renderForm()
    // }, [])
    const newOrder = tasks.length

    const renderForm = () => {
        return (
            <Container>
                <StyledCard>
                    <form  >
                    <StyledTextArea
                        onChange={handleChange}
                        autoFocus
                        value={titleize(taskText)}
                        placeholder="Add Task..."
                        onBlur={closeForm}
                    />
                    </form>
                </StyledCard>
                    <Button
                    onMouseDown={(e) => {
                        handleAddTask(e, taskText, listID, newOrder ) 
                        setTaskText('')
                        closeForm()
                        
                    }}
                        type='submit'
                        style={{backgroundColor: 'lightGreen', marginTop: '5px', boxShadow: '10px'}}
                    >Save Task
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
