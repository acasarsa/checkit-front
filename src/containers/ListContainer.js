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
    
    // const [notes, setNotes] = useState('')

    // const fetchNotes = () => {

    //     fetch(`${url}/users/${currentUser.id}/notes`)
    //         .then(r => r.json())
    //         .then(setNotes)
    // }
    
    
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
    // const onDragStart = (result) => {
    
    //     const { destination, source, draggableId, type, droppableId } = result
        
    //     if (type === "task") {
    //         let draggedTaskID = parseInt(draggableId)
    //         let start = lists.find(list => list.id === parseInt(source.droppableId))
    //         console.log("drag started")
    //         console.log("start: draggedTaskID", draggedTaskID)
            
    //         setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks.filter(task => task.id !== draggedTaskID) } : list)) 
            
            
    //     }
    // }
    
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
            let draggedTaskID = parseInt(draggableId) // used in endpoint
            console.log("draggedTaskID", draggedTaskID)
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
                console.log("draggedTaskID", draggedTaskID)
                console.log("startID", startID)
                console.log("start list", start)
                let dragged_task = start.tasks.find(task => task.id === draggedTaskID)
                console.log("destination index", destination.index)
                // let startTask = tasks.splice(startPosition, 1)
                // startTask = { ...startTask, list_id: finishID }
                // tasks.splice(newPosition, 0, ...startTask)
                moveTaskToDifList(startID, finishID, newPosition, draggedTaskID)  
                // current set up leaves a copy of the moved task 
                
                // setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks.filter(task => task.id !== draggedTaskID)} : list), lists.map(list => list === finish ? { ...list, tasks: list.tasks.splice(newPosition, 0, ...dragged_task) } : list))
                // setLists(lists.map(list => list === start ? { ...list, tasks: [...tasks, list.tasks.splice(startPosition, 1)] } : list), lists.map(list => list === finish ? { ...list, tasks: list.tasks.splice(newPosition, 0, dragged_task) } : list))
                
                // find start list and end list within all lists 
                // start.tasks lists/${startID}/${endID}
                // {start, finish}
                
                // setLists(lists.map(list => list === finish ? { ...list, tasks: list.tasks.splice(newPosition, 0, dragged_task) } : list))
                // let whatIsThis = tasks.splice(newPosition, 0, ...startTask)
                // let updatedStart = [...start.tasks.splice(startPosition, 1)]
                // let updatedFinish = [...finish.tasks.splice(newPosition, 0, { ...startTask, list_id: finishID })]
                // setLists(lists.map(list => list.id === startID ? updatedStart : list))
            
                // setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks } : list),

                // a. this removes the task from the fist list successfully 
                // setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks.filter(task => task.id !== draggedTaskID) } : list))
                
                
                // 1. this removes from 1st list but deletes the entire task list of the finish list. no errors though! 
                // setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks.map(task => task.id === draggedTaskID ? {...task, list_id: finishID, order: newPosition} : task) } : list))
                // setLists(lists.map(list => list === finish ? { ...lists, tasks: list.tasks, }))
                // setLists(lists.map(list => list === start ? { ...list, tasks: list.tasks.filter(task => task.id !== draggedTaskID) } : list),
                    
                //     lists.map(list => list === finish ? { ...list, tasks: [...list.tasks.splice(newPosition, 0, {...startTask, list_id: finishID})] } : list ))
                    // lists.map(list => list === finish ? { ...list, tasks: [...list.tasks, ...list.tasks.splice(newPosition, 0, ...startTask)] } : list ))
                // this worked to remove the list. you can just remove it an add it somewhere else and still just update the order on the back like before. 
                // setLists(...lists, lists.find(list => list.id === startID ? { ...list, tasks: list.tasks.map((task, index) => task.order = index) } : list))
                // something is just off a bit the index thing worked i think !
                
                
                // just splice it in at index new_position this maybe will work you would just splice! tasks array sounds good to me. 
                console.log("starting List after setList runs", (lists.find(list => list.id === startID)).tasks)
                console.log("finsih List after setList runs", (lists.find(list => list.id === finishID)).tasks)
                // 1. do the set index thing correctly ^^
                // 2. then set the state again where the new list is updated. 
                // 3. do the set index thing 
                
                // console.log("what am i? array?", startTask)
                // setLists(...lists, lists.find(list => list === start ? list.tasks : tasks.filter(task => task.id !== draggedTaskID)  ))
                // list => list.id === listID ? { ...list, tasks: updatedTasks } : list
                
                // if (!lists.find(list => list.id === parseInt(source.droppableId)).tasks.include(tasks.find(task => task.id === draggedTaskID))) {
                // }
                // setLists(...lists, lists.find(list => list.id === startID ? list.tasks: tasks.map((task, index) => task.order = index) ) )
                // moveTaskToDifList(startID, finishID, newPosition, draggedTaskID)
                // tasks.splice(newPosition, 0, ...startTask)

            }
            
            // handleDelete = (id) => {
            //     const options = {
            //         method: 'DELETE'
            //     }
            //     fetch(`http://localhost:3000/endpoint/id`, options)
            //         .then(r => r.json())
            //         .then(this.setState({
            //             array: this.state.array.filter((item) => item.id !== id)
            //             }))
            //         .catch((error) => {
            //             console.error('Error:', error);
            //         });
            
            // }
    

            // if list.id === startID then do the .then from a destroy
            // if list.id === finishID then do the update 
            
            // 1. splice out the start task from start list 2. update the order value 
            // delete startTask from start 
            // either combine into one step with custom route or perform a few fetches at once... we'll see. could be async issues with doing a delete then an add or patch. 
            // custom route would be 
            // ${url}/users/${currentUser.id}/lists/${startID}/tasks/${taskID}/change_list
            
            // console.log("reorder", tasks)
            // let draggedTask = { ...startTask, list_id: destination.index }
            
            // tasks.splice(destination.index, 0, ...draggedTask)
            
            
                // .each_with_index { | t, i | t.update(order: i) }
            // console.log("task's list after splice", finish)
            // console.log("draggedTaskID", draggedTaskID)
            // console.log("order object", tasks.map(task => {
            //     return {order: task.order, text: task.text}
            // }));
            
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
                console.log("reordered Data", reorderedData)
                
                let listChanges = lists.map(list => list.id === startID ? { ...list, tasks: startTasks } : list.id === finishID ? { ...list, tasks: finishTasks } : list )
                console.log(listChanges)
                
                

                
                setLists(listChanges)
                
                // setLists( lists.map(list => list.id === finishID ? { ...list, tasks: finishTasks } : list))
                
            })
        
        // current issue june 14 12:44 pm the lists appear update but the start list gets back the task after it moves. 
    }
    // const moveTaskToDifList = () => {
    
    //     let options = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify({ list_id: finishID, order: newPosition })
    //     }
    // }
    
    
    // updatedTasks => setLists(lists.map(list => list.id === listID ? { ...list, tasks: updatedTasks } : list))
    // setLists(lists.map(list => list.id === finishID ? { ...list, tasks: updatedTasks } : list))
    // can i make a route that goes to the current listID on the back: 
    // i want to return the old list array reordered and the new list array reordered 
    // render json: start_list, include: [:tasks], end_list, include: [:tasks] 
    // i will first save the task to a var update it's list_id find the old list's tasks sort them then reset their order to index 
    // take task out of list 1 for good. => update list_id means that you need to update the list state of list 1 and list 2 
    // on back if you change the list_id it's going to just remove it from the list but it doesn't trigger the destroy action . 
    // if save it on front. then delete it on back and then try to update that lists id i won't be able to get there, if i update the id first 
    // setLists(lists.map(list => list.id === listID ? { ...list, tasks: updatedTasks } : list))
    
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
    
    if (!lists) {
        console.log("lists undefined", lists)
    } 
    // let checkedOffTasks = tasks.select(task => task.isDone === True)
    // let amountChecked = checkedOffTasks.count
    // if (list.tasks.length === amountChecked ) { then do x } 
    /// basically a custom listener 
    // let sortedLists = lists.sort((a, b) => (a.order > b.order) ? 1 : -1)
    
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
