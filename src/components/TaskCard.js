import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ListContext } from '../ListContext';
import { UserContext } from '../UserContext'
import { Card, CardContent, Typography, Checkbox, Button, Icon} from '@material-ui/core';
import EditIcon  from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import birdYay from '../images/bird-yay.gif'
import fireworks from '../images/fireworks.gif'
import { url } from '../requests'
// import css from '../CSS/main.css'
import Confetti from 'react-dom-confetti';

// style = { styles.cardContainer } backgroundColor = { checked? 'violet': 'lightblue' }
// import { GiPin } from 'react-icons/gi'

// const styles = {
//     cardContainer: {
//         marginBottom: 8,
//         backgroundColor: 'lightblue',

//     }
// }
const StyledCheckBox = styled(Checkbox)` 
    margin-left: 20px;
`

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

const Fireworks = styled.div` 
    background-image: url('../images/fireworks.gif');
    opacity: ${props => props.fireworks ? 1 : 0 };
`

const StyledTaskCard = styled(Card)`  
    background-color: ${props => props.checked ? 'violet' : 'lightblue'};
    margin-bottom: 8;

    

`

const config = {
    angle: 90,
    spread: 120,
    startVelocity: 35,
    elementCount: "200",
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};


const TaskCard = ({ id, text, order, isDone, listID, handleEditTask, taskText, setTaskText, handleDeleteTask}) => {
    
    // const [taskText, setTaskText] = useContext(TaskTextContext)
    const [isEditing, setIsEditing] = useState(false)
    // const [editedText, setEditedText] = useState(text)
    const [lists, setLists] = useContext(ListContext)
    const [currentUser] = useContext(UserContext)
    
    const [checked, setChecked] = useState(isDone)
    
    
    const handleCheckChange = (event) => {
        //
        
        // console.log('i ran')
        handleCheckBox()
        
        
    }
    
    
    
    const handleCheckBox = () => {
        // console.log(("checked value", id), (":", checked))
        
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ isDone: !checked, list_id: listID })
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${id}`, options)
            .then(r => r.json())
            .then(updatedTask => {
                setLists(
                    lists.map(list => list.id === listID ?
                        { ...list, tasks: list.tasks.map(task => task.id === id ? updatedTask : task) } : list)
                )
                setChecked(updatedTask.isDone)

            })
    }
    
    
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
    
    const isDoneEvent = (e) => {
        console.log("hit", e.target)
        if (checked === false) {
            let l = lists.find(list => list.id === listID)
            let task = l.tasks.find(task => task.id === id)
            // let targetTask = e.target
            console.log("i wasn't checked", checked, "on", e.target.parentNode.parentNode.parentNode.parentNode.style)
            
            
        } else {
            console.log("i was checked", checked)
        }
        console.log("after i clicked", e.target.checked)
        // e.target.checked
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
                        <StyledTaskCard  

                        >
                            
                            
                            <CardContent style={{textAlign: 'center'}} >
                                <Typography gutterBottom style={{ fontSize: 22, fontFamily: 'Crafty Girls', color: 'green'}}
                                    
                                >{text}
                                    <EditButton onClick={openEditForm} >
                                        <EditIcon style={{ fontSize: 16 }} />
                                    </EditButton>
                                        
                                    <DeleteButton onClick={() => handleDeleteTask(listID, id)} >
                                        <DeleteIcon style={{ fontSize: 16 }} />
                                    </DeleteButton>
                                </Typography>
                            </CardContent>
                            
                            <FormControlLabel
                                control={
                            
                                    <StyledCheckBox
                                        color='secondary'
                                        checked={checked}
                                        onChange={handleCheckChange}
                                        onClick={isDoneEvent}
                                        // onMouseDown={handleCheckBox}
                                        // onClick={checkedEvent}
                                    />
                                    
                                } 
                            />
                        </StyledTaskCard>
                        <Confetti active={checked} config={config} />
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
        // backgroundColor: isDone? 'violet': 'lightblue' 
        // backgroundColor: 'lightblue',
        
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