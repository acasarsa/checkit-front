import React, { useState, createContext } from 'react'

export const ListOrderContext = createContext()

export const ListOrderProvider = (props) => {

    const [orderedLists, setListOrder] = useState([])
    
    return (
        <ListOrderContext.Provider value={[orderedLists, setListOrder]}>
            {props.children}
        </ListOrderContext.Provider>

    )

}