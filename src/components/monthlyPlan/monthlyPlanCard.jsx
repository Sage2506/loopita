import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { currencyFormat } from '../../utils/common';

const plansCard = [{
  id: 0,
  name: 'Que me vean con Loopita',
  titleHead: 'Selecciona tu paquete de preferencia.',
  title: 'PaqueTe Vean',
  price: 15000.00,
  descripcion: 'Con Loopita posiciona tu proyecto y haz que te vean en grande. Plan mensual fijo en que aparecerás una vez por loop en nuestra pantalla.',
  state: false,
  loopMultipliyer: 1
},
{
  id: 1,
  name: 'Que me recuerden con Loopita',
  titleHead: 'Selecciona tu paquete de preferencia.',
  title: 'PaqueTe Vean',
  price: 25000.00,
  descripcion: 'Con Loopita trabaja el posicionamiento  en grande de tu marca. Plan mensual fijo en que aparecerás dos veces por loop en nuestra pantalla.',
  state: false,
  loopMultipliyer: 2
},
{
  id: 2,
  name: 'Todo con Loopita',
  titleHead: 'Selecciona tu paquete de preferencia.',
  title: 'PaqueTe Vean',
  price: 35000.00,
  descripcion: 'Con Loopita trabaja en tu marca en grande mediante una estrategia de posicionamiento y validación de marca. Plan mensual fijo en que aparecerás tres veces por loop en nuestra pantalla.',
  state: false,
  loopMultipliyer: 3
}]
const actualSelectedPlan = { id : 1}


export class MonthlyPlanCard extends Component {


  handleSelectCard = (value) => {
    this.props.setMonthlyPlan(value)
    /*         //Busca el elemento en el array para cambiar su estado
           let item = arrayDataCard.find(item => item.id === value);
            let price = item.price;
            let total;
            let bolean;
            const storage = 'planMensual';
            let actualityStorage = getStateLocalStorage('planMensual');

            //Estado inicial del paquete, evita que se puedan elegir mas de
            //Un paquete
            let stateInitial = arrayDataCard.map(items => {
                if (items.id !== value) {
                    return {
                        ...items,
                        state: false
                    }
                }
                return items;
            });

            setArrayDataCard(stateInitial);

            if (item.state === false) {
                item.state = true;
                bolean = true;
                setReload(true);
                setAmount(price);
                updateStateCheckStorage(storage, value, bolean, actualityStorage);

            } else {
                //setReload(false)
                bolean = false;
                item.state = false;
                setReload(true);
                updateStateCheckStorage(storage, value, bolean, actualityStorage);
                if (amount) {
                    total = amount - price;
                    setAmount(total);
                }
            }  */
  }

  render (  ) {
    const { monthlyPlan } = this.props
    return(
      <>
      {
        plansCard.map((data, index) =>

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