import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ButtonsWithMail extends Component {

    handleSubmit = ( ) =>{
        this.props.handleSubmit()
    }

    render() {
        const {
            firstLink,
            firstName,
            secondName,
            disabledBtn,
            firstSubText,
            secondSubText,
            submitDisabled
        } = this.props

        return (
            <div className="container__btns-info">
                <Link
                    className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
                    to={firstLink} >
                    {firstName}
                    {firstSubText !== undefined && firstSubText.length > 0 && (
                        <span className="btn-sub-text">
                            <br />
                            {firstSubText}
                        </span>
                    )}
                </Link>
                <button
                    className={`${ disabledBtn || submitDisabled ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
                    onClick={this.handleSubmit}
                    >
                    {secondName}
                    {secondSubText !== undefined && secondSubText.length > 0 && (
                        <span className="btn-sub-text">
                            <br />
                            {secondSubText}
                        </span>
                    )}
                </button>
            </div>
        );
    }
}