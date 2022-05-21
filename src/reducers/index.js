import { combineReducers } from 'redux';
import { clientReducer } from './client';
import { editableReducer } from './editable';
import { planReducer } from './plan';

export default combineReducers({
  clientReducer,
  planReducer,
  editableReducer
})