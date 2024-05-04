import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";
import counterReducer from './selectBtn/selectBtnSlice';
import transferReducer from "./transfer/transferSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    counter: counterReducer,
    transfer: transferReducer,
});

export default rootReducer;