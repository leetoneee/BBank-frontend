import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import authReducer from './authentication/authSlice';
import customerReducer from "./customer/customerSlice";
import counterReducer from './selectBtn/selectBtnSlice';
import transferReducer from "./customer/transfer/transferSlice";
import cashtransferReducer from "./customer/cashtransfer/cashtransferSlice";
import withdrawsavingReducer from "./customer/withdrawsavingSlice/withdrawsavingSlice";
import checkAccountExistReducer from "./system/checkAccountExist/checkAccountExistSlice";
import sendOtpReducer from "./system/sendOtp/sendOtpSlice";
import savingTypeReducer from "./getSavingType/savingTypeSlice";
import customerDepositSavingReducer from "./customer/depositSaving/customerDepositSavingSlice";
import createCustomerProfileReducer from "./employee/createCustomerProfile/createCustomerProfileSlice";
import createCustomerAccountReducer from "./employee/createCustomerAccount/createCustomerAccountSlice";
import checkCccdExistReducer from "./system/checkCccdExist/checkCccdExistSlice";
import employeeDepositSavingReducer from "./employee/depositSaving/employeeDepositSavingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    counter: counterReducer,
    transfer: transferReducer,
    checkAccount: checkAccountExistReducer,
    sendOtp: sendOtpReducer,
    cashtransfer: cashtransferReducer,
    withdrawsaving: withdrawsavingReducer,
    savingTypes: savingTypeReducer,
    cDepositSaving: customerDepositSavingReducer,
    createProfile: createCustomerProfileReducer,
    createAccount: createCustomerAccountReducer,
    checkCccd: checkCccdExistReducer,
    eDepositSaving: employeeDepositSavingReducer,
});

export default rootReducer;