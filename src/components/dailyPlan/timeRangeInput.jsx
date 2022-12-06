import React, { Component } from 'react';

export default class TimeRangeInputComponent extends Component {
  render() {
    const {
      endTimeDown,
      endTimeUp,
      parseHourToAmPm,
      startTimeUp,
      startTimeDown,
      startHour,
      endHour,
    } = this.props
    return (
      <div className="display-columns-wrapp">
        <div>
          Hora inicio:
          <div className="input-group inline-group">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary btn-minus" onClick={startTimeDown}>
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <input className="form-control quantity" value={parseHourToAmPm(startHour)} type="text" name="startHour" id="startHour" readOnly={true} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-plus" onClick={startTimeUp}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div>
          Hora final:
          <div className="input-group inline-group">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary btn-minus" onClick={endTimeDown}>
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <input className="form-control quantity" value={parseHourToAmPm(endHour)} type="text" name="endHour" id="endHour" readOnly={true} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-plus" onClick={endTimeUp}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}