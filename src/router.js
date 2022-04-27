import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { Home } from './components/home';
import FormDataClient from './components/FormDataClient';

export class Router extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contrato" component={<FormDataClient/>} />
        <Route exact path="/planMensual" component={<PlanMensual/>} />
        <Route exact path="/planPorDia" component={<PlanPorDia/>} />
        <Route exact path="/archivos" component={<UploadFile/>} />
        <Route exact path="/previsualizacion" component={<PreView/>} />
        <Route exact path="/compra" component={<BuyConfirm/>} />
        <Route exact path="/confirmacionCompraDia" component={<TicketDay/>} />
        <Route exact path="/finalizacion" component={<Ending/>} />
      </Routes>
    )
  }

}

const mapStateToProps = (store) => ({
})

export default connect(mapStateToProps, null)(Router);
