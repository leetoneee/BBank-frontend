import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
});

export default rootReducer;