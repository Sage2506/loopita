import React from 'react';
import CalendarRange from '../components/CalendarRange';

export const PlanPorDia = () => {

    return (
        <div>
            <div className="title__time">
                <p className="title">
                    Plan por día
                </p>
                <p className="subtitle__plan-mensual">
                    Selecciona las fechas de actividad de tu campaña.
                </p>
                <p className="subtitle__plan-mensual">
                    *Para continuar con el proceso selecciona el día que deseas ver tu campaña, una vez seleccionado podrás continuar con los horarios que deseas.
                </p>
            </div>
            <div className="calendar__cont">
                <CalendarRange />
            </div>
        </div>
    )
}