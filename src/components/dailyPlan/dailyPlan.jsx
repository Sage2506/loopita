import React, { Component } from 'react';
import {Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditable } from '../../actions/editable';
import { setProgress } from '../../actions/client';
import { setDailyPlan } from '../../actions/plan';
import { initVariables, parsePeakHourRange } from '../../utils/common';
import CalendarRange from './calendarRange';


export class DailyPlan extends Component {

  componentDidMount(){
    if(!this.props.loaded){
      initVariables(this.props.setEditables)
    }
  }
  saveProgress = data => {
    this.props.setDailyPlan(data)
    this.props.setProgress(2);
  }


  render() {
    if ( this.props.progress < 1 ){
      return (
        <Navigate to="/contract" />
      )
    } else {
      return (
        <div className='container'>
          <div className="title__time">
            <p className="title">
              Plan por día
            </p>
            <p className="subtitle__plan-mensual">
              Selecciona las fechas de actividad de tu campaña.
            </p>
            <p className="subtitle__plan-mensual">
              *Para continuar con el proceso selecciona el día que deseas ver tu campaña, una vez seleccionado podrás continuar con los horarios que deseas.
            </p>
          </div>
          <div className="calendar__cont">
            <CalendarRange
              dailyPlan={this.props.dailyPlan}
              saveProgress={this.saveProgress}
              minInitialHour={this.props.minInitialHour}
              maxEndingHour={this.props.maxEndingHour}
              peakHourRange={parsePeakHourRange (this.props.peakHourRange)}
              normalHourPrice={this.props.normalHourPrice}
              peakHourPrice={this.props.peakHourPrice}
              loopDuration={this.props.loopDuration}
            />
          </div>
        </div>
      );
    }
    }
}

const mapStateToProps = store => ({
  dailyPlan: store.planReducer.dailyPlan,
  loaded: store.editableReducer.loaded,
  minInitialHour : store.editableReducer.variables.minInitialHour?.value,
  maxEndingHour : store.editableReducer.variables.maxEndHour?.value,
  peakHourRange : store.editableReducer.variables.peakHourRange?.value,
  normalHourPrice : store.editableReducer.variables.normalHourSpotPrice?.value,
  peakHourPrice : store.editableReducer.variables.peakHourSpotPrice?.value,
  loopDuration : store.editableReducer.variables.loopDuration?.value,
  progress : store.clientReducer.progress
})

const mapDispatchToProps = dispatch => {
  return {
    setDailyPlan: data => { dispatch(setDailyPlan(data)) },
    setEditables: data => { dispatch(setEditable(data)) },
    setProgress: data => { dispatch( setProgress (data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlan)