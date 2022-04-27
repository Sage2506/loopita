import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { Home } from './components/home';
import Contract from './components/contract';
import MonthlyPlan from './components/monthlyPlan';
import DailyPlan from './components/dailyPlan/dailyPlan';
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

      </Routes>
    )
  }

}

const mapStateToProps = (store) => ({
})

export default connect(mapStateToProps, null)(Router);
