export const SET_CLIENT = 'SET_CLIENT';
export const SET_PROGRESS = 'SET_PROGRESS';
export const setClient = ( client ) => {
  return {
    type: SET_CLIENT,
    data: client
  }
}

export const setProgress = (data) => {
  return {
    type: SET_PROGRESS,
    data
  }
}