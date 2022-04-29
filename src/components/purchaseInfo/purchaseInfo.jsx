import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
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

  componentDidMount = () => {
    /* full info data var fullData = getFullData();
    if (!fullData.clientData.nameClient) {
      this.setState({
        redirect: true
      })
    }*/
  }

  editPurchaseInfo = purchaseInfo => {
    this.setState({ purchaseConfirmationInfo: purchaseInfo })
  }

  handleSubmit = () => {
    /*
    TODO: fix submit
    this.setState({ disableManually: true })
    var fullData = getFullData();
    var sumarizedData = { ...fullData, purchaseInfo: this.state.purchaseConfirmationInfo }
    axios.post('https://loopita.impactovisual.info/api/contact/index.php', sumarizedData).then(response => {
      if (response.data.sent) {
        alert('¡Pronto nos contactaremos contigo!')
        this.setState({ disableManually: true })
        this.setState({ redirect: true })
      } else {
        this.setState({ disableManually: true })
      }
    })*/
  }
  render() {
    var { redirect, disableManually } = this.state
    if (redirect) {
      return (<Navigate to="/" />)
    } else {
      const { purchaseConfirmationInfo } = this.state
      return (
        <div className="buy__confirm">
          <p className="buy__title">
            Confirmación de compra
          </p>
          <BuyForm editPurchaseInfo={this.editPurchaseInfo} />
          <ButtonsWithMail
            firstName="Atrás"
            secondName="Siguiente"
            firstLink="/stats_summary"
            secondLink="/endoing"
            handleSubmit={this.handleSubmit}
            submitDisabled={disableManually}
          />
        </div>
      )

    }
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInfo)