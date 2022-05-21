export const SET_CAMPAIGN_NAME = 'SET_CAMPAIGN_NAME';
export const SET_MONTHLY_PLAN = 'SET_MONTHLY_PLAN';
export const SET_DAILY_PLAN = 'SET_DAILY_PLAN';
export const SET_PURCHASE_INFO = 'SET_PURCHASE_INFO';
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

export const setPurchaseInfo = (data) => {
  return {
    type: SET_PURCHASE_INFO,
    data
  }
}