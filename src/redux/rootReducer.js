import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import counterReducer from './selectBtn/selectBtnSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    counter: counterReducer,
});

export default rootReducer;