import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setClient, setProgress } from '../actions/client';
import { setEditable } from '../actions/editable';
import { setCampaignName } from '../actions/plan';
import { initVariables } from '../utils/common';
import NavButtons from './common/navButtons';
import { Link } from 'react-router-dom';


const listScreenT = [
  {
    id: 1,
    name: 'Pantalla Zona dorada, Rio Tijuana',
    link: 'https://www.impactovisual.info/medio.php?id=240',
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
      name: "",
      email: "",
      phone: "",
      camp: "",
      selectedScreen: null,
      missingScreen: false,
    }
    this.nameInput = React.createRef();
    this.mailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.campaignInput = React.createRef();
  }

  componentDidMount = () => {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
      camp: this.props.camp,
      selectedScreen: this.props.selectedScreen,
    })
    if (!this.props.loaded) {
      initVariables(this.props.setEditables)
    }

  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.saveStateToRedux();
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleSelectedCheck = (screen) => {
    this.setState({
      selectedScreen: screen
    })
  }

  saveStateToRedux = () => {
    const { name, phone, email, camp, selectedScreen } = this.state
    this.props.setClient({ name, phone, email, progress: 1 })
    this.props.setCampaignName({ campaignName: camp, screen: selectedScreen })
    this.props.setProgress(1);

  }
  saveProgress = () => {
    this.saveStateToRedux()
    const { name, phone, email, camp, selectedScreen } = this.state
    if (name === '') {
      this.nameInput.current.focus();
    } else if (email === '') {
      this.mailInput.current.focus();
    } else if (phone === '') {
      this.phoneInput.current.focus();
    } else if (camp === '') {
      this.campaignInput.current.focus();
    } else if (selectedScreen === null) {
      this.setState({ missingScreen: true })
    }
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

  validateForm = () => {

  }

  navigateToSpotsForm = () => {
    this.saveProgress();
    const { name, email, phone, selectedScreen } = this.state
    if (name === '' || email === '' || phone === '' || selectedScreen === null) {

    } else {
    }
  }

  render() {
    const { name, email, phone, camp, selectedScreen, missingScreen } = this.state
    const { loaded, homeInputFourLabel } = this.props
    return (
      <div className="container">
        <div className="grid__contrat">
          <div>
            <div>
              <p className="title__form"> Vas en grande con Loopita </p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className='required'>Nombre completo</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm`}
                    name="name"
                    value={name}
                    onChange={this.handleInputChange}
                    ref={this.nameInput}
                  />
                </div>
                <div className="form-group">
                  <label className='required'>Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control form-control-sm `}
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    ref={this.mailInput}
                  />
                </div>
                <div className="form-group">
                  <label className='required'>Teléfono</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm`}
                    name="phone"
                    value={phone}
                    onChange={this.handleInputChange}
                    ref={this.phoneInput}
                  />
                </div>
                <hr />
                <div className="form-group ">
                  <label>{loaded ? homeInputFourLabel.value : 'Nombre de campaña'}</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm `}
                    name="camp"
                    value={camp}
                    onChange={this.handleInputChange}
                    ref={this.campaignInput}
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
                    <td> <a href={el.link}>{el.name}</a> </td>
                    <td>{el.avgViewers}</td>
                    <td>{el.maxPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {missingScreen && <p className='errorMessage'>Favor de seleccionar almenos una pantalla *</p>}
            <div>
              <p
                className="title__form"
              >
                ¿Que tan serio vas con Loopita?
              </p>
            </div>
            <NavButtons
              saveProgress={this.saveProgress}
              firstLink={'/daily_plan'}
              secondLink={'/monthly_plan'}
              firstLinkValidate={true}
              secondLinkValidate={true}
              firstName={'En serio'}
              secondName={'Muy en serio'}
              firstSubText={"plan por dia"}
              secondSubText={"plan mensual"}
              disabledBtn={name === '' || email === '' || phone === '' || selectedScreen === null}
            />
            <div className="container__btns-info">
              <Link to={ (name === '' || email === '' || phone === '' || selectedScreen === null) ? '#':'/spots_form'} className={'btn btn-primary btn-sm margin-auto'} onClick={this.navigateToSpotsForm}>
                Por un tiempo
                <span className='btn-sub-text'> <br />Plan por paquete</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  name: store.clientReducer.name,
  email: store.clientReducer.email,
  phone: store.clientReducer.phone,
  camp: store.planReducer.campaignName,
  selectedScreen: store.planReducer.screenSelected,
  homeInputFourLabel: store.editableReducer.variables.homeInputFourLabel,
  loaded: store.editableReducer.loaded
})

const mapDispatchToProps = dispatch => {
  return {
    setClient: data => { dispatch(setClient(data)) },
    setCampaignName: data => { dispatch(setCampaignName(data)) },
    setEditables: data => { dispatch(setEditable(data)) },
    setProgress: data => { dispatch(setProgress(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract)