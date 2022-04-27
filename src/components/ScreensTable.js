import React from 'react';
import { setLocalScreen } from '../service/storaje';

export const ScreensTable = ({ onChecked, selectedScreen }) => {
    const listScreenT = [
      {
          id: 1,
          name: 'PantallaRio 1',
          title: '1 hora',
          service: '12 pm',
          state: false,
          maxPoint: '17:00',
          avgViewers : '1548'
      }
  ]

    const isChecked = (e,value) => {
        if (e.target.checked){
            onChecked(value)
            setLocalScreen(value)
        } else {
            onChecked(null)
            setLocalScreen(null)
        }
    }

    return (
        <>
            <p className="title__form">
                Que te vean con loopita en
            </p>
            <p className="sb__title_table">
                Selecciona las pantallas
                donde se mostrará tu campaña.
            </p>
            <table className="table table-bordered table__info" align="center">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '40px' }}></th>
                        <th scope="col">Pantalla</th>
                        <th scope="col">Promedio Tráfico por hora</th>
                        <th scope="col">Hora más concurrida</th>
                    </tr>
                </thead>
                <tbody>

                    { listScreenT.map((el, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={el}
                                        name="p1"
                                        onChange={e => isChecked(e,el)}
                                        checked={selectedScreen !== null && selectedScreen.id === el.id}
                                    />
                                </td>
                                <td>{el.name}</td>
                                <td>{el.avgViewers}</td>
                                <td>{el.maxPoint}</td>
                            </tr>

                        ))
                    }


                </tbody>
            </table>
        </>
    );
}