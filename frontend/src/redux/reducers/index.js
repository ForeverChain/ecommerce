import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { shopReducer } from "./shopReducer";
import { userLoginReducer, userRegisterReducer } from "./userReducers";

const reducers = combineReducers({
    allProducts: productReducer,
    cart: cartReducer,
    shops: shopReducer,
    userPanelLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

export default reducers;
