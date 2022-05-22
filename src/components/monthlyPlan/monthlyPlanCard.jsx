import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { currencyFormat } from '../../utils/common';


const actualSelectedPlan = { id : 1}

const numbers = ['One','Two', 'Three'];

export class MonthlyPlanCard extends Component {


  handleSelectCard = (value) => {
    this.props.setMonthlyPlan(value)
  }

  plansCard(){
    const plansCard = [{
      id: 0,
      name: 'Que me vean con Loopita',
      titleHead: 'Selecciona tu paquete de preferencia.',
      title: 'PaqueTe Vean',
      price: this.props[`price${numbers[0]}`] || 15000,
      descripcion: 'Con Loopita posiciona tu proyecto y haz que te vean en grande. Plan mensual fijo en que aparecerás una vez por loop en nuestra pantalla.',
      state: false,
      loopMultipliyer: this.props[`multiplyerOne${numbers[0]}`] || 1
    },
    {
      id: 1,
      name: 'Que me recuerden con Loopita',
      titleHead: 'Selecciona tu paquete de preferencia.',
      title: 'PaqueTe Vean',
      price: 25000.00,
      descripcion: 'Con Loopita trabaja el posicionamiento  en grande de tu marca. Plan mensual fijo en que aparecerás dos veces por loop en nuestra pantalla.',
      state: false,
      loopMultipliyer: this.props[`multiplyerOne${numbers[1]}`] || 2
    },
    {
      id: 2,
      name: 'Todo con Loopita',
      titleHead: 'Selecciona tu paquete de preferencia.',
      title: 'PaqueTe Vean',
      price: this.props[`price${numbers[2]}`] || 35000,
      descripcion: 'Con Loopita trabaja en tu marca en grande mediante una estrategia de posicionamiento y validación de marca. Plan mensual fijo en que aparecerás tres veces por loop en nuestra pantalla.',
      state: false,
      loopMultipliyer: this.props[`multiplyerOne${numbers[2]}`] || 3
    }]
    return plansCard;
  }

  render (  ) {
    const { monthlyPlan } = this.props
    return(
      <>
      {
        this.plansCard().map((data, index) =>

          <div key={index}>
            <div
              className={`${data.id === monthlyPlan.id ? "card w-100 select__item" : "card w-100"}`}
              onClick={() => this.handleSelectCard(data)}
            >
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title">
                    {data.name}
                  </h5>
                  <span>{currencyFormat(data.price)}</span>
                </div>
                <p className="card-text">
                  {data.descripcion}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect( mapStateToProps, mapDispatchToProps)(MonthlyPlanCard)