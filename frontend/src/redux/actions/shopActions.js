import { ActionTypes } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastObjects } from "../../util/toastObject";

const { FETCH_SHOPS, SET_SHOP_DETAIL, RESET_SHOP_DETAIL, RESET_SHOPS, ADD_SHOP } = ActionTypes;

export const addShop = (shopData) => async (dispatch) => {
    try {
        const response = await axios.post(`shops`, shopData);
        const newShop = response.data; // Assuming the response returns the newly created shop object
        // You can dispatch any additional actions or perform any other logic here if needed
        toast.success("Shop added successfully", ToastObjects);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};
export const updateShop = (shopId, shopData) => async (dispatch) => {
    try {
        const response = await axios.put(`shops/${shopId}`, shopData);
        // Assuming the response returns the updated shop object
        const updatedShop = response.data;
        // You can dispatch any additional actions or perform any other logic here if needed
        toast.success("Shop updated successfully", ToastObjects);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const getShops = (pageNum, productsPerPage, sortBy, searchText) => async (dispatch) => {
    try {
        const response = await axios.get(`shops?page=${pageNum}&limit=${productsPerPage}&sortBy=${sortBy}&searchText=${searchText}`);
        const responseData = response.data;

        responseData["sortBy"] = sortBy;
        responseData["searchText"] = searchText;
        dispatch({ type: FETCH_SHOPS, payload: responseData });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        toast.error(message, ToastObjects);
    }
};

export const getShopsBySeller = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`shops/seller/${id}`);
        const responseData = response.data;
        dispatch({ type: FETCH_SHOPS, payload: responseData });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const getShopDetail = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`shops/find/${id}`);
        console.log(response.data);
        dispatch({ type: SET_SHOP_DETAIL, payload: response.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, ToastObjects);
    }
};

export const resetShopDetail = () => async (dispatch) => {
    dispatch({ type: RESET_SHOP_DETAIL });
};

export const resetShops = () => async (dispatch) => {
    dispatch({ type: RESET_SHOPS });
};
