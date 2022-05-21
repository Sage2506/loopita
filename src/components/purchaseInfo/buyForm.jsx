import React, { Component } from 'react';

export default class BuyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            legal_name: '',
            rfc: '',
            fiscal_addres: '',
            payment_mode: 'Efectivo',
            promo_code: ''
        }
    }

    componentDidMount = () => {
        const {legal_name, rfc, fiscal_addres, payment_mode, promo_code} = this.props
        this.setState({
            legal_name,
            rfc,
            fiscal_addres,
            payment_mode,
            promo_code
        })
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.editPurchaseInfo({ ...this.state, [e.target.name]: e.target.value })
        //change upper component
    }

    render() {
        const { handleInputChange, state } = this
        const { legal_name, rfc, fiscal_addres, payment_mode, promo_code } = state
        return (
            <div className="buy__form">
                <form>
                    <div className="form-group">
                        <label>Razón social</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="legal_name"
                            onChange={handleInputChange}
                            value={legal_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>RFC</label>
                        <input
                            className="form-control form-control-sm"
                            name="rfc"
                            onChange={handleInputChange}
                            value={rfc}
                        />
                    </div>
                    <div className="form-group">
                        <label>Dirección fiscal</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="fiscal_addres"
                            onChange={handleInputChange}
                            value={fiscal_addres}
                        />
                    </div>

                    <div className="form-group ">
                        <label className='required'>Forma de pago</label>
                        <select value={payment_mode || 'Efectivo'} className="form-control" name="payment_mode" onChange={handleInputChange}>
                            <option value={'Efectivo'}>Efectivo</option>
                            <option value={'Cheque'}>Cheque</option>
                            <option value={'Transferencia Electrónica de Fondos SPEI'}>Transferencia Electrónica de Fondos SPEI</option>
                            <option value={'Tarjeta de Crédito'}>Tarjeta de Crédito</option>
                        </select>
                    </div>
                    <div className="form-group ">
                        <label>Codigo de promoción</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="promo_code"
                            onChange={handleInputChange}
                            value={promo_code}
                        />
                    </div>
                </form>
            </div>
        );
    }
}