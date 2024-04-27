import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;