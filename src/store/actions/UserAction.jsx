import axios from "../../utils/Api";

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
