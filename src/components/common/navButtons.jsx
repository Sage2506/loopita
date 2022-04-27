import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
export class NavButtons extends Component {

  render (  ) {
    const {firstLink,
      secondLink,
      firstName,
      secondName,
      disabledBtn,
      firstSubText,
      secondSubText} = this.props
    return(
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
      <Link
        className={`${disabledBtn ? `btn btn-primary btn-sm disabled disabled-link` : `btn btn-primary btn-sm`}`}
        to={secondLink} >
        {secondName}
        {secondSubText !== undefined  && secondSubText.length > 0 && (
          <span className="btn-sub-text">
            <br />
            {secondSubText}
          </span>
        )}
      </Link>
    </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect( mapStateToProps, mapDispatchToProps)(NavButtons)