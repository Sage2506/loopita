import React, { Component } from 'react';
import { currencyFormat } from '../../utils/common';

export default class TotalAmount extends Component {
  render (  ) {
    return(
      <div className="total__amount">
      <p className="total">Total:</p>
      <div className="bx-amount">
          <p></p><p className="amoun__cant">{currencyFormat( this.props.amount)}</p>
      </div>
  </div>
    );
  }
}