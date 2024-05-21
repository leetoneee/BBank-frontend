
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Transfer from '../pages/Transfer/Transfer';
import FastFeatures from '../pages/FastFeatures/FastFeatures';
import SavingGroup from '../pages/SavingGroup/SavingGroup';
import WithdrawSaving from '../pages/WithdrawSaving/WithdrawSaving';
import TransferGroup from '../pages/TransferGroup/TransferGroup';
import DepositSaving from '../pages/DepositSaving/DepositSaving';
import TransactionHistory from '../pages/TransactionHistory/TransactionHistory';
import CancelAutoSaving from '../pages/CancelAutoSaving/CancelAutoSaving';


function CustomerRoutes() {

    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route exact path='home/transfer-group' element={<TransferGroup />} />
            <Route exact path='home/transfer-group/transfer' element={<Transfer />} />
            <Route exact path='home/saving-group/withdraw' element={<WithdrawSaving />} />
            <Route exact path='home/saving-group' element={<SavingGroup />} />
            <Route exact path='home/saving-group/saving' element={<DepositSaving />} />
            <Route exact path='home/account/transaction-history' element={<TransactionHistory />} />
            <Route exact path='home/saving-group/cancel-auto-saving' element={<CancelAutoSaving />} />
            <Route exact path='home/account/transaction-history' element={<TransactionHistory />} />
            <Route exact path='setting' element={<Home />} />
            <Route exact path='setting/fastfeatures' element={<FastFeatures />} />
        </Routes>
    )
}

export default CustomerRoutes;
