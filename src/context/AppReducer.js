export const AppReducer = (state, action) => {
    switch(action.type){   
        case 'SET_USER':
            return {
                ...state,
                user : action.payload
            }
        case 'SET_TASK':
            return {
                ...state,
                task : action.payload
            }     
        case 'ADD_TASK':  
            return {
                ...state,
                task : [ ...state.task, action.payload ]
            }   
        case 'DELETE_TASK':
            return {
                ...state,
                task : state.task.filter((ele) => ele.id !== action.payload)
            }
        case 'EDIT_TASK':
            return {
                ...state,
                task : state.task.map((ele)=>{
                    return ele.id === action.payload.id ? action.payload : ele 
                }) 
            }                       
        default:
            return state;
    }
}