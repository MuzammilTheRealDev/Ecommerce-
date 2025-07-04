import axios from "../../utils/Api"
import { loadProduct } from "../reducers/ProductSlice";

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post('/products', product);
        await dispatch(asyncLoadProduct())
        return true

    } catch (error) {
        console.log("Create Product Error:", error);
        return false
    }

}

export const asyncLoadProduct = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('/products')
        dispatch(loadProduct(data))
    } catch (error) {
        console.log(error);

    }

}

export const asyncUpdateProduct = (id, product) => async (dispatch, getState) => {
    try {
        await axios.patch('/products/' + id, product)
        dispatch(asyncLoadProduct())
        return true

    } catch (error) {
        console.log(error);
        return false
    }

}

export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete('/products/' + id)
        dispatch(asyncLoadProduct());
        return true

    } catch (error) {
        console.log(error);
        return false
    }

}