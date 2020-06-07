import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'
import CreateCard from './CreateCard'
import { UserContext } from '../UserContext'


const ListCard = ({title, tasks, id, handleAddList, handleAddTask}) => {
    
    const [currentUser] = useContext(UserContext)
    
    return (
        <>
        <div style={styles.container} >
            
            {!currentUser ? <LoginPage /> :
            <>
            <h4>{title}</h4>
                {tasks.map(card => <TaskCard key={card.id} {...card} />)}
                <CreateCard
                    listID={id}
                    handleAddList={handleAddList}
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
