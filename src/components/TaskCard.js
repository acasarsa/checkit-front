import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import { TaskTextContext } from '../TaskTextContext'
import TextArea from 'react-textarea-autosize'
import Button from '@material-ui/core/Button';
import styled from "styled-components";
// import { GiPin } from 'react-icons/gi'

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

const TaskCard = ({ text, listID, handleEditTask, id }) => {
    
    const [taskText, setTaskText] = useContext(TaskTextContext)
    const [isEditing, setIsEditing] = useState(false)
    // const [editedText, setEditedText] = useState(text)

    const openEditForm = () => {
        setTaskText(text)
        setIsEditing(!isEditing)
    }

    const closeEditForm = () => {
        setIsEditing(false)
    }

    const handleChange = (event) => {
        setTaskText(event.target.value)
    }


    const renderTaskCard = () => {

        return (
            <Card style={styles.cardContainter} >
            
                <CardContent style={{textAlign: 'center'}} >
                    <Typography gutterBottom style={{ fontSize: 18 }}
                    >{text}
                        <IconButton onClick={openEditForm} >
                            <EditIcon style={{ fontSize: 16 }} />
                        </IconButton>
                            
                    </Typography>
                </CardContent>

            </Card>
        )
    }

    const renderEditForm = () => {

        return (
            <Container>
                <StyledCard>
                    <form  >
                    <StyledTextArea  
                        onChange={handleChange}
                        autoFocus
                        value={taskText}
                        onBlur={closeEditForm}
                    />
                    </form>
                </StyledCard>
                    <Button
                    onMouseDown={() => {handleEditTask(taskText, listID, id) 
                        setTaskText('')
                        closeEditForm()
                    }}
                        type='submit'
                        style={{backgroundColor: 'lightGreen'}}
                    >Save
                    </Button>
            </Container>
        )

    }




    return !isEditing ? (
        renderTaskCard()
    ) : (
        renderEditForm()    
    )
}

const styles = {
    cardContainter: {
        marginBottom: 8,
        backgroundColor: 'lightblue',
    }
}

export default TaskCard

// pinned button
                {/* <div style={{textAlign: 'right',}}>
                    <IconButton  >

                        <GiPin style={{
                            color: 'red', fontSize: 16
                        }} />
                    </IconButton>
                </div> */}