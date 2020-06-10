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

    const [currentUser] = useContext(UserContext)
    const [lists, setLists] = useContext(ListContext)
    // u can delete this once you know how to do the fetch. you will need to do a dispatch

    const [taskText, setTaskText] = useState('')
    const [sourceIndex, setSourceIndex] = useState('')
    const [destIndex, setDestIndex] = useState('')
    const [sourceID, setSourceID] = useState('')
    const [destID, setDestID] = useState('')
    const [newOrderIndex, setOrderIndex] = useState(null)
    const [orderedLists, setListOrder] = useState([])
    const [orderedTasks, setTaskOrder] = useState([])

    const fetchCurrentUserLists = () => {
        fetch(`${url}/users/${currentUser.id}/lists`)
            .then(r => r.json())
            .then(lists => {
                setLists(lists)
                setListOrder(() => {
                    lists.sort((a, b) => (a.id > b.id) ? 1 : -1)
                })
        })
    }
    
    // app opens, checks to see what the order value is for each list
    // sorts the lists by order

    useEffect(() => {
        fetchCurrentUserLists()
    }, [])

//////////////////////////////////////////////////////////////////
////// this crud can go into createCard once redux is working ////
//////////////////////////////////////////////////////////////////

    // need an on submit to pass down and pass in the title, and currentUser from context 

    const handleAddList = (e, title, initialIndex) => {
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ title, user_id: currentUser.id, order: initialIndex})
        }

        fetch(`${url}/users/${currentUser.id}/lists/`, options)
            .then(r => r.json())
            .then(newList => {
                console.log('newList', newList)
                setLists([ ...lists, newList ])
            })
        
    }

    const handleAddTask = (e, text, listID, index) => {
        // get text and listID pass up 
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({text, list_id: listID, order: index})
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks`, options)
            .then(r => r.json())
            .then(newTask => {
                console.log(newTask)
                setLists( lists.map(list => list.id === listID ? {...list, tasks: [...list.tasks, newTask]} : list) )
            })
            
        
    }

    const handleEditTask = (taskText, listID, id) => {
        console.log('taskText', taskText)


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
                console.log('updatedTask', updatedTask)

                setLists(
                    lists.map(list => list.id === listID ?
                    {
                        ...list, tasks: list.tasks.map(task => task.id === id ? updatedTask : task)
                    }
                        : list
                ))
            })
    }


    const handleDeleteTask = (listID, id) => {
        const options = {
            method: 'DELETE'
        }
        
        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${id}`, options)
            .then(() => {
                setLists(
                    lists.map(list => list.id === listID ? 
                    {
                        ...list, tasks: list.tasks.filter(task => task.id !== id)
                    }
                        : list
                ))
            })
    }
    
    const deleteList = (listID) => {
        const options = {
            method: 'DELETE'
        }
        fetch(`${url}/users/${currentUser.id}/lists/${listID}`, options)
            .then(() => {
                setLists(
                    lists.filter(list => list.id !== listID)
                )
            })

    }

    
    const onDragEnd = (result) => {
        console.log('result', result)
        // reorder our column
        const { destination, source, draggableId, type } = result
        console.log("destination.dropID", destination.droppableId)
        
        if (!destination) {
            return
        }
        
        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return
        }
        // adjust state of lists
        // const row = lists
        // const newRowOrder = Array.from(row.)
        // lists.splice
        
        const newListOrder = [...lists]
    }
    
    // const onDragStart = (e) => {
        
    // }
    
    
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
                                list={list}
                                {...list}
                                listIndex={index}
                                listID={list.id}
                                handleAddTask={handleAddTask}
                                handleEditTask={handleEditTask}
                                taskText={taskText}
                                setTaskText={setTaskText}
                                handleDeleteTask={handleDeleteTask}
                                deleteList={deleteList}
                            />)} 
                                    {console.log("orderedLists",orderedLists)}
                            {provided.placeholder}
                            <CreateListForm handleAddList={handleAddList} initialIndex={lists.length} />
                    </FlexContainer>
                        )}
                        </Droppable>
                        {console.log("currentuser", currentUser)}
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
