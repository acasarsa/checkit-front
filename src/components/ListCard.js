import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard'
import { UserContext } from '../UserContext'
import { ListContext } from '../ListContext'
import CreateTaskForm from './CreateTaskForm'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components';
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';



const ListContainer = styled.div`
    ${'' /* background-color: paleturquoise; */}
    background-image: linear-gradient(to top right, paleturquoise, palegreen);
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 0 8px 0 0;
    
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    text-align: center;
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
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
`;



const ListCard = (props) => {
    const { listID, title, order, id, taskText, handleAddTask, handleEditTask, setTaskText, handleDeleteTask, deleteList, handleEditList } = props
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
    
    const handleChange = (event) => {
        
        setTitle(event.target.value)
    }
    
    const renderEditInput = () => {
        return (
            <form >
                <StyledInput
                    type="text"
                    value={titleText}
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
                    type='submit'
                    style={{ backgroundColor: 'lightGreen' }}
                    
                >Save
                </Button>
            </form>
        );
    };
    
    const handleFocus = e => {
        e.target.select();
    };
    
    // let current_list = lists.find(listID)
    // console.log("current list found", current_list)
    // console.log("current list tasks", current_list.tasks)
    
    // let tasks = lists.map(list => list.id === listID ? { ...list, tasks: [...list.tasks] } : list)
    // let current_list = lists.find(list => list.listID)
    // let tasks = current_list.tasks
    // console.log("tasks", tasks)
    // console.log("current_list", current_list)
    // let tasks = current_list.tasks
    // let sortedTasks = tasks.sort((a, b) => (a.order > b.order) ? 1 : -1)
    // console.log("sorted Tasks", sortedTasks)
    // debugger
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
                        <h4 onDoubleClick={openEditForm}>{title}</h4>
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
