import React, {useState, createContext} from 'react'

export const ListContext = createContext()

export const ListProvider = (props) => {
    const [lists, setLists] = useState([])

    return (

        <ListContext.Provider value={[lists, setLists]} >
            {props.children}
        </ListContext.Provider>
    )
}

// lists.sort((a, b) => (a.order > b.order) ? 1 : -1)