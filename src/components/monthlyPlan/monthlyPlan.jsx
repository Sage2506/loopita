import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMonthlyPlan } from '../../actions/plan';
import NavButtons from '../common/navButtons';
import TotalAmount from '../dailyPlan/totalAmount';
import MonthlyPlanCard from './monthlyPlanCard';


export class MonthlyPlan extends Component {

  saveProgress = () =>{
    console.log("save progress")
  }

  render() {
    const { monthlyPlan , setMonthlyPlan} = this.props;
    return (
      <div>
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
  monthlyPlan : store.planReducer.monthlyPlan
})

const mapDispatchToProps = dispatch => {
  return {
    setMonthlyPlan: data => { dispatch(setMonthlyPlan(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPlan)