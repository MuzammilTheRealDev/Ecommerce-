import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.cart = action.payload

        }
    }
})

export default CartSlice.reducer;
export const {loadCart} = CartSlice.actions