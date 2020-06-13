import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import { UserContext } from '../UserContext'
import { ListContext } from '../ListContext'
import CreateTaskForm from './CreateTaskForm'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components';
import Icon from "@material-ui/core/Icon";


const ListContainer = styled.div`
    background-color: #dfe3e6;
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




const ListCard = (props) => {
    const { listID, title, order, id, taskText, handleAddTask, handleEditTask,  setTaskText,  handleDeleteTask, deleteList} = props
    const [currentUser] = useContext(UserContext) // use for edit form later
    const [lists, setLists] = useContext(ListContext) 

    let tasks = (lists.find(list => list.id === listID).tasks)
        
    let sortedTasks = tasks.sort((a, b) => (a.order > b.order) ? 1 : -1)

    
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
    return (
        
        <Draggable draggableId={String(listID)} index={order} >
                {provided => (
                    <ListContainer
                        {...provided.draggableProps}
                        
                    ref={provided.innerRef}
                    >
                        <div {...provided.dragHandleProps}>
                            <h4 >{title}</h4>
                            <DeleteButton onClick={() => deleteList(listID)}>
                                delete
                            </DeleteButton>
                        </div>
                        <Droppable droppableId={String(listID)} type="task" >
                            {provided => (
                            <>
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                
                                {sortedTasks.map((task) => 
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
                                    tasks={sortedTasks}
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
