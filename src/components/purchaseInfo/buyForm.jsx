import React, { Component } from 'react';

export default class BuyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            razonSocial: '',
            rfc: '',
            direccionFiscal: '',
            tipoFactura: 'Efectivo',
            codigoPomo: ''
        }
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
        const { razonSocial, rfc, direccionFiscal, tipoFactura, codigoPomo } = state
        return (
            <div className="buy__form">
                <form>
                    <div className="form-group">
                        <label>Razón social</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="razonSocial"
                            onChange={handleInputChange}
                            value={razonSocial}
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
                            name="direccionFiscal"
                            onChange={handleInputChange}
                            value={direccionFiscal}
                        />
                    </div>

                    <div className="form-group ">
                        <label>Forma de pago</label>
                        <select value={tipoFactura} className="form-control" name="tipoFactura" onChange={handleInputChange}>
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
                            name="codigoPomo"
                            onChange={handleInputChange}
                            value={codigoPomo}
                        />
                    </div>
                </form>
            </div>
        );
    }
}