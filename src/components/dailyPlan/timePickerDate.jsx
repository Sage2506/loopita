import React, { Component } from 'react';

export default class TimePickerDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringDate: "",
      startHour: 6,
      endHour: 9,
      earliestHour : 6,
      latestHour: 24
    }
  }

  componentDidMount = () => {
    this.setState(this.props.getDate)
  }

  startTimeUp = () => {
    const { startHour, endHour } = this.state
    if (endHour - startHour > 1 && startHour !== this.state.latestHour-1) {
      this.changeTime(startHour + 1, 'startHour')
    }
  }

  startTimeDown = () => {
    const { startHour } = this.state
    if (startHour !== this.state.earliestHour) {
      this.changeTime(startHour - 1, 'startHour')
    }
  }

  endTimeUp = () => {
    const { endHour } = this.state
    if (endHour !== this.state.latestHour) {
      this.changeTime(endHour + 1, 'endHour')
    }
  }

  endTimeDown = () => {
    const { endHour, startHour, } = this.state
    if (endHour - startHour > 1 && startHour !== this.state.earliestHour+1) {
      this.changeTime(endHour - 1, 'endHour')
    }
  }

  parseHourToAmPm = ( hour ) => {
    if( hour === 12){
      return `12:00 PM`
    } else if( hour > 12 && hour < 24) {
      return `${hour-12}:00 PM`
    } else if ( hour === 24){
      return `${hour-12}:00 AM`
    } else {
      return `${hour}:00 AM`
    }
  }

  handleHourChange = e => {
    if (!isNaN(e.target.value)) {
      const newHour = parseInt(e.target.value)
      if (e.target.id === 'startHour') {
        if (newHour >= 5 && newHour < this.state.endHour && newHour < 23) {
          this.changeTime(newHour, e.target.id)
        }
      } else {
        if (newHour > 5 && newHour > this.state.startHour && newHour < 24) {
          this.changeTime(newHour, e.target.id)
        }
      }
    }
  }

  changeTime = (newHour, hourToChange) => {
    this.setState({ [hourToChange]: newHour })
    // store in reducer alterDateHours({ ...this.state, [hourToChange]: newHour })
    this.props.changeAddTime({ ...this.state, [hourToChange]: newHour })
  }

  render() {
    const { startTimeDown, startTimeUp, endTimeDown, endTimeUp, state } = this
    const { stringDate, startHour, endHour } = state
    return (
      <div>
        {stringDate}
        <div className="grid__contrat">
          <div>
            Hora inicio:
            <div className="input-group inline-group">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary btn-minus" onClick={startTimeDown}>
                  <i className="fa fa-minus"></i>
                </button>
              </div>
              <input className="form-control quantity" value={this.parseHourToAmPm(startHour)} type="text" name="startHour" id="startHour" readOnly={true}/>
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
              <input className="form-control quantity" value={this.parseHourToAmPm(endHour)} type="text" name="endHour" id="endHour" readOnly={true} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-plus" onClick={endTimeUp}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


