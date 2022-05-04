import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDailyPlan } from '../../actions/plan';
import CalendarRange from './calendarRange';


export class DailyPlan extends Component {

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
  dailyPlan: store.planReducer.dailyPlan
})

const mapDispatchToProps = dispatch => {
  return {
    setDailyPlan: data => { dispatch(setDailyPlan(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlan)