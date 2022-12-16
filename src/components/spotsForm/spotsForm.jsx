import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import NavButtons from '../common/navButtons';
import { Navigate } from 'react-router-dom';
import { setProgress } from '../../actions/client';
import { setSpotsPlan, setSpotsPlanEndHour, setSpotsPlanStartHour } from '../../actions/plan';
import TimeRangeInputComponent from '../dailyPlan/timeRangeInput';


export class SpotsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: {},
      totalSpots: ''
    }
  }

  setRange = (range) => {
    this.setState({
      selectedDays: range
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  diferenceDays = () => {
    const { selectedDays } = this.state
    const from = new Date(selectedDays.from)
    const to = new Date(selectedDays.to)
    let difference = 0;
    if (!!selectedDays.to) {
      difference = to.getTime() - from.getTime()
      difference = Math.ceil(difference / (1000 * 3600 * 24));
    }
    return difference + 1;
  }

  saveProgress = () => {
    this.props.setProgress(2);
    this.props.setSpotsPlan(this.state);
  }

  spotsPerDay = () => {
    if (this.state.selectedDays === undefined) { return 0 }
    return Math.round(this.state.totalSpots / this.diferenceDays());
  }

  componentDidMount() {
    if (this.props.selectedDays) { this.setState({ selectedDays: this.props.selectedDays }) }
    if (this.props.totalSpots) { this.setState({ totalSpots: this.props.totalSpots }) }
  }

  startTimeUp = () => {
    const { startHour, endHour, earliestHour, latestHour } = this.props;
    let newStartHour = startHour ? startHour : earliestHour;
    let newEndHour = endHour ? endHour : latestHour;
    if (newEndHour - newStartHour > 1) {
      this.props.changeStartHour(newStartHour + 1)
    }
  }

  startTimeDown = () => {
    const { startHour, earliestHour } = this.props;
    let newStartHour = startHour ? startHour : earliestHour
    if (newStartHour !== this.props.earliestHour) {
      this.props.changeStartHour(newStartHour - 1)
    }
  }

  endTimeUp = () => {
    const { endHour, latestHour } = this.props;
    let newEndHour = endHour ? endHour : latestHour;
    if (newEndHour !== this.props.latestHour) {
      this.props.changeEndHour(newEndHour + 1);
    }
  }

  endTimeDown = () => {
    const { endHour, startHour, latestHour, earliestHour } = this.props;
    let newStartHour = startHour ? startHour : earliestHour
    let newEndHour = endHour ? endHour : latestHour;
    if (newEndHour - newStartHour > 1) {
      this.props.changeEndHour(newEndHour - 1);
    }
  }

  parseHourToAmPm = (hour) => {
    if (hour === 12) {
      return `12:00 PM`
    } else if (hour > 12 && hour < 24) {
      return `${hour - 12}:00 PM`
    } else if (hour === 24) {
      return `${hour - 12}:00 AM`
    } else {
      return `${hour}:00 AM`
    }
  }

  render() {
    const { selectedDays, totalSpots } = this.state
    if (this.props.progress < 1) { return (<Navigate to="/contract" />) }
    return (
      <div className='container'>
        <form>
          <div className='form-group'>
            <label className="required">
              Total de spots contratados en el periodo
            </label>
            <input
              type="text"
              name='totalSpots'
              value={totalSpots}
              onChange={this.handleInputChange}
              className={`form-control form-control-sm`}
              placeholder='Numero total de spots'
            />
          </div>
        </form>
        <DayPicker
          selected={selectedDays}
          onSelect={this.setRange}
          mode='range'
          disabled={{ before: new Date() }}
        />
        <TimeRangeInputComponent
          endTimeDown={this.endTimeDown}
          endTimeUp={this.endTimeUp}
          parseHourToAmPm={this.parseHourToAmPm}
          startTimeUp={this.startTimeUp}
          startTimeDown={this.startTimeDown}
          startHour={this.props.startHour || this.props.earliestHour}
          endHour={this.props.endHour || this.props.latestHour}
        />
        {(this.spotsPerDay() > 250 || this.state.totalSpots === '' || this.state.totalSpots === 0 || (!!this.state.selectedDays && !this.state.selectedDays.from)) && <p className='required'>Favor de elegir un mayor rango de dias o una menor cantidad de spots</p>}
        <NavButtons
          backLink={true}
          saveProgress={this.saveProgress}
          secondLink="/stats_summary"
          secondName="Siguiente"
          disabledBtn={this.spotsPerDay() > 250 || this.state.totalSpots === '' || this.state.totalSpots === 0 || (!!this.state.selectedDays && !this.state.selectedDays.from)}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  progress: store.clientReducer.progress,
  selectedDays: store.planReducer.spotPlan.selectedDays,
  totalSpots: store.planReducer.spotPlan.totalSpots,
  startHour: store.planReducer.spotPlan.startHour,
  endHour: store.planReducer.spotPlan.endHour,
  earliestHour: store.editableReducer.variables.minInitialHour?.value,
  latestHour: store.editableReducer.variables.maxEndHour?.value,
})

const mapDispatchToProps = dispatch => {
  return {
    setProgress: data => { dispatch(setProgress(data)) },
    setSpotsPlan: data => { dispatch(setSpotsPlan(data)) },
    changeStartHour: data => { dispatch(setSpotsPlanStartHour(data)) },
    changeEndHour: data => { dispatch(setSpotsPlanEndHour(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotsFormComponent)