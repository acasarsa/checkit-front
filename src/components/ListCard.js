import React from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'
import ActionButton from './ActionButton'


const ListCard = ({title, tasks, currentUser, id}) => {
    return (
        <>
        <div style={styles.container} >
            
            {!currentUser ? <LoginPage /> :
            <>
            <h4>{title}</h4>
                {tasks.map(card => <TaskCard key={card.id} {...card} />)}
                <ActionButton  />
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
