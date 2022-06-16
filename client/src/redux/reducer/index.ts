import { GET_ALL_COMPONENTS } from "../actions"
import { Products } from '../../../types';


const initialState = {
    components: Array<Products>,
    allComponents: Array<Products>
}

export default function rootReducer(state = initialState, action:any){
    switch(action.type){
        case GET_ALL_COMPONENTS:
            return {
                ...state,
                components: action.payload,
                allComponents: action.payload
            }
        default: 
            return state
    }
}