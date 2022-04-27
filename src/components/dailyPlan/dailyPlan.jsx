import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarRange from './calendarRange';


export class DailyPlan extends Component {

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
          <CalendarRange></CalendarRange>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlan)