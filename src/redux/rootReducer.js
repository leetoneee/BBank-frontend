import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";
import counterReducer from './selectBtn/selectBtnSlice';
import transferReducer from "./customer/transfer/transferSlice";
import cashtransferReducer from "./customer/cashtransfer/cashtransferSlice";
import customerWithdrawSavingReducer from "./customer/withdrawsavingSlice/withdrawsavingSlice";
import checkAccountReducer from './system/checkAccountExist/checkExistSlice';
import sendOtpReducer from "./system/sendOtp/sendOtpSlice";
import savingTypeReducer from "./getSavingType/savingTypeSlice";
import customerDepositSavingReducer from "./customer/depositSaving/customerDepositSavingSlice";
import listSavingReducer from "./customer/listSaving/listSavingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    counter: counterReducer,
    transfer: transferReducer,
    checkAccount: checkAccountReducer,
    sendOtp: sendOtpReducer,
    cashtransfer: cashtransferReducer,
    customerWithdrawSaving: customerWithdrawSavingReducer,
    savingTypes: savingTypeReducer,
    cDepositSaving: customerDepositSavingReducer,
    listSaving: listSavingReducer,
});

export default rootReducer;