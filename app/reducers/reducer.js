import usersReducer from './users';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  usersReducer,
});

export default reducer;
