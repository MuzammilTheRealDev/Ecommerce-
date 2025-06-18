import { toast } from "react-toastify";
import axios from "../../utils/Api";
import { loadUser, removeUser } from "../reducers/UserSlice";

export const asyncRegisterUser = (user) => async () => {
    try {
        const existing = await axios.get(`/users?email=${user.email}`)
        if (existing.data.length > 0) {
            throw new Error('User with this email already exists')
        }

        const res = await axios.post('/users', user);
        return res.data
    } catch (error) {
        console.error("User registration failed:", error);
        throw error
    }

}

export const asyncLoginUser = (user) => async (dispatch) => {
    try {
        const res = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        const loggedInUser = res.data[0];
        if (!loggedInUser) {
            toast.error("Invalid email or password")
        }
        localStorage.setItem('user', JSON.stringify(loggedInUser))
        dispatch(loadUser(loggedInUser))
        return loggedInUser;

    } catch (error) {
        console.log(error);
        toast.error("Login Failed")

    }

}

export const asyncLogoutUser = () => async (dispatch) => {
    try {
        localStorage.removeItem('user');
        dispatch(removeUser())

    } catch (error) {
        console.log(error);
    }
}

export const asyncCurrentUser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.email) {
            dispatch(loadUser(user))
        } else {
            console.log('No valid user found in localStorage');
            toast.error('No valid user found in localStorage')

        }

    } catch (error) {
        console.error("Error loading current user:", error);
    }
}

export const asyncUpdateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await axios.patch('/users/' + id, user);
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(asyncCurrentUser())

    } catch (error) {
        console.log(error);
    }
}

export const asyncDeleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete('/users/' + id);
        dispatch(asyncLogoutUser())

    } catch (error) {
        console.log(error);

    }


}