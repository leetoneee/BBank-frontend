
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Transfer from '../pages/Transfer/Transfer';
import FastFeatures from '../pages/FastFeatures/FastFeatures';
import SavingGroup from '../pages/SavingGroup/SavingGroup';
import WithdrawSaving from '../pages/WithdrawSaving/WithdrawSaving';
import TransferGroup from '../pages/TransferGroup/TransferGroup';
import CashTransfer from '../pages/CashTransfer/CashTransfer';
import DepositSaving from '../pages/DepositSaving/DepositSaving';
function CustomerRoutes() {

    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route exact path='home/transfer-group/transfer' element={<Transfer />} />
            <Route exact path='home/transfer-group/cashtransfer' element={<CashTransfer />} />
            <Route exact path='home/saving-group/withdraw' element={<WithdrawSaving />} />
            <Route exact path='home/transfer-group' element={<TransferGroup />} />
            <Route exact path='home/saving-group' element={<SavingGroup />} />
            <Route exact path='home/saving-group/saving' element={<DepositSaving />} />
            <Route exact path='utilities' element={<Home />} />
            <Route exact path='setting' element={<Home />} />
            <Route exact path='setting/fastfeatures' element={<FastFeatures />} />
            <Route exact path='contact' element={<Home />} />
        </Routes>
    )
}

export default CustomerRoutes;
