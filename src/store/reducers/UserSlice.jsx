import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null,
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.users = action.payload;
        },
        removeUser: (state, action) => {
            state.users = null;


        }

    }
})

export default UserSlice.reducer;
export const { loadUser, removeUser } = UserSlice.actions;