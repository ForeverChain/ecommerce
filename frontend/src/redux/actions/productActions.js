import { ActionTypes } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastObjects } from "../../util/toastObject";
const { FETCH_PRODUCTS, SET_PRODUCT_DETAIL, RESET_PRODUCT_DETAIL, RESET_PRODUCTS } = ActionTypes;

export const addProducts = (shopData) => async (dispatch) => {
    try {
        const response = await axios.post(`products`, shopData);
        const newShop = response.data; // Assuming the response returns the newly created shop object
        // You can dispatch any additional actions or perform any other logic here if needed
        toast.success("Shop added successfully", ToastObjects);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const getProductsBySeller = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`products/seller/${id}`);
        const responseData = response.data;
        dispatch({ type: FETCH_PRODUCTS, payload: responseData });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const updateProduct = (productId, shopData) => async (dispatch) => {
    try {
        const response = await axios.put(`products/${productId}`, shopData);
        // Assuming the response returns the updated shop object
        const updateProduct = response.data;
        // You can dispatch any additional actions or perform any other logic here if needed
        toast.success("Shop updated successfully", ToastObjects);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const getProducts = (pageNum, productsPerPage, sortBy, searchText, price, sellerId) => async (dispatch) => {
    try {
        const response = await axios.get(`products?page=${pageNum}&limit=${productsPerPage}&sortBy=${sortBy}&searchText=${searchText}&price=${price}${sellerId ? "&sellerId=" + sellerId : ""}`);
        const responseData = response.data;

        responseData["sortBy"] = sortBy;
        responseData["searchText"] = searchText;
        responseData["price"] = price;

        dispatch({ type: FETCH_PRODUCTS, payload: responseData });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        toast.error(message, ToastObjects);
    }
};

export const setProductDetail = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`products/find/${id}`);
        dispatch({ type: SET_PRODUCT_DETAIL, payload: response.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        toast.error(message, ToastObjects);
    }
};

export const resetProductDetail = () => async (dispatch) => {
    dispatch({ type: RESET_PRODUCT_DETAIL });
};

export const resetProducts = () => async (dispatch) => {
    dispatch({ type: RESET_PRODUCTS });
};
