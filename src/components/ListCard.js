import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'
import { UserContext } from '../UserContext'
import CreateTaskForm from './CreateTaskForm'
import { TaskTextContext } from '../TaskTextContext'




const ListCard = (props) => {
    const {title, tasks, id, handleAddTask, handleEditTask, taskText, setTaskText, created_at, handleDeleteTask} = props
    const [currentUser] = useContext(UserContext)
    console.log(tasks)
    // const [taskText, setTaskText] = useContext(TaskTextContext)

    let sortedTasks = tasks.sort((a, b) =>  (a.created_at > b.created_at) ? 1 : -1)
    return (
        <>
        <div style={styles.container} >
            
            {!currentUser ? <LoginPage /> :
            <>
                <h4>{title}</h4>
                <>       
                    {sortedTasks.map(task => <TaskCard
                        key={task.id}
                        {...task} 
                        listID={id}
                        handleEditTask={handleEditTask}
                        taskText={taskText}
                        setTaskText={setTaskText}
                        handleDeleteTask={handleDeleteTask}
                    />)}
                </> 
                <CreateTaskForm
                    listID={id}
                    handleAddTask={handleAddTask}
                    taskText={taskText}
                    setTaskText={setTaskText}

                />

            </>
            }
        </div>
        </>
    )
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        height: '100%',
        padding: 8,
        marginRight: 8,

    }
}

export default ListCard
