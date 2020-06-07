
let initialState = {
    lists: [],
    isDone: false,
    isPinned: false,
}

export const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'CREATE_LIST':
            return { ...prevState }
        
        case 'UPDATE_LIST':
            return { ...prevState }
        
        case 'DELETE_LIST':
            return { ...prevState }
        
        case 'FETCH_LISTS':
            return { ...prevState }
        
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


