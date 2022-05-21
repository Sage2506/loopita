import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEditable } from '../../actions/editable';
import { setDailyPlan } from '../../actions/plan';
import { initVariables } from '../../utils/common';
import CalendarRange from './calendarRange';


export class DailyPlan extends Component {

  componentDidMount(){
    if(!this.props.loaded){
      initVariables(this.props.setEditables)
    }
  }
  saveProgress = data => {
    this.props.setDailyPlan(data)
  }

  render() {
    return (
      <div>
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
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dailyPlan: store.planReducer.dailyPlan,
  loaded: store.editableReducer.loaded
})

const mapDispatchToProps = dispatch => {
  return {
    setDailyPlan: data => { dispatch(setDailyPlan(data)) },
    setEditables: data => { dispatch(setEditable(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlan)