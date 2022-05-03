import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { Home } from './components/home';
import Contract from './components/contract';
import DailyPlan from './components/dailyPlan/dailyPlan';
import Ending from './components/ending';
import MonthlyPlan from './components/monthlyPlan/monthlyPlan';
import PurchaseInfo from './components/purchaseInfo/purchaseInfo';
import StatsSummary from './components/statsSummary/statsSummary';
export class Router extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/daily_plan" element={<DailyPlan />} />
        <Route path="/monthly_plan" element={<MonthlyPlan />} />
        <Route path="/stats_summary" element={<StatsSummary />} />
        <Route path="/purchase_info" element={<PurchaseInfo />} />
        <Route path="/ending" element={<Ending />} />

      </Routes>
    )
  }

}

const mapStateToProps = (store) => ({
})

export default connect(mapStateToProps, null)(Router);
