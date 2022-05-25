import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import { setPurchaseInfo } from '../../actions/plan';
import ButtonsWithMail from './buttonsWithMail';
import BuyForm from './buyForm';

export class PurchaseInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      purchaseConfirmationInfo: {},
      redirect: false,
      disableManually: false,
    }
  }

  editPurchaseInfo = purchaseInfo => {
    this.setState({ purchaseConfirmationInfo: purchaseInfo })
    this.props.setPurchaseInfo(purchaseInfo)
  }

  saveProgress = () => {


  }

  setSubmitData = () => {
    const {
      screenSelected,
      campaignName,
      legal_name,
      rfc,
      fiscal_addres,
      payment_mode,
      promo_code,
      monthlyPlan,
      dailyPlan,
      planType
    } = this.props.fullData.planReducer
    const {name, email, phone} = this.props.fullData.clientReducer

    const data = {
      screenSelected : {
        name: this.props.screenSelected.name
      },
      clientData : {
        nameClient : name,
        email: email,
        tel: phone,
        camp: campaignName
      },
      purchaseInfo: {
        razonSocial: legal_name,
        rfc,
        direccionFiscal: fiscal_addres,
        tipoFactura: payment_mode,
        codigoPomo: promo_code
      },
    }

    if( planType === 'monthly'){
      data['mensualPlan'] = {
        id: monthlyPlan.id,
        price: monthlyPlan.price,
        name: monthlyPlan.name,

      }
    } else {
      data['dailyPlan'] = {
        selectedDays: dailyPlan
      }
    }
    return data
  }
  handleSubmit = () => {
    this.setState({ disableManually: true })
    const data = this.setSubmitData()
    axios.post('https://loopita.impactovisual.info/api/contact/index.php', data).then(response => {
      if (response.data.sent) {
        let msj = '¡Pronto nos contactaremos contigo!'
        if(this.props.confirmMessage){
          msj = this.props.confirmMessage;
        }
        alert(msj)
        this.setState({ disableManually: true })
        this.setState({ redirect: true })
      } else {
        this.setState({ disableManually: true })
      }
    })
  }
  render() {
    var { redirect, disableManually } = this.state
    const {legal_name, rfc, fiscal_addres, payment_mode, promo_code} = this.props
    if (redirect) {
      return (<Navigate to="/" />)
    } else {
      const { purchaseConfirmationInfo } = this.state
      return (
        <div className="buy__confirm">
          <p className="buy__title">
            Confirmación de compra
          </p>
          <BuyForm editPurchaseInfo={this.editPurchaseInfo}
           legal_name={legal_name}
           rfc={rfc}
           fiscal_addres={fiscal_addres}
           payment_mode={payment_mode}
           promo_code={promo_code}
          />
          <ButtonsWithMail
            firstName="Atrás"
            secondName="Siguiente"
            firstLink="/stats_summary"
            secondLink="/endoing"
            handleSubmit={this.handleSubmit}
            submitDisabled={disableManually}
            saveProgress={this.saveProgress}
          />
        </div>
      )

    }
  }
}

const mapStateToProps = store => ({
  legal_name: store.planReducer.legal_name,
  rfc: store.planReducer.rfc,
  fiscal_addres: store.planReducer.fiscal_addres,
  payment_mode: store.planReducer.payment_mode,
  promo_code: store.planReducer.promo_code,
  fullData : store,
  screenSelected : store.planReducer.screenSelected,
  planType : store.planReducer.planType,
  confirmMessage : store.editableReducer.variables.confirmMessage.value
})

const mapDispatchToProps = dispatch => {
  return {
    setPurchaseInfo: data => { dispatch(setPurchaseInfo(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInfo)