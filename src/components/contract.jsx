import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavButtons from './common/navButtons';

const listScreenT = [
  {
    id: 1,
    name: 'PantallaRio 1',
    title: '1 hora',
    service: '12 pm',
    state: false,
    maxPoint: '17:00',
    avgViewers: '1548'
  }
]

export class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameClient: "",
      email: "",
      tel: "",
      camp: "",
      selectedScreen: null
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const newClient = {
      ...this.state,
      [e.target.name]: e.target.value
    }
    //setClient(newClient) replace by store the client on the redux
  }

  handleSubmit = e => {
    e.preventDefault()
    //setClient(this.state) replace by store the client on the redux

  }

  handleSelectedCheck = (screen) => {
    this.setState({
      selectedScreen: screen
    })
  }

  isChecked = (e, value) => {
    if (e.target.checked) {
      this.handleSelectedCheck(value)
      //setLocalScreen(value) store the value to the reducer
    } else {
      this.handleSelectedCheck(null)
      //setLocalScreen(null) store the valuet to the reducer
    }
  }

  disabledBtn = () => {
    return true
  }

  render() {
    const { nameClient, email, tel, camp, selectedScreen } = this.state
    return (
      <div className="data__contrat-cont">
        <div className="grid__contrat">
          <div>
            <div>
              <p className="title__form"> Vas en grande con Loopita </p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm`}
                    name="nameClient"
                    value={nameClient}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control form-control-sm `}
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm`}
                    name="tel"
                    value={tel}
                    onChange={this.handleInputChange}
                  />
                </div>
                <hr />
                <div className="form-group ">
                  <label>Nombre de campaña</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm `}
                    name="camp"
                    value={camp}
                    onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
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
                {listScreenT.map((el, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={el}
                        name="p1"
                        onChange={e => this.isChecked(e, el)}
                        checked={selectedScreen !== null && selectedScreen.id === el.id}
                      />
                    </td>
                    <td>{el.name}</td>
                    <td>{el.avgViewers}</td>
                    <td>{el.maxPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <p
                className="title__form"
              >
                ¿Que tan serio vas con Loopita?
              </p>
            </div>
            <NavButtons
              firstLink={'/daily_plan'}
              secondLink={'/monthly_plan'}
              firstName={'En serio'}
              secondName={'Muy en serio'}
              firstSubText={"plan por dia"}
              secondSubText={"plan mensual"}
              disabledBtn={nameClient === '' || email === '' || tel === '' || selectedScreen === null}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Contract)