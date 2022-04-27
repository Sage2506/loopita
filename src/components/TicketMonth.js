import React from 'react';
import Buttons from '../components/Buttons';

export const TicketMonth = () => {
    return (
        <div className="ticket__preview">
            <p className="title">Recibo de mes</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Plan por día
                        </th>
                        <th></th>
                        <th>
                            10/sep/21 - 15/sep/21
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            colspan="2"
                            className="table-active"
                            >
                                Nombre
                        </td>
                        <td>@twitter</td>
                    </tr>
                    <tr>
                        <td colspan="2" className="table-active">Campaña</td>
                        <td>@twitter</td>
                    </tr>
                    <tr>
                        <td colspan="2" className="table-active">Pantallas</td>
                        <td>@twitter</td>
                    </tr>
                    <tr>
                        <td colspan="2" className="table-active">Total días</td>
                        <td>@twitter</td>
                    </tr>
                    <tr>
                        <td colspan="2" className="table-active">Total horas</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

            <div className="container-price">
                <label for="inputPassword2" className="visually-hidden">Total:</label>
                <input type="text" className="form-control" />
            </div>

            <div>
                <Buttons
                    firstName="Atrás"
                    secondName="Aceptar"
                    secondLink="finalizacion"
                    firstLink="compra"
                />
            </div>
        </div>
    )
}