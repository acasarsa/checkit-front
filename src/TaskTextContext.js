import React, {useState, createContext} from 'react'


export const TaskTextContext = createContext()

export const TaskTextProvider = (props) => {
    const [taskText, setTaskText] = useState('')


    return (

        <TaskTextContext.Provider value={[taskText, setTaskText]} >
            {props.children}
        </TaskTextContext.Provider>
    )
}
