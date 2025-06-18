import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: []
}

const ProductSlice = createSlice({

    name: "Product",
    initialState,
    reducers: {
        loadProduct: (state, action) => {
            state.product = action.payload;

        },
        loadLazyProducts: (state, action) => {
            state.product = [...state.product, ...action.payload];
        }
    }
})

export default ProductSlice.reducer;
export const { loadProduct, loadLazyProducts } = ProductSlice.actions;