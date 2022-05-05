import { SET_CAMPAIGN_NAME, SET_DAILY_PLAN, SET_MONTHLY_PLAN } from "../actions/plan";

const initialPlan = {
  name: "",
  campaignName:"",
  screenSelected: null,
  monthlyPlan: {
    price: 0
  },
  dailyPlan : [],
  planType : ''
}

export const planReducer = ( state = initialPlan, action) => {
  switch(action.type){
    case SET_CAMPAIGN_NAME:
      return {...state, campaignName: action.data.campaignName, screenSelected: action.data.screen}
    case SET_MONTHLY_PLAN:
      return {...state, monthlyPlan: action.data, planType: 'monthly'}
    case SET_DAILY_PLAN:
      return {...state, dailyPlan:action.data, planType: 'daily'}
    default:
      return state;
  }
}

export default planReducer;