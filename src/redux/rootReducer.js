import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";
import counterReducer from './selectBtn/selectBtnSlice';
import transferReducer from "./customer/transfer/transferSlice";
import cashtransferReducer from "./customer/cashtransfer/cashtransferSlice";
import checkAccountReducer from './system/checkAccountExist/checkExistSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    counter: counterReducer,
    transfer: transferReducer,
    checkAccount: checkAccountReducer,
    cashtransfer: cashtransferReducer,
});

export default rootReducer;