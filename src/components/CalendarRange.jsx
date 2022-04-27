import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { es } from 'date-fns/locale';
import TimePickerDate from './TimePickerDate';
import { TotalAmount } from './TotalAmount';
import Buttons from '../components/Buttons';
import { addSelectedDate, getSelectedDates, removeSelectedDate } from '../service/storaje';
import { calculateDailyServiceTotals } from '../utils/common';
const locale = es;

export default class CalendarRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays : [],
      itemsTimePicker : [],
      addHoursList : [],
      dateTimeItems: [],
      amount : 0,
      price : {
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
    if( selected ){
      const selectedIndex = selectDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectDays.splice(selectedIndex, 1);
      const addItemIndex = selectedAddHoursList.findIndex( selectedAddHourItem => selectedAddHourItem.stringDate === parsedDate)
      selectedAddHoursList.splice(addItemIndex,1)
      removeSelectedDate(parsedDate)
    } else {
      selectDays.push(day)
      var newAddDate = {
        stringDate: parsedDate,
        startHour: 6,
        endHour: 9
      }
      selectedAddHoursList.push(newAddDate)
      addSelectedDate(newAddDate)
    }
    this.setState({
      selectedDays : selectDays,
      addHoursList : selectedAddHoursList
    })
    this.setAmount()
  }

  changeAddTime = (addHourData ) => {
    const itemIndex = this.state.addHoursList.findIndex( selectedAddHourItem => selectedAddHourItem.stringDate === addHourData.stringDate )
    const newAddHoursList = this.state.addHoursList.concat()
    newAddHoursList[itemIndex] = addHourData
    this.setState({
      addHoursList : newAddHoursList
    })
    this.setAmount()
  }

  setAmount = () => {
    const totalsResult = calculateDailyServiceTotals(getSelectedDates())
    this.setState({total : totalsResult.total})
  }

  render (  ) {
    const { selectedDays, dateTimeItems, price, amount, total, addHoursList } = this.state
    return(
      <>
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
          <li
            key={index}
          >
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
        <Buttons
          firstName="Atrás"
          secondName="Siguiente"
          firstLink="contrato"
          secondLink="archivos"
          disabledBtn = {this.state.selectedDays.length < 1}
        />
      </div>
      <TotalAmount
        amount={total}
      />
    </>
    );
  }
}