import React, { Component } from 'react'
import { ScreensTable } from '../components/ScreensTable';
import { FormInfoClient } from '../components/FormInfoClient';
import Buttons from '../components/Buttons';
import { setClient } from '../service/storaje';

export default class FormDataClient extends Component {
  constructor(props){
    super(props)
    this.state ={
      nameClient : "",
      email : "",
      tel : "",
      camp : "",
      selectedScreen : null
    }
  }

  handleInputChange = e => {
    this.setState({
        [e.target.name] : e.target.value
    })
    const newClient = {
        ...this.state,
        [e.target.name] :e.target.value
    }
    setClient(newClient)
  }

  handleSubmit = e => {
    e.preventDefault()
    setClient(this.state)
  }

  handleSelectedCheck = (screen) => {
    this.setState({
      selectedScreen : screen
    })
  }

  disabledBtn = () => {
    return true
  }
  render() {
    const {nameClient, email, tel, camp, selectedScreen} = this.state
    return (
      <div className="data__contrat-cont">
      <div className="grid__contrat">
        <div>
          <FormInfoClient
            handleSubmit={this.handleSubmit}
            nameClient={nameClient}
            email={email}
            tel={tel}
            camp={camp}

            handleChangeInput={this.handleInputChange}
          />
        </div>
        <div>
          <ScreensTable
            selectedScreen={selectedScreen}
            onChecked={this.handleSelectedCheck}
          />
          <div>
            <p
              className="title__form"
            >
              ¿Que tan serio vas con Loopita?
            </p>
          </div>
          <Buttons
            firstLink={'planPorDia'}
            secondLink={'planMensual'}
            firstName={'En serio'}
            secondName={'Muy en serio'}
            firstSubText={"plan por dia"}
            secondSubText={"plan mensual"}
            disabledBtn={ nameClient === '' || email === '' || tel === '' || selectedScreen === null}
          />
        </div>
      </div>
    </div>
    )
  }
}
