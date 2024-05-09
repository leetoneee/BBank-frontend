import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";
import counterReducer from './selectBtn/selectBtnSlice';
import transferReducer from "./customer/transfer/transferSlice";
import cashtransferReducer from "./customer/cashtransfer/cashtransferSlice";
import withdrawsavingReducer from "./customer/withdrawsavingSlice/withdrawsavingSlice";
import checkAccountReducer from './system/checkAccountExist/checkExistSlice';
import sendOtpReducer from "./system/sendOtp/sendOtpSlice";
import savingTypeReducer from "./getSavingType/savingTypeSlice";
import customerDepositSavingReducer from "./customer/depositSaving/customerDepositSavingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    counter: counterReducer,
    transfer: transferReducer,
    checkAccount: checkAccountReducer,
    sendOtp: sendOtpReducer,
    cashtransfer: cashtransferReducer,
    withdrawsaving: withdrawsavingReducer,
    savingTypes: savingTypeReducer,
    cDepositSaving: customerDepositSavingReducer,
});

export default rootReducer;