import React, { Component } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { es } from 'date-fns/locale';
import NavButtons from '../common/navButtons';
import TimePickerDate from './timePickerDate';
import TotalAmount from './totalAmount';
import { parseDayToDDMMYYYY } from '../../utils/common';

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

  componentDidMount (){
    const { dailyPlan } = this.props
    console.log(dailyPlan);
    this.setState({
      selectedDays : dailyPlan.map( dailyItem => dailyItem.date),
      addHoursList : dailyPlan
    })
  }

  saveProgress = () => {
    this.props.saveProgress(this.state.addHoursList)
  }

  handleDayClick = (day, { selected }) => {
    const parsedDate = parseDayToDDMMYYYY(day)
    const selectDays = this.state.selectedDays;
    const selectedAddHoursList = this.state.addHoursList.concat()
    if (selected) {
      const selectedIndex = selectDays.findIndex(selectedDay => this.compareDays(selectedDay,day));
      selectDays.splice(selectedIndex, 1);
      const addItemIndex = selectedAddHoursList.findIndex(selectedAddHourItem => selectedAddHourItem.stringDate === parsedDate)
      selectedAddHoursList.splice(addItemIndex, 1)
      // store into reducer removeSelectedDate(parsedDate)
    } else {
      selectDays.push(day)
      var newAddDate = {
        stringDate: parsedDate,
        startHour: 6,
        endHour: 9,
        date: day
      }
      selectedAddHoursList.push(newAddDate)
      // store into reducer addSelectedDate(newAddDate)
    }
    this.setState({
      selectedDays: selectDays,
      addHoursList: selectedAddHoursList
    })
    this.setAmount()
  }

  changeAddTime = (addHourData) => {
    const itemIndex = this.state.addHoursList.findIndex(selectedAddHourItem => selectedAddHourItem.stringDate === addHourData.stringDate)
    const newAddHoursList = this.state.addHoursList.concat()
    newAddHoursList[itemIndex] = addHourData
    this.setState({
      addHoursList: newAddHoursList
    })
    this.setAmount()
  }

  setAmount = () => {
    // store into reducer const totalsResult = calculateDailyServiceTotals(getSelectedDates())
    this.setState({ total: 750 }) //totalsResult.total})
  }

  compareDays = (dayOne, dayTwo) => {
    return parseDayToDDMMYYYY(dayOne) === parseDayToDDMMYYYY(dayTwo)
  }

  render() {
    const { selectedDays, dateTimeItems, price, amount, total, addHoursList } = this.state
    return (
      <div>
        <div className="container__calendar">
          <DayPicker
            mode='multiple'
            selected={selectedDays}
            onDayClick={this.handleDayClick}
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
                changeAddTime={this.changeAddTime}
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
        <TotalAmount amount={total} />
      </div>
    );
  }
}