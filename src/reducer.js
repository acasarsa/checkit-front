
let initialState = {
    lists: [],
    isDone: false,
    isPinned: false,
}

export const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'CREATE_LIST':
            // on click of a button take in the state of title gathered from onChange 
            // then make a post passing newList into body and return a copy of the prevState, newList
            // anything that would have been this.state would be prevState
            const newList = ""
            
            return { lists: [...prevState,  newList] }
        
        case 'UPDATE_LIST':
            return { ...prevState }
        
        case 'DELETE_LIST':
            return { ...prevState }
        
        case 'FETCH_LISTS':
            return { ...prevState }
        // return { ...prevState, lists: payload.lists } 
        
        case 'CREATE_TASK':
            return { ...prevState }
        
        case 'UPDATE_TASK':
            return { ...prevState }
        
        case 'DELETE_TASK':
            return { ...prevState }
        
        default:
            return { ...prevState }
    }
}


