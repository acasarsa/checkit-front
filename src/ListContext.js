import React, {useState, createContext} from 'react'

export const ListContext = createContext()

export const ListProvider = (props) => {
    const [lists, setLists] = useState([])

    return (

        <ListContext.Provider value={[lists.sort((a, b) => (a.order > b.order) ? 1 : -1), setLists]} >
            {props.children}
        </ListContext.Provider>
    )
}