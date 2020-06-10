import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'
import styled from 'styled-components';
import { UserContext } from '../UserContext'
import CreateTaskForm from './CreateTaskForm'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 0 8px 0 0;
`;


const ListCard = (props) => {
    const {listID, title, tasks, id, handleAddTask, handleEditTask, taskText, setTaskText, created_at, handleDeleteTask} = props
    const [currentUser] = useContext(UserContext) // use for edit form later
    console.log(tasks)
    // const [taskText, setTaskText] = useContext(TaskTextContext)

    let sortedTasks = tasks.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    
    return (
            <Draggable draggableId={String(listID)} >
                {provided => (
                    <ListContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // ref={provided.innerRef}
                    >
                        <Droppable droppableId={String(listID)} type="card">
                            {provided => (
                                <>
                                <h4>{title}</h4>
                                {sortedTasks.map(task => <TaskCard
                                    key={task.id}
                                    {...task} 
                                    listID={listID}
                                    handleEditTask={handleEditTask}
                                    taskText={taskText}
                                    setTaskText={setTaskText}
                                    handleDeleteTask={handleDeleteTask}
                                />)}
                                
                                <CreateTaskForm
                                    listID={id}
                                    handleAddTask={handleAddTask}
                                    taskText={taskText}
                                    setTaskText={setTaskText}
                                />
                                
                                </>
                            )}
                        </Droppable>
                    
                    </ListContainer>
                )}
        </Draggable>
        
    )
}


export default ListCard
