import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'
import { UserContext } from '../UserContext'
import CreateTaskForm from './CreateTaskForm'


const ListCard = ({title, tasks, id, handleAddList, handleAddTask}) => {
    
    const [currentUser] = useContext(UserContext)
    
    return (
        <>
        <div style={styles.container} >
            
            {!currentUser ? <LoginPage /> :
            <>
            <h4>{title}</h4>
                {tasks.map(task => <TaskCard key={task.id} {...task} />)}
                <CreateTaskForm
                    listID={id}
                    handleAddTask={handleAddTask}
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
