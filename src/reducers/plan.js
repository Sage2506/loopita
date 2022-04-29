import { SET_CAMPAIGN_NAME } from "../actions/plan";

const initialPlan = {
  name: "",
  campaignName:"",
  screenSelected: null
}

export const planReducer = ( state = initialPlan, action) => {
  switch(action.type){
    case SET_CAMPAIGN_NAME:
      return {...state, campaignName: action.data.campaignName, screenSelected: action.data.screen}
    default:
      return state;
  }
}

export default planReducer;