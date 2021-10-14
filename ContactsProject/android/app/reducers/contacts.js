const contacts = (state = [], action) => {
    switch(action.type){
        
        case "CONTACTS":
            return {
                ...state,
                contacts: action.payload.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)
            }
        default:
            return state
    }
    
}

export default contacts