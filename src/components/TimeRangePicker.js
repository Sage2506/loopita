import React, { useState } from 'react';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';



export const TimeRangepicker = () => {
    const [value, onChange] = useState(['10:00', '11:00']);
    return (
        <div className="react-timerange-picker">
            <time className="react-clock">
                <TimeRangePicker
                    onChange={onChange}
                    value={value}
                />

            </time>
        </div>
    )
}