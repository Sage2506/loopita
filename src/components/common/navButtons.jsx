import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
export class NavButtons extends Component {

  goBack = () => {
    this.props.saveProgress()
    window.history.go(-1);
  }

  render (  ) {
    const {firstLink,
      secondLink,
      firstName,
      secondName,
      disabledBtn,
      firstSubText,
      secondSubText,
      backLink,
      saveProgress} = this.props
    return(
      <div className="container__btns-info">
        { backLink && <a onClick={this.goBack}
        className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
        >Atrás
        </a>}
      {firstLink && <Link
        onClick={saveProgress}
        className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
        to={firstLink} >
        {firstName}
        {firstSubText !== undefined && firstSubText.length > 0 && (
          <span className="btn-sub-text">
            <br />
            {firstSubText}
          </span>
        )}
      </Link>}
      {secondLink && <Link
        onClick={saveProgress}
        className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
        to={secondLink} >
        {secondName}
        {secondSubText !== undefined  && secondSubText.length > 0 && (
          <span className="btn-sub-text">
            <br />
            {secondSubText}
          </span>
        )}
      </Link>}
    </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect( mapStateToProps, mapDispatchToProps)(NavButtons)