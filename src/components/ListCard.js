import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard'
import { UserContext } from '../UserContext'
import { ListContext } from '../ListContext'
import CreateTaskForm from './CreateTaskForm'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components';
import { Icon, Button, makeStyles } from "@material-ui/core";
import TextArea from 'react-textarea-autosize'




const ListContainer = styled.div`
    background-image: linear-gradient(to top right, paleturquoise, palegreen);
    border-radius: 12px;
    width: 300px;
    padding: 0px 12px;
    height: 100%;
    margin: 0 12px;
    align-items: center;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    color: rgb(250, 101, 126);
    font-size: 25px;
    padding: 20px ;
`;

const DeleteButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
    
`;
const StyledInput = styled.input`
    width: 100%;
    border: none;
    outline-color: rgb(250, 101, 126);
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
`;
const StyledTextArea = styled(TextArea)`
    width: 100%;
    border: none;
    outline-color: rgb(250, 101, 126);
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
`;

const useStyles = makeStyles((theme) => ({
    saveList: {
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
    }

}))

const titleize = require('titleize');






const ListCard = (props) => {

    const { listID, title, order, id, taskText, handleAddTask, handleEditTask, setTaskText, handleDeleteTask, deleteList, handleEditList } = props
    const classes = useStyles();
    const [currentUser] = useContext(UserContext) // use for edit form later
    const [lists, setLists] = useContext(ListContext) 

    let tasks = (lists.find(list => list.id === listID).tasks)
        
    let sortedTasks = tasks.sort((a, b) => (a.order > b.order) ? 1 : -1)
    const [titleText, setTitle ] = useState('')
    const [isEditingTitle, setTitleEditing] = useState(false)

    const openEditForm = (e) => {
        // let current_list = lists.find(list => list.id === listID)
        // setLists(...lists, { ...current_list, titleText })
        setTitle(title)
        setTitleEditing(!isEditingTitle)
        
    }
    
    const closeEditForm = () => {
        setTitleEditing(false)
    }
    
    
    // function noenter() {
    //     return !(window.event && window.event.keyCode == 13);
    // }
    const noEnter = (event) => {
    
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }
    
    let cursor
    
    const handleChange = (event) => {
        cursor = event.target.selectionStart
        setTitle(event.target.value)
        
    }
    
    const handleFocus = e => {
        e.target.selectionStart = cursor
    };
    
    
    const renderEditInput = () => {
        return (
            <form onKeyDown={noEnter} >
                <StyledTextArea
                    type="text"
                    value={titleize(titleText)}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={closeEditForm}
                />
                <Button 
                    
                    onMouseDown={() => {
                        handleEditList(titleText, listID)
                        setTitle('')
                        closeEditForm()
                    }} 
                    type='button'
                
                    className={classes.saveList}
                    
                    
                >Save
                </Button>
            </form>
        );
    };
    
    
    return  (
        
        <Draggable draggableId={String(listID)} index={order} >
                {provided => (
                    <ListContainer
                        {...provided.draggableProps}
                        
                    ref={provided.innerRef}
                    >
                    <div {...provided.dragHandleProps}>
                        { isEditingTitle ? (
                            renderEditInput()
                        ) : (
                        <div>
                        <TitleContainer onDoubleClick={openEditForm}>{title}</TitleContainer>
                            <DeleteButton onClick={() => deleteList(listID)}>
                                    delete
                            </DeleteButton>
                        </div>
                        )}
                    </div>
                        <Droppable droppableId={String(listID)} type="task" >
                            {provided => (
                            <>
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                
                                {tasks.map((task, index) => 
                                    <TaskCard
                                    key={task.id}
                                    {...task} 
                                    listID={listID}
                                    taskText={taskText}
                                    handleEditTask={handleEditTask}
                                    setTaskText={setTaskText}
                                    handleDeleteTask={handleDeleteTask}
                                    />
                                    
                                    )}
                                {provided.placeholder}
                                <CreateTaskForm
                                    listID={id}
                                    // tasks={sortedTasks}
                                    tasks={tasks}
                                    handleAddTask={handleAddTask}
                                    taskText={taskText}
                                    setTaskText={setTaskText}
                                />
                            </div>
                            </>
                            )}
                        </Droppable>
                    
                    </ListContainer>
                )}
        </Draggable>
        
    ) 
}


export default ListCard
