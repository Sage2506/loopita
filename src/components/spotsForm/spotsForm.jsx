import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import NavButtons from '../common/navButtons';
import { Navigate } from 'react-router-dom';
import { setProgress } from '../../actions/client';
import { setSpotsPlan } from '../../actions/plan';


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
    let difference = to.getTime() - from.getTime()
    difference = Math.ceil(difference / (1000 * 3600 * 24));
    return difference + 1;
  }

  saveProgress = () => {
    this.props.setProgress(2);
    this.props.setSpotsPlan(this.state);
  }

  spotsPerDay = () => {
    return Math.round(this.state.totalSpots / this.diferenceDays());
  }

  componentDidMount () {
    if(this.props.selectedDays) { this.setState({selectedDays: this.props.selectedDays})}
    if(this.props.totalSpots) { this.setState({totalSpots: this.props.totalSpots})}
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
            <label>
              Spots diarios (maximo 250)
            </label>
            <input
              disabled
              value={selectedDays.from && selectedDays.to && totalSpots > 0 ? this.spotsPerDay() : ''}
              type="text"
              className={`form-control form-control-sm`}
              placeholder='Spots por dia'
            />
          </div>
        </form>
        <DayPicker
          selected={selectedDays}
          onSelect={this.setRange}
          mode='range'
          disabled={{ before: new Date() }}
        />
        <NavButtons
          backLink={true}
          saveProgress={this.saveProgress}
          secondLink="/stats_summary"
          secondName="Siguiente"
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  progress : store.clientReducer.progress,
  selectedDays: store.planReducer.spotPlan.selectedDays,
  totalSpots: store.planReducer.spotPlan.totalSpots,
})

const mapDispatchToProps = dispatch => {
  return {
    setProgress: data => { dispatch(setProgress(data)) },
    setSpotsPlan: data => { dispatch(setSpotsPlan(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotsFormComponent)