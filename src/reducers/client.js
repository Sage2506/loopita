import {SET_CLIENT} from '../actions/client';
const initialClient = {
  name : "",
  email:"",
  phone:"",
}

export const clientReducer = ( state = initialClient, action) => {
  switch(action.type){
    case SET_CLIENT:
      const {name, email, phone} = action.data
      return {...state, name, email, phone }
    default:
      return state;
  }
}

export default clientReducer