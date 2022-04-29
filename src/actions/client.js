export const SET_CLIENT = 'SET_CLIENT';

export const setClient = ( client ) => {
  return {
    type: SET_CLIENT,
    data: client
  }
}