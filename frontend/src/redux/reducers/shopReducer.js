import { ActionTypes } from "../constants";
const { FETCH_SHOPS, SET_SHOP_DETAIL, RESET_SHOP_DETAIL, RESET_SHOPS } = ActionTypes;

const initialState = {
    shops: [],
    shopDetail: [],
    numOfPages: 0,
    sortBy: "",
    searchText: "",
};

export const shopReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SHOPS:
            return { ...state, shops: [...state.shops, ...payload.data], numOfPages: payload.numOfPages, sortBy: payload.sortBy, searchText: payload.searchText };
        case SET_SHOP_DETAIL:
            return { ...state, shopDetail: payload };
        case RESET_SHOP_DETAIL:
            return { ...state, shopDetail: {} };
        case RESET_SHOPS:
            return { ...state, shops: [] };
        default:
            return state;
    }
};
