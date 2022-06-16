import axios from 'axios';
import { Dispatch } from 'redux';
export const GET_ALL_COMPONENTS = "GET_ALL_COMPONENTS";

type Action = {
    type: string,
    payload: any,
}

export function getAllComponents() {
    return async(dispatch: Dispatch<Action>) => {
        try {
            let res = await axios('')
            dispatch({type: GET_ALL_COMPONENTS, payload: res.data})
        } catch (error) {
            console.log(error)
        }
    }
}
