import { SET_CAMPAIGN_NAME, SET_DAILY_PLAN, SET_MONTHLY_PLAN, SET_PURCHASE_INFO, SET_SPOT_PLAN, SET_SPOT_PLAN_END_HOUR, SET_SPOT_PLAN_START_HOUR } from "../actions/plan";

const initialPlan = {
  name: "",
  campaignName:"",
  screenSelected: null,
  monthlyPlan: {
    price: 0
  },
  dailyPlan : [],
  planType : '',
  spotPlan : {},
  legal_name: '',
  rfc: '',
  fiscal_addres: '',
  payment_mode: null,
  promo_code: ''
}

export const planReducer = ( state = initialPlan, action) => {
  switch(action.type){
    case SET_CAMPAIGN_NAME:
      return {...state, campaignName: action.data.campaignName, screenSelected: action.data.screen}
    case SET_MONTHLY_PLAN:
      return {...state, monthlyPlan: action.data, planType: 'monthly'}
    case SET_DAILY_PLAN:
      return {...state, dailyPlan:action.data, planType: 'daily'}
    case SET_PURCHASE_INFO:
      return {...state, ...action.data}
    case SET_SPOT_PLAN :
      return {...state, spotPlan :{...state.spotPlan, ...action.data}, planType : 'spots'}
    case SET_SPOT_PLAN_START_HOUR:
      return {...state, spotPlan :{ ...state.spotPlan, startHour :action.data}};
    case SET_SPOT_PLAN_END_HOUR:
      return {...state, spotPlan :{ ...state.spotPlan, endHour :action.data}};
    default:
      return state;
  }
}

export default planReducer;