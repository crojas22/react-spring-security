import Cookies from 'universal-cookie';
import {createEventApi} from "../api";

const cookie = new Cookies();

// Post
export const createEventAction = event => {
    return (dispatch) => {
        const token = cookie.get("token");
        createEventApi(event, token).then(resp => {
            console.log(resp)
        })
            .catch(error => console.log(error.message))
    }
};