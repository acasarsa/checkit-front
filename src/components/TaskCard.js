import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextArea from 'react-textarea-autosize'
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';
import Icon from "@material-ui/core/Icon";

// import { GiPin } from 'react-icons/gi'

const CardContainer = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 100%;
    word-wrap: break-word;
`;

const Container = styled.div`
    width: 284px;
    margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
    min-height: 185px;
    padding: 6px 8px 2px;
`;

const StyledTextArea = styled(TextArea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
`;

const DeleteButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;

const EditButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;

const TaskCard = ({ id, text, order, listID, handleEditTask, taskText, setTaskText, handleDeleteTask}) => {
    
    // const [taskText, setTaskText] = useContext(TaskTextContext)
    const [isEditing, setIsEditing] = useState(false)
    // const [editedText, setEditedText] = useState(text)

    const openEditForm = (e) => {
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
            <Draggable draggableId={String(id)} index={order} > 
                {provided => (
                    <CardContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    > 
                        <Card style={styles.cardContainer}
                        >
                            <CardContent style={{textAlign: 'center'}} >
                                <Typography gutterBottom style={{ fontSize: 18 }}
                                >{text}
                                    <EditButton onClick={openEditForm} >
                                        <EditIcon style={{ fontSize: 16 }} />
                                    </EditButton>
                                        
                                    <DeleteButton onClick={() => handleDeleteTask(listID, id)} >
                                        <DeleteIcon style={{ fontSize: 16 }} />
                                    </DeleteButton>
                                </Typography>
                            </CardContent>
                        </Card>
                </CardContainer>
                )}
            </Draggable>
        )
    }
    
    

    const renderEditForm = () => {

        return (
            <Container>
                <StyledCard>
                    <form  >
                    <StyledTextArea  
                        type="text"
                        onChange={handleChange}
                        autoFocus
                        value={taskText}
                        onBlur={closeEditForm}
                    />
                        {console.log(taskText)}
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
    cardContainer: {
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