import { SET_EDITABLE } from "../actions/editable";

const initialEditable = {
  loaded : false,
  variables : {}
}

export const editableReducer = ( state = initialEditable , action) => {
  switch(action.type){
    case SET_EDITABLE:
      return { ...state, loaded : true, variables : action.data}
    default:
      return state;
  }
}

export default editableReducer;