import axios from "../../utils/Api";
import { loadUser, removeUser } from "../reducers/UserSlice";

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/users', user);
        console.log(res);
        return res.data
    } catch (error) {
        console.error("User registration failed:", error);
        throw error
    }

}

export const asyncLoginUser = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        console.log(res.data[0]);
        localStorage.setItem('user', JSON.stringify(res.data[0]))

    } catch (error) {
        console.log(error);

    }

}

export const asyncLogoutUser = () => async (dispatch, getState) => {
    try {
        // const res = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        localStorage.removeItem('user');
        dispatch(removeUser())

    } catch (error) {
        console.log(error);

    }
}

export const asyncCurrentUser = () => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch(loadUser(user))
        }else{
            console.log('User not log in');
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
}