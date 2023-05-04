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
  },
  {
    id: 2,
    name: 'Pantalla Blvd Aguacaliente Zona Financiera',
    link: 'https://impactovisual.info/medio.php?id=257',
    title: '1 hora',
    service: '12 pm',
    state: false,
    maxPoint: '17:00',
    avgViewers: '1750'
  },
  {
    id: 3,
    name: 'Pantalla Crucero estratégico Zona Este Tijuana',
    link: 'https://impactovisual.info/medio.php?id=423',
    title: '1 hora',
    service: '12 pm',
    state: false,
    maxPoint: '17:00',
    avgViewers: '1250'
  }
]
export class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {

      selectedScreen: null,
      missingScreen: false,
    }

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
    const { selectedScreen } = this.state
    this.props.setClient({ progress: 1 })
    this.props.setCampaignName({ screen: selectedScreen })
    this.props.setProgress(1);

  }
  saveProgress = () => {
    this.saveStateToRedux()
    const { selectedScreen } = this.state
    if (selectedScreen === null) {
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
    const { selectedScreen } = this.state
    if (selectedScreen === null) {

    } else {
    }
  }

  render() {
    const { selectedScreen, missingScreen } = this.state
    return (
      <div className="container">
        <div className="grid__contrat">
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
              disabledBtn={selectedScreen === null}
            />
            <div className="container__btns-info">
              <Link to={(selectedScreen === null) ? '#' : '/spots_form'} className={'btn btn-primary btn-sm margin-auto'} onClick={this.navigateToSpotsForm}>
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
  camp: store.planReducer.campaignName,
  email: store.clientReducer.email,
  loaded: store.editableReducer.loaded,
  name: store.clientReducer.name,
  phone: store.clientReducer.phone,
  selectedScreen: store.planReducer.screenSelected,
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