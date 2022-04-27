import React from 'react'
import { currencyFormat } from '../utils/common'

export const TotalAmount = ({ amount }) => {
    return (
        <div className="total__amount">
            <p className="total">Total:</p>
            <div className="bx-amount">
                <p></p><p className="amoun__cant">{currencyFormat( amount)}</p>
            </div>
        </div>
    )
}
