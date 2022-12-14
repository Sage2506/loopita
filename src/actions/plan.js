export const SET_CAMPAIGN_NAME = 'SET_CAMPAIGN_NAME';
export const SET_MONTHLY_PLAN = 'SET_MONTHLY_PLAN';
export const SET_DAILY_PLAN = 'SET_DAILY_PLAN';
export const SET_PURCHASE_INFO = 'SET_PURCHASE_INFO';
export const SET_SPOT_PLAN = 'SET_SPOT_PLAN';
export const SET_SPOT_PLAN_START_HOUR = 'SET_SPOT_PLAN_START_HOUR';
export const SET_SPOT_PLAN_END_HOUR = 'SET_SPOT_PLAN_END_HOUR';
export const setCampaignName = (data) => {
  return {
    type: SET_CAMPAIGN_NAME,
    data
  }
}

export const setMonthlyPlan = (data) => {
  return {
    type: SET_MONTHLY_PLAN,
    data
  }
}

export const setDailyPlan = data => {
  return {
    type: SET_DAILY_PLAN,
    data
  }
}

export const setSpotsPlan = (data) => {
  return {
    type: SET_SPOT_PLAN,
    data
  }
}

export const setPurchaseInfo = (data) => {
  return {
    type: SET_PURCHASE_INFO,
    data
  }
}

export const setSpotsPlanStartHour = (data) => {
  return {
    type: SET_SPOT_PLAN_START_HOUR,
    data
  }
}

export const setSpotsPlanEndHour = (data) => {
  return {
    type: SET_SPOT_PLAN_END_HOUR,
    data
  }
}