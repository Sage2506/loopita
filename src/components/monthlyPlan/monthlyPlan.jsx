import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEditable } from '../../actions/editable';
import { setMonthlyPlan } from '../../actions/plan';
import { setProgress } from '../../actions/client';
import { initVariables } from '../../utils/common';
import NavButtons from '../common/navButtons';
import TotalAmount from '../dailyPlan/totalAmount';
import MonthlyPlanCard from './monthlyPlanCard';


export class MonthlyPlan extends Component {

  componentDidMount() {
    if (!this.props.loaded) {
      initVariables(this.props.setEditables)
    }
  }

  saveProgress = () => {
    this.props.setProgress(2);
  }

  render() {
    const { monthlyPlan, setMonthlyPlan, monthlyPlanOnePrice, monthlyPlanTwoPrice, monthlyPlanThreePrice, monthlyPlanOneMultiplier, monthlyPlanTwoMultiplier, monthlyPlanThreeMultiplier } = this.props;

    return (
      <div className='container'>
        <div className="container__plan-mensual" >
          <div className="mensual_plan_dobule_section_grid">
            <div>
              <p className="title">¿Cuál es tu plan con Loopita?</p>
              <p className="subtitle__plan-mensual">
                Selecciona el propósito que buscas con Loopita
              </p>
              <MonthlyPlanCard
                setMonthlyPlan={setMonthlyPlan}
                monthlyPlan={monthlyPlan}
                priceOne={monthlyPlanOnePrice}
                priceTwo={monthlyPlanTwoPrice}
                priceThree={monthlyPlanThreePrice}
                multiplyerOne={monthlyPlanOneMultiplier}
                multiplyerTwo={monthlyPlanTwoMultiplier}
                multiplyerThree={monthlyPlanThreeMultiplier}
              />
              <div className="cont__plan-men">
                <NavButtons
                  saveProgress={this.saveProgress}
                  goBack={true}
                  firstLink="/contract"
                  firstName="Atrás"
                  secondLink="/stats_summary"
                  secondName="Siguiente"
                />
              </div>
            </div>
          </div>
        </div>
        <TotalAmount
          amount={monthlyPlan.price || 0}
        />
      </div>
    );

  }
}

const mapStateToProps = store => ({
  monthlyPlan: store.planReducer.monthlyPlan,
  loaded: store.editableReducer.loaded,
  monthlyPlanOnePrice: store.editableReducer.variables.monthlyPlanOne?.value,
  monthlyPlanTwoPrice: store.editableReducer.variables.monthlyPlanTwo?.value,
  monthlyPlanThreePrice: store.editableReducer.variables.monthlyPlanThree?.value,
  monthlyPlanOneMultiplier: store.editableReducer.variables.loopMultiplierOne?.value,
  monthlyPlanTwoMultiplier: store.editableReducer.variables.loopMultiplierTwo?.value,
  monthlyPlanThreeMultiplier: store.editableReducer.variables.loopMultiplierThree?.value
})

const mapDispatchToProps = dispatch => {
  return {
    setMonthlyPlan: data => { dispatch(setMonthlyPlan(data)) },
    setEditables: data => { dispatch(setEditable(data)) },
    setProgress: data => { dispatch(setProgress(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPlan)