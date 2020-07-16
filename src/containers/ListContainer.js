import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import { url } from '../requests'
import { connect } from 'react-redux'
import { ListContext } from '../ListContext'
import CreateListForm from '../components/CreateListForm';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


    
const FlexContainer = styled.div ` 
    display: flex;
    flex-direction: row;
    
    background-image: './images/background.jpg';
`
const ListContainer = () => {

    const [currentUser] = useContext(UserContext)
    const [lists, setLists] = useContext(ListContext)
    const [taskText, setTaskText] = useState('')
    const [taskCount, setTaskCount] = useState(currentUser.tasks.length)

    
    
    const fetchCurrentUserLists = () => {
        fetch(`${url}/users/${currentUser.id}/lists`)
            .then(r => r.json())
            .then(lists => {
                setLists(lists)
        })
    }

    
    useEffect(() => {
        fetchCurrentUserLists()
    }, [])
    
    

    const handleAddList = (e, title, order) => {
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ title, user_id: currentUser.id, order})
        }

        fetch(`${url}/users/${currentUser.id}/lists/`, options)
            .then(r => r.json())
            .then(newList => {
                setLists([ ...lists, newList ])
            })
        
    }
    
    const handleEditList = (titleText, listID) => {
        // if (event.keyCode == 13) {
        //     event.preventDefault();
        //     return false;
        // }
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ title: titleText, user_id: currentUser.id })
        }
    
        fetch(`${url}/users/${currentUser.id}/lists/${listID}`, options)
            .then(r => r.json())
            .then( updatedList => setLists( lists.map(list => list.id === listID ? updatedList : list )))
    }

    const handleAddTask = (e, text, listID, order) => {
        // get text and listID pass up 
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({text, list_id: listID, order})
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks`, options)
            .then(r => r.json())
            .then(newTask => {
                setLists(lists.map(list => list.id === listID ? { ...list, tasks: [...list.tasks, newTask] } : list))
                setTaskCount(currentUser.tasks.length)
            })
            
        
    }

    const handleEditTask = (taskText, listID, id) => {

        let options = {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
            },
        body: JSON.stringify({text: taskText, list_id: listID})
        }
        
        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${id}`, options)
            .then(r => r.json())
            .then(updatedTask => {
                console.log("updated task",updatedTask)
                setLists(
                    lists.map(list => list.id === listID ?
                        { ...list, tasks: list.tasks.map(task => task.id === id ? updatedTask : task) } : list)
                )
            })
    }

    const deleteList = (listID) => {
        const options = {
            method: 'DELETE'
        }
        
        fetch(`${url}/users/${currentUser.id}/lists/${listID}`, options)
            .then(r => r.json())
            .then(setLists)
    }

    const handleDeleteTask = (listID, id) => {
        const options = {
            method: 'DELETE'
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${id}`, options)
            .then(r => r.json())
            .then(updatedTasks => setLists(lists.map(list => list.id === listID ? { ...list, tasks: updatedTasks } : list)))
    }

    

    
    const onDragEnd = (result) => {
        console.log('result', result)
        // reorder our column
        const { destination, source, draggableId, type, droppableId } = result

        
        if (!destination) {
            return
        }
        
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }
        
        if (type === 'list') {
            let draggedListID = parseInt(draggableId)
            let newListOrder = lists.splice(source.index, 1)
            lists.splice(destination.index, 0, ...newListOrder)
            updateListOrderAfterDnd( destination.index, draggedListID )
            
        }
        
        if (type === 'task') {
            let draggedTaskID = parseInt(draggableId) // used in endpoint
            let start = lists.find(list => list.id === parseInt(source.droppableId))
            let finish = lists.find(list => list.id === parseInt(destination.droppableId))
            
            let startID = start.id // used in endpoint 
            let finishID = finish.id        
            
            let tasks = finish.tasks
            let newPosition = destination.index
            let startPosition = source.index
            

            if (start === finish) {

                let startTask = tasks.splice(startPosition, 1) 
                tasks.splice(newPosition, 0, ...startTask)
                updateTaskOrderAfterDnd(newPosition, finishID, draggedTaskID)
            } 
            
            if (start !== finish) {
                
                let dragged_task = start.tasks.find(task => task.id === draggedTaskID)
                // let startTask = tasks.splice(startPosition, 1)
                // startTask = { ...startTask, list_id: finishID }
                // tasks.splice(newPosition, 0, ...startTask)
                moveTaskToDifList(startID, finishID, newPosition, draggedTaskID)  
                
                

            }
            
            
            
        }
    }
    
    const moveTaskToDifList = (startID, finishID, newPosition, id) => {
        
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ list_id: finishID, order: newPosition })
        }

        fetch(`${url}/users/${currentUser.id}/lists/${startID}/tasks/${id}/update_task_list_id`, options)
            .then(r => r.json())
            .then(reorderedData => {
                let startTasks = reorderedData[0]
                let finishTasks = reorderedData[1]

                let listChanges = lists.map(list => list.id === startID ? { ...list, tasks: startTasks } : list.id === finishID ? { ...list, tasks: finishTasks } : list )
 
                
                setLists(listChanges)
                
                
                
            })
        
    
    }
    
    
    
    const updateListOrderAfterDnd = (newPosition, listID) => {

        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({order: newPosition})
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/update_order`, options)
            .then(r => r.json())
            .then(setLists)
    }
    
    const updateTaskOrderAfterDnd = (newPosition, finishID, taskID) => {
        
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ order: newPosition})
        }
    
        fetch(`${url}/users/${currentUser.id}/lists/${finishID}/tasks/${taskID}/update_order`, options)
            .then(r => r.json())
            .then(updatedTasks => {

                setLists(lists.map(list => list.id === finishID ? { ...list, tasks: updatedTasks } : list))

            }) 
    }

    
    return (
        
        <>
            <DragDropContext onDragEnd={onDragEnd} >
                
            {!currentUser ? <LoginPage /> :
            <>
                
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {(provided) => (
                    <FlexContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                            >
                        {lists.map((list, index) => 
                            <ListCard key={list.id}
                                // list={list}
                                {...list}
                                // tasks={list.tasks}
                                listID={list.id}
                                handleAddTask={handleAddTask}
                                handleEditTask={handleEditTask}
                                taskText={taskText}
                                setTaskText={setTaskText}
                                handleDeleteTask={handleDeleteTask}
                                deleteList={deleteList}
                                handleEditList={handleEditList}
                                
                            />)} 
                                    {console.log("rendered sorted lists", lists)}
                                    
                            {provided.placeholder}
                            <CreateListForm handleAddList={handleAddList}  />
                    </FlexContainer>
                        )}
            </Droppable>
                        
            </>
            }
        </DragDropContext>
        </>
    )
}

const msp = state => {
    return {
        lists: state.lists
    }
}

export default connect(msp)(ListContainer)
