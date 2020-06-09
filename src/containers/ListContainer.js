import React, {useState, useEffect, useContext} from 'react'
import LoginPage from '../components/LoginPage'
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import { UserContext } from '../UserContext'
import { url } from '../requests'
import { connect } from 'react-redux'
import { ListContext } from '../ListContext'
import CreateListForm from '../components/CreateListForm';
import { TaskTextProvider} from '../TaskTextContext'
    
const GridContainer = styled.div ` 
    display: flex;
    flex-direction: row;
`
const ListContainer = () => {

    const [lists, setLists] = useContext(ListContext)
    // u can delete this once you know how to do the fetch. you will need to do a dispatch
    
    const [currentUser] = useContext(UserContext)

    const [taskText, setText] = useState('')

    const fetchCurrentUserLists = () => {
    fetch(`${url}/users/${currentUser.id}/lists`)
        .then(r => r.json())
        .then(lists => setLists(lists))
    }

    useEffect(() => {
        fetchCurrentUserLists()
    }, [])

//////////////////////////////////////////////////////////////////
////// this crud can go into createCard once redux is working ////
//////////////////////////////////////////////////////////////////

    // need an on submit to pass down and pass in the title, and currentUser from context 

    const handleAddList = (e, title) => {
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({title, user_id: currentUser.id})
        }

        fetch(`${url}/users/${currentUser.id}/lists/`, options)
            .then(r => r.json())
            .then(newList => {
                console.log(newList)
                setLists([ ...lists, newList ])
            })
        
    }

    const handleAddTask = (e, text, listID) => {
        // get text and listID pass up 
        e.preventDefault()

        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({text, list_id: listID})
        }

        fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks`, options)
            .then(r => r.json())
            .then(newTask => {
                console.log(newTask)
                setLists( lists.map(list => list.id === listID ? {...list, tasks: [...list.tasks, newTask]} : list) )
            })
            
        
    }

    const handleEditTask = (taskText, listID, id) => {
        // console.log('taskText', taskText)

        //     setLists(lists.map(list => list.id === listID ?
        //             {
        //                 ...list, tasks: list.tasks.map(task => task.id === id ? console.log('current task.text', task.text) : task)
        //             }
        //                 : list
        //         ))

        // let options = {
        // method: 'PATCH', 
        // headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json'
        //     },
        // body: JSON.stringify({taskText, list_id: listID})
        // }
        
        // fetch(`${url}/users/${currentUser.id}/lists/${listID}/tasks/${id}`, options)
        //     .then(r => r.json())
        //     .then(updatedTask => {
        //         console.log('updatedTask', updatedTask)

        //         setLists(lists.map(list => list.id === listID ?
        //             {
        //                 ...list, tasks: tasks.map(task => task.id === id ? updatedTask : task)
        //             }
        //                 : list
        //         ))
        //     })
    }


    
    
    return (
        <>
        <div>
            {!currentUser ? <LoginPage /> :
            <>
            <h1>WELCOME {currentUser.username.toUpperCase()}</h1>
            <GridContainer>
                <TaskTextProvider>
                    {lists.map(list =>
                        <ListCard key={list.id}
                            {...list}
                            handleAddTask={handleAddTask}
                            handleEditTask={handleEditTask}
                        />)} 
                </TaskTextProvider>
                <CreateListForm handleAddList={handleAddList} />
            </GridContainer>
            </>
            }
        </div>
        </>
    )
}

const msp = state => {
    return {
        lists: state.lists
    }
}

export default connect(msp)(ListContainer)
