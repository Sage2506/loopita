import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
export class ButtonsWithMail extends Component {

    handleSubmit = () => {
        this.props.handleSubmit()
    }

    goBack = () => {
        this.props.saveProgress()
        window.history.go(-1);
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
                <a onClick={this.goBack}
                    className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}>
                    {firstName}
                    {firstSubText !== undefined && firstSubText.length > 0 && (
                        <span className="btn-sub-text">
                            <br />
                            {firstSubText}
                        </span>
                    )}
                </a>
                <button
                    className={`${disabledBtn || submitDisabled ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
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

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsWithMail)