import { combineReducers } from 'redux';
import { clientReducer } from './client';
import { planReducer } from './plan';
export default combineReducers({
  clientReducer,
  planReducer
})