import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import { url } from '../requests'
import { connect } from 'react-redux'
import { ListContext } from '../ListContext'
import CreateListForm from '../components/CreateListForm';
import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'

    
const FlexContainer = styled.div ` 
    display: flex;
    flex-direction: row;
`
const ListContainer = () => {

    // const [sourceIndex, setSourceIndex] = useState('')
    // const [destIndex, setDestIndex] = useState('')
    // const [sourceID, setSourceID] = useState('')
    // const [destID, setDestID] = useState('')
    // const [newOrderIndex, setOrderIndex] = useState(null)
    const [currentUser] = useContext(UserContext)
    const [lists, setLists] = useContext(ListContext)
    const [taskText, setTaskText] = useState('')
    
    
    /// i put the sort inside of the ListContext's initial value and that seems to work when i update the order on the back end it will render the lists in that order. 
    /// i think i still will need to fix the json that comes out of lists since that's how i'm dealing with tasks. and i have looked but still can't figure out how to edit the include: [:tasks] part of the render
    // next step is to figure out how to 
    const fetchCurrentUserLists = () => {
        fetch(`${url}/users/${currentUser.id}/lists`)
            .then(r => r.json())
            .then(lists => {
                setLists(lists.sort())
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
                setLists( lists.map(list => list.id === listID ? {...list, tasks: [...list.tasks, newTask]} : list) )
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

    

// change on back end 
    
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
            console.log("lists after splice", lists)
            updateListOrderAfterDnd( destination.index, draggedListID )
            
        }
        
        if (type === 'task') {
            let draggedTaskID = parseInt(draggableId)
            let destination_list = lists.find(list => list.id === parseInt(destination.droppableId))
            let listID = destination_list.id
            let tasks = destination_list.tasks
            
            let newTaskOrder = tasks.splice(source.index, 1) 
            tasks.splice(destination.index, 0, ...newTaskOrder)

            console.log("task's list after splice", destination_list)
            updateTaskOrderAfterDnd( destination.index, listID, draggedTaskID )
            console.log("draggedTaskID", draggedTaskID)
        }
        

    
    }
    
    const updateListOrderAfterDnd = (new_position, listID) => {

        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({order: new_position})
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/update_order`, options)
            .then(r => r.json())
            .then(setLists)
    }
    
    const updateTaskOrderAfterDnd = (new_position, listID, taskID) => {
        
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ order: new_position })
        }
    
        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${taskID}/update_order`, options)
            .then(r => r.json())
            .then(updatedTasks => {
                console.log("Tasks object after dnd", updatedTasks)
                // debugger
                setLists(lists.map(list => list.id === listID ? { ...list, tasks: updatedTasks.sort((a, b) => (a.order > b.order)? 1 : -1) } : list))
                
            }) 
    }
    
    // setLists(lists.map(list => list.id === listID ? { ...list, tasks: updatedTasks } : list ))
    // setLists(
    //     lists.map(list => list.id === listID ? { ...list, tasks: list.tasks.map(task => task.id === id ? updatedTask : task) } : list))


    
    // source.droppableId 
    // source.index 
    
    // destination.droppableId
    // destination.index
    
    // i'd like to be able to grab the 
    
    let sortedLists = lists.sort((a, b) => (a.order > b.order) ? 1 : -1)
    
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
                        {sortedLists.map((list) => 
                            <ListCard key={list.id}
                                // list={list}
                                {...list}
                                listID={list.id}
                                handleAddTask={handleAddTask}
                                handleEditTask={handleEditTask}
                                taskText={taskText}
                                setTaskText={setTaskText}
                                handleDeleteTask={handleDeleteTask}
                                deleteList={deleteList}
                                
                            />)} 
                                    {console.log("rendered sorted lists", sortedLists)}
                                    {console.log("rendered lists", lists)}
                                    {console.log("rendered lists order", sortedLists.map(list => list.order))}
                                    {console.log("rendered tasks", sortedLists.map(list => list.tasks))}
                                    
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
