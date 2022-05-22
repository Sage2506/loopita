import {SET_CLIENT, SET_PROGRESS} from '../actions/client';
const initialClient = {
  name : "",
  email:"",
  phone:"",
  progress : 0
}

export const clientReducer = ( state = initialClient, action) => {
  switch(action.type){
    case SET_CLIENT:
      const {name, email, phone, progress } = action.data
      return {...state, name, email, phone, progress }

    case SET_PROGRESS:
      return {...state, progress: action.data}
    default:
      return state;
  }
}

export default clientReducer