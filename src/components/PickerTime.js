import React, { useState } from "react";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export const PickerTime = () => {

    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <div className="time__picker-cont">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    label="Hora Inicio"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="time-range"
                />
                <hr />

                <KeyboardTimePicker
                    label="Hora Fin"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="time-range"
                />
                <hr />
            </MuiPickersUtilsProvider>
        </div>
    )
}