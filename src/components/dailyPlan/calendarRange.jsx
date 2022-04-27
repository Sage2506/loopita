import React, { Component } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { es } from 'date-fns/locale';
import NavButtons from '../common/navButtons';
import TimePickerDate from './timePickerDate';
import TotalAmount from './totalAmount';

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

  handleDayClick = (day, { selected }) => {
    let dayParsed = day.getDate();
    if (dayParsed < 10) {
      dayParsed = '0' + dayParsed
    } else {
      dayParsed = dayParsed.toString()
    }
    let monthParsed = day.getMonth();
    if (monthParsed < 10) {
      monthParsed = '0' + monthParsed
    } else {
      monthParsed = monthParsed.toString()
    }
    const year = day.getFullYear();
    const parsedDate = dayParsed + '-' + monthParsed + '-' + year
    // cuando viene selected borrarlo de la lista, cuando viene undefined agregarlo
    const selectDays = this.state.selectedDays.concat()
    const selectedAddHoursList = this.state.addHoursList.concat()
    if (selected) {
      const selectedIndex = selectDays.findIndex(selectedDay => true
        // DateUtils.isSameDay(selectedDay, day) TODO: find a way to calculate same day
      );
      selectDays.splice(selectedIndex, 1);
      const addItemIndex = selectedAddHoursList.findIndex(selectedAddHourItem => selectedAddHourItem.stringDate === parsedDate)
      selectedAddHoursList.splice(addItemIndex, 1)
      // store into reducer removeSelectedDate(parsedDate)
    } else {
      selectDays.push(day)
      var newAddDate = {
        stringDate: parsedDate,
        startHour: 6,
        endHour: 9
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

  render() {
    const { selectedDays, dateTimeItems, price, amount, total, addHoursList } = this.state
    return (
      <div>
        <div className="container__calendar">
          <DayPicker
            selectedDays={selectedDays}
            onDayClick={this.handleDayClick}
            locale={locale}
            disabled={true}
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
            firstName="Atrás"
            secondName="Siguiente"
            firstLink="/contrat"
            secondLink="/stats_summary"
            disabledBtn={this.state.selectedDays.length < 1}
          />
        </div>
        <TotalAmount amount={total}/>
      </div>
    );
  }
}