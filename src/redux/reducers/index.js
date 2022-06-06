import { combineReducers } from 'redux';
import detailUserReducer from './detailUser';
import listUserReducer from './listUser';

const rootReducers = combineReducers({
  detailUser: detailUserReducer,
  listUser: listUserReducer,
});

export default rootReducers;
