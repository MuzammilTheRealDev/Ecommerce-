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

        }

    }
})

export default UserSlice.reducer;
export const { loadUser } = UserSlice.actions;