import React from 'react'
import TaskCard from './TaskCard'
import LoginPage from './LoginPage'


const ListCard = ({title, tasks, loggedIn, id}) => {
    return (
        <>
        <div style={styles.container} >
            
            {!loggedIn ? <LoginPage /> :
            <>
            <h4>{title}</h4>
                {tasks.map(card => <TaskCard key={card.id} {...card} />)}
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
