import React, { Component } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import NavButtons from '../common/navButtons';
import TimePickerDate from './timePickerDate';
import TotalAmount from './totalAmount';
import { calculateDailyServiceTotals, parseDayToDDMMYYYY } from '../../utils/common';

const locale = es;
export default class CalendarRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      itemsTimePicker: [],
      addHoursList: [],
      dateTimeItems: [],
      amount: 0,
      price: {
        valueA: 50,
        valueB: 75
      },
      total: 0
    }
  }

  componentDidMount() {
    const { dailyPlan } = this.props
    if( dailyPlan.length === 0){
      const initialItem = this.createHourItem(new Date());
      dailyPlan.push(initialItem)
    }
    this.setState({
      selectedDays: dailyPlan.map(dailyItem => dailyItem.date),
      addHoursList: dailyPlan
    })
  }

  saveProgress = () => {
    this.props.saveProgress(this.state.addHoursList)
  }

  changeAddTime = (addHourData) => {
    const itemIndex = this.state.addHoursList.findIndex(selectedAddHourItem => selectedAddHourItem.stringDate === addHourData.stringDate)
    const newAddHoursList = this.state.addHoursList.concat()
    newAddHoursList[itemIndex] = addHourData
    this.setState({
      addHoursList: newAddHoursList
    })
  }

  setDays = (days) => {
    this.setState({
      selectedDays: days,
      addHoursList: days.map(this.createHourItem)
    })
  }

  createHourItem = (day) => {
    return {
      stringDate: parseDayToDDMMYYYY(day),
      startHour: this.props.minInitialHour || 7,
      endHour: this.props.maxEndingHour || 24,
      date: day
    }
  }

  removeDate = (date) => {
    const selectedDate = format(date.date,'P');
    this.setState({
      selectedDays : this.state.selectedDays.filter( item => format(item,'P') !== selectedDate),
      addHoursList : this.state.addHoursList.filter( item => format(item.date,'P') !== selectedDate)
    })
  }

  compareDays = (dayOne, dayTwo) => {
    return parseDayToDDMMYYYY(dayOne) === parseDayToDDMMYYYY(dayTwo)
  }

  render() {
    const { selectedDays, dateTimeItems, price, amount, addHoursList } = this.state
    return (
      <div>
        <div className="container__calendar">
          <DayPicker
            mode='multiple'
            selected={selectedDays}
            onSelect={this.setDays}
            locale={locale}
            className="calendar"
          />
          <p>Horario</p>
          {addHoursList.map((data, index) => (
            <li key={index}>
              <TimePickerDate
                getDate={data}
                idDayPicker={index}
                dateTimeItems={dateTimeItems}
                price={price}
                amount={amount}
                removeDate={this.removeDate}
                changeAddTime={this.changeAddTime}
                minInitialHour={this.props.minInitialHour}
                maxEndingHour={this.props.maxEndingHour}
              />
            </li>
          ))}

        </div>
        <div style={{ padding: "1rem" }}>
          <NavButtons
            backLink={true}
            disabledBtn={this.state.selectedDays.length < 1}
            saveProgress={this.saveProgress}
            secondLink="/stats_summary"
            secondName="Siguiente"
          />
        </div>
        <TotalAmount amount={calculateDailyServiceTotals(addHoursList, this.props.peakHourRange, this.props.normalHourPrice, this.props.peakHourPrice, this.props.loopDuration).total} />
      </div>
    );
  }
}