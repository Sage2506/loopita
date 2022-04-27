import React,{ Component } from 'react';
import { connect } from 'react-redux';

export class MonthlyPlan extends Component {

  render (  ) {
    return(
    <div>
      MonthlyPlan Works!
    </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect( mapStateToProps, mapDispatchToProps)(MonthlyPlan)