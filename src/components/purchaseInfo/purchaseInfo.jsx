import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import { setPurchaseInfo } from '../../actions/plan';
import ButtonsWithMail from './buttonsWithMail';
import BuyForm from './buyForm';
import { calculateDailyServiceTotals, parsePeakHourRange } from '../../utils/common';

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

  parseHourToAmPm = (hour) => {
    if (hour === 12) {
      return `12:00 PM`
    } else if (hour > 12 && hour < 24) {
      return `${hour - 12}:00 PM`
    } else if (hour === 24) {
      return `${hour - 12}:00 AM`
    } else {
      return `${hour}:00 AM`
    }
  }

  setSubmitData = () => {
    const {
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
    const { name, email, phone } = this.props.fullData.clientReducer


    const data = {
      screenSelected: {
        name: this.props.screenSelected.name
      },
      clientData: {
        nameClient: name,
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

    if (planType === 'monthly') {
      data['mensualPlan'] = {
        id: monthlyPlan.id,
        price: monthlyPlan.price,
        name: monthlyPlan.name,

      }
      data['total'] = monthlyPlan.price
      data['configuredPlan'] = 3;
    } else if (planType === 'daily') {
      data['dailyPlan'] = {
        selectedDays: dailyPlan
      }
      const { total } = calculateDailyServiceTotals(this.props.dailyPlan, parsePeakHourRange(this.props.peakHourRange), this.props.normalHourPrice, this.props.peakHourPrice, this.props.loopDuration)
      data['total'] = total
      data['configuredPlan'] = 2;
    } else {
      const {
        endHour,
        maxEndingHour,
        minInitialHour,
        spotsPlan,
        startHour,
      } = this.props
      data['configuredPlan'] = 1;
      if (!!spotsPlan.selectedDays.from) {
        data['from'] = spotsPlan.selectedDays.from.toLocaleDateString()
        data['to'] = spotsPlan.selectedDays.from.toLocaleDateString()
      }
      if (!!spotsPlan.selectedDays.to) {
        data['to'] = spotsPlan.selectedDays.to.toLocaleDateString()
      }
      if (!!startHour) {
        data['startHour'] = this.parseHourToAmPm(startHour)
      } else {
        data['startHour'] = this.parseHourToAmPm(minInitialHour)
      }
      if (!!endHour) {
        data['endHour'] = this.parseHourToAmPm(endHour)
      } else {
        data['endHour'] = this.parseHourToAmPm(maxEndingHour)
      }
      data['totalSpots'] = spotsPlan.totalSpots
    }
    return data
  }
  handleSubmit = () => {
    this.setState({ disableManually: true })
    const data = this.setSubmitData()
    axios.post('https://loopita.impactovisual.info/api/contact/index.php', data).then(response => {
      if (response.data.sent) {
        let msj = '¡Pronto nos contactaremos contigo!'
        if (this.props.confirmMessage) {
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
    const { legal_name, rfc, fiscal_addres, payment_mode, promo_code } = this.props
    if (redirect) {
      return (<Navigate to="/" />)
    } else {
      return (
        <div className="container">
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
  confirmMessage: store.editableReducer.variables.confirmMessage.value,
  dailyPlan: store.planReducer.dailyPlan,
  endHour: store.planReducer.endHour,
  fiscal_addres: store.planReducer.fiscal_addres,
  fullData: store,
  legal_name: store.planReducer.legal_name,
  loopDuration: store.editableReducer.variables.loopDuration?.value,
  maxEndingHour: store.editableReducer.variables.maxEndHour?.value,
  minInitialHour: store.editableReducer.variables.minInitialHour?.value,
  monthlyPlan: store.planReducer.monthlyPlan,
  normalHourPrice: store.editableReducer.variables.normalHourSpotPrice?.value,
  payment_mode: store.planReducer.payment_mode,
  peakHourPrice: store.editableReducer.variables.peakHourSpotPrice?.value,
  peakHourRange: store.editableReducer.variables.peakHourRange?.value,
  planType: store.planReducer.planType,
  promo_code: store.planReducer.promo_code,
  rfc: store.planReducer.rfc,
  screenSelected: store.planReducer.screenSelected,
  spotsPlan: store.planReducer.spotPlan,
  startHour: store.planReducer.startHour,
})

const mapDispatchToProps = dispatch => {
  return {
    setPurchaseInfo: data => { dispatch(setPurchaseInfo(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInfo)